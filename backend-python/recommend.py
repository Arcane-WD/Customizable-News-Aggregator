import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify

app = Flask(__name__)

# Function to process articles and compute similarity
def compute_recommendations(news_data, article_title, top_n=3):
    df = pd.DataFrame(news_data)
    
    # Ensure required columns exist
    df = df[["title", "description", "content", "urlToImage", "url", "source"]].dropna(subset=["title", "description", "content"])

    # Create a text field for vectorization
    df["text"] = df["title"] + " " + df["description"] + " " + df["content"]

    # Compute TF-IDF
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df["text"])
    
    # Compute cosine similarity
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

    article_title = article_title.strip().lower()
    df["title"] = df["title"].str.strip().str.lower()

    # Find index of given article
    if article_title not in df["title"].values:
        return jsonify({"error": "Article not found!"})
    
    idx = df[df["title"] == article_title].index[0]
    similar_scores = list(enumerate(similarity_matrix[idx]))
    similar_scores = sorted(similar_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]  

    recommendations = [
        {
            "title": df.iloc[i[0]]["title"],
            "description": df.iloc[i[0]]["description"],
            "urlToImage": df.iloc[i[0]]["urlToImage"],
            "url": df.iloc[i[0]]["url"],
            "source": df.iloc[i[0]]["source"]["name"] if isinstance(df.iloc[i[0]]["source"], dict) else "Unknown",
        }
        for i in similar_scores
    ]

    return recommendations

# Flask Route to handle requests
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    
    print("🔍 Received Data:", json.dumps(data, indent=2))  # Debugging output

    articles = data.get("articles", [])
    title = data.get("title", "")

    if not articles or not title:
        return jsonify({"error": "Missing data"}), 400
    
    recommendations = compute_recommendations(articles, title)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
