'use client'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button, CircularProgress } from '@mui/material'
import React, { useContext, useState } from 'react'

interface Props{
  onDelete: ()=>void
}

export const DeleteComponent = ({onDelete}:Props) => {
  const {toggleModal} = useContext(UiContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  return (
    <>
    {
      isLoading
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
