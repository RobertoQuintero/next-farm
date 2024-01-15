'use client'
import  { useEffect, useReducer } from 'react'
import { FarmsContext} from './FarmsContext'
import { usersReducer } from './farmsReducer'
import { IFarm } from '@/interfaces/farm'
import { getFarmsRequest, postFarmsRequest } from './farmsRequest'
import { returnArray } from '../auth/authRequest'


interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface UsersState{
  farms:IFarm[]
  farm:IFarm | undefined
  farmsLoading:boolean;
  farmsError:string | undefined;
}

const UI_INITIAL_STATE:UsersState={
  farms:[],
  farm: undefined,
  farmsLoading:false,
  farmsError:undefined
}

export const FarmsProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(usersReducer, UI_INITIAL_STATE)
  useEffect(() => {
    getResources()
  }, [])

  const getResources = async() =>{
    setIsLoading(true)
     Promise.all([
      getFarmsRequest('/farms'),
     ]).then((resp)=>{
      setFarms(resp[0].data as IFarm[])
      setIsLoading(false)
     })
     .catch(error=>{
      console.log({error})
      setError('Error al cargar datos, refrescar la página')
      setIsLoading(false)
     })
  };

  const postFarm = async(payload:IFarm):Promise<boolean> =>{
    setError(undefined)
     setIsLoading(true)
     const {ok,data}= await postFarmsRequest('/farms',payload)
     if(ok){
      console.log(data)
      setFarms(returnArray(payload,data as IFarm,state.farms,'id_farm'))
     }else{
      setError(data as string)
     }
     setIsLoading(false)
     return ok
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


  


  return (
    <FarmsContext.Provider value={{
      ...state,

      setFarm,
      postFarm,
      setError
      
    }}>
      {children}
    </FarmsContext.Provider>
  )
}