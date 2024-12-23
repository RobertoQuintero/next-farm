'use client'
import {  EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { GrowingPigCard, GrowingPigsChangeStage, GrowingPigsCloseConfirm, MoveGrowingPig } from '.'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { LossForm, RowButton } from '../../components'
import * as XLSX from 'xlsx'
import { useReactToPrint } from 'react-to-print'
import Cookies from 'js-cookie'

const GrowingPigsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getGrowingPigs,growing_pigs,farmAction,farmsLoading,farmsError,postGrowingPigs,growing_pig,setGrowingPig,setFarmAction,setGrowingPigs} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  const [print, setPrint] = useState(false)

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint:()=>{
      setPrint(false)
    },
  });

  useEffect(() => {
    if(idFarm){
      getGrowingPigs(idFarm!|| Number(Cookies.get('id_farm')))

    }
  }, [idFarm])
  

  const onAdd = () =>{
    setFarmAction(undefined)
    setGrowingPig(undefined)
    toggleModal()
  };

  const onDelete = async() =>{

    const newGrowing ={
      ...growing_pig,
      status:false
    } as IGrowingPigs
     
    const ok=await postGrowingPigs(newGrowing)
     if(ok){
      toggleModal()
     }
  };

  const getExcel = () =>{

    const newPigs=growing_pigs.map(p=>{
      return {
        'Ingresado':new Date(p.created_at).toLocaleString().split(',')[0],
        'Salida':new Date(p.exit_date).toLocaleString().split(',')[0],
        'Ubicación':p.ubication,
        'Cantidad':p.quantity,
        'Peso':p.average_weight,
        'Etapa':p.pig_stage
      }
    })
    const wb = XLSX.utils.book_new()
    const  ws = XLSX.utils.json_to_sheet(newPigs)
    ws['!cols'] = [{wch: 18},{wch: 18},{wch: 18},{wch: 18},{wch: 18},{wch: 18}]
    XLSX.utils.book_append_sheet(wb,ws,"Hoja1")
    XLSX.writeFile(wb,'Crecimiento.xlsx')
  };

  const compareDates=(a:IGrowingPigs, b:IGrowingPigs)=> {
    if (new Date(a.start_date) < new Date(b.start_date)) {
      return -1;
    }
    if (new Date(a.start_date) > new Date(b.start_date)) {
      return 1;
    }
    return 0;
  }

  const compareExitDates=(a:IGrowingPigs, b:IGrowingPigs)=> {
    if (new Date(a.exit_date) < new Date(b.exit_date)) {
      return -1;
    }
    if (new Date(a.exit_date) > new Date(b.exit_date)) {
      return 1;
    }
    return 0;
  }

  const  compareUbications=(a:IGrowingPigs, b:IGrowingPigs)=> {
    if (a.ubication! < b.ubication!) {
      return -1;
    }
    if (a.ubication! > b.ubication!) {
      return 1;
    }
    return 0;
  }
  const  compareQuantities=(a:IGrowingPigs, b:IGrowingPigs)=> {
    if (a.quantity! < b.quantity!) {
      return -1;
    }
    if (a.quantity! > b.quantity!) {
      return 1;
    }
    return 0;
  }

  const  compareWeight=(a:IGrowingPigs, b:IGrowingPigs)=> {
    if (a.average_weight! < b.average_weight!) {
      return -1;
    }
    if (a.average_weight! > b.average_weight!) {
      return 1;
    }
    return 0;
  }

  const  compareStages=(a:IGrowingPigs, b:IGrowingPigs)=> {
    if (a.pig_stage! < b.pig_stage!) {
      return -1;
    }
    if (a.pig_stage! > b.pig_stage!) {
      return 1;
    }
    return 0;
  }

  return (
    <>
     <div className='actionCreateContainer'>
        <div></div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>

      <div style={{textAlign:'center',padding:'0 0 1rem 0',fontWeight:'bold',position:'relative'}}>
      <div style={{display:'flex', gap:'.2rem',paddingRight:'.5rem', position:'absolute', left:0,top:'50%',transform:'translateY(-50%)'}}>
        <RowButton onClick={getExcel} label="Excel"/>
        <RowButton onClick={()=>{
          setPrint(true)
          setTimeout(() => {
            handlePrint()
          }, 200);
        }} label="PDF"/>
      </div>
        <h3>Crecimiento</h3>
        </div>
      <div 
        className='pigData'
        style={{padding:'0 0 0 .4rem',fontWeight:'bold'}}
        >
        <p  style={{cursor:'pointer',width:'80px'}} onClick={()=>setGrowingPigs(growing_pigs.sort(compareDates))}>Ingresado</p>
        <p style={{cursor:'pointer',width:'80px'}} onClick={()=>setGrowingPigs(growing_pigs.sort(compareExitDates))}>Salida</p>
        <p style={{width:'130px',cursor:'pointer'}}  onClick={()=>setGrowingPigs(growing_pigs.sort(compareUbications))}>Ubicación</p>
        <p style={{cursor:'pointer',width:'80px'}} onClick={()=>setGrowingPigs(growing_pigs.sort(compareQuantities))}>Cantidad</p>
        <p style={{cursor:'pointer',width:'80px'}} onClick={()=>setGrowingPigs(growing_pigs.sort(compareWeight))}>Peso prom.</p>
        <p style={{cursor:'pointer',width:'90px'}} onClick={()=>setGrowingPigs(growing_pigs.sort(compareStages))}>Etapa</p>
        <p style={{width:'90px',textAlign:'center'}} >Baja</p>
      </div>
        {
          growing_pigs.filter(g=>!g.closed&&g.status).length
            ?growing_pigs.filter(g=>!g.closed&&g.status).map(a=><GrowingPigCard growingPig={a} key={a.id_growing_lot} print={print}/>)
            :<EmptyPage/>
        }
      </div>

      <div style={{display:'none'}}>
      <div ref={componentRef} style={{padding:'.5rem'}}>
        <div className="pigData pigDataHeader" style={{padding:'1rem .5rem', color:'#fff',backgroundColor:'#2d4154'}}>
        <p >Ingresado</p>
        <p>Salida</p>
        <p>Ubicación</p>
        <p>Cantidad</p>
        <p>Peso prom.</p>
        <p>Etapa</p>
        </div>
        {
          growing_pigs.filter(g=>!g.closed&&g.status).length
            ?growing_pigs.filter(g=>!g.closed&&g.status).map(a=><GrowingPigCard growingPig={a} key={a.id_growing_lot} print={print}/>)
            :<EmptyPage/>
        }
      </div>
      </div>

      <AppModal>
        <></>
        {
          farmAction==='STAGE'|| farmAction===undefined?<GrowingPigsChangeStage/>:<></>
        }
        {
          farmAction==='CLOSE'?<GrowingPigsCloseConfirm />:<></>
        }
        {
          farmAction==='MOVE'?<MoveGrowingPig />:<></>
        }
        {
          farmAction==='DELETE'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
        }
        {
          farmAction==='LOSS'?<LossForm />:<></>
        }
      </AppModal>
    </>
  )
}

export default GrowingPigsPage