import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { useUi } from '@/app/context/ui/useUi'
import { SearchOutlined } from '@mui/icons-material'
import { CardActionArea } from '@mui/material'
import React, { CSSProperties, useContext } from 'react'

const style={
  backgroundColor:'#fff',
  padding:'0 .5rem',
  border:'1px solid #ccc',
  borderRadius:'3px'
} as CSSProperties

export const SearchPigButton = () => {
  const {toggleModal}= useUi()
  const {setFarmAction} = useContext(FarmsContext)
  const onClick = () =>{
    setFarmAction('SEARCH-PIG')
     toggleModal()
  };

  return (
    <CardActionArea
      onClick={onClick}
      style={style} >
      <SearchOutlined fontSize='small'/>
    </CardActionArea>
  )
}
