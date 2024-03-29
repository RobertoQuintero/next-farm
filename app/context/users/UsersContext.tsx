'use client'
import { IJobPosition, IRole, IUser } from '@/interfaces/user'
import { createContext } from 'react'

interface ContextProps{
  users:IUser[]
  user:IUser | undefined
  userLoading:boolean;
  userError:string | undefined;
  jobPositions:IJobPosition[]
  roles:IRole[];
  actionString:string | undefined;

  //methods
  setUser: (payload: IUser | undefined) => void;
  postUser: (payload: IUser) => Promise<boolean>;
  setAction: (payload: string | undefined) => void;
  setError: (payload: string | undefined) => void;
  getUsers: (payload: number) => Promise<void>
  postUserPassword: (payload: IUser) => Promise<boolean>
}

export const UsersContext = createContext({} as ContextProps)