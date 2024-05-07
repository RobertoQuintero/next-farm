'use client'
import React from 'react'
import es from 'date-fns/locale/es'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker,{registerLocale} from "react-datepicker";

registerLocale('es',es)

interface Props{
  date: Date | null;
  setDate:React.Dispatch<React.SetStateAction<Date | null>> | ((payload: Date | null) => void);
  disabled?:boolean
}

export const DatePickerElement = ({date,setDate,disabled=false}:Props) => {
  return (
    <DatePicker 
      selected={date} 
      className='datePikerRow'
      onChange={setDate} 
      dateFormat='dd/MM/yyyy'
      locale='es' 
      disabled={disabled}/>
  )
}
