'use client'
import { ICompany, IState } from '@/interfaces';
import { createContext } from 'react'

interface ContextProps{
  authLoading: boolean;
  logged: boolean;
  company:ICompany | undefined;
  authError:string | undefined;
  showForm: boolean;
  states:IState[];

  logout: () => void;
  setShowForm:(payload:boolean)=>void;
  postCompany: (payload: ICompany) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps)