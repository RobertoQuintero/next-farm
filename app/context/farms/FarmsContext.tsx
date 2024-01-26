'use client'
import { IPig, IPigType, IRace, IStage, ITask, IUbication } from '@/interfaces'
import { IFarm } from '@/interfaces/farm'
import { IAccess,  IRole, IRoleAccess } from '@/interfaces/user'
import { createContext } from 'react'

interface ContextProps{
  farms:IFarm[]
  farm:IFarm | undefined
  farmsLoading:boolean;
  farmsError:string | undefined;
  ubications:IUbication[];
  ubication:IUbication | undefined;
  tasks:ITask[]
  task:ITask | undefined;
  stages:IStage[];
  pigTypes:IPigType[];
  races:IRace[];
  pigs:IPig[];
  pig:IPig | undefined;
  idFarm: number | undefined;
  farmAction:string | undefined;
  roles:IRole[]
  role:IRole | undefined;
  accessArr:IAccess[]
  access:IAccess | undefined
  roleAccess:IRoleAccess|undefined;
  rolesAccess:IRoleAccess[];
  

  //methods
  setFarm: (payload: IFarm | undefined) => void;
  setError: (payload: string | undefined) => void;
  postFarm: (payload: IFarm) => Promise<boolean>;
  postPig: (payload: IPig) => Promise<boolean>;
  setPig: (payload: IPig | undefined) => void;
  getPigs: (payload: number) => Promise<void>;
  setFarmAction: (payload: string | undefined) => void;
  setRole: (payload: IRole | undefined) => void;
  postRoleAccess: (payload: IRoleAccess) => Promise<boolean>;
  getRolesAccess: (payload: number) => Promise<void>;
  setRoleAccess: (payload: IRoleAccess | undefined) => void
}

export const FarmsContext = createContext({} as ContextProps)