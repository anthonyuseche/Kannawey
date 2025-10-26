
import { ContentItem, ContentType, FanRequest, FanRequestStatus, SocialPlatform, KanbanColumn, KanbanTask } from './types';

export const MOCK_ANALYTICS = {
  followerGrowth: [
    { name: 'Ene', Kannawey: 400 },
    { name: 'Feb', Kannawey: 650 },
    { name: 'Mar', Kannawey: 900 },
    { name: 'Abr', Kannawey: 1200 },
    { name: 'May', Kannawey: 1650 },
    { name: 'Jun', Kannawey: 2100 },
    { name: 'Jul', Kannawey: 2400 },
  ],
  engagementByPlatform: [
    { name: 'Facebook', engagement: 1700 },
    { name: 'TikTok', engagement: 2500 },
    { name: 'Instagram', engagement: 1200 },
    { name: 'YouTube', engagement: 50 },
  ],
  contentTypeDistribution: [
    { name: 'Reels', value: 45 },
    { name: 'Música', value: 25 },
    { name: 'UGC', value: 20 },
    { name: 'Imágenes', value: 10 },
  ],
};

export const MOCK_CONTENT_SCHEDULE: ContentItem[] = [
  { id: 1, title: "Adelanto del nuevo single", type: ContentType.Reel, platform: SocialPlatform.Instagram, scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), status: "Planificado" },
  { id: 2, title: "Detrás de cámaras en el estudio", type: ContentType.Video, platform: SocialPlatform.YouTube, scheduledDate: new Date(new Date().setDate(new Date().getDate() + 2)), status: "Planificado" },
  { id: 3, title: "#KannaweyChallenge", type: ContentType.UGC, platform: SocialPlatform.TikTok, scheduledDate: new Date(new Date().setDate(new Date().getDate() + 3)), status: "En Progreso" },
  { id: 4, title: "Lanzamiento 'Sueños de Neón'", type: ContentType.Music, platform: SocialPlatform.Spotify, scheduledDate: new Date(new Date().setDate(new Date().getDate() + 5)), status: "Planificado" },
];

export const MOCK_FAN_REQUESTS: FanRequest[] = [
    { id: 1, request: "Cover de 'Blinding Lights'", fanName: "Alex G.", platform: SocialPlatform.TikTok, status: FanRequestStatus.Completed, date: new Date('2023-10-15') },
    { id: 2, request: "Versión acústica de 'Cyber Sunset'", fanName: "Maria P.", platform: SocialPlatform.Instagram, status: FanRequestStatus.InProgress, date: new Date('2023-11-02') },
    { id: 3, request: "Colaboración con otro artista", fanName: "SynthWaveFan_88", platform: SocialPlatform.Twitter, status: FanRequestStatus.Pending, date: new Date('2023-11-05') },
];


export const MOCK_TASKS: { [key: string]: KanbanTask } = {
  'task-1': { id: 'task-1', content: 'Definir estrategia de lanzamiento para el single' },
  'task-2': { id: 'task-2', content: 'Grabar 5 TikToks con el nuevo audio' },
  'task-3': { id: 'task-3', content: 'Contactar a influencers venezolanos' },
  'task-4': { id: 'task-4', content: 'Diseñar la portada del single' },
  'task-5': { id: 'task-5', content: 'Editar el videoclip oficial' },
  'task-6': { id: 'task-6', content: 'Publicar adelanto en Instagram' },
};

export const MOCK_COLUMNS: { [key: string]: KanbanColumn } = {
  'column-1': {
    id: 'column-1',
    title: 'Por Hacer',
    taskIds: ['task-1', 'task-2', 'task-3'],
  },
  'column-2': {
    id: 'column-2',
    title: 'En Progreso',
    taskIds: ['task-4', 'task-5'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Hecho',
    taskIds: ['task-6'],
  },
};
