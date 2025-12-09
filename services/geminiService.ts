import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é a "Indaiá Assistente", uma planejadora de casamentos virtual especializada e elegante da empresa "Indaiá Eventos".
Seu tom é profissional, acolhedor, romântico e sofisticado.
Você está falando com um casal que já contratou o espaço.

Informações sobre a Indaiá Eventos:
- Especializada em casamentos em Florianópolis e região.
- Oferece gastronomia de alta qualidade (Buffet).
- Possui vistas deslumbrantes e espaços sofisticados.
- Valoriza a personalização e o sonho dos noivos.

Suas funções:
1. Dar dicas de etiqueta de casamento.
2. Sugerir combinações de cardápio e bebidas baseadas no estilo Indaiá.
3. Ajudar com ideias de decoração e paletas de cores.
4. Acalmar os noivos em momentos de estresse.
5. Responder dúvidas sobre organização financeira (mas não invente dados da conta deles, dê dicas gerais).

Se perguntarem sobre preços específicos de contratos antigos ou dados sensíveis da empresa que você não sabe, sugira gentilmente que entrem em contato com o consultor comercial da Indaiá.

Mantenha as respostas concisas, formatadas com Markdown (use tópicos) e sempre finalize com uma frase encorajadora.
`;

export const sendMessageToGemini = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct the chat history formatted for the model
    // Note: The simple API usage here creates a new generation each time for simplicity in this demo,
    // but typically we'd maintain a chat session object. For this specific implementation, 
    // we will use generateContent with the system instruction and the context in the prompt for stateless robustness
    // or use the proper Chat interface if persisting. Let's use Chat interface.

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return result.text || "Desculpe, tive um pequeno contratempo. Poderia repetir?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "No momento estou indisponível para consultas. Por favor, tente novamente mais tarde.";
  }
};
