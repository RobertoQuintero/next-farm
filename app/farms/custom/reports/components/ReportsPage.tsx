'use client'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { CSSProperties, useContext, useEffect, useRef } from 'react'
import { PigCard, RowButton } from '../../components'
import { useReactToPrint } from 'react-to-print'
import { BarChart } from '@mui/x-charts'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { IPig } from '@/interfaces'
import { MonthsData } from '../../general/components/MonthsData'
import { LossesReport } from './LossesReport'
import { AccordionElement } from '@/app/components'
import { HeaderInfo } from './HeaderInfo'
import { ColorsElement } from './ColorsElement'


const styles={border:'1px solid #ccc', padding:'1rem',borderRadius:'3px'} as CSSProperties

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

  const compareDates=(a:IPig, b:IPig)=> {
    if (new Date(a.next_birth!) < new Date(b.next_birth!)) {
      return -1;
    }
    if (new Date(a.next_birth!) > new Date(b.next_birth!)) {
      return 1;
    }
    return 0;
  }

  const groupByMonth =(pigs:IPig[]) =>{
     const months= [...new Set(pigs.map(p=>p.next_birth_month))]
      return months.map(m=>{
        return {
          month:m,
          quantity:pigs.filter(n=>n.next_birth_month===m).length,
          pigs:pigs.filter(n=>n.next_birth_month===m)
        }
      })
  };

  

  return (
    <>
      <RowButton label='Pdf' onClick={handlePrint}/>
        <ColorsElement/>
      <div style={{display:'flex', flexDirection:'column',gap:'.5rem',padding:'1rem .5rem 0'}} ref={componentRef}>
        <p style={{textAlign:'center',fontWeight:'bold'}}>Reporte Cerdas Gestantes</p>
      <div style={styles}>
          <AccordionElement title={<h4>Vacías {empty}</h4>} >
            <HeaderInfo/>
              {
                pigs.filter(p=>p.status&&p.id_pig_stage===2&&p.is_active).map(p=><PigCard pig={p} report print key={p.id_pig}/>)
              }
            </AccordionElement>
      </div>
      <div style={styles}>
          <AccordionElement title={<h4>Montadas {mounted}</h4>} >
          {
             groupByMonth(pigs.filter(p=>p.status&&p.id_pig_stage===3).sort(compareDates)).map((m,i)=>(
              <AccordionElement not_show title={`${m.month} - ${m.quantity}`} panel={i+1} key={i}>
                <HeaderInfo stage/>
                {
                  m.pigs.map(p=><PigCard pig={p} report print key={p.id_pig}/>)
                }
              </AccordionElement>
            ))
          }
        </AccordionElement>         
        
      </div>
      <div style={styles}>
        <AccordionElement title={<h4>Sin confirmar {un_confirm}</h4>} >
        
          {
             groupByMonth(pigs.filter(p=>p.status&&p.id_pig_stage===4).sort(compareDates)).map((m,i)=>(
              <AccordionElement not_show title={`${m.month} - ${m.quantity}`} panel={i+1} key={i}>
                <HeaderInfo stage/>
                {
                  m.pigs.map(p=><PigCard pig={p} report print key={p.id_pig}/>)
                }
              </AccordionElement>
            ))
          }
        </AccordionElement> 
      </div>
      <div style={styles}>
        <AccordionElement title={<h4>Cargadas {charged}</h4>} >
          {
             groupByMonth(pigs.filter(p=>p.status&&p.id_pig_stage===5).sort(compareDates)).map((m,i)=>(
              <AccordionElement not_show title={`${m.month} - ${m.quantity}`} panel={i+1} key={i}>
                <HeaderInfo stage/>
                {
                  m.pigs.map(p=><PigCard pig={p} report print key={p.id_pig}/>)
                }
              </AccordionElement>
            ))
          }
        </AccordionElement> 
      </div>
      <div style={styles}>     
        <AccordionElement title={<h4>Destetando {lactation}</h4>} >
            <HeaderInfo/>
              {
                pigs.filter(p=>p.status&&p.id_pig_stage===6).map(p=><PigCard pig={p} print report key={p.id_pig}/>)
              }
            </AccordionElement>
      </div>
      <div style={styles}>
        
        <AccordionElement title={<h4>Inactivas {inactive}</h4>} >
            <HeaderInfo/>
              {
                pigs.filter(p=>p.status&&(!p.is_active || p.id_pig_stage===1)).map(p=><PigCard pig={p} print key={p.id_pig}/>)
              }
            </AccordionElement>
        {
          
        }
      </div>
      <div  style={{maxWidth:'100%'}}>
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