import React from 'react'
interface Props{
  onClick:()=>void;
  label:string;
  color?:string
}

export const RowButton = ({onClick,label,color='#000'}:Props) => {
  return (
    <button style={{color}} className="rowButton" onClick={onClick}>{label.toLowerCase()}</button>
  )
}
