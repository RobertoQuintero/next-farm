'use client'
import { ICompany, IState } from '@/interfaces';
import { IUser } from '@/interfaces/user';
import { createContext } from 'react'

interface ContextProps{
  authLoading: boolean;
  logged: boolean;
  company:ICompany | undefined;
  authError:string | undefined;
  showForm: boolean;
  states:IState[];
  companyUser:IUser | undefined;
  idCompany:number| undefined;
  user:IUser | undefined;
  idFarm: number | undefined;

  logout: () => void;
  setShowForm:(payload:boolean)=>void;
  postCompany: (payload: ICompany) => Promise<boolean>;
  // loginCompany: (payload: ICompany) => Promise<boolean>;
  login: (payload: IUser) => Promise<boolean>;
  postUser: (payload: IUser) => Promise<boolean>;
  setIdFarm: (payload: number | undefined) =>void;
}

export const AuthContext = createContext({} as ContextProps)