'use client'
import {  EmptyPage,DeleteComponent, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { PostUpdateProduct, ProductCard } from './'
import { IProduct } from '@/interfaces'
import { addZero, buildDateReverse } from '@/utils'
import * as XLSX from 'xlsx'
import { RowButton } from '../../components'
import { useReactToPrint } from 'react-to-print'

const ProductsPage = () => {
  const {toggleModal,isModalOpen} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {getProducts,farmsLoading,products,setProduct,setFarmAction,farmAction,farmsError,product,postProduct} = useContext(FarmsContext)

  const [print, setPrint] = useState(false)

  useEffect(() => {
    getProducts(idFarm|| +Cookies.get('id_farm')!)
  }, [])
  

  const onAdd = () =>{
    setProduct(undefined)
    setFarmAction(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
    const newProduct ={
      ...product,
      status:false
    } as IProduct
     
    const ok=await postProduct(newProduct)
     if(ok){
      toggleModal()
     }
  };
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint:()=>{
      setPrint(false)
    },
  });

  const getExcel = () =>{

    const newPigs=products.map(p=>{
      return {
        'Actualizado':addZero(new Date(buildDateReverse(p.updated_at as string))).split('-').reverse().join('-'),
        'Código':p.code,
        'Descripción':p.description,
        'precio':p.price,
      }
    })
    const wb = XLSX.utils.book_new()
    const  ws = XLSX.utils.json_to_sheet(newPigs)

    XLSX.utils.book_append_sheet(wb,ws,"Hoja1")
    XLSX.writeFile(wb,'Productos.xlsx')
  };

  if(farmsLoading && !isModalOpen){
    return <LoadingComponent/>
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
        <h3>Productos</h3>
        </div>
      <div>
      <div style={{display:'flex',fontWeight:'bold',fontSize:'14px',paddingLeft:'.5rem'}}>
        <p style={{width:'100px'}}>Actualizado</p>
        <p style={{width:'130px'}}>Código</p>
        <p style={{width:'220px'}}>Descripción</p>
        <p style={{width:'100px'}}>Precio</p>
      </div>
        {
          products.filter(p=>p.status).length
            ?products.filter(p=>p.status).map(a=><ProductCard product={a} print={print} key={a.id_product}/>)
            :<EmptyPage/>
        }
      </div>

      <div style={{display:'none'}}>
      <div ref={componentRef} style={{padding:'.5rem'}}>
        <div className="pigData pigDataHeader" style={{padding:'1rem .5rem', color:'#fff',backgroundColor:'#2d4154'}}>
        <p style={{width:'100px'}}>Actualizado</p>
        <p style={{width:'130px'}}>Código</p>
        <p style={{width:'220px'}}>Descripción</p>
        <p style={{width:'100px'}}>Precio</p>
        </div>
        {
          products.filter(p=>p.status).length
            ?products.filter(p=>p.status).map(a=><ProductCard product={a} print={print} key={a.id_product}/>)
            :<EmptyPage/>
        }
      </div>
      </div>

      <AppModal>
        {
          farmAction===undefined || farmAction==='UPDATE' 
              ?<PostUpdateProduct/>
              :<></>
        }
        {
          farmAction==='DELETE'
              ?<DeleteComponent loading={farmsLoading} error={farmsError} onDelete={onDelete}/>
              :<></>
        }
      </AppModal>
    </>
  )
}

export default ProductsPage