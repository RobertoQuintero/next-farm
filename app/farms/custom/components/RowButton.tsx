import React from 'react'
interface Props{
  onClick:()=>void;
  label:string;
}

export const RowButton = ({onClick,label}:Props) => {
  return (
    <button className="rowButton" onClick={onClick}>{label.toLowerCase()}</button>
  )
}
