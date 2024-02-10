'use client'
import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer'
import Cookies from 'js-cookie'
import { IState } from '@/interfaces';
import { getAuthRequest, postAuthRequest, validateTokenRequest } from './authRequest';
import { IUser, IUserAccess } from '@/interfaces/user';
import { useRouter } from 'next/navigation';

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface AuthState{
  authLoading:boolean;
  logged: boolean;
  authError:string | undefined;
  showForm: boolean;
  states:IState[];
  user:IUser | undefined;
  idFarm: number | undefined;
  userAccess:IUserAccess[];
  accessError:string | undefined;
}

const Auth_INITIAL_STATE:AuthState={
  authLoading:true,
  logged:false,
  authError:undefined,
  showForm: false,
  states:[],
  user:undefined,
  idFarm: undefined,
  userAccess:[],
  accessError:undefined
}

export const AuthProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
  const router= useRouter()
  useEffect(() => {
    getResources()
  }, [])

  useEffect(() => {
    checkToken()
    if(state.logged){
      if(!state.user?.is_active){
        router.replace('/')
      }
    }
    setAccessError(undefined)
  }, [])

  const checkToken=async()=>{
    const{ok,data}= await validateTokenRequest()
    if(ok){
      dispatch({
        type:'[auth] - login',
        payload:data as IUser
      })
      await getUserAccess(data as IUser)
    }else{
      logout()
      router.replace('/')
    }
    setIsLoading(false)
  }
  
  const getResources = async() =>{
    setIsLoading(true)
     Promise.all([
      getAuthRequest('/auth/states'),
     ])
     .then((resp)=>{
      setStates(resp[0].data as IState[])
      setIsLoading(false)
     })
  };

  const logout = ()=>{
    Cookies.remove('jwt')
    dispatch({
      type:'[auth] - logout',
      payload:Auth_INITIAL_STATE
    })
  }

  const login = async(payload:IUser):Promise<boolean>=>{
    setError(undefined)
    setIsLoading(true)
    const {ok,data}=await postAuthRequest('/auth/login',payload)
    if(ok){
      Cookies.set('id_farm',(data as IUser).id_farm.toString())
      dispatch({
        type:'[auth] - login',
        payload:data as IUser
      })
      await getUserAccess(data as IUser)
    }
    else{
      setError(data as string)
    }
    setIsLoading(false)
    return ok
  }

  const getUserAccess = async(payload:IUser):Promise<boolean>=>{
    setError(undefined)
    setIsLoading(true)
    const {ok,data}=await getAuthRequest(`/users/user_access?id_role=${payload.id_role}&id_farm=${payload.id_farm}`)
    if(ok){
      setUserAccess(data as IUserAccess[])
    }
    else{
      setError(data as string)
    }
    setIsLoading(false)
    return ok
  }

  const postUser = async(payload:IUser):Promise<boolean> =>{
      setError(undefined)
      setIsLoading(true)
       const {ok,data}=await postAuthRequest(`/auth/register`,payload)
       if(ok){
        dispatch({
          type:'[auth] - login',
          payload:data as IUser
        })
       }
       else{
        setError(data as string)
       }
       setIsLoading(false)
       return ok
    };

  const setIsLoading = (payload:boolean)=>{
    dispatch({
      type:'[auth] - isLoading',
      payload
    })
  }

  const setShowForm = (payload:boolean)=>{
    dispatch({
      type:'[auth] - setShowForm',
      payload
    })
  }

  const setStates =(payload:IState[]) =>{
     dispatch({
      type:'[auth] - setStates',
      payload
     })
  };

  const setError =(payload:string| undefined) =>{
     dispatch({
      type:'[auth] - setError',
      payload
     })
  };

  const setIdFarm =(payload:number | undefined) =>{
     dispatch({
      type:'[auth] - setIdFarm',
      payload
     })
  };

  const setUserAccess =(payload:IUserAccess[]) =>{
     dispatch({
      type:'[auth] - setUserAccess',
      payload
     })
  };

  const setAccessError =(payload:string | undefined) =>{
     dispatch({
      type:'[auth] - setAccessError',
      payload
     })
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      logout,
      setShowForm,
      login,
      postUser,
      setIdFarm,
      checkToken,
      setAccessError
    }}>
      {children}
    </AuthContext.Provider>
  )
}