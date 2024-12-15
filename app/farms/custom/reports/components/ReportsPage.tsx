'use client'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { CSSProperties, useContext, useEffect, useRef } from 'react'
import {  RowButton } from '../../components'
import { useReactToPrint } from 'react-to-print'
import { BarChart } from '@mui/x-charts'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { MonthsData } from '../../general/components/MonthsData'
import { LossesReport } from './LossesReport'

import { PregnatPigsReport } from './PregnatPigsReport'


const ReportsPage = () => {
  const {pigs,getPigs,getReport,report,getPigLossTypes} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)

  useEffect(() => {
    if(idFarm){
      Promise.all([
        getPigs(idFarm!),
        getReport(idFarm!) , 
        getPigLossTypes(idFarm!)
      ])
    
    }
  }, [idFarm])
  

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const empty=pigs.filter(p=>p.status&&p.id_pig_stage===2&&p.is_active).length
  const mounted=pigs.filter(p=>p.status&&p.id_pig_stage===3).length
  const un_confirm=pigs.filter(p=>p.status&&p.id_pig_stage===4).length
  const charged=pigs.filter(p=>p.status&&p.id_pig_stage===5).length
  const lactation=pigs.filter(p=>p.status&&p.id_pig_stage===6).length
  const inactive=pigs.filter(p=>p.status&&(!p.is_active|| p.id_pig_stage===1)).length

    

  return (
    <>
      <RowButton label='Pdf' onClick={handlePrint}/>
      
      <div style={{display:'flex', flexDirection:'column',gap:'.5rem',padding:'1rem .5rem 0'}} ref={componentRef}>
        <PregnatPigsReport/>
      <div  style={{maxWidth:'100%',display:'flex'}}>
        <div style={{maxWidth:600}}>
        <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['Inactivas','Vacías','Montadas','Sin confirmar','Cargadas','Destetando'],
            scaleType: 'band',
          },
        ]}
        
        series={[
          {
            data: [inactive,empty,mounted,un_confirm,charged,lactation],
            color:'#EB21A9'
          },
        ]}
        sx={{width:'100%'}}
        height={300}
      />

        </div>
      <div style={{display:'flex',flexDirection:'column', gap:'1rem',paddingBottom:'2rem'}}>
        <MonthsData report={report}/>
        <LossesReport/>
      </div>
      </div>
    </div>
    </>
  )
}

export default ReportsPage