'use client'
import  { useReducer } from 'react'
import { UiContext} from './UiContext'
import { uiReducer } from './uiReducer'


interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface UiState{
  isMenuOpen:boolean;
  isModalOpen:boolean;
}

const UI_INITIAL_STATE:UiState={
  isMenuOpen:false,
  isModalOpen:false
}

export const UiProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const toggleSideMenu=()=>{
    dispatch({type:'[Ui] - ToggleMenu' })
  }

  const toggleModal=()=>{
    dispatch({
      type:'[Ui] - ToggleModal'
    })
  }
  const uiReset=()=>{
    dispatch({
      type:'[Ui] - ToggleModal'
    })
  }


  return (
    <UiContext.Provider value={{
      ...state,

      //methods
      toggleSideMenu,
      toggleModal,
      uiReset
    }}>
      {children}
    </UiContext.Provider>
  )
}