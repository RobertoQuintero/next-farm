import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

interface Props{
  children:React.ReactNode;
  title:string | React.ReactNode;
  open?:boolean
}

export const AccordionElement = ({children,title,open=false}:Props) => {
  return (
    <Accordion defaultExpanded={open} sx={{boxShadow:'none',border:'none'}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >
      {title}
    </AccordionSummary>
    <AccordionDetails sx={{padding:0}}>
      {children}
    </AccordionDetails>
  </Accordion>
  )
}
