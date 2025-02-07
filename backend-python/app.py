from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

# Load the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def split_into_chunks(text, max_chunk_length=512):
    """
    Splits the input text into chunks of maximum token length.
    """
    tokens = summarizer.tokenizer.tokenize(text)
    chunks = []
    current_chunk = []

    for token in tokens:
        current_chunk.append(token)
        if len(current_chunk) >= max_chunk_length:
            chunks.append(summarizer.tokenizer.convert_tokens_to_string(current_chunk))
            current_chunk = []

    if current_chunk:
        chunks.append(summarizer.tokenizer.convert_tokens_to_string(current_chunk))

    return chunks

@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        # Get the input text from the request
        data = request.get_json()
        text = data.get("text")

        # Validate input: Check if text is provided and is a string
        if not text or not isinstance(text, str):
            return jsonify({"error": "Valid text parameter is required."}), 400

        # Split the input into chunks
        chunks = split_into_chunks(text)

        # Summarize each chunk
        summaries = []
        for chunk in chunks:
            result = summarizer(chunk, max_length=125, min_length=75, do_sample=False)
            summaries.append(result[0]["summary_text"])

        # Combine the summaries into a single output
        combined_summary = " ".join(summaries)

        # Clear GPU memory to prevent memory leaks
        if torch.cuda.is_available():
            torch.cuda.empty_cache()

        return jsonify({"summary": combined_summary})

    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error during summarization: {str(e)}")
        return jsonify({"error": "An unexpected error occurred while generating the summary."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)  # Run on port 5001