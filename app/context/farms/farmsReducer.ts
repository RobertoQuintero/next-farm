'use client'
import { IAccess, IPig, IPigType, IRace, IRole, IRoleAccess, IStage,  IUbication } from '@/interfaces';
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
        | {type:'[Farms] - setFarmAction'; payload:string | undefined }
        | {type:'[Farms] - setRoles'; payload:IRole[] }
        | {type:'[Farms] - setRole'; payload:IRole | undefined }
        | {type:'[Farms] - setAccessArr'; payload:IAccess[]  }
        | {type:'[Farms] - setAccess'; payload:IAccess | undefined }
        | {type:'[Farms] - setRoleAccess'; payload:IRoleAccess | undefined }
        | {type:'[Farms] - setRolesAccess'; payload:IRoleAccess[] }
        
        
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
  
    case '[Farms] - setFarmAction':
      return {
        ...state,
        farmAction:action.payload
      }
    case '[Farms] - setRoles':
      return {
        ...state,
        roles:action.payload
      }

    case '[Farms] - setRole':
      return {
        ...state,
        role:action.payload
      }

    case '[Farms] - setAccessArr':
      return {
        ...state,
        accessArr:action.payload
      }

    case '[Farms] - setAccess':
      return {
        ...state,
        access:action.payload
      }
    case '[Farms] - setRolesAccess':
      return {
        ...state,
        rolesAccess:action.payload
      }
    case '[Farms] - setRoleAccess':
      return {
        ...state,
        roleAccess:action.payload
      }
  

    default:
      return state
  }
}