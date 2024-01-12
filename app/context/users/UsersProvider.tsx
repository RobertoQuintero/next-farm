'use client'
import  { useContext, useEffect, useReducer } from 'react'
import { UsersContext} from './UsersContext'
import { usersReducer } from './usersReducer'
import { IJobPosition, IRole, IUser } from '@/interfaces/user'
import { getUsersRequest } from './usersRequest'
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
}

const UI_INITIAL_STATE:UsersState={
  users:[],
  user:undefined,
  userLoading:false,
  userError:undefined,
  jobPositions:[],
  roles:[]
}

export const UsersProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(usersReducer, UI_INITIAL_STATE)
  useEffect(() => {
    getResources()
  }, [])

  const getResources = async() =>{
    setIsLoading(true)
     Promise.all([
      getUsersRequest('/users'),
      getUsersRequest('/users/roles'),
     ]).then((resp)=>{
      setUsers(resp[0].data as IUser[])
      setRoles(resp[1].data as IRole[])
      setIsLoading(false)
     })
     .catch(error=>{
      console.log({error})
      setError('Error al cargar datos, refrescar la página')
      setIsLoading(false)
     })
  };

  const getJobPositions = async(id:number) =>{
     setIsLoading(true)
     const {ok,data}= await getUsersRequest(`/users/job_positions?id_company=${id}`)
     if(ok){
      setJobPositions(data as IJobPosition[])
     }else{
      setError(data as string)
     }
     setIsLoading(false)
  };
  

  const postUser = async() =>{
     
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

  const setJobPositions = (payload:IJobPosition[]) =>{
     dispatch({
      type:'[Users] - setJobPositions',
      payload
     })
  };

  const setRoles = (payload:IRole[]) =>{
     dispatch({
      type:'[Users] - setRoles',
      payload
     })
  };


  return (
    <UsersContext.Provider value={{
      ...state,

      setUser,
      getJobPositions
      
    }}>
      {children}
    </UsersContext.Provider>
  )
}