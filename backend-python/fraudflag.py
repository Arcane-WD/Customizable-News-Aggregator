from flask import Flask, request, jsonify
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load resources
model = pickle.load(open(r'C:\Users\harsh\Downloads\FOSS stuff\Customizable-News-Aggregator\backend-python\fraud_model_vectorizer\model.pkl', 'rb'))
vectorizer = pickle.load(open(r'C:\Users\harsh\Downloads\FOSS stuff\Customizable-News-Aggregator\backend-python\fraud_model_vectorizer\vector.pkl', 'rb'))
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Make sure necessary NLTK packages are downloaded
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')

def preprocess(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = text.lower()
    words = nltk.word_tokenize(text)
    words = [lemmatizer.lemmatize(w) for w in words if w not in stop_words]
    return ' '.join(words)

@app.route('/predict-fakeness', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    processed = preprocess(text)
    transformed = vectorizer.transform([processed])
    prediction = model.decision_function(transformed)[0]
    prob = 1 / (1 + (2.71828 ** (-prediction)))  # Sigmoid approximation

    return jsonify({
        "real_probability": round(prob * 100, 2),
        "fake_probability": round((1 - prob) * 100, 2)
    })

if __name__ == '__main__':
    app.run(port=5002)
