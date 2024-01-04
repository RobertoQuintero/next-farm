import { Box, Modal } from "@mui/material"
import { ReactNode, useContext } from "react"
import { UiContext } from "../context/ui/UiContext"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4, 
};

const AppModal = ({children}:{children:ReactNode}) => {
  const {toggleModal,isModalOpen} = useContext(UiContext)

  return (
    <Modal
      sx={{backdropFilter: 'blur(3px)',}}
      open={isModalOpen}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <>{children}</>
      </Box>
    </Modal>
  )
}

export default AppModal