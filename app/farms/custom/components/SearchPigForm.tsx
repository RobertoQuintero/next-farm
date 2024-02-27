
import {  MenuItem, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"

export const SearchPigForm = () => {
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,pigs,setPig} = useContext(FarmsContext)
  const [barCode, setBarCode] = useState('')
  const router= useRouter()

  const onSubmit=async(e:SyntheticEvent)=>{
    e.preventDefault()
    if(barCode.length){
      const pig= pigs.find(p=>p.bar_code===barCode)
      if(pig){
        setPig(pig)
        Cookies.set('pig',JSON.stringify(pig))
        router.push('/farms/custom/history')
      }
    }
    toggleModal()
  }

  function handleBarcode(scanned_code:string){
    setBarCode(scanned_code)
  }

  useEffect(() => {
    let barcode=''
    let interval:NodeJS.Timeout | undefined= undefined
    const handler=(e:KeyboardEvent)=>{
      if(interval){
        clearInterval(interval)
      }
      if(e.code==='Enter'){
        if(barcode)
        handleBarcode(barcode)
      barcode=''
      return
      }

      if(e.code !='Shift'){
        barcode+=e.key
      }
      interval = setInterval(() => {
        barcode=''
      }, 20);
    }
      document.addEventListener('keydown',handler)
    return () => {
      document.removeEventListener('keydown',handler)
    }
  }, [])

  return (
    <form className='Form' onSubmit={onSubmit}>
      <TextField 
        size="small"
        fullWidth
        label='Código'
        type="text"
        value={barCode}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{

        }}
        disabled
        />
        
        <SaveButton loading={farmsLoading} title='Buscar'/>
    </form>
  )
}
