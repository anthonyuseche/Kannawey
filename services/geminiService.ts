// ¡LA CORRECCIÓN ESTÁ AQUÍ! "gemai" con "M"
import { GoogleGenAI, Type } from "@google/gemai"; 
import { ViralIdea, ContentPillar } from '../types';

// Vite usa 'import.meta.env' y el prefijo 'VITE_'
const API_KEY = import.meta.env.VITE_API_KEY;

let ai: GoogleGenAI | null = null;

// Solo inicializamos la IA si la API Key existe
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("ADVERTENCIA: La variable VITE_API_KEY no está configurada. Las funciones de IA no funcionarán.");
}

// (Tus Schemas - Los pego de nuevo por si acaso)
const ideaSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "Un título corto y pegadizo para la pieza de contenido.",
        },
        concept: {
            type: Type.STRING,
            description: "Un concepto detallado, paso a paso, para el video o post. Debe ser fácil de entender y ejecutar.",
        },
        platform: {
            type: Type.STRING,
            description: "La plataforma de redes sociales objetivo (ej. TikTok, Instagram Reels, YouTube Shorts).",
        },
        hashtags: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
            description: "Un array de hashtags relevantes y en tendencia, incluyendo uno único para la campaña.",
        },
    },
    required: ["title", "concept", "platform", "hashtags"],
};
const pillarSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "El título del pilar de contenido (ej. 'Nostalgia Venezolana', 'Detrás de la Música').",
        },
        description: {
            type: Type.STRING,
            description: "Una descripción de lo que trata este pilar y por qué conecta con la audiencia.",
        },
        exampleIdeas: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
            description: "Un array de 3 ideas de contenido concretas que ejemplifiquen este pilar.",
        },
    },
     required: ["title", "description", "exampleIdeas"],
};

// --- Exportaciones a prueba de balas ---

export const generateViralIdeas = async (topic: string, platform: string, count: number): Promise<ViralIdea[]> => {
    // Si 'ai' es null (porque no hay clave), no te estrelles.
    if (!ai) {
        console.error("Error: generateViralIdeas no puede ejecutarse porque VITE_API_KEY no está configurada.");
        return []; // Devuelve un array vacío
    }

    try {
        const prompt = `Actúa como un experto en marketing viral... (tu prompt)...`; // Tu prompt va aquí
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // (Asegúrate que el nombre del modelo esté bien)
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.OBJECT, properties: { ideas: { type: Type.ARRAY, items: ideaSchema } } }
            },
        });
        
        const responseText = response.text.trim();
        const parsedJson = JSON.parse(responseText);
        return parsedJson.ideas as ViralIdea[];

    } catch (error) {
        console.error("Error generando ideas virales:", error);
        return []; // Devuelve un array vacío si la API falla
    }
};

export const generateContentPillars = async (artistInfo: string): Promise<ContentPillar[]> => {
    // Si 'ai' es null (porque no hay clave), no te estrelles.
    if (!ai) {
        console.error("Error: generateContentPillars no puede ejecutarse porque VITE_API_KEY no está configurada.");
        return []; // Devuelve un array vacío
    }

    try {
        const prompt = `Eres un estratega de marca... (tu prompt)...`; // Tu prompt va aquí
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.OBJECT, properties: { pillars: { type: Type.ARRAY, items: pillarSchema } } }
            },
        });
        
        const responseText = response.text.trim();
        const parsedJson = JSON.parse(responseText);
        return parsedJson.pillars as ContentPillar[];

    } catch (error) {
        console.error("Error generando pilares de contenido:", error);
        return []; // Devuelve un array vacío si la API falla
    }
};
