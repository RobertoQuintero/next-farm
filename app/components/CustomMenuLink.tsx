import { CardActionArea } from "@mui/material"
import Link from "next/link"

interface Props{
  href:string;
  title:string;
}

export const CustomMenuLink = ({href,title}:Props) => {
  return (
    <CardActionArea 
      sx={{
        width:'100%',
        padding:'1rem .5rem',
        fontWeight:'bold'}}>
      <Link href={href}>{title}</Link>
    </CardActionArea>
  )
}
