from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import nltk
import os
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Setup
app = Flask(__name__)
CORS(app)

# Ensure NLTK resources are available
nltk_data_path = os.path.join(os.getcwd(), 'nltk_data')
nltk.data.path.append(nltk_data_path)

# Download if not already present
for resource in ['stopwords', 'punkt', 'wordnet', 'omw-1.4','punkt_tab']:
    try:
        nltk.data.find(resource)
    except LookupError:
        nltk.download(resource, download_dir=nltk_data_path)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and vectorizer
MODEL_PATH = os.path.join(BASE_DIR, 'fraud_model_vectorizer', 'model.pkl')
VEC_PATH = os.path.join(BASE_DIR, 'fraud_model_vectorizer', 'vector.pkl')

try:
    model = pickle.load(open(MODEL_PATH, 'rb'))
    vectorizer = pickle.load(open(VEC_PATH, 'rb'))
except Exception as e:
    print(f"Error loading model/vectorizer: {e}")
    exit()

# Text preprocessing tools
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Preprocessing function
def preprocess(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = text.lower()
    words = nltk.word_tokenize(text)
    words = [lemmatizer.lemmatize(w) for w in words if w not in stop_words]
    return ' '.join(words)

# API Endpoint
@app.route('/predict-fakeness', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        text = data.get('text', '').strip()

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # print("[DEBUG] Raw input:", text)
        processed = preprocess(text)
        # print("[DEBUG] Processed text:", processed)

        transformed = vectorizer.transform([processed])
        prediction_score = model.decision_function(transformed)[0]
        prob = 1 / (1 + pow(2.71828, -prediction_score))

        return jsonify({
            "real_probability": round(prob * 100, 2),
            "fake_probability": round((1 - prob) * 100, 2)
        })

    except Exception as e:
        print(f"[ERROR] Exception occurred: {e}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

# Main driver
if __name__ == '__main__':
    app.run(port=5003, debug=True)
