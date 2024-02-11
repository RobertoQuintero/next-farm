import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

interface Props{
  children:React.ReactNode;
  title:string;
  open?:boolean
}

export const AccordionElement = ({children,title,open=false}:Props) => {
  return (
    <Accordion defaultExpanded={open}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      {title}
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
  )
}
