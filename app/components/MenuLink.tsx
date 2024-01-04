import { CardActionArea } from '@mui/material'

interface Props {
  label:string;
  icon: JSX.Element;
  onClick:()=>void
}

export const MenuLink = ({label,icon,onClick}:Props) => {

  return (
    <CardActionArea 
      onClick={onClick}
      sx={{
        display:'flex',
        justifyContent:'start',
        padding:'.5rem 1rem'
      }}
    >
      {icon}
      <p style={{
        paddingLeft:'1rem',
        fontSize:'1rem'
      }}>{label}</p>
    </CardActionArea>
  )
}
