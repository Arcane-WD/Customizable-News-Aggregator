from flask import Flask, request, jsonify
from transformers import pipeline, BartTokenizer
from concurrent.futures import ThreadPoolExecutor
import torch
import traceback

app = Flask(__name__)

# Load summarizer pipeline with GPU if available
device = 0 if torch.cuda.is_available() else -1
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=device)
tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")

def split_into_chunks(text, max_chunk_length=512):
    input_ids = summarizer.tokenizer.encode(text, return_tensors="pt", truncation=False)[0]
    chunks = [input_ids[i:i + max_chunk_length] for i in range(0, len(input_ids), max_chunk_length)]
    return [summarizer.tokenizer.decode(chunk, skip_special_tokens=True) for chunk in chunks]

def summarize_chunk_safe(chunk):
    try:
        result = summarizer(chunk, max_length=125, min_length=75, do_sample=False)
        return result[0]["summary_text"]
    except Exception as e:
        print(f"Chunk summarization failed: {e}")
        return "[Summary failed for this part]"

@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        text = data.get("text")

        print("\n--- Incoming summarize request ---")
        print(f"Text length (chars): {len(text)}")
        print(f"Text sample: {text[:300]}...\n")

        if not text or not isinstance(text, str):
            print("Invalid or missing text.")
            return jsonify({"error": "Valid text parameter is required."}), 400

        # Token-based check (more accurate than character count)
        if len(tokenizer.encode(text, truncation=False)) > 4096:
            print("Text too long (token limit).")
            return jsonify({"error": "Text is too long for summarization model."}), 400

        chunks = split_into_chunks(text)
        print(f"Text split into {len(chunks)} chunks.")

        with ThreadPoolExecutor() as executor:
            summaries = list(executor.map(summarize_chunk_safe, chunks))

        combined_summary = " ".join(summaries)
        print("Generated summary.")

        return jsonify({"summary": combined_summary})

    except Exception as e:
        print(f"Error during summarization: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "An unexpected error occurred."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
