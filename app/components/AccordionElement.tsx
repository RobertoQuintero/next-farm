import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

interface Props{
  children:React.ReactNode;
  title:string | React.ReactNode;
  open?:boolean;
  panel?:number;
  not_show?:boolean
}

export const AccordionElement = ({children,title,open=false,panel=1,not_show=false}:Props) => {
  return (
    <Accordion defaultExpanded={open} sx={{boxShadow:'none',border:'none'}}>
    <AccordionSummary
      aria-controls={`panel${panel}-content`}
      id={`panel${panel}-header`}
      expandIcon={!not_show?<ExpandMoreIcon/>:null}
      
    >
      {title}
    </AccordionSummary>
    <AccordionDetails sx={{padding:0}}>
      {children}
    </AccordionDetails>
  </Accordion>
  )
}
