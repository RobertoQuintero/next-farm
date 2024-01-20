'use client'
import { IPig, IPigType, IRace, IStage, IUbication } from '@/interfaces'
import { IFarm } from '@/interfaces/farm'
import { IJobPosition, IRole, IUser } from '@/interfaces/user'
import { createContext } from 'react'

interface ContextProps{
  farms:IFarm[]
  farm:IFarm | undefined
  farmsLoading:boolean;
  farmsError:string | undefined;
  ubications:IUbication[];
  stages:IStage[];
  pigTypes:IPigType[];
  races:IRace[];
  pigs:IPig[];
  pig:IPig | undefined;
  idFarm: number | undefined;

  //methods
  setFarm: (payload: IFarm | undefined) => void;
  setError: (payload: string | undefined) => void;
  postFarm: (payload: IFarm) => Promise<boolean>;
  postPig: (payload: IPig) => Promise<boolean>
}

export const FarmsContext = createContext({} as ContextProps)