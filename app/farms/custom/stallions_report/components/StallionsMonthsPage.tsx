'use client'
import {  EmptyPage, LoadingComponent } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { useContext, useEffect } from 'react'
import { StallionReportBox } from './StallionReportBox'
import Cookies from 'js-cookie'

const StallionsMonthsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getStallionMonths,stallion_months,farmsLoading} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)

  useEffect(() => {
    if(!stallion_months){
      getStallionMonths(+Cookies.get('id_farm')!)
    }
  }, [])
  

  const onAdd = async() =>{
     toggleModal()
  };
  

  if(farmsLoading ){
    return <LoadingComponent/>
  }

  if(!stallion_months?.report_crossing.length ||!stallion_months?.report_births ){
    return <EmptyPage/>
  }

  return (
    <>
      <div>
        <h3 style={{textAlign:'center'}}>Cruzas</h3>
        {
          stallion_months?.report_crossing.length
            ? stallion_months?.report_crossing?.map(s=><StallionReportBox stallions={s} type='Cruzas' color='#D86FEB' key={s.stallion}/>)||<></>
            :<EmptyPage/>
        }
      </div>
      <div>
        <h3 style={{textAlign:'center'}}>Cruzas efectivas</h3>
        {
          stallion_months.report_births.length
            ? stallion_months?.report_births?.map(s=><StallionReportBox stallions={s} type='Cruzas efectivas' color='#EB2130' key={s.stallion}/>)||<></>
            :<EmptyPage/>
        }
      </div>

    </>
  )
}

export default StallionsMonthsPage