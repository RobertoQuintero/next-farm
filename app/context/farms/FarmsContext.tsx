'use client'
import { IFarm } from '@/interfaces/farm'
import { IJobPosition, IRole, IUser } from '@/interfaces/user'
import { createContext } from 'react'

interface ContextProps{
  farms:IFarm[]
  farm:IFarm | undefined
  farmsLoading:boolean;
  farmsError:string | undefined;

  //methods
  setFarm: (payload: IFarm | undefined) => void;
  setError: (payload: string | undefined) => void;
  postFarm: (payload: IFarm) => Promise<boolean>
}

export const FarmsContext = createContext({} as ContextProps)