'use client'
import { IJobPosition, IRole, IUser } from '@/interfaces/user'
import { UsersState } from './UsersProvider'

type UsersActionType=
          {type:'[Users] - setUsers';payload:IUser[]}
        | {type:'[Users] - setUser'; payload:IUser | undefined}
        | {type:'[Users] - setIsLoading'; payload:boolean}
        | {type:'[Users] - setError'; payload:string | undefined}
        | {type:'[Users] - setJobPositions'; payload:IJobPosition[]}
        | {type:'[Users] - setRoles'; payload:IRole[]}
        | {type:'[Users] - setActionString'; payload:string | undefined}
        
        
export const usersReducer = (state:UsersState,action:UsersActionType):UsersState => {
  
  switch (action.type) {
    case '[Users] - setUsers':
      return {
        ...state,
        users:action.payload
      }

    case '[Users] - setUser':
      return {
        ...state,
        user:action.payload
      }

    case '[Users] - setIsLoading':
      return {
        ...state,
        userLoading:action.payload
      }

    case '[Users] - setError':
      return {
        ...state,
        userError:action.payload
      }
    case '[Users] - setJobPositions':
      return {
        ...state,
        jobPositions:action.payload
      }

    case '[Users] - setRoles':
      return {
        ...state,
        roles:action.payload
      }

    case '[Users] - setActionString':
      return {
        ...state,
        actionString:action.payload
      }

   

    default:
      return state
  }
}