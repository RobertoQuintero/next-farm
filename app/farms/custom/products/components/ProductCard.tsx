import { IProduct } from '@/interfaces'
import { addZero, buildDateReverse } from '@/utils';
import React, { useContext } from 'react'
import { RowButton } from '../../components';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { UiContext } from '@/app/context/ui/UiContext';

interface Props{
  product:IProduct;
  print:boolean;
}

export const ProductCard = ({product,print}:Props) => {
  const {setFarmAction,setProduct} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const onClick = (action:string) =>{
     setFarmAction(action)
     setProduct(product)
     toggleModal()
  };
  
  return (
    <div className={`rowCard ${print&&'odd'}`} style={{fontSize:'14px'}}>
      <div style={{display:'flex'}}>
        <p style={{width:'100px'}}>{
          addZero(new Date(buildDateReverse(product.updated_at as string))).split('-').reverse().join('-')
        }</p>
        <p style={{width:'130px'}}>{product.code}</p>
        <p style={{width:'220px'}}>{product.description}</p>
        <p style={{width:'100px'}}>{product.price}</p>
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('UPDATE')} label="Editar"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
    </div>
  )
}
