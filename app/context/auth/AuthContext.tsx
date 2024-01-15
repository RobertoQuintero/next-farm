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

  logout: () => void;
  setShowForm:(payload:boolean)=>void;
  postCompany: (payload: ICompany) => Promise<boolean>;
  loginCompany: (payload: ICompany) => Promise<boolean>;
  loginUser: (payload: IUser) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps)