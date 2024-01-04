'use client'
import { createContext } from 'react'

interface ContextProps{
  isMenuOpen: boolean;
  isModalOpen: boolean;
  toggleSideMenu: () => void;
  toggleModal: () => void;
  uiReset: () => void
}

export const UiContext = createContext({} as ContextProps)