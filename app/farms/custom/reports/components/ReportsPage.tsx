'use client'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { CSSProperties, useContext, useRef } from 'react'
import { PigCard, RowButton } from '../../components'
import { useReactToPrint } from 'react-to-print'
import { BarChart } from '@mui/x-charts'


const styles={border:'1px solid #ccc', padding:'1rem',borderRadius:'3px'} as CSSProperties

const ReportsPage = () => {
  const {pigs} = useContext(FarmsContext)

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const empty=pigs.filter(p=>p.status&&p.id_pig_stage===2).length
  const mounted=pigs.filter(p=>p.status&&p.id_pig_stage===3).length
  const un_confirm=pigs.filter(p=>p.status&&p.id_pig_stage===4).length
  const charged=pigs.filter(p=>p.status&&p.id_pig_stage===5).length
  const lactation=pigs.filter(p=>p.status&&p.id_pig_stage===6).length
  const inactive=pigs.filter(p=>p.status&&!p.is_active).length
  return (
    <>
      <RowButton label='Pdf' onClick={handlePrint}/>
      <div style={{display:'flex', flexDirection:'column',gap:'.5rem',padding:'1rem .5rem 0'}} ref={componentRef}>
        <p style={{textAlign:'center',fontWeight:'bold'}}>Reporte Cerdas Gestantes</p>
      <div style={styles}>
        <h4>Vacías {empty}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===2).map(p=><PigCard pig={p} print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Montadas {mounted}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===3).map(p=><PigCard pig={p} print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Sin confirmar {un_confirm}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===4).map(p=><PigCard pig={p} print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Cargadas {charged}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===5).map(p=><PigCard pig={p} print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Destetando {lactation}</h4>
        {
          pigs.filter(p=>p.status&&p.id_pig_stage===6).map(p=><PigCard pig={p} print key={p.id_pig}/>)
        }
      </div>
      <div style={styles}>
        <h4>Inactivas {inactive}</h4>
        {
          pigs.filter(p=>p.status&&!p.is_active).map(p=><PigCard pig={p} print key={p.id_pig}/>)
        }
      </div>
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
    </div>
    </>
  )
}

export default ReportsPage