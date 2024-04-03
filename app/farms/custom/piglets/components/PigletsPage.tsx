'use client'
import { EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { PigletsCard, PostUpdateGrowingPigs, PostUpdatePiglets } from '.'
import { IPiglets } from '@/interfaces'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { RowButton } from '../../components'
import * as XLSX from 'xlsx'
import { useReactToPrint } from 'react-to-print'

const PigletsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {piglets,setFarmAction,farmAction,getCode,farmsLoading,farmsError,piglet,postPiglets,getPiglets} = useContext(FarmsContext)
  const [print, setPrint] = useState(false)
  useEffect(() => {
    getPiglets(idFarm!)
  }, [])

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint:()=>{
      setPrint(false)
    },
  });
  

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
        <RowButton onClick={getExcel} label="Excel"/>
        <RowButton onClick={()=>{
          setPrint(true)
          setTimeout(() => {
            handlePrint()
          }, 200);
        }} label="PDF"/>
      </div>
        <h3>Lechones</h3>
        </div>
      <div>
      <div style={{display:'flex',fontWeight:'bold',fontSize:'14px',paddingLeft:'.5rem'}}>
        <p style={{width:'100px'}}>Ingresado</p>
        <p style={{width:'50px'}}>Días</p>
        <p style={{width:'100px'}}>Ubicación</p>
        <p style={{width:'70px'}}>Cantidad</p>
        <p style={{width:'70px'}}>Etapa</p>
      </div>
        {
          piglets.filter(p=>!p.closed&&p.status).length
            ?piglets.filter(p=>!p.closed&&p.status).map(a=><PigletsCard piglet={a} key={a.id_lot_piglets} print={print}/>)
            :<EmptyPage/>
        }
      </div>
      <div style={{display:'none'}}>
      <div ref={componentRef} style={{padding:'.5rem'}}>
        <div className="pigData pigDataHeader" style={{padding:'1rem .5rem', color:'#fff',backgroundColor:'#2d4154'}}>
        <p style={{width:'100px'}}>Ingresado</p>
        <p style={{width:'50px'}}>Días</p>
        <p style={{width:'100px'}}>Ubicación</p>
        <p style={{width:'70px'}}>Cantidad</p>
        <p style={{width:'70px'}}>Etapa</p>
        </div>
        {
          piglets.filter(p=>!p.closed&&p.status).length
            ?piglets.filter(p=>!p.closed&&p.status).map(a=><PigletsCard piglet={a} key={a.id_lot_piglets} print={print}/>)
            :<EmptyPage/>
        }
      </div>
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