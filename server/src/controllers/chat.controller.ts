import { Request, Response } from 'express';
import { generateChatResponse } from '../services/chat.service';

export const chatController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const reply = await generateChatResponse(message, history || []);

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while processing your request' });
  }
};
