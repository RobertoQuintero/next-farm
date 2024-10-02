'use client'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { CSSProperties, useContext, useEffect, useRef } from 'react'
import Cookie from 'js-cookie'
import { BarChart } from '@mui/x-charts'
import { LoadingComponent } from '@/app/components'
import { useReactToPrint } from 'react-to-print'

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
      <div>

      <BarChart
      colors={['#3728D5','#C02EF2','#802EF2','#2E5BF2','#371763','#8638F4']}
          xAxis={[
            {
              id: 'barCategories',
              data: ['Lechones','Caja','30kg a 50kg','51kg a 80kg','Otros','Gestación'],
              scaleType: 'band',
            },
          ]}
          yAxis={[
            {
              tickNumber:5,
              tickLabelStyle:{fontSize:'14px'},        
              tickSize:3,
            }
          ]}
          series={[
            {
              data: data().map(d=>d.value),
            },
          ]}
          width={450}
          height={300}
        />
      </div>
     
      </div>
      <div style={{display:'flex',gap:'5rem',flexWrap:'wrap'}}>
        <div>
        <p style={{fontWeight:'bold',padding:'1rem 0',fontSize:'1.2rem'}}>Crecimiento - Análisis salidas</p>
        <div  style={{display:'flex',fontWeight:'bold'}}>
            <p style={{width:'110px'}}>Mes</p>
            <p>Cantidad</p>
          </div>
        {
          report?.growing.map(r=><div key={r.month} style={{display:'flex'}}>
            <p style={{width:'110px'}}>{r.month}</p>
            <p>{r.quantity}</p>
          </div>)
        }
        </div>
        <div>
        <p style={{fontWeight:'bold',padding:'1rem 0',fontSize:'1.2rem'}}>Gestación - Análisis partos</p>
        
        {
          report?.pigs.map(r=><div key={r.stage} style={{padding:'0 0 1rem'}} >
            <p style={{fontWeight:'bold'}}>- {r.stage} -</p>
            <div  style={{display:'flex',fontWeight:'bold'}}>
              <p style={{width:'110px'}}>Mes</p>
              <p>Cantidad</p>
            </div>
            {
              r.months.map(r=><div key={r.month} style={{display:'flex'}}>
                <p style={{width:'110px'}}>{r.month}</p>
                <p>{r.quantity}</p>
              </div>)
            }
          </div>)
        }
        </div>

      </div>
    </div>
  )
}

export default GeneralPage
