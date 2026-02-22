import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK if an API key is present
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export const agentController = {
  // POST /api/ai/chat
  chat: async (req: Request, res: Response) => {
    try {
      const { message, context } = req.body;
      
      console.log(`[AI Agent] Received query: "${message}" with context:`, context);
      
      let reply: string;

      if (!ai) {
        console.warn('[AI Agent] Returning fallback response. No GEMINI_API_KEY found.');
        reply = "I am the Nexa AI Agent. I'm operating in fallback mode because no API key is configured. Please add `GEMINI_API_KEY` to the `.env` file.";
      } else {
        const systemPrompt = "You are the Nexa AI Agent, an elite automated systems architect and real estate operations specialist. Assist the user with underwriting deals, analyzing commercial real estate documents, and project management. Be concise, professional, and confident.";
        
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemPrompt}\n\nUser Context: ${JSON.stringify(context || {})}\n\nUser Message: ${message}`
          });
          
          reply = response.text || "I was unable to formulate a response.";
        } catch (apiError) {
          console.error('[AI Agent] Gemini API call failed:', apiError);
          reply = "I encountered a neural network error while attempting to analyze your request. Please verify the API key and connection.";
        }
      }

      res.status(200).json({ 
        role: 'assistant',
        content: reply,
        metadata: {
          confidence: ai ? 0.95 : 0.0,
          provider: ai ? 'gemini-2.5-flash' : 'mocked'
        }
      });
    } catch (error) {
      console.error('[AgentController] Error executing AI query:', error);
      res.status(500).json({ error: 'Failed to process AI request.' });
    }
  }
};
