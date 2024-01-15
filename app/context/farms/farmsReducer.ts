'use client'
import { UsersState } from './FarmsProvider'
import { IFarm } from '@/interfaces/farm';

type UsersActionType=
          {type:'[Farms] - setFarms';payload:IFarm[]}
        | {type:'[Farms] - setFarm'; payload:IFarm | undefined}
        | {type:'[Farms] - setIsLoading'; payload:boolean}
        | {type:'[Farms] - setError'; payload:string | undefined}
        
        
export const usersReducer = (state:UsersState,action:UsersActionType):UsersState => {
  
  switch (action.type) {
    case '[Farms] - setFarms':
      return {
        ...state,
        farms:action.payload
      }

    case '[Farms] - setFarm':
      return {
        ...state,
        farm:action.payload
      }

    case '[Farms] - setIsLoading':
      return {
        ...state,
        farmsLoading:action.payload
      }

    case '[Farms] - setError':
      return {
        ...state,
        farmsError:action.payload
      }
  

    default:
      return state
  }
}