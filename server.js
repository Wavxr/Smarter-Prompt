require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/enhance', async (req, res) => {
  try {
    const { prompt, mode, apiKey } = req.body;
    
    if (!prompt || !mode || !apiKey) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const modeInstructions = {
      informational: 'Optimize this prompt for clear, factual responses with accurate information.',
      creative: 'Enhance this prompt for creative storytelling and idea generation.',
      concise: 'Refine this prompt to get short, direct, and to-the-point answers.',
      persuasive: 'Adjust this prompt to elicit convincing arguments and persuasive content.'
    };

    const systemPrompt = `
      You are an expert prompt engineer. Your task is to enhance the following user prompt.
      ${modeInstructions[mode]}
      Make the prompt more effective while maintaining the original intent.
      Return only the enhanced prompt without explanations or additional text.
      
      Original prompt: ${prompt}
    `;

    const result = await model.generateContent(systemPrompt);
    const enhancedPrompt = result.response.text().trim();

    res.json({ enhancedPrompt });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to enhance prompt' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});