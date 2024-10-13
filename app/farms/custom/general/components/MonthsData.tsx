import { IReport } from '@/interfaces'
import React from 'react'

interface Props{
  report:IReport  | undefined
}

export const MonthsData = ({report}:Props) => {
  return (
    <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',border:'1px solid #ccc', borderRadius:'3px',padding:'1rem'}}>
        <div>
        <p style={{fontWeight:'bold',fontSize:'1.2rem'}}>Crecimiento - Análisis salidas</p>
        <div  style={{display:'flex',fontWeight:'bold'}}>
            <p style={{width:'110px'}}>Mes</p>
            <p>Cantidad</p>
          </div>
        {
          report?.growing.map(r=><div key={r.month} style={{display:'flex'}}>
            <p style={{width:'110px'}}>{r.month}</p>
            <p>{r.quantity}</p>
          </div>)
        }
        </div>
        <div style={{borderLeft:'1px solid #ccc',padding:'0 0 0 1rem'}}>
        <p style={{fontWeight:'bold',fontSize:'1.2rem'}}>Gestación - Análisis partos</p>
        
        {
          report?.pigs.map(r=><div key={r.stage} style={{padding:'.5rem 0',borderBottom:'1px solid #ccc'}} >
            <p style={{fontWeight:'bold'}}>- {r.stage} -</p>
            <div  style={{display:'flex',fontWeight:'bold'}}>
              <p style={{width:'110px'}}>Mes</p>
              <p>Cantidad</p>
            </div>
            {
              r.months.map(r=><div key={r.month} style={{display:'flex'}}>
                <p style={{width:'110px'}}>{r.month}</p>
                <p>{r.quantity}</p>
              </div>)
            }
          </div>)
        }
        </div>

      </div>
  )
}
