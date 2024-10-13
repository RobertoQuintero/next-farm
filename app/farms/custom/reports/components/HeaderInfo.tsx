import React from 'react'
interface Props{
  stage?:boolean
}
export const HeaderInfo = ({stage=false}) => {
  return (
    <div style={{display:'flex', fontSize:'13px',fontWeight:'bold'}}>
        <p style={{width:'100px'}}>{!stage?'Ingreso':'Parto'}</p>
        <p style={{width:'100px'}}>Código</p>
        <p style={{width:'110px'}}>Ubicación</p>
        <p style={{width:'120px'}}>Raza</p>
        <p style={{width:'100px'}}>Estatus</p>
        <p style={{width:'90px'}}>Parto</p>
        <p style={{width:'110px'}}>Días al parto</p>
        <p style={{width:'100px'}}>Hijos</p>
      </div>
  )
}
