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

  //methods
  setUser: (payload: IUser | undefined) => void;
  getJobPositions: (id: number) => Promise<void>;
}

export const UsersContext = createContext({} as ContextProps)