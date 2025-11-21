import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/validate-form", async (req, res) => {
  try {
    const formData = req.body;

    const prompt = `
    Validate this form data and return a valid JSON object.
    
    Data to validate:
    { 
      "name": "${formData.name}",
      "email": "${formData.email}",
      "phone": "${formData.phone}",
      "address": "${formData.address}"
    }

    Check for:
    1. Invalid email format
    2. Invalid phone format
    3. Grammar/formatting issues in name or address

    Return ONLY a JSON object with this structure:
    {
      "isValid": boolean,
      "errors": { "field_name": "error message" },
      "suggestions": { "field_name": "corrected value" }
    }
    `;

   const response = await ai.models.generateContent({
  model: "gemini-2.0-flash", // ✅ use a current model
  contents: [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ],
  config: {
    responseMimeType: "application/json",
    // (optional but recommended) strong JSON shape:
    // responseSchema: {
    //   type: "object",
    //   properties: {
    //     isValid: { type: "boolean" },
    //     errors: { type: "object" },
    //     suggestions: { type: "object" },
    //   },
    //   required: ["isValid", "errors", "suggestions"],
    // },
  },
});

    const cleanJSON = JSON.parse(response.text);
    
    res.json(cleanJSON);

  } catch (error) {
    console.error("Error validating form:", error);
    res.status(500).json({ 
      isValid: false, 
      errors: { server: "Failed to validate form" }, 
      suggestions: {} 
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
