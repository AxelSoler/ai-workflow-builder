const express = require("express");
const router = express.Router();
const { generatePromptFlow } = require("../services/geminiAIService.js");

router.post("/", async (req, res) => {
  try {
    const flow = await generatePromptFlow(req.body.contents);
    res.status(200).json({ text: flow });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
