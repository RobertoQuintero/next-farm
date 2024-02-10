import { Button, CircularProgress } from '@mui/material'
import React from 'react'


export const SaveButton = ({loading,title='Guardar'}:{loading:boolean,title?:string}) => {
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
                :title
            }
      </Button>
  )
}
