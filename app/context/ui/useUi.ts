import { useContext } from "react"
import { UiContext } from "../ui/UiContext"

export const useUi = () => {
  const {isMenuOpen,isModalOpen,toggleModal,toggleSideMenu,uiReset} = useContext(UiContext)

  return {
    isMenuOpen,isModalOpen,toggleModal,toggleSideMenu,uiReset
  }
}
