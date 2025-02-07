import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to scrape and parse article content
app.get("/scrape", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required." });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const { JSDOM } = await import("jsdom");
    const dom = new JSDOM(html, { url });
    const document = dom.window.document;

    const { Readability } = await import("@mozilla/readability");
    const reader = new Readability(document);
    const articleContent = reader.parse();

    if (articleContent?.textContent) {
      res.json({ content: articleContent.textContent });
    } else {
      res.status(400).json({ error: "Unable to extract article content." });
    }
  } catch (error) {
    console.error("Error fetching or parsing the article:", error);
    res.status(500).json({ error: "Failed to load the full article content." });
  }
});

// Endpoint to summarize text using the Python backend
app.post("/summarize", async (req, res) => {
    const { text } = req.body;
  
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Valid text parameter is required." });
    }
  
    try {
      // Call the Python backend summarization API
      const pythonResponse = await axios.post("http://localhost:5001/summarize", {
        text,
      });
  
      if (pythonResponse.data.summary) {
        res.json({ summary: pythonResponse.data.summary });
      } else {
        res.status(500).json({ error: "Failed to generate summary." });
      }
    } catch (error) {
      console.error("Error during summarization:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to generate summary." });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});