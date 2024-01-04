'use client'
import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer'
import Cookies from 'js-cookie'
import { ICompany, IState } from '@/interfaces';
import { getAuthRequest, postAuthRequest } from './authRequest';

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
}

const Auth_INITIAL_STATE:AuthState={
  authLoading:false,
  logged:false,
  company:undefined,
  authError:undefined,
  showForm: false,
  states:[]
}

export const AuthProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)

  useEffect(() => {
    getResources()
  }, [])
  
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

  return (
    <AuthContext.Provider value={{
      ...state,
      logout,
      setShowForm,
      postCompany
    }}>
      {children}
    </AuthContext.Provider>
  )
}