'use client'
import { EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PigletsCard, PostUpdateGrowingPigs, PostUpdatePiglets } from '.'
import { IPiglets } from '@/interfaces'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { RowButton } from '../../components'
import * as XLSX from 'xlsx'

const PigletsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {piglets,setFarmAction,farmAction,getCode,farmsLoading,farmsError,piglet,postPiglets,getPiglets} = useContext(FarmsContext)
  useEffect(() => {
    getPiglets(idFarm!)
  }, [])
  

  const onAdd = async() =>{
    await getCode('lot')
    setFarmAction(undefined)
    toggleModal()
  };

  const onDelete = async() =>{

    const newPiglet ={
      ...piglet,
      status:false
    } as IPiglets
     
    const ok=await postPiglets(newPiglet)
     if(ok){
      toggleModal()
     }
  };

  const getExcel = () =>{

    const newPigs=piglets.map(p=>{
      return {
        'Número':p.code,
        'Ingresado':new Date(p.created_at).toLocaleString().split(',')[0],
        'Días':p.days,
        'Ubicación':p.ubication,
        'Cantidad':p.quantity
      }
    })
    const wb = XLSX.utils.book_new()
    const  ws = XLSX.utils.json_to_sheet(newPigs)

    XLSX.utils.book_append_sheet(wb,ws,"Hoja1")
    XLSX.writeFile(wb,'Lechones.xlsx')
  };

  return (
    <>
     <div className='actionCreateContainer' >
        <div></div>     
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>

      <div style={{textAlign:'center',padding:'0 0 1rem 0',fontWeight:'bold',position:'relative'}}>
      <div style={{display:'flex', gap:'.2rem',paddingRight:'.5rem', position:'absolute', left:0,top:'50%',transform:'translateY(-50%)'}}>
        {/* <RowButton onClick={()=>{}} label="PDF"/> */}
        <RowButton onClick={getExcel} label="Excel"/>
      </div>
        <h3>Lechones</h3>
        </div>
      <div>
      <div style={{display:'flex',fontWeight:'bold',fontSize:'14px',paddingLeft:'.5rem'}}>
        <p style={{width:'100px'}}>Ingresado</p>
        <p style={{width:'50px'}}>Días</p>
        <p style={{width:'100px'}}>Ubicación</p>
        <p style={{width:'50px'}}>Cantidad</p>
      </div>
        {
          piglets.filter(p=>!p.closed&&p.status).length
            ?piglets.filter(p=>!p.closed&&p.status).map(a=><PigletsCard piglet={a} key={a.id_lot_piglets}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction===undefined
              ?<PostUpdatePiglets/>
              :<></>
        }
        {
          farmAction==='CLOSE'
              ?<PostUpdateGrowingPigs/>
              :<></>
        }
        {
          farmAction==='DELETE'
              ?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
              :<></>
        }
      </AppModal>
    </>
  )
}

export default PigletsPage