export interface ShortUrlResponse {
  shortUrl: string;
}

export interface ErrorResponse {
  error: string;
}

export interface InfoResponse {
  id?: number;
  targeturl: string;
  createdAt?: Date;
  totalFollow: number;
}

export interface DeleteResponse {
  result: 'OK' | 'ERROR';
  message?: string;
}

export interface AnalyticsResponse {
  totalFollow: number;
  analytics: Array<{
    id: number;
    ip: string;
    timestamp: Date;
  }>;
}

export interface ShortLink {
  id: number;
  targeturl: string; 
  expiresat?: Date;
  createdat?: Date;
}

export interface Follow {
  createdat: Date;
  ip: string;
}