'use client'
import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { BackButton } from '@/app/components';
import { BirthsRow, InfoRow, TasksRow } from '.';

const HistoryPage = () => {

  return (
    <>
      <div>
        <BackButton/>
        <InfoRow/>
        <BirthsRow/>
        <TasksRow/>
      </div>
    </>
  )
}

export default HistoryPage