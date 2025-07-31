const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generatePromptFlow(prompt, filePath) {
  const contents = [{ text: prompt }];

  if (filePath) {
    const base64ImageFile = fs.readFileSync(filePath, {
      encoding: "base64"
    });
    contents.push({
      inlineData: { mimeType: req.file.mimetype, data: base64ImageFile }
    });
  }
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents
    });

    return result.text;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { generatePromptFlow };
