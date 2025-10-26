
import { GoogleGenAI, Type } from "@google/genai";
import { ViralIdea, ContentPillar } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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


export const generateViralIdeas = async (topic: string, platform: string, count: number): Promise<ViralIdea[]> => {
    try {
        const prompt = `Actúa como un experto en marketing viral y estratega de redes sociales para un artista musical emergente llamado Kannawey. Su estilo es una mezcla de synth-pop y música electrónica moderna.
        Tu misión es conquistar el mercado venezolano (tanto dentro de Venezuela como la diáspora).
        Genera ${count} ideas de contenido viral, distintas e innovadoras, basadas en el siguiente tema: "${topic}".
        La plataforma objetivo es ${platform}. Las ideas deben ser altamente atractivas, compartibles, y adaptadas al algoritmo y la cultura venezolana.
        Enfócate en tácticas de marketing de guerrilla, crecimiento orgánico, y crear una fuerte conexión comunitaria con referencias culturales venezolanas. Evita ideas genéricas.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        ideas: {
                            type: Type.ARRAY,
                            items: ideaSchema,
                        }
                    }
                }
            },
        });
        
        const responseText = response.text.trim();
        const parsedJson = JSON.parse(responseText);
        return parsedJson.ideas as ViralIdea[];

    } catch (error) {
        console.error("Error generando ideas virales:", error);
        throw new Error("No se pudieron generar ideas desde la API de Gemini. Revisa la consola.");
    }
};


export const generateContentPillars = async (artistInfo: string): Promise<ContentPillar[]> => {
    try {
        const prompt = `Eres un estratega de marca para artistas musicales. Tu cliente es Kannawey, un músico con un estilo synth-pop y electrónico.
        El objetivo principal es penetrar el mercado venezolano y conectar profundamente con la diáspora y los que están en el país.
        Analiza esta información sobre el artista: "${artistInfo}".
        Basado en eso, define 4 pilares de contenido fundamentales para su marca. Cada pilar debe ser un tema o categoría de contenido recurrente que refuerce su identidad y conecte con la audiencia venezolana.
        Piensa en temas como sus raíces, el proceso creativo, la cultura pop venezolana de los 80s/90s, la vida del músico, etc.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        pillars: {
                            type: Type.ARRAY,
                            items: pillarSchema,
                        }
                    }
                }
            },
        });
        
        const responseText = response.text.trim();
        const parsedJson = JSON.parse(responseText);
        return parsedJson.pillars as ContentPillar[];

    } catch (error) {
        console.error("Error generando pilares de contenido:", error);
        throw new Error("No se pudieron generar los pilares desde la API de Gemini. Revisa la consola.");
    }
};
