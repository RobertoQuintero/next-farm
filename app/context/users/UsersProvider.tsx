'use client'
import  {  useEffect, useReducer } from 'react'
import { UsersContext} from './UsersContext'
import { usersReducer } from './usersReducer'
import { IJobPosition, IRole, IUser } from '@/interfaces/user'
import { getUsersRequest, postUsersRequest } from './usersRequest'
import { returnArray } from '../auth/authRequest'


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
      setIsLoading(true)
       const {ok,data}=await getUsersRequest(`/users?idFarm=${payload}`)
       if(ok){
        setUsers(data as IUser[])
       }
       else{
        setError(data as string)
       }
       setIsLoading(false)
    };

  

  const postUser = async(payload:IUser):Promise<boolean> =>{
    setError(undefined)
     setIsLoading(true)
     const {ok,data}= await postUsersRequest('/users/register',payload)
     if(ok){
      setUsers(returnArray(payload,data as IUser,state.users,'id_user'))
     }else{
      setError(data as string)
     }
     setIsLoading(false)
     return ok
  };
  const postUserPassword = async(payload:IUser):Promise<boolean> =>{
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