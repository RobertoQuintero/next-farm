import React from 'react'
const colors=[
  {
    color:'#FFE0E9',
    msg:'Sin partos',
    
  },
  {
    color:'#93E1D8',
    msg:'Más de 9 hijos en último parto',
  },
  {
    color:'#FCBF46',
    msg:'Menos de 9 hijos en último parto',
  },
  {
    color:'#F77F00',
    msg:'Menos de 9 hijos en últimos 2 partos cada uno',
  },
  {
    color:'#D62828',
    msg:'Menos de 9 hijos en últimos 3 partos cada uno',
  }   
]

export const ColorsElement = () => {
  return (
    <div>
      {
        colors.map(c=>(
          <div key={c.color} style={{display:'flex',alignItems:'center',padding:'0 0 0 1rem'}}>
            <div style={{width:10,height:10,backgroundColor:c.color}}>
            </div>
            <p style={{padding:'0 0 0 1rem'}}>{c.msg}</p>
          </div>
        ))
      }
    </div>
  )
}
