import React, { useState } from 'react';
import { generateContentPillars } from '../services/geminiService';
import { ContentPillar } from '../types';
import { PillarsIcon, SparklesIcon } from './IconComponents';

const PillarCard: React.FC<{ pillar: ContentPillar, index: number }> = ({ pillar, index }) => (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-white/10 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`}}>
        <h3 className="text-xl font-bold font-title text-secondary mb-2">{pillar.title}</h3>
        <p className="text-muted mb-4">{pillar.description}</p>
        <div>
            <h4 className="font-semibold text-white mb-2">Ideas de Ejemplo:</h4>
            <ul className="list-disc list-inside text-muted/80 space-y-1">
                {pillar.exampleIdeas.map((idea, i) => (
                    <li key={i}>{idea}</li>
                ))}
            </ul>
        </div>
    </div>
);


const PillarsGenerator: React.FC = () => {
    const [artistInfo, setArtistInfo] = useState('');
    const [pillars, setPillars] = useState<ContentPillar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!artistInfo) {
            setError('Describe brevemente al artista para generar los pilares.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setPillars([]);
        try {
            const result = await generateContentPillars(artistInfo);
            setPillars(result);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center">
                <PillarsIcon className="h-12 w-12 mx-auto text-pink-500" />
                <h2 className="text-2xl sm:text-3xl font-black font-title mt-4">Generador de Pilares de Contenido</h2>
                <p className="text-muted mt-2 mb-8">Define la estrategia de contenido central de Kannawey con ayuda de la IA.</p>
                
                <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl shadow-lg border border-white/10 flex flex-col items-center gap-4">
                    <textarea
                        value={artistInfo}
                        onChange={(e) => setArtistInfo(e.target.value)}
                        placeholder="Describe la esencia de Kannawey: sus influencias, su mensaje, su conexión con Venezuela..."
                        className="w-full h-24 bg-background border border-pink-500/50 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:ring-2 focus:ring-secondary focus:outline-none transition"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full md:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : <SparklesIcon className="h-5 w-5"/>}
                        <span>{isLoading ? 'Definiendo...' : 'Definir Pilares'}</span>
                    </button>
                </form>

                {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>

            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {pillars.map((pillar, index) => (
                    <PillarCard key={index} pillar={pillar} index={index} />
                ))}
            </div>
        </div>
    );
};

export default PillarsGenerator;