'use client'
import { IBirth, IBirthType, IComment, ILoss, ILossReason, IPig, IPigStage, IPigTask, IPigType, IPigWeight, IPiglets, IProduct, IQuantity, IRace, IStageTaskType, IStallion, IStaticPig, ITask, ITaskType, IUbication, IfertilizationType } from '@/interfaces'
import { IFarm } from '@/interfaces/farm'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
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
  pigTypes:IPigType[];
  races:IRace[];
  race:IRace | undefined;
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
  births:IBirth[];
  birth:IBirth | undefined;
  code: string | undefined;
  piggletCode: string | undefined;
  weightTypes:IPigWeight[];
  birthTypes:IBirthType[]
  piglets:IPiglets[]
  piglet:IPiglets | undefined;

  pigStages:IPigStage[];
  pigTasks:IPigTask[];
  pigTask:IPigTask | undefined;
  stageTaskTypes:IStageTaskType[];  
  growing_pigs:IGrowingPigs[]
  growing_pig:IGrowingPigs | undefined;
  statics_quantities:IQuantity[]
  staticPigs:IStaticPig[]
  staticPiglets:IStaticPig[]
  staticGrowingPigs:IStaticPig[];
  products:IProduct[];
  product:IProduct | undefined;
  comments:IComment[];
  comment:IComment | undefined;
  losses:ILoss[]
  loss:ILoss | undefined;

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
  postTask: (payload: IPigTask) => Promise<boolean>;
  setLossReason: (payload: ILossReason | undefined) => void;
  postLossReason: (payload: ILossReason) => Promise<boolean>;
  setStallion: (payload: IStallion | undefined) => void;
  postStallion: (payload: IStallion) => Promise<boolean>;
  setRace: (payload: IRace | undefined) => void;
  postRace: (payload: IRace) => Promise<boolean>;
  postCrossingDate: (payload: {id_stallion: number;crossing_date: string;id_pig: number;id_user: number;id_fertilization_type:number}) => Promise<boolean>;
  getBirths: (payload: number) => Promise<void>;
  getCode: (payload:string) => Promise<void>;
  setPigTask: (payload: IPigTask | undefined) => void;
  getTasks: (id: number,pig:string) => Promise<void>;
  updateTasks: (payload: ITask) => Promise<boolean>;
  setBirth: (payload: IBirth | undefined) => void;
  postBirth: (payload: IBirth) => Promise<boolean>;
  createTasksToDo: (payload: {id_pig: number;id_pig_stage: number;id_user: number;id_lot_piglets:number}) => Promise<void>;
  postPiglets: (payload: IPiglets) => Promise<boolean>;
  postNewPiglets: (payload: IPiglets) => Promise<boolean | number>;
  setPiglet: (payload: IPiglets | undefined) => void;
  updateBirth: (payload: IPiglets) => Promise<void>;
  movePiglets: (payload: IPiglets) => Promise<boolean>;
  setGrowingPigs: (payload: IGrowingPigs[]) => void;
  setGrowingPig: (payload: IGrowingPigs | undefined) => void;
  postGrowingPigs: (payload: IGrowingPigs) => Promise<boolean>;
  getGrowingPigs: (payload: number) => Promise<void>;
  getPiglets: (payload: number) => Promise<boolean>;
  setPiglets: (payload: IPiglets[]) => void;
  getAllTasks: ({ startDate, endDate }: {startDate: string;endDate: string}) => Promise<void>
  getQuantities: (payload: number) => Promise<void>;
  getStaticPigs: (payload: number) => Promise<void>;
  getStaticPiglets: (payload: number) => Promise<void>;
  getStaticGrowingPigs: (payload: number) => Promise<void>;
  setProduct: (payload: IProduct | undefined) => void;
  getProducts: (payload: number) => Promise<void>;
  postProduct: (payload: IProduct) => Promise<boolean>;
  getComments: (payload: number) => Promise<boolean>;
  setComment: (payload: IComment | undefined) => void;
  postComments: (payload: IComment) => Promise<boolean>;
  setLoss: (payload: ILoss | undefined) => void;
  getLosses: (payload: ILoss) => Promise<boolean>;
  postLosses: (payload: ILoss) => Promise<boolean>
}

export const FarmsContext = createContext({} as ContextProps)