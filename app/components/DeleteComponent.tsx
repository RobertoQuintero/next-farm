import { UiContext } from '@/app/context/ui/UiContext'
import { Button, CircularProgress } from '@mui/material'
import React, { useContext } from 'react'

interface Props{
  onDelete: ()=>void
  loading?:boolean;
  error?:string
}

export const DeleteComponent = ({onDelete,loading=false,error=undefined}:Props) => {
  const {toggleModal} = useContext(UiContext)

  return (
    <>
    {
      loading
        ?<CircularProgress/>
        :<div style={{width:270}}>
            <p style={{textAlign:'center', color:'red',paddingBottom:'1rem',fontWeight:'bold'}}>Confirmar Borrar</p>
            <p className='errorMessage'>{error?error:''}</p>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Button size='small' onClick={toggleModal}>Cancelar</Button>
              <Button size='small' onClick={onDelete}>Aceptar</Button>
            </div>
          </div>
    }
    </>
  )
}
