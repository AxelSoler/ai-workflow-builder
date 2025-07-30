const express = require("express");
const { upload } = require("../middleware/upload");
const { generatePromptFlow } = require("../services/geminiAIService.js");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const filePath = req.file?.path;

    const contents = {
      parts: [
        { text: prompt },
        filePath && { inlineData: { mimeType: req.file.mimetype, data: filePath } },
      ].filter(Boolean),
    };

    const response = await generatePromptFlow(contents);
    res.json({ text: response });
  } catch (err) {
    console.log("Prompt error", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
