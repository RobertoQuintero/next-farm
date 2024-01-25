'use client'
import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer'
import Cookies from 'js-cookie'
import { ICompany, IState } from '@/interfaces';
import { getAuthRequest, postAuthRequest, validateTokenRequest } from './authRequest';
import { IUser } from '@/interfaces/user';
import { useRouter } from 'next/navigation';

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface AuthState{
  authLoading:boolean;
  logged: boolean;
  company:ICompany | undefined;
  authError:string | undefined;
  showForm: boolean;
  states:IState[];
  companyUser:IUser | undefined;
  user:IUser | undefined;
  idCompany:number| undefined;
  idFarm: number | undefined;
}

const Auth_INITIAL_STATE:AuthState={
  authLoading:true,
  logged:false,
  company:undefined,
  authError:undefined,
  showForm: false,
  states:[],
  companyUser:undefined,
  idCompany:undefined,
  user:undefined,
  idFarm: undefined
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
  }, [])

  const checkToken=async()=>{
    const{ok,data}= await validateTokenRequest()
    if(ok){
      dispatch({
        type:'[auth] - login',
        payload:data as IUser
      })
    }else{
      logout()
    }
    setIsLoading(false)
  }
  
  const getResources = async() =>{
    setIsLoading(true)
     Promise.all([
      getAuthRequest('/auth/states')
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

  const postCompany = async(payload:ICompany):Promise<boolean> =>{
     setIsLoading(true)
     const {ok,data}= await postAuthRequest(`/auth/register`,payload)
     if(ok){
      setCompany(data as ICompany)
     }else{
      setError(data as string)
     }
     setIsLoading(false)
     return ok
  };

  
  const setCompany = async(payload:ICompany| undefined) =>{
     dispatch({
      type:'[auth] - setCompany',
      payload
     })
  };

  const setIdFarm =(payload:number | undefined) =>{
     dispatch({
      type:'[auth] - setIdFarm',
      payload
     })
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      logout,
      setShowForm,
      postCompany,
      login,
      postUser,
      setIdFarm,
      checkToken
    }}>
      {children}
    </AuthContext.Provider>
  )
}