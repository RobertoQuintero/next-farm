import {  IState } from '@/interfaces'
import { AuthState } from './AuthProvider'
import { IUser, IUserAccess } from '@/interfaces/user'

type AuthActionType=
          {type:'[auth] - login',payload:IUser | undefined}
         |{type:'[auth] - loginUser',payload:IUser | undefined}
         |{type:'[auth] - logout',payload:AuthState}
         |{type:'[auth] - isLoading',payload:boolean}
         |{type:'[auth] - setError',payload:string | undefined}
         |{type:'[auth] - setShowForm',payload:boolean}
         |{type:'[auth] - setStates',payload:IState[]}
         |{type:'[auth] - setIdFarm',payload:number | undefined}
         |{type:'[auth] - setUserAccess',payload:IUserAccess[]}
         |{type:'[auth] - setAccessError',payload:string | undefined}
        
export const authReducer = (state:AuthState,action:AuthActionType):AuthState => {
  
  switch (action.type) {
    case '[auth] - login':
      return {
        ...state,
        logged:true,
        user:action.payload,
        authError:undefined, 
        idFarm:action.payload?.id_farm
      }
    case '[auth] - logout':
      return {
        ...state,
        ...action.payload,
        authLoading:false,
      }

    case '[auth] - isLoading':
      return {
        ...state,
        authLoading:action.payload
      }

    case '[auth] - setError':
      return {
        ...state,
        authError:action.payload,
      }
    case '[auth] - setShowForm':
      return {
        ...state,
        showForm:action.payload,
      }
    case '[auth] - setStates':
      return {
        ...state,
        states:action.payload,
      }
    case '[auth] - setIdFarm':
      return {
        ...state,
        idFarm:action.payload
      }

    case '[auth] - setUserAccess':
      return {
        ...state,
        userAccess:action.payload
      }
    case '[auth] - setAccessError':
      return {
        ...state,
        accessError:action.payload
      }

    default:
      return state
  }
}