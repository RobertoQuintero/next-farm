'use client'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import Cookie from 'js-cookie'
import { BarChart } from '@mui/x-charts'
import { LoadingComponent } from '@/app/components'
import { useReactToPrint } from 'react-to-print'
import { MonthsData } from './MonthsData'
import { LossesReport } from '../../reports/components/LossesReport'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { GrowingPigCard } from '../../growing_pigs/components'
import { PregnatPigsReport } from '../../reports/components/PregnatPigsReport'

const title={display:'inline-block',width:'200px'} as CSSProperties
const quantity={display:'inline-block',width:'120px'} as CSSProperties

const GeneralPage = () => {
  const {getReport,report,getPigLossTypes,getStaticPigs,staticPigs,getGrowingPigs,growing_pigs,staticPiglets,getStaticPiglets,getPigs} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  const componentRef = useRef(null);
  const [print, setPrint] = useState(true)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // onAfterPrint:()=>{
    //   setPrint(false)
    // },
  });

  useEffect(() => {
    let flag=true
    if(idFarm&&flag){
      Promise.all([
        getReport(+Cookie.get('id_farm')!||idFarm!)  ,
        getPigLossTypes(idFarm!),
        getStaticPigs(idFarm!),
        getGrowingPigs(idFarm!),
        getStaticPiglets(idFarm),
        getPigs(idFarm!)
      ])
      flag=false
    }
  }, [idFarm])

  const data=()=>{
    let resp=[]
    const item=report?.report
    for (const key in item) { 
      resp.push({label:`${key}`,value:(item[key as keyof Object] as any)}) 
    }
    return resp.slice(0,resp.length-1)
  }

  // if(farmsLoading){
  //   return <LoadingComponent/>
  // }

  if(!report){
    return <LoadingComponent/>
  }

  

  return (
    <div className='mediaquery'>

      <div ref={componentRef} style={{padding:'.5rem',display:'flex',flexDirection:'column',width:'900px'}} >
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <p style={{fontWeight:'bold',padding:'0 0 1rem',fontSize:'1.2rem'}}>Inventario</p>
          <p onClick={handlePrint} style={{fontWeight:'bold',cursor:'pointer',padding:'.2rem'}}>PDF</p>
        </div>
        <div style={{display:'flex',gap:'1rem',width:'100%',flexDirection:'column'}}>
        <div style={{border:'1px solid #ccc',borderRadius:'3px',padding:'.2rem .5rem',maxWidth:'400px'}}>
          <p style={{display:'flex'}}>
            <span style={{...title,fontWeight:'bold'}}>Tipo</span><span style={{...quantity,fontWeight:'bold'}}>Cantidad</span>
          </p>
          <p>
            <span style={title}>Lechones maternidad:</span><span style={quantity}>{report?.report.piglets.toLocaleString('en')}</span>
          </p>
          <p>
            <span style={title}>Caja:</span><span style={quantity}>{report?.report.box.toLocaleString('en')}</span>
          </p>
          <p>
            <span style={title}>30kg a 50kg:</span><span style={quantity}>{report?.report.weight_1.toLocaleString('en')}</span>
          </p>
          <p>
            <span style={title}>51kg a 80kg:</span><span style={quantity}>{report?.report.weight_2.toLocaleString('en')}</span>
          </p>
          <p>
            <span style={title}>Otros:</span><span style={quantity}>{report?.report.others.toLocaleString('en')}</span>
          </p>
          <p>
            <span style={title}>Gestación y maternidad:</span><span style={quantity}>{report?.report.pigs.toLocaleString('en')}</span>
          </p>
          <p>
            <span style={title}>Total:</span><span style={quantity}>{report?.report.total.toLocaleString('en')}</span>
          </p>
        </div>
        <MonthsData report={report}/>
          
              <div>
                <h3>Crecimiento</h3>
                <div 
                  className='pigData'
                  style={{padding:'0 0 0 .4rem',fontWeight:'bold'}}
                  >
                  <p  style={{cursor:'pointer',width:'80px'}} >Ingresado</p>
                  <p style={{cursor:'pointer',width:'80px'}} >Salida</p>
                  <p style={{width:'130px',cursor:'pointer'}}  >Ubicación</p>
                  <p style={{cursor:'pointer',width:'80px'}} >Cantidad</p>
                  <p style={{cursor:'pointer',width:'80px'}} >Peso prom.</p>
                  <p style={{cursor:'pointer',width:'90px'}} >Etapa</p>
                  <p style={{width:'90px',textAlign:'center'}} >Baja</p>
                </div>
              {
                growing_pigs.filter(g=>!g.closed&&g.status).length
                            ?growing_pigs.filter(g=>!g.closed&&g.status).map(a=><GrowingPigCard growingPig={a} key={a.id_growing_lot} print={print}/>)
                            :<></>
              }

              </div>
              <PregnatPigsReport/>
              <div style={{boxShadow:'0 0 2px rgba(0,0,0,0.5)',width:600}}>
                <h3 style={{padding:'1rem 0 0 1rem'}}>Inventario</h3>
              <div style={{display:'flex',gap:'1rem',justifyContent:'space-evenly',padding:'1rem 2.5rem 0',fontWeight:'bold'}}>
                    {
                      data().map((s,i)=><p key={i}>{s.value}</p>)
                    }
                  </div>
                <BarChart
                
                xAxis={[
                  {
                    id: 'barCategories',
                    data: ['Lechones','Caja','30kg a 50kg','51kg a 80kg','Otros','Gestación'],
                    scaleType: 'band',

                  },
                ]}
                series={[
                  {
                    data: data().map(d=>d.value),
                    color:'#EB21A9',
                    // label:'label'
                  },
                ]}
                // sx={{width:'500px'}}
                height={300}
                width={600}
              /> 
              </div>
            <div style={{width:'100%'}}>
            {
              staticPigs.length
                ?<div style={{boxShadow:'0 0 2px rgba(0,0,0,0.5)',width:600}}>
                  <h3 style={{padding:'1rem 0 0 1rem'}}>Gestantes</h3>
                  <div style={{display:'flex',gap:'1rem',justifyContent:'space-evenly',padding:'1rem 2.5rem 0',fontWeight:'bold'}}>
                    {
                      staticPigs.map((s,i)=><p key={i}>{s.quantity}</p>)
                    }
                  </div>
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
              :<></>
            }
              {
                staticPiglets.length
                ?<div style={{boxShadow:'0 0 2px rgba(0,0,0,0.5)',width:350,marginTop:'1rem'}}>
                  <h3 style={{padding:'1rem 0 0 1rem'}}>Lechones</h3>
                  <div style={{display:'flex',gap:'1rem',justifyContent:'space-evenly',padding:'1rem 2.5rem 0',fontWeight:'bold'}}>
                    {
                      staticPiglets.map((s,i)=><p key={i}>{s.quantity}</p>)
                    }
                  </div>
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
              :<></>
              }

            </div>
              
            <div style={{width:'100%'}}>
              <LossesReport/>

            </div>
      
      
        </div>
      </div>
    </div>
  )
}

export default GeneralPage
