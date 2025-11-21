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
    
    const prompt = `You are a form validator. Validate each field independently.

Form Data:
- Name: "${formData.name}"
- Email: "${formData.email}"
- Phone: "${formData.phone}"
- Address: "${formData.address}"

Validation Rules:

EMAIL:
- Must contain @ symbol and a valid domain
- Valid domains include: gmail.com, yahoo.com, outlook.com, hotmail.com, etc.
- Common typos to detect: gmsl.com, gmial.com, gmai.com (should be gmail.com), yahooo.com (should be yahoo.com), outlok.com (should be outlook.com), hotmial.com (should be hotmail.com)
- If email is user@gmail.com or user@yahoo.com or user@outlook.com → VALID, no error
- Only show error if there's actually a typo or invalid format

PHONE:
- Must be exactly 10 digits
- Must start with 6, 7, 8, or 9
- No spaces, dashes, special characters, or +91

NAME:
- Must not be empty
- Should only contain letters and spaces

ADDRESS:
- Must not be empty

CRITICAL: 
- If email is "something@gmail.com" → VALID (no error)
- If email is "something@gmsl.com" → INVALID (typo error)
- Validate each field separately
- Do NOT mark a field invalid if it's correct

Return ONLY this JSON:
{
  "isValid": true/false,
  "errors": {
    "email": "error message only if invalid"
  }
}

If ALL fields are valid, return:
{
  "isValid": true,
  "errors": {}
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: "user",
        parts: [{ text: prompt }],
      }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.1, // Lower temperature for consistent validation
      },
    });

    const cleanJSON = JSON.parse(response.text);
    
    console.log("Validation Result:", cleanJSON);
    
    res.json(cleanJSON);
  } catch (error) {
    console.error("Error validating form:", error);
    res.status(500).json({ 
      isValid: false, 
      errors: { server: "Failed to validate form" }
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));