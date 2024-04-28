import { CachedOutlined } from '@mui/icons-material'
import { CardActionArea } from '@mui/material'
import React, { CSSProperties } from 'react'
const style={
  backgroundColor:'#fff',
  padding:'0 .5rem',
  border:'1px solid #ccc',
  borderRadius:'3px'
} as CSSProperties

interface Props{
  onRefresh:()=>void
}

const OnRefreshButton = ({onRefresh}:Props) => {
  return (
    <CardActionArea
      onClick={onRefresh}
      style={style} >
      <CachedOutlined fontSize='small'/>
    </CardActionArea>
  )
}

export default OnRefreshButton