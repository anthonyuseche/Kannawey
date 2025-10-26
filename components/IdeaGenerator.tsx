import React, { useState } from 'react';
import { generateViralIdeas } from '../services/geminiService';
import { ViralIdea } from '../types';
import { SparklesIcon } from './IconComponents';

const IdeaCard: React.FC<{ idea: ViralIdea, index: number }> = ({ idea, index }) => (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-white/10 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`}}>
        <h3 className="text-xl font-bold font-title text-secondary">{idea.title}</h3>
        <p className="text-sm font-semibold text-white/80 mb-2">{idea.platform}</p>
        <p className="text-muted mb-4">{idea.concept}</p>
        <div className="flex flex-wrap gap-2">
            {idea.hashtags.map((tag, i) => (
                <span key={i} className="bg-pink-500/30 text-secondary/80 text-xs font-mono px-2 py-1 rounded">
                    #{tag}
                </span>
            ))}
        </div>
    </div>
);

const IdeaGenerator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('TikTok');
    const [ideas, setIdeas] = useState<ViralIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            setError('Por favor, introduce un tema o idea.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setIdeas([]);
        try {
            const result = await generateViralIdeas(topic, platform, 3);
            setIdeas(result);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center">
                <SparklesIcon className="h-12 w-12 mx-auto text-pink-500" />
                <h2 className="text-3xl font-black font-title mt-4">Generador de Ideas Virales</h2>
                <p className="text-muted mt-2 mb-8">Usa la IA para crear la próxima tendencia viral de Kannawey.</p>
                
                <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl shadow-lg border border-white/10 flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ej: 'Un día en mi vida', 'tutorial de synth de los 80'"
                        className="w-full bg-background border border-pink-500/50 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:ring-2 focus:ring-secondary focus:outline-none transition"
                    />
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full md:w-auto bg-background border border-pink-500/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:outline-none transition"
                    >
                        <option>TikTok</option>
                        <option>Instagram Reels</option>
                        <option>YouTube Shorts</option>
                    </select>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full md:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : <SparklesIcon className="h-5 w-5"/>}
                        <span>{isLoading ? 'Generando...' : 'Generar Ideas'}</span>
                    </button>
                </form>

                {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>

            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 gap-6">
                {ideas.map((idea, index) => (
                    <IdeaCard key={index} idea={idea} index={index} />
                ))}
            </div>
        </div>
    );
};

export default IdeaGenerator;