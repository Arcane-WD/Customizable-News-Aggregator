from flask import Flask, request, jsonify
from transformers import pipeline
from concurrent.futures import ThreadPoolExecutor
import torch

app = Flask(__name__)

# Load summarizer pipeline with GPU if available
device = 0 if torch.cuda.is_available() else -1
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=device)

def split_into_chunks(text, max_chunk_length=512):
    input_ids = summarizer.tokenizer.encode(text, return_tensors="pt", truncation=False)[0]
    chunks = [input_ids[i:i + max_chunk_length] for i in range(0, len(input_ids), max_chunk_length)]
    return [summarizer.tokenizer.decode(chunk, skip_special_tokens=True) for chunk in chunks]

def summarize_chunk(chunk):
    result = summarizer(chunk, max_length=125, min_length=75, do_sample=False)
    return result[0]["summary_text"]

@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        text = data.get("text")

        if not text or not isinstance(text, str):
            return jsonify({"error": "Valid text parameter is required."}), 400

        if len(text) > 5000:
            return jsonify({"error": "Text too long. Limit to 5000 characters."}), 400

        chunks = split_into_chunks(text)

        with ThreadPoolExecutor() as executor:
            summaries = list(executor.map(summarize_chunk, chunks))

        combined_summary = " ".join(summaries)

        return jsonify({"summary": combined_summary})

    except Exception as e:
        print(f"Error during summarization: {str(e)}")
        return jsonify({"error": "An unexpected error occurred."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
