'use client'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { BarChart } from '@mui/x-charts'
import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { LoadingComponent } from '@/app/components'

const StaticsPage = () => {
  const {statics_quantities,getQuantities,staticPigs,getStaticPigs,getStaticPiglets,staticPiglets,getStaticGrowingPigs,staticGrowingPigs} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  useEffect(() => {
    getQuantities(idFarm|| +Cookies.get('id_farm')!)
    getStaticPigs(idFarm|| +Cookies.get('id_farm')!)
    getStaticPiglets(idFarm|| +Cookies.get('id_farm')!)
    getStaticGrowingPigs(idFarm|| +Cookies.get('id_farm')!)
  }, [])

  if(!statics_quantities.length){
    return <LoadingComponent/>
  }
  if(!staticPigs.length || !statics_quantities.length || !staticPiglets.length ||  !staticGrowingPigs.length){
    return <></>
  }
  
  return (
    <div style={{display:'flex',flexWrap:'wrap'}}>
    <div>
    <h4 style={{textAlign:'center'}}>Total: {statics_quantities.reduce((acc,current)=>current.quantity+acc,0)}</h4>
      <BarChart
    xAxis={[
      {
        id: 'barCategories',
        data: statics_quantities.map(s=>s.name),
        scaleType: 'band',
      },
    ]}
    series={[
      {
        data: statics_quantities.map(s=>s.quantity),
      },
    ]}
    width={350}
    height={300}
  />
  </div>
    <div>
      <h4 style={{textAlign:'center'}}>Gestantes: {staticPigs.reduce((acc,current)=>current.quantity+acc,0)}</h4>
      <BarChart
    xAxis={[
      {
        id: 'barCategories',
        data: staticPigs.map(s=>s.name),
        // data: ['bar A', 'bar B', 'bar C'],
        scaleType: 'band',
      },
    ]}
    series={[
      {
        data: staticPigs.map(s=>s.quantity),
        color:'#C16FF7'
      },
    ]}
    width={600}
    height={300}
  />
  </div>
    <div>
    <h4 style={{textAlign:'center'}}>Lechones: {staticPiglets.reduce((acc,current)=>current.quantity+acc,0)}</h4>
      <BarChart
    xAxis={[
      {
        id: 'barCategories',
        data: staticPiglets.map(s=>s.name),
        // data: ['bar A', 'bar B', 'bar C'],
        scaleType: 'band',
      },
    ]}
    series={[
      {
        data: staticPiglets.map(s=>s.quantity),
        color:'#6FCCF7'
      },
    ]}
    width={350}
    height={300}
  />
  </div>
    <div>
    <h4 style={{textAlign:'center'}}>Crecimiento: {staticGrowingPigs.reduce((acc,current)=>current.quantity+acc,0)}</h4>
      <BarChart
    xAxis={[
      {
        id: 'barCategories',
        data: staticGrowingPigs.map(s=>s.name),
        // data: ['bar A', 'bar B', 'bar C'],
        scaleType: 'band',
      },
    ]}
    series={[
      {
        data: staticGrowingPigs.map(s=>s.quantity),
        color:'#C2C4F7'
      },
    ]}
    width={500}
    height={300}
  />
  </div>
    </div>
  )
}

export default StaticsPage