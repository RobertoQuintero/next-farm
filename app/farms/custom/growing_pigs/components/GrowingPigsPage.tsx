'use client'
import { BackButton, EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { GrowingPigCard, GrowingPigsChangeStage, GrowingPigsCloseConfirm } from '.'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { RowButton } from '../../components'
import * as XLSX from 'xlsx'

const GrowingPigsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getGrowingPigs,growing_pigs,farmAction,farmsLoading,farmsError,postGrowingPigs,growing_pig} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)

  useEffect(() => {
    getGrowingPigs(idFarm!)
  }, [])
  

  const onAdd = async() =>{
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

    XLSX.utils.book_append_sheet(wb,ws,"Hoja1")
    XLSX.writeFile(wb,'Crecimiento.xlsx')
  };

  return (
    <>
     <div className='actionCreateContainer'>
        {/* <BackButton/> */}
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
        {/* <RowButton onClick={()=>{}} label="PDF"/> */}
        <RowButton onClick={getExcel} label="Excel"/>
      </div>
        <h3>Crecimiento</h3>
        </div>
      <div 
        className='pigData'
        style={{padding:'0 0 0 .4rem',fontWeight:'bold'}}
        >
        <p >Ingresado</p>
        <p>Salida</p>
        <p>Ubicación</p>
        <p>Cantidad</p>
        <p>Peso prom.</p>
        <p>Etapa</p>
      </div>
        {
          growing_pigs.filter(g=>!g.closed&&g.status).length
            ?growing_pigs.filter(g=>!g.closed&&g.status).map(a=><GrowingPigCard growingPig={a} key={a.id_growing_lot}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        <></>
        {
          farmAction==='STAGE'?<GrowingPigsChangeStage/>:<></>
        }
        {
          farmAction==='CLOSE'?<GrowingPigsCloseConfirm />:<></>
        }
        {
          farmAction==='DELETE'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
        }
      </AppModal>
    </>
  )
}

export default GrowingPigsPage