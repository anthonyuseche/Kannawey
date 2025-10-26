
export enum SocialPlatform {
  TikTok = "TikTok",
  Instagram = "Instagram",
  YouTube = "YouTube",
  Twitter = "Twitter",
  Spotify = "Spotify",
  Facebook = "Facebook",
}

export enum ContentType {
  Video = "Video",
  Reel = "Reel",
  Music = "Música",
  Image = "Imagen",
  UGC = "Campaña UGC",
}

export interface ContentItem {
  id: number;
  title: string;
  type: ContentType;
  platform: SocialPlatform;
  scheduledDate: Date;
  status: "Planificado" | "En Progreso" | "Publicado";
}

export enum FanRequestStatus {
  Pending = "Pendiente",
  InProgress = "En Progreso",
  Completed = "Completado",
}

export interface FanRequest {
  id: number;
  request: string;
  fanName: string;
  platform: SocialPlatform;
  status: FanRequestStatus;
  date: Date;
}

export interface ViralIdea {
  title: string;
  concept: string;
  platform: string;
  hashtags: string[];
}

export interface KanbanTask {
  id: string;
  content: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ContentPillar {
    title: string;
    description: string;
    exampleIdeas: string[];
}
