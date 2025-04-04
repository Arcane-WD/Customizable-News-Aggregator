import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; // Import JWT for token verification
import fs from "fs"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "aslhbuhbgguhj83rgye76grjhb"; // Replace with a strong secret key
console.log("JWT_SECRET:", JWT_SECRET);

app.use(cors());
app.use(express.json());
// Function to read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync("users.json", "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading users.json:", error);
    return []; // Ensure an empty array is returned if file is missing/corrupt
  }
};


// Function to write users to file
const writeUsers = (users) => {
  try {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    console.log("Updated users.json successfully");
  } catch (error) {
    console.error("Error writing to users.json:", error);
  }
};

app.post("/signup", (req, res) => {
  console.log("Received data:", req.body);

  try {
    const { name, email, password } = req.body;
    let users = readUsers();

    console.log("Current Users in File:", users);

    if (!name || !email || !password) {
      console.log("Validation Failed: Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In production, hash the password before storing
    };

    users.push(newUser);
    writeUsers(users);

    console.log("New user added:", newUser);
    console.log("Users after adding new user:", users);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


app.post("/login", (req, res) => {
  console.log("Login request received:", req.body);

  try {
    const { email, password } = req.body;
    let users = readUsers();

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      console.log("Invalid credentials");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("User found:", user);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ 
      token,
      name: user.name,
      email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded; // Attach user info to request
    next();
  });
};

// Secure Scrape Endpoint (Requires Authentication)
app.get("/scrape", authMiddleware, async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required." });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    // console.log("DEBUG: Raw HTML response:", html.slice(0, 500)); // Print first 500 characters

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

// Summarization Endpoint (No Authentication Required)
app.post("/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Valid text parameter is required." });
  }

  try {
    const pythonResponse = await axios.post("http://localhost:5002/summarize", {
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

//NewsAPI Route
app.post("/get-recommendations", async (req, res) => {
  try {
    console.log("🔍 Incoming Request Body:", JSON.stringify(req.body, null, 2));

    const { articles, title } = req.body;

    if (!articles || !title) {
      return res.status(400).json({ error: "Missing articles or title" });
    }

    console.log("📤 Sending to Python API:", JSON.stringify({ articles, title }, null, 2));

    const response = await axios.post("http://localhost:5001/recommend", { articles, title });
    
    console.log("✅ Response from Python API:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get recommendations", details: error.response?.data });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});