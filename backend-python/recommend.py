import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify

app = Flask(__name__)

# Function to process articles and compute similarity
def compute_recommendations(news_data, article_title, top_n=3):
    df = pd.DataFrame(news_data)
    df = df[["title", "description", "content"]].dropna()  # Keep only relevant text fields
    df["text"] = df["title"] + " " + df["description"] + " " + df["content"]

    # Compute TF-IDF
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df["text"])
    
    # Compute cosine similarity
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Find index of given article
    if article_title not in df["title"].values:
        return {"error": "Article not found!"}
    
    idx = df[df["title"] == article_title].index[0]
    similar_scores = list(enumerate(similarity_matrix[idx]))
    similar_scores = sorted(similar_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]  

    recommendations = [{"title": df.iloc[i[0]]["title"], "description": df.iloc[i[0]]["description"]} for i in similar_scores]
    return recommendations

# Flask Route to handle requests
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    articles = data.get("articles", [])
    title = data.get("title", "")

    if not articles or not title:
        return jsonify({"error": "Missing data"}), 400
    
    recommendations = compute_recommendations(articles, title)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
