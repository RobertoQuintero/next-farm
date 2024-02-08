'use client'
import  {  useContext, useEffect, useReducer} from 'react'
import { FarmsContext} from './FarmsContext'
import {  usersReducer } from './farmsReducer'
import { IFarm } from '@/interfaces/farm'
import { getFarmsRequest, postFarmsRequest } from './farmsRequest'
import { returnArray } from '../auth/authRequest'
import { IUbication, IStage, IPigType, IRace, IPig, IAccess, IRole, IRoleAccess, ITask, ITaskType, ILossReason, IfertilizationType, IStallion } from '@/interfaces'
import { AuthContext } from '../auth/AuthContext'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface UsersState{
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
  roles:IRole[];
  role:IRole | undefined;
  accessArr:IAccess[];
  access:IAccess | undefined;
  roleAccess:IRoleAccess|undefined;
  rolesAccess:IRoleAccess[];
  taskTypes:ITaskType[];
  stage:IStage | undefined;
  lossReasons:ILossReason[];
  lossReason:ILossReason | undefined;
  fertilizatinTypes:IfertilizationType[];
  stallions:IStallion[];
  stallion:IStallion | undefined;
}

const UI_INITIAL_STATE:UsersState={
  farms:[],
  farm: undefined,
  farmsLoading:false,
  farmsError:undefined,
  ubications:[],
  ubication: undefined,
  tasks:[],
  task:undefined,
  stages:[],
  pigTypes:[],
  races:[],
  pigs:[],
  pig:undefined,
  idFarm: undefined,
  farmAction:undefined,
  roles:[],
  role: undefined,
  accessArr:[],
  access: undefined,
  roleAccess:undefined,
  rolesAccess:[],
  taskTypes:[],
  stage:undefined,
  lossReasons:[],
  lossReason: undefined,
  fertilizatinTypes:[],
  stallions:[],
  stallion:undefined
}

