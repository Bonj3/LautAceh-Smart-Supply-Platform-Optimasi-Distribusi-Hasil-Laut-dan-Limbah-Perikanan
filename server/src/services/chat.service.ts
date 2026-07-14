import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn('GEMINI_API_KEY is not set in environment variables. Chatbot will return mock responses.');
}

const SYSTEM_INSTRUCTION = `Anda adalah asisten virtual (chatbot) untuk UTU Web.
Anda bertugas membantu pengguna yang ingin mengetahui informasi terkait laut, nelayan, ikan, marketplace laut, dan ekosistem UTU.
Berbicaralah dengan ramah, profesional, dan menggunakan bahasa Indonesia yang baik dan benar.`;

export const generateChatResponse = async (message: string, history: any[]): Promise<string> => {
  if (!ai) {
    return "Maaf, API Key Gemini belum dikonfigurasi. Ini adalah balasan mock (simulasi).";
  }

  try {
    // For simple stateless chat, we pass system instructions and history manually if needed
    // The new @google/genai SDK provides generateContent or chats
    
    // We will use generateContent for now, appending history to the prompt manually
    let prompt = SYSTEM_INSTRUCTION + "\\n\\n";
    
    if (history && history.length > 0) {
      prompt += "Konteks percakapan sebelumnya:\\n";
      history.forEach((msg) => {
        prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\\n`;
      });
      prompt += "\\n";
    }
    
    prompt += `User: ${message}\\nAssistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Maaf, saya tidak dapat menghasilkan respons saat ini.";
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error('Gagal menghubungi layanan AI');
  }
};
