'use client'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { CSSProperties, useContext, useEffect, useRef } from 'react'
import Cookie from 'js-cookie'
import { BarChart } from '@mui/x-charts'
import { LoadingComponent } from '@/app/components'
import { useReactToPrint } from 'react-to-print'
import { MonthsData } from './MonthsData'

const title={display:'inline-block',width:'200px'} as CSSProperties
const quantity={display:'inline-block',width:'120px'} as CSSProperties

const GeneralPage = () => {
  const {getReport,idFarm,report,farmsLoading} = useContext(FarmsContext)

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // onAfterPrint:()=>{
    //   setPrint(false)
    // },
  });

  useEffect(() => {
    getReport(+Cookie.get('id_farm')!||idFarm!)  
  }, [])

  const data=()=>{
    let resp=[]
    const item=report?.report
    for (const key in item) { 
      resp.push({label:`${key}`,value:(item[key as keyof Object] as any)}) 
    }
    return resp.slice(0,resp.length-1)
  }

  if(farmsLoading){
    return <LoadingComponent/>
  }

  if(!report){
    return <p>Nada por aquí</p>
  }

  

  return (
    <div ref={componentRef} style={{padding:'.5rem'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <p style={{fontWeight:'bold',padding:'0 0 1rem',fontSize:'1.2rem'}}>Inventario</p>
        <p onClick={handlePrint} style={{fontWeight:'bold',cursor:'pointer',padding:'.2rem'}}>PDF</p>
      </div>
      <div style={{display:'flex',flexWrap:'wrap'}}>
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
      <div style={{width:'100%',maxWidth:'600px'}}>
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
                color:'#EB21A9'
              },
            ]}
            sx={{width:'100%'}}
            height={300}
          />
      </div>
      <div style={{padding:'1rem 0'}}>
        <MonthsData report={report}/>
      </div>
     
      </div>
    </div>
  )
}

export default GeneralPage
