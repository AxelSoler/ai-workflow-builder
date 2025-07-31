const express = require("express");
const fs = require("fs");
const { upload } = require("../middleware/upload");
const { generatePromptFlow } = require("../services/geminiAIService.js");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const filePath = req.file?.path;

    const response = await generatePromptFlow(prompt, filePath);
    res.json({ text: response });
  } catch (err) {
    console.log("Prompt error", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
