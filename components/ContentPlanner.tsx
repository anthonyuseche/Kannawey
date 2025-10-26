import React, { useState } from 'react';
import { MOCK_CONTENT_SCHEDULE } from '../constants';
import { ContentItem, ContentType, SocialPlatform } from '../types';
import { TrashIcon, EditIcon } from './IconComponents';

const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long' });
}

const ContentCard: React.FC<{ item: ContentItem; onDelete: (id: number) => void; onEdit: (item: ContentItem) => void; }> = ({ item, onDelete, onEdit }) => {
    const platformColors: { [key: string]: string } = {
        Instagram: 'from-pink-500 to-purple-600',
        TikTok: 'from-secondary to-blue-500',
        YouTube: 'from-red-500 to-red-600',
        Spotify: 'from-green-400 to-green-600',
        Facebook: 'from-blue-600 to-blue-700',
    };

    return (
        <div 
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', item.id.toString());
            }}
            className="bg-surface p-4 rounded-lg shadow-md border border-white/10 mb-4 animate-slide-in-up relative pl-6 group cursor-grab active:cursor-grabbing"
        >
            <div className={`absolute top-0 left-0 h-full w-1.5 rounded-l-lg bg-gradient-to-b ${platformColors[item.platform] || 'from-gray-500 to-gray-600'}`}></div>
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => onEdit(item)} className="p-1 rounded-full bg-blue-500/20 text-blue-300">
                    <EditIcon className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(item.id)} className="p-1 rounded-full bg-red-500/20 text-red-400">
                    <TrashIcon className="h-4 w-4" />
                </button>
            </div>
            <h4 className="font-bold text-white">{item.title}</h4>
            <p className="text-sm text-muted">{item.type} en {item.platform}</p>
            <div className="mt-2 flex justify-between items-center">
                <span className="text-xs font-mono text-secondary">{item.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Publicado' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{item.status}</span>
            </div>
        </div>
    );
};

const ContentPlanner: React.FC = () => {
    const [schedule, setSchedule] = useState<ContentItem[]>(MOCK_CONTENT_SCHEDULE);
    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

    const [newItem, setNewItem] = useState({
        title: '',
        type: ContentType.Reel,
        platform: SocialPlatform.Instagram,
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
    });
    
    const showForm = !!editingItem;
    const setShowForm = (show: boolean) => {
        if (!show) setEditingItem(null);
    };

    const handleEditClick = (item: ContentItem) => {
        setEditingItem(item);
        setNewItem({
            title: item.title,
            type: item.type,
            platform: item.platform,
            date: item.scheduledDate.toISOString().split('T')[0],
            time: item.scheduledDate.toTimeString().split(' ')[0].substring(0,5),
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, type, platform, date, time } = newItem;
        if (!title || !date || !time) return;

        const [year, month, day] = date.split('-').map(Number);
        const [hour, minute] = time.split(':').map(Number);
        const scheduledDate = new Date(year, month - 1, day, hour, minute);

        if (editingItem) {
             // Update existing item
            setSchedule(prev => prev.map(item => item.id === editingItem.id ? {...item, title, type: type as ContentType, platform: platform as SocialPlatform, scheduledDate} : item)
                .sort((a,b) => a.scheduledDate.getTime() - b.scheduledDate.getTime()));
        } else {
            // Add new item
            const newContentItem: ContentItem = {
                id: Date.now(),
                title,
                type: type as ContentType,
                platform: platform as SocialPlatform,
                scheduledDate,
                status: "Planificado",
            };
            setSchedule(prev => [...prev, newContentItem].sort((a,b) => a.scheduledDate.getTime() - b.scheduledDate.getTime()));
        }
        
        setNewItem({ title: '', type: ContentType.Reel, platform: SocialPlatform.Instagram, date: new Date().toISOString().split('T')[0], time: '18:00' });
        setEditingItem(null);
    };
    
    const handleDeleteItem = (id: number) => {
        setSchedule(prev => prev.filter(item => item.id !== id));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetDate: Date) => {
        e.preventDefault();
        const itemId = parseInt(e.dataTransfer.getData('text/plain'), 10);
        
        setSchedule(prev => {
            const itemToMove = prev.find(item => item.id === itemId);
            if (!itemToMove) return prev;
            
            const originalTime = itemToMove.scheduledDate;
            const newDate = new Date(targetDate);
            newDate.setHours(originalTime.getHours(), originalTime.getMinutes(), originalTime.getSeconds());

            return prev.map(item => item.id === itemId ? { ...item, scheduledDate: newDate } : item)
                .sort((a,b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
        });
    };

    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                 <h2 className="text-2xl sm:text-3xl font-black font-title text-center sm:text-left">Calendario Estratégico</h2>
                 <button onClick={() => setEditingItem({} as ContentItem)} className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    + Añadir Publicación
                 </button>
            </div>
           
            {showForm && (
                 <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
                     <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()} className="bg-surface p-6 rounded-xl shadow-lg border border-white/10 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                        <h3 className="md:col-span-2 text-xl font-bold font-title text-white">{editingItem?.id ? 'Editar Publicación' : 'Añadir Publicación'}</h3>
                        <input name="title" value={newItem.title} onChange={handleInputChange} placeholder="Título del contenido" className="md:col-span-2 w-full bg-background border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white placeholder-muted/50 focus:ring-2 focus:ring-secondary focus:outline-none transition" required />
                        <select name="type" value={newItem.type} onChange={handleInputChange} className="w-full bg-background border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-secondary focus:outline-none transition">
                            {Object.values(ContentType).map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                         <select name="platform" value={newItem.platform} onChange={handleInputChange} className="w-full bg-background border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-secondary focus:outline-none transition">
                            {Object.values(SocialPlatform).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <input type="date" name="date" value={newItem.date} onChange={handleInputChange} className="w-full bg-background border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white placeholder-muted/50 focus:ring-2 focus:ring-secondary focus:outline-none transition" />
                        <input type="time" name="time" value={newItem.time} onChange={handleInputChange} className="w-full bg-background border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white placeholder-muted/50 focus:ring-2 focus:ring-secondary focus:outline-none transition" />
                        <div className="md:col-span-2 flex justify-end gap-4">
                             <button type="button" onClick={() => setShowForm(false)} className="bg-muted/20 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-all duration-300">
                                Cancelar
                            </button>
                            <button type="submit" className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-all duration-300">
                                {editingItem?.id ? 'Guardar Cambios' : 'Planificar'}
                            </button>
                        </div>
                     </form>
                 </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {days.map(day => {
                    const itemsForDay = schedule.filter(
                        item => item.scheduledDate.toDateString() === day.toDateString()
                    );
                    return (
                        <div 
                            key={day.toISOString()} 
                            className="bg-surface/50 rounded-lg p-4 border border-white/10"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, day)}
                        >
                            <h3 className="font-bold font-title text-center text-secondary capitalize">{getDayOfWeek(day)}</h3>
                            <p className="text-xs text-muted text-center mb-4">{day.toLocaleDateString('es-ES')}</p>
                            <div className="min-h-[100px]">
                                {itemsForDay.length > 0 ? (
                                    itemsForDay.map(item => <ContentCard key={item.id} item={item} onDelete={handleDeleteItem} onEdit={handleEditClick} />)
                                ) : (
                                    <div className="text-sm text-center text-muted/50 pt-4 h-full flex items-center justify-center">No hay posts.</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContentPlanner;