import { IReport } from '@/interfaces'
import React from 'react'

interface Props{
  report:IReport  | undefined
}

export const MonthsData = ({report}:Props) => {
  return (
    <div style={{display:'flex',gap:'5rem',flexWrap:'wrap'}}>
        <div>
        <p style={{fontWeight:'bold',padding:'1rem 0',fontSize:'1.2rem'}}>Crecimiento - Análisis salidas</p>
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
        <div>
        <p style={{fontWeight:'bold',padding:'1rem 0',fontSize:'1.2rem'}}>Gestación - Análisis partos</p>
        
        {
          report?.pigs.map(r=><div key={r.stage} style={{padding:'0 0 1rem'}} >
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
