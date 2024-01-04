import { UiState } from './UiProvider'

type UiActionType=
          {type:'[Ui] - ToggleMenu'}
        | {type:'[Ui] - ToggleModal'}
        | {type:'[Ui] - uiReset'}
        
export const uiReducer = (state:UiState,action:UiActionType):UiState => {
  
  switch (action.type) {
    case '[Ui] - ToggleMenu':
      return {
        ...state,
        isMenuOpen:!state.isMenuOpen
      }

    case '[Ui] - ToggleModal':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      }

    case '[Ui] - uiReset':
      return {
        ...state,
        isModalOpen: false,
        isMenuOpen:false
      }

    default:
      return state
  }
}