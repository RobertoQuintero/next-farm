'use client'
import { BackButton } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useRef, useState } from 'react'
import NextBirthRow from './NextBirthRow'
import { RowButton } from '../../components'
import { addZero, buildDateReverse } from '@/utils'
import * as XLSX from 'xlsx'
import { useReactToPrint } from 'react-to-print'
import { IPig } from '@/interfaces'

const months=(month:string)=>{
  switch (month) {
    case 'ENE':
      return 'Enero'
    case 'FEB':
      return 'Febrero'
    case 'MAR':
      return 'Marzo'
    case 'ABR':
      return 'Abril'
    case 'MAY':
      return 'Mayo'
    case 'JUN':
      return 'Junio'
    case 'JUL':
      return 'Julio'
    case 'AGO':
      return 'Agosto'
    case 'SEP':
      return 'Septiembre'
    case 'OCT':
      return 'Octubre'
    case 'NOV':
      return 'Noviembre'
    case 'DIC':
      return 'Diciembre'
  }
}

const NextBirthsPage = () => {
  const {monthBirth,pigs} = useContext(FarmsContext)
  const [print, setPrint] = useState(false)
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint:()=>{
      setPrint(false)
    },
  });

  const getExcel = () =>{

    const newPigs=pigs.filter(p=>p.month_name===monthBirth?.month).map(p=>{
      return {
        'Código':addZero(new Date(p.created_at)).split('-').reverse().join('-'),
        'Ubicación':p.pig_ubication,
        'Raza':p.pig_race,
        'Semental':p.crossing_stallion,
        'Monta':addZero(new Date(buildDateReverse(p.crossing_date))),
        'Parto':p.next_birth?addZero(new Date(buildDateReverse(p.next_birth as string))):'',
        'Destetando':p.id_pig_stage===6?'Si':'No'
      }
    })
    const wb = XLSX.utils.book_new()
    const  ws = XLSX.utils.json_to_sheet(newPigs,{cellStyles:true,})
    ws['!cols'] = [{wch: 18},{wch: 18},{wch: 18},{wch: 18},{wch: 18},{wch: 18},{wch: 18}]
    XLSX.utils.book_append_sheet(wb,ws,"Hoja1")
    XLSX.writeFile(wb,`Partos${months(monthBirth?.month!)}.xlsx`)
  };

  const compareDates=(a:IPig, b:IPig)=> {
    if (new Date(a.crossing_date) < new Date(b.crossing_date)) {
      return -1;
    }
    if (new Date(a.crossing_date) > new Date(b.crossing_date)) {
      return 1;
    }
    return 0;
  }

  return (
    <div>
      <div style={{display:'flex',gap:'3rem'}}>
      <BackButton/>
      <div style={{display:'flex', gap:'.2rem'}}>
        <RowButton onClick={getExcel} label="Excel"/>
        <RowButton onClick={()=>{
          setPrint(true)
          setTimeout(() => {
            handlePrint()
          }, 200);
        }} label="pdf"/>
      </div>

      </div>
      <div ref={componentRef} style={{padding:print?'2rem 1rem':''}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <p>Información de partos {months(monthBirth?.month!)} </p>
        {
          print?<p style={{padding:'0 2rem 0 0'}} >{addZero(new Date())} </p>:<></>
        }

        </div>
        <div>
          <div style={{display:'flex',fontSize:'14px',fontWeight:'bold',padding:'1rem 0'}}>
          <p style={{width:'70px'}}>Código</p>
          <p style={{width:'80px'}}>Ubicación</p>
          <p style={{width:'150px'}}>Raza</p>
          <p style={{width:'100px'}}>Semental</p>
          <p style={{width:'100px'}}>Monta</p>
          <p style={{width:'100px'}}>Parto</p>
          <p style={{width:'100px'}}>Destetando</p>
        </div>
          {
            pigs.filter(p=>p.month_name===monthBirth?.month)
            .sort(compareDates)
              .map(p=><NextBirthRow pig={p} key={p.id_pig}/>)
          }
      </div>
      </div>
    </div>
  )
}

export default NextBirthsPage