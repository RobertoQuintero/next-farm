'use client'
import  {  useContext, useEffect, useReducer } from 'react'
import { FarmsContext} from './FarmsContext'
import { usersReducer } from './farmsReducer'
import { IFarm } from '@/interfaces/farm'
import { getFarmsRequest, postFarmsRequest } from './farmsRequest'
import { returnArray } from '../auth/authRequest'
import { IUbication, IStage, IPigType, IRace, IPig, IAccess, IRole, IRoleAccess, ITask } from '@/interfaces'
import { AuthContext } from '../auth/AuthContext'
import { useRouter } from 'next/navigation'

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
  rolesAccess:[]
}

export const FarmsProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(usersReducer, UI_INITIAL_STATE)
  const {logged,user,userAccess,setAccessError} = useContext(AuthContext)
  const router= useRouter()
  
  useEffect(() => {
   if(logged){
      if(!user?.is_active){
         router.replace('/')
      }else{
         getResources()
      }
   }
   setAccessError(undefined)
  }, [])
 
  const getResources = async() =>{
    setIsLoading(true)
     Promise.all([
      getFarmsRequest('/farms/catalog/ubications'),
      getFarmsRequest('/farms/catalog/pig_types'),
      getFarmsRequest('/farms/catalog/races'),
      getFarmsRequest('/farms/catalog/stages'),
      getFarmsRequest('/users/roles'),
      getFarmsRequest('/users/access'),
     ]).then((resp)=>{
      setUbications(resp[0].data as IUbication[])
      setPigTypes(resp[1].data as IPigType[])
      setRaces(resp[2].data as IRace[])
      setStages(resp[3].data as IStage[])
      setRoles(resp[4].data as IRole[])
      setAccessArr(resp[5].data as IAccess[])
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
    await getPostLoadingOrError(`/users/role_access?id_role=${payload}`,setRolesAccess)
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
      getFarm
    }}>
      {children}
    </FarmsContext.Provider>
  )
}