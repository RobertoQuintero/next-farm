'use client'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { BarChart } from '@mui/x-charts'
import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

const StaticsPage = () => {
  const {statics_quantities,getQuantities} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  useEffect(() => {
    getQuantities(idFarm|| +Cookies.get('id_farm')!)
  }, [])

  if(!statics_quantities.length){
    return <></>
  }
  
  return (
    <div>
      <BarChart
      
    xAxis={[
      {
        id: 'barCategories',
        data: statics_quantities.map(s=>s.name),
        // data: ['bar A', 'bar B', 'bar C'],
        scaleType: 'band',
      },
    ]}
    series={[
      {
        data: statics_quantities.map(s=>s.quantity),
      },
    ]}
    width={500}
    height={300}
  /></div>
  )
}

export default StaticsPage