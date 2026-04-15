import { BaseService } from './baseService';
import { HttpClient } from './http-client';

export interface IPlayer {
  id: number;
  name: string;
  position: 'DEL' | 'MED' | 'DEF' | 'POR';
  number: number;
  age: number;
  photo?: string;
  teamId?: number;
}

export interface ILeague {
  id: number;
  name: string;
  country: string;
  category: string;
  logo: string;
}

export interface ITeam {
  id: number;
  name: string;
  city: string;
  manager: string;
  points: number;
  logo?: string;
}

export interface ISponsor {
  id: number;
  name: string;
  category: string;
  website: string;
  contractValue: number;
  status: 'active' | 'expired';
}

export interface INews {
  id: number;
  title: string;
  content: string;
  image?: string;
  publishedAt: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const playerService = new BaseService<IPlayer>('/player');
export const leagueService = new BaseService<ILeague>('/league');
export const teamService = new BaseService<ITeam>('/team');
export const sponsorService = new BaseService<ISponsor>('/sponsor');
export const newsService = new BaseService<INews>('/news');
export const userService = new BaseService<IUser>('/user');
export const matchService = new BaseService<any>('/match');
export const seasonService = new BaseService<any>('/season');

export const adminConfigService = {
  getCatalogs: () => HttpClient.get<{ leagues: any[], teams: any[], seasons: any[] }>('/api/v1/admin/catalogs')
};
