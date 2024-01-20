'use client'
import { IPig, IPigType, IRace, IStage,  IUbication } from '@/interfaces';
import { UsersState } from './FarmsProvider'
import { IFarm } from '@/interfaces/farm';

type UsersActionType=
          {type:'[Farms] - setFarms';payload:IFarm[]}
        | {type:'[Farms] - setFarm'; payload:IFarm | undefined}
        | {type:'[Farms] - setIsLoading'; payload:boolean}
        | {type:'[Farms] - setError'; payload:string | undefined}
        | {type:'[Farms] - setUbications'; payload:IUbication[] }
        | {type:'[Farms] - setStages'; payload:IStage[] }
        | {type:'[Farms] - setPigTypes'; payload:IPigType[] }
        | {type:'[Farms] - setRaces'; payload:IRace[] }
        | {type:'[Farms] - setPigs'; payload:IPig[] }
        | {type:'[Farms] - setPig'; payload:IPig | undefined }
        
        
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
    case '[Farms] - setUbications':
      return {
        ...state,
        ubications:action.payload
      }
    case '[Farms] - setStages':
      return {
        ...state,
        stages:action.payload
      }
    case '[Farms] - setPigTypes':
      return {
        ...state,
        pigTypes:action.payload
      }
  
    case '[Farms] - setRaces':
      return {
        ...state,
        races:action.payload
      }

    case '[Farms] - setPigs':
      return {
        ...state,
        pigs:action.payload
      }

    case '[Farms] - setPig':
      return {
        ...state,
        pig:action.payload
      }
  

    default:
      return state
  }
}