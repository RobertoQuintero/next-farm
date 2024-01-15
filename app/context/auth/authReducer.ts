import { ICompany, IState } from '@/interfaces'
import { AuthState } from './AuthProvider'
import { IUser } from '@/interfaces/user'

type AuthActionType=
          {type:'[auth] - login',payload:ICompany | undefined}
         |{type:'[auth] - loginUser',payload:IUser | undefined}
         |{type:'[auth] - logout',payload:AuthState}
         |{type:'[auth] - isLoading',payload:boolean}
         |{type:'[auth] - setError',payload:string | undefined}
         |{type:'[auth] - setShowForm',payload:boolean}
         |{type:'[auth] - setStates',payload:IState[]}
         |{type:'[auth] - setCompany',payload:ICompany | undefined}
        
export const authReducer = (state:AuthState,action:AuthActionType):AuthState => {
  
  switch (action.type) {
    case '[auth] - login':
      return {
        ...state,
        logged:true,
        company:action.payload,
        companyUser:undefined,
        authError:undefined,
        idCompany:action.payload?.id_company
      }

    case '[auth] - loginUser':
      return {
        ...state,
        logged:true,
        company:undefined,
        companyUser:action.payload,
        authError:undefined,
        idCompany:action.payload?.id_company
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
    case '[auth] - setCompany':
      return {
        ...state,
        company:action.payload,
        logged:true,
        authError:undefined
      }

    default:
      return state
  }
}