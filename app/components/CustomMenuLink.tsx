import { CardActionArea } from "@mui/material"
import Link from "next/link"

interface Props{
  href:string;
  title:string;
}

const CustomMenuLink = ({href,title}:Props) => {
  return (
    <Link href={href}>
      <CardActionArea 
        sx={{
          width:'100%',
          padding:'1rem .5rem',
          fontWeight:'bold'}}>
        {title}
      </CardActionArea>
      </Link>
  )
}

export default CustomMenuLink