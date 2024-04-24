'use client'
import { BackButton, EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { StallionReportBox } from './StallionReportBox'

const StallionsMonthsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getStallionMonths,stallion_months} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)

  useEffect(() => {
    getStallionMonths(idFarm!)
  }, [])
  

  const onAdd = async() =>{
     toggleModal()
  };


  return (
    <>
      <div>
        <h3 style={{textAlign:'center'}}>Cruzas</h3>
        {
          stallion_months
            ? stallion_months.report_crossing.map(s=><StallionReportBox stallions={s} type='Cruzas' color='#D86FEB' key={s.stallion}/>)
            :<EmptyPage/>
        }
      </div>
      <div>
        <h3 style={{textAlign:'center'}}>Cruzas efectivas</h3>
        {
          stallion_months
            ? stallion_months.report_births.map(s=><StallionReportBox stallions={s} type='Cruzas efectivas' color='#EB2130' key={s.stallion}/>)
            :<EmptyPage/>
        }
      </div>

    </>
  )
}

export default StallionsMonthsPage