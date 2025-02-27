import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; // Import JWT for token verification

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Replace with a strong secret key

app.use(cors());
app.use(express.json());
// Signup endpoint
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In production, hash the password before storing
  };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({ token });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
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
    console.log("DEBUG: Raw HTML response:", html.slice(0, 500)); // Print first 500 characters

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
// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Endpoint to scrape and parse article content
// app.get("/scrape", async (req, res) => {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ error: "URL parameter is required." });
//   }

//   try {
//     const response = await axios.get(url);
//     const html = response.data;

//     const { JSDOM } = await import("jsdom");
//     const dom = new JSDOM(html, { url });
//     const document = dom.window.document;

//     const { Readability } = await import("@mozilla/readability");
//     const reader = new Readability(document);
//     const articleContent = reader.parse();

//     if (articleContent?.textContent) {
//       res.json({ content: articleContent.textContent });
//     } else {
//       res.status(400).json({ error: "Unable to extract article content." });
//     }
//   } catch (error) {
//     console.error("Error fetching or parsing the article:", error);
//     res.status(500).json({ error: "Failed to load the full article content." });
//   }
// });

// // Endpoint to summarize text using the Python backend
// app.post("/summarize", async (req, res) => {
//     const { text } = req.body;
  
//     if (!text || typeof text !== "string") {
//       return res.status(400).json({ error: "Valid text parameter is required." });
//     }
  
//     try {
//       // Call the Python backend summarization API
//       const pythonResponse = await axios.post("http://localhost:5001/summarize", {
//         text,
//       });
  
//       if (pythonResponse.data.summary) {
//         res.json({ summary: pythonResponse.data.summary });
//       } else {
//         res.status(500).json({ error: "Failed to generate summary." });
//       }
//     } catch (error) {
//       console.error("Error during summarization:", error.response?.data || error.message);
//       res.status(500).json({ error: "Failed to generate summary." });
//     }
//   });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use env variable in production

// app.use(cors());
// app.use(express.json());

// // In-memory "database" for demo purposes
// const users = [];

// // Signup endpoint
// app.post("/signup", (req, res) => {
//   const { name, email, password } = req.body;
//   const existingUser = users.find((u) => u.email === email);
//   if (existingUser) {
//     return res.status(400).json({ error: "User already exists" });
//   }

//   const newUser = {
//     id: users.length + 1,
//     name,
//     email,
//     password, // In production, hash the password before storing
//   };
//   users.push(newUser);

//   const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });
//   res.status(201).json({ token });
// });

// // Login endpoint
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find((u) => u.email === email && u.password === password);
//   if (!user) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }
//   const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
//   res.json({ token });
// });

// // Authentication middleware
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ error: "Invalid token" });
//     req.user = decoded;
//     next();
//   });
// };

// // Scrape article content (dummy implementation)
// app.get("/scrape", authMiddleware, async (req, res) => {
//   const { url } = req.query;
//   if (!url) return res.status(400).json({ error: "URL parameter is required." });

//   // Simulating fetching full article content
//   res.json({ content: `Simulated full article content from ${url}` });
// });

// // Summarize text using Python backend
// app.post("/summarize", authMiddleware, async (req, res) => {
//   const { text } = req.body;
//   if (!text || typeof text !== "string") {
//     return res.status(400).json({ error: "Valid text parameter is required." });
//   }

//   try {
//     const pythonResponse = await axios.post("http://localhost:5001/summarize", { text });

//     if (pythonResponse.data.summary) {
//       res.json({ summary: pythonResponse.data.summary });
//     } else {
//       res.status(500).json({ error: "Failed to generate summary." });
//     }
//   } catch (error) {
//     console.error("Error during summarization:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to generate summary." });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// }); 

