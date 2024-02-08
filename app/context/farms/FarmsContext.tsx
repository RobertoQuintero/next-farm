'use client'
import { ILossReason, IPig, IPigType, IRace, IStage, IStallion, ITask, ITaskType, IUbication, IfertilizationType } from '@/interfaces'
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
  stage:IStage | undefined;
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
  taskTypes:ITaskType[]
  lossReasons:ILossReason[];
  lossReason:ILossReason | undefined;
  fertilizatinTypes:IfertilizationType[];
  stallions:IStallion[];
  stallion:IStallion | undefined;
  

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
  setRoleAccess: (payload: IRoleAccess | undefined) => void;
  getFarms: (payload: number) => Promise<boolean>;
  getFarm: (payload: number) => Promise<void>;
  getUbications: () => Promise<void>;
  setUbication: (payload: IUbication | undefined) => void;
  postUbication: (payload: IUbication) => Promise<boolean>;
  setTask: (payload: ITask | undefined) => void;
  postTask: (payload: ITask) => Promise<boolean>;
  setStage: (payload: IStage | undefined) => void;
  postStage: (payload: IStage) => Promise<boolean>;
  setLossReason: (payload: ILossReason | undefined) => void;
  postLossReason: (payload: ILossReason) => Promise<boolean>;
  setStallion: (payload: IStallion | undefined) => void;
  postStallion: (payload: IStallion) => Promise<boolean>;

}

export const FarmsContext = createContext({} as ContextProps)