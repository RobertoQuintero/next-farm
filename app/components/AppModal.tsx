import { Box, Modal } from "@mui/material"
import { ReactNode } from "react"
import { useUi } from "../context/ui/useUi";

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
  const {toggleModal,isModalOpen} = useUi()

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