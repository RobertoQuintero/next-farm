import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext } from 'react'

export const LossesReport = () => {
  const {pigLossTypes} = useContext(FarmsContext)

  return (
    <div style={{padding:'1rem', border:'1px solid #ccc', borderRadius:'3px'}}>
      <p style={{fontWeight:'bold',fontSize:'1.2rem',padding:'0 0 1rem'}}>BAJAS</p>
      {
        pigLossTypes.length
          ?<div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            {
              pigLossTypes.map(p=>(
                <div key={p.pig_type} style={{borderRight:'1px solid #ccc',padding:'0 1rem 0 0',}}>
                  <p style={{fontWeight:'bold',}}>{p.pig_type} </p>
                  {
                    p.loss_reasons.map(l=>(
                      <div key={l.loss_reason} style={{borderBottom:'1px solid #ccc',padding:'.5rem 0'}}>
                        <p style={{padding:'0 0 0 .3rem'}}>- {l.loss_reason}</p>
                        {
                          l.months.map(m=>(
                            <p key={m.month} style={{padding:'0 0 0 1rem'}}><span style={{display:'inline-block',width:'100px'}}>{m.month}</span>{m.losses_quantity}</p>
                          ))
                        }
                      </div>
                      
                    ))
                  }
                </div>
              ))
            }
          </div>
          :<></>
      }
    </div>
  )
}
