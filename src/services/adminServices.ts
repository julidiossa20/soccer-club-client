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
  team?: ITeam;
}

export interface ILeague {
  id: number;
  name: string;
  country: string;
  category: string;
  logo?: string;
}

export interface ISeason {
  id: number;
  name: string;
  year: string;
  startDate?: string;
  endDate?: string;
  status: 'active' | 'upcoming' | 'finished';
  league?: ILeague;
  leagueId?: number;
}


export interface ITeam {
  id: number;
  name: string;
  city: string;
  manager: string;
  points: number;
  logo?: string;
  season?: ISeason;
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
export const seasonService = new BaseService<ISeason>('/season');


export const adminConfigService = {
  getCatalogs: () => HttpClient.get<{ leagues: ILeague[]; teams: ITeam[]; seasons: ISeason[] }>('/api/v1/admin/catalogs'),
};