export const FarmsProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(usersReducer, UI_INITIAL_STATE)
  const {logged,user,userAccess,setAccessError,idFarm,setIdFarm} = useContext(AuthContext)
  const router= useRouter()
  
  useEffect(() => {
   if(logged){
      if(!user?.is_active){
         router.replace('/')
      }else{
         if(!idFarm){
            setIdFarm(+Cookies.get('id_farm')!)
         }else{
            getResources(idFarm!)
            setAccessError(undefined)
            getUbications()
            getTasks()
         }
      }
   }
  }, [logged,idFarm])
 
  const getResources = async(idFarm:number) =>{
    setIsLoading(true)
     Promise.all([
      getFarmsRequest('/farms/catalog/pig_types'),
      getFarmsRequest('/farms/catalog/races'),
      getFarmsRequest(`/farms/catalog/stages?id_farm=${idFarm}`),
      getFarmsRequest('/users/roles'),
      getFarmsRequest('/users/access'),
      getFarmsRequest(`/farms/catalog/task_types?id_farm=${idFarm}`),
      getFarmsRequest(`/farms/catalog/loss_reasons?id_farm=${idFarm}`),
      getFarmsRequest(`/farms/catalog/fertilization_types`),
      getFarmsRequest(`/farms/stallions?id_farm=${idFarm}`),
     ]).then((resp)=>{
      setPigTypes(resp[0].data as IPigType[])
      setRaces(resp[1].data as IRace[])
      setStages(resp[2].data as IStage[])
      setRoles(resp[3].data as IRole[])
      setAccessArr(resp[4].data as IAccess[])
      setTaskTypes(resp[5].data as ITaskType[])
      setLossReasons(resp[6].data as ILossReason[])
      setFertilizationTypes(resp[7].data as IfertilizationType[])
      setStallions(resp[8].data as IStallion[])
      setIsLoading(false)
     })
     .catch(error=>{
      console.log({error})
      setError('Error al cargar datos, refrescar la página')
      setIsLoading(false)
     })
  };

  const getPigs = async(payload:number) =>{
   setAccessError(undefined)
   if(!userAccess.find(u=>u.id_access===4)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/farms/pigs?idFarm=${payload}`,setPigs)
    };

    const getFarm = async(payload:number) =>{
        setIsLoading(true)
         const {ok,data}=await getFarmsRequest(`/farms/${payload}`)
         if(ok){
            const farm=data as IFarm[]
            setFarm(farm[0])
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
      };

  const getFarms = async(payload:number) =>await getPostLoadingOrError(`/farms?id_user=${payload}`,setFarms)

  const getRolesAccess = async(payload:number) =>{
   if(!userAccess.find(u=>u.id_access===7)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/users/role_access?id_role=${payload}&id_farm=${idFarm}`,setRolesAccess)
    };

  const getUbications = async() =>{
   if(!userAccess.find(u=>u.id_access===9)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/farms/catalog/ubications?id_farm=${idFarm}`,setUbications)
    };

  const getTasks = async() =>{
   if(!userAccess.find(u=>u.id_access===11)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/farms/catalog/tasks?id_farm=${idFarm}`,setTasks)
    };

  const postFarm = async(payload:IFarm):Promise<boolean> =>
  await getPostLoadingOrError('/farms',setFarms,payload,state.farms,'id_farm',true)

  const postPig = async(payload:IPig):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===5)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
    return await getPostLoadingOrError('/farms/pigs',setPigs,payload,state.pigs,'id_pig',true)
  };

  const postRoleAccess = async(payload:IRoleAccess):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===8)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/users/role_access',setRolesAccess,payload,state.rolesAccess,'id_role_access',true)
  };
  const postUbication = async(payload:IUbication):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===10)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/ubications',setUbications,payload,state.ubications,'id_ubication',true)
  };

  const postTask = async(payload:ITask):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===12)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/tasks',setTasks,payload,state.tasks,'id_task',true)
  };

  const postStage = async(payload:IStage):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===13)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/stages',setStages,payload,state.stages,'id_stage',true)
  };

  const postLossReason = async(payload:ILossReason):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===14)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/loss_reasons',setLossReasons,payload,state.lossReasons,'id_loss_reason',true)
  };

  const postStallion = async(payload:IStallion):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===15)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/stallions',setStallions,payload,state.stallions,'id_stallion',true)
  };


  const setFarms = (payload:IFarm[]) =>{
     dispatch({
      type:'[Farms] - setFarms',
      payload
     })
  };

  const setFarm = (payload:IFarm | undefined) =>{
     dispatch({
      type:'[Farms] - setFarm',
      payload
     })
  };

  const setIsLoading = (payload:boolean) =>{
     dispatch({
      type:'[Farms] - setIsLoading',
      payload
     })
  };

  const setError = (payload:string | undefined) =>{
     dispatch({
      type:'[Farms] - setError',
      payload
     })
  };
  const setUbications = (payload:IUbication[]) =>{
     dispatch({
      type:'[Farms] - setUbications',
      payload
     })
  };
  const setStages = (payload:IStage[]) =>{
     dispatch({
      type:'[Farms] - setStages',
      payload
     })
  };

  const setPigTypes = (payload:IPigType[]) =>{
     dispatch({
      type:'[Farms] - setPigTypes',
      payload
     })
  };

  const setRaces = (payload:IRace[]) =>{
     dispatch({
      type:'[Farms] - setRaces',
      payload
     })
  };

  const setPigs = (payload:IPig[]) =>{
     dispatch({
      type:'[Farms] - setPigs',
      payload
     })
  };
  const setPig = (payload:IPig | undefined) =>{
     dispatch({
      type:'[Farms] - setPig',
      payload
     })
  };

  const setFarmAction = (payload:string | undefined) =>{
     dispatch({
      type:'[Farms] - setFarmAction',
      payload
     })
  };

  const setRole = (payload:IRole | undefined) =>{
     dispatch({
      type:'[Farms] - setRole',
      payload
     })
  };
  const setRoles = (payload:IRole[] ) =>{
     dispatch({
      type:'[Farms] - setRoles',
      payload
     })
  };

  const setAccessArr = (payload:IAccess[] ) =>{
     dispatch({
      type:'[Farms] - setAccessArr',
      payload
     })
  };

  const setRoleAccess = (payload:IRoleAccess | undefined ) =>{
     dispatch({
      type:'[Farms] - setRoleAccess',
      payload
     })
  };
  const setRolesAccess = (payload:IRoleAccess[] ) =>{
     dispatch({
      type:'[Farms] - setRolesAccess',
      payload
     })
  };

  const setUbication = (payload:IUbication| undefined ) =>{
     dispatch({
      type:'[Farms] - setUbication',
      payload
     })
  };

  const setTask = (payload:ITask| undefined ) =>{
     dispatch({
      type:'[Farms] - setTask',
      payload
     })
  };

  const setTasks = (payload:ITask[] ) =>{
     dispatch({
      type:'[Farms] - setTasks',
      payload
     })
  };

  const setTaskTypes = (payload:ITaskType[] ) =>{
     dispatch({
      type:'[Farms] - setTaskTypes',
      payload
     })
  };
  const setStage = (payload:IStage | undefined ) =>{
     dispatch({
      type:'[Farms] - setStage',
      payload
     })
  };

  const setLossReason = (payload:ILossReason | undefined ) =>{
     dispatch({
      type:'[Farms] - setLossReason',
      payload
     })
  };

  const setLossReasons = (payload:ILossReason[] ) =>{
     dispatch({
      type:'[Farms] - setLossReasons',
      payload
     })
  };
  const setFertilizationTypes = (payload:IfertilizationType[] ) =>{
     dispatch({
      type:'[Farms] - setFertilizationTypes',
      payload
     })
  };
  const setStallions = (payload:IStallion[] ) =>{
     dispatch({
      type:'[Farms] - setStallions',
      payload
     })
  };
  const setStallion = (payload:IStallion | undefined ) =>{
     dispatch({
      type:'[Farms] - setStallion',
      payload
     })
  };


  const getPostLoadingOrError = async<T,K extends keyof T>(
      endpoint:string,setState:(payload: T[]) => void,payload?:T,state?:T[],id?:K,wich?:boolean
   ) =>{
   setError(undefined)
   setIsLoading(true)
   const {ok,data}= wich ? await  postFarmsRequest(endpoint,payload): await getFarmsRequest(endpoint)
   if(ok){
      wich
         ?setState(returnArray(payload as object,data as object,state as object[],id as never) as T[])
         :setState(data as T[])
   }
   else{
    setError(data as string)
   }
   setIsLoading(false)
   return ok
 };

  return (
    <FarmsContext.Provider value={{
      ...state,

      setFarm,
      postFarm,
      setError,
      postPig,
      setPig,
      getPigs,
      setFarmAction,
      setRole,
      postRoleAccess,
      getRolesAccess,
      setRoleAccess,
      getFarms,
      getFarm,
      getUbications,
      setUbication,
      postUbication,
      setTask,
      postTask,
      setStage,
      postStage,
      setLossReason,
      postLossReason,
      setStallion,
      postStallion
    }}>
      {children}
    </FarmsContext.Provider>
  )
}