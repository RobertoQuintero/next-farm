'use client'
import  {  useContext, useEffect, useReducer } from 'react'
import { UsersContext} from './UsersContext'
import { usersReducer } from './usersReducer'
import { IJobPosition, IRole, IUser } from '@/interfaces/user'
import { getUsersRequest, postUsersRequest } from './usersRequest'
import { returnArray } from '../auth/authRequest'
import { AuthContext } from '../auth/AuthContext'


interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface UsersState{
  users:IUser[]
  user:IUser | undefined
  userLoading:boolean;
  userError:string | undefined;
  jobPositions:IJobPosition[];
  roles:IRole[];
  actionString:string | undefined;
}

const UI_INITIAL_STATE:UsersState={
  users:[],
  user:undefined,
  userLoading:false,
  userError:undefined,
  jobPositions:[],
  roles:[],
  actionString:undefined
}

export const UsersProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(usersReducer, UI_INITIAL_STATE)
  const {userAccess,setAccessError,user} = useContext(AuthContext)
  useEffect(() => {
    getResources()
  }, [])

  const getResources = async() =>{
    setIsLoading(true)
     Promise.all([
      getUsersRequest('/users/roles'),
     ]).then((resp)=>{
      setRoles(resp[0].data as IRole[])
      setIsLoading(false)
     })
     .catch(error=>{
      console.log({error})
      setError('Error al cargar datos, refrescar la página')
      setIsLoading(false)
     })
  };
  
  const getUsers = async(payload:number) =>{
    
    setAccessError(undefined)
      if(!userAccess.find(u=>u.id_access===1)&& user?.id_role!==1){
        setAccessError('Credenciales inválidas')
        return
      }
      setAccessError(undefined)
      await getPostLoadingOrError(`/users?idFarm=${payload}&id_user=${user?.id_user}`,setUsers)
    };

  const postUser = async(payload:IUser):Promise<boolean> =>{
    if(!userAccess.find(u=>u.id_access===2)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
    return await getPostLoadingOrError('/users/register',setUsers,payload,state.users,'id_user',true)
  };

  const postUserPassword = async(payload:IUser):Promise<boolean> =>{
    if(!userAccess.find(u=>u.id_access===2)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
    setError(undefined)
     setIsLoading(true)
     const {ok,data}= await postUsersRequest('/users/password',payload)
     if(ok){
      console.log(data)
     }else{
      setError(data as string)
     }
     setIsLoading(false)
     return ok
  };

  const setUsers = (payload:IUser[]) =>{
     dispatch({
      type:'[Users] - setUsers',
      payload
     })
  };

  const setUser = (payload:IUser | undefined) =>{
     dispatch({
      type:'[Users] - setUser',
      payload
     })
  };

  const setIsLoading = (payload:boolean) =>{
     dispatch({
      type:'[Users] - setIsLoading',
      payload
     })
  };

  const setError = (payload:string | undefined) =>{
     dispatch({
      type:'[Users] - setError',
      payload
     })
  };

  const setRoles = (payload:IRole[]) =>{
     dispatch({
      type:'[Users] - setRoles',
      payload
     })
  };

  const setAction = (payload:string | undefined) =>{
     dispatch({
      type:'[Users] - setActionString',
      payload
     })
  };

  const getPostLoadingOrError = async<T,K extends keyof T>(
    endpoint:string,setState:(payload: T[]) => void,payload?:T,state?:T[],id?:K,wich?:boolean
 ) =>{
  setError(undefined)
  setIsLoading(true)
  const {ok,data}= wich ? await  postUsersRequest(endpoint,payload): await getUsersRequest(endpoint)
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
    <UsersContext.Provider value={{
      ...state,

      setUser,
      postUser,
      setAction,
      setError,
      getUsers,
      postUserPassword      
    }}>
      {children}
    </UsersContext.Provider>
  )
}