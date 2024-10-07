import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext } from 'react'

export const LossesReport = () => {
  const {pigLossTypes} = useContext(FarmsContext)

  return (
    <div style={{padding:'2rem 0'}}>
      <p style={{fontWeight:'bold',padding:'0 0 1rem 0',fontSize:'1.2rem'}}>BAJAS</p>
      {
        pigLossTypes.length
          ?<div style={{display:'flex',gap:'4rem'}}>
            {
              pigLossTypes.map(p=>(
                <div key={p.pig_type}>
                  <p style={{fontWeight:'bold'}}>{p.pig_type}</p>
                  {
                    p.loss_reasons.map(l=>(
                      <div key={l.loss_reason}>
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
