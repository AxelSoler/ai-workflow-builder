const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generatePromptFlow(prompt) {
  const parts = [{ text: prompt.parts[0].text }];

  try {
    if (prompt.parts[1]?.inlineData) {
      const inlineData = prompt.parts[1].inlineData;
      const uploadedFileResponse = await ai.files.upload({
        file: fs.createReadStream(inlineData.data),
        mimeType: inlineData.mimeType,
      });

      parts.push({
        fileData: {
          mimeType: uploadedFileResponse.file.mimeType,
          fileUri: uploadedFileResponse.file.uri,
        },
      });
    }

    const contents = [{ role: "user", parts: parts }];

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: contents,
    });
    
    const response = result.response;
    return response.text();

  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { generatePromptFlow };
