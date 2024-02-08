import { Button, CircularProgress } from '@mui/material'
import React from 'react'


export const SaveButton = ({loading}:{loading:boolean}) => {
  return (
    <Button 
          size="small"
          disabled={loading}
          type='submit' 
          fullWidth 
          variant='contained'
          >
            {
              loading
                ?  <CircularProgress size='1.5rem' />
                :'Guardar'
            }
      </Button>
  )
}
