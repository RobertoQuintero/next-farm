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

  return (
    <>
      <RowButton label='Pdf' onClick={handlePrint}/>
      <div style={{display:'flex', flexDirection:'column',gap:'.5rem',padding:'1rem .5rem 0'}} ref={componentRef}>
        <p style={{textAlign:'center',fontWeight:'bold'}}>Reporte Cerdas Gestantes</p>
      <div style={{display:'flex', fontSize:'13px',fontWeight:'bold',padding:'0 0 0 1rem'}}>
        <p style={{width:'100px'}}>Ingreso</p>
        <p style={{width:'100px'}}>Código</p>
        <p style={{width:'110px'}}>Ubicación</p>
        <p style={{width:'120px'}}>Raza</p>
        <p style={{width:'100px'}}>Estatus</p>
        <p style={{width:'90px'}}>Parto</p>
        <p style={{width:'110px'}}>Días al parto</p>
        <p style={{width:'100px'}}>Hijos</p>
      </div>
      <div style={styles}>
        <h4>Vacías {empty}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===2).map(p=><PigCard pig={p} report print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Montadas {mounted}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===3).sort(compareDates).map(p=><PigCard pig={p} report print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Sin confirmar {un_confirm}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===4).sort(compareDates).map(p=><PigCard pig={p} report print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Cargadas {charged}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===5).sort(compareDates).map(p=><PigCard pig={p} report print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Destetando {lactation}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===6).map(p=><PigCard pig={p} print report key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Inactivas {inactive}</h4>
        {
          pigs.filter(p=>p.status&&(!p.is_active || p.id_pig_stage===1)).map(p=><PigCard pig={p} print key={p.id_pig}/>)
        }
      </div>
      <div >
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
        width={600}
        height={300}
        // colors={['#8A21EB','#8A21EB','#CB20EA','#4821EB','#EB2130','#D86FEB']}
      />
      <MonthsData report={report}/>
      <LossesReport/>
      </div>
    </div>
    </>
  )
}

export default ReportsPage