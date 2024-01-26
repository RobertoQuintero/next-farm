'use client'
import { ICompany, IState } from '@/interfaces';
import { IUser, IUserAccess } from '@/interfaces/user';
import { createContext } from 'react'

interface ContextProps{
  authLoading: boolean;
  logged: boolean;
  authError:string | undefined;
  showForm: boolean;
  states:IState[];
  user:IUser | undefined;
  idFarm: number | undefined;
  userAccess:IUserAccess[]
  accessError:string | undefined;

  logout: () => void;
  setShowForm:(payload:boolean)=>void;
  login: (payload: IUser) => Promise<boolean>;
  postUser: (payload: IUser) => Promise<boolean>;
  setIdFarm: (payload: number | undefined) =>void;
  checkToken: () => Promise<void>;
  setAccessError: (payload: string | undefined) => void;
}

export const AuthContext = createContext({} as ContextProps)