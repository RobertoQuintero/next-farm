'use client'
import { AccessErrorComponent,  BackToFarms, DeleteComponent, EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { Button, CardActionArea } from '@mui/material'
import { CSSProperties, useContext, useEffect, useState } from 'react'
import { PigCard, PostUpdatePig } from '.'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { IPig } from '@/interfaces'
import Cookie from 'js-cookie'
import Link from 'next/link'
import { CachedOutlined } from '@mui/icons-material'
import { useUi } from '@/app/context/ui/useUi'

const style={
  backgroundColor:'#fff',
  padding:'0 .5rem',
  border:'1px solid #ccc',
  borderRadius:'3px'
} as CSSProperties

const FarmPage = () => {
  const {toggleModal,isModalOpen} = useUi()
  const {idFarm,user} = useContext(AuthContext)
  const {farmsLoading,pigs,getPigs,setPig,setFarmAction,farmAction,farmsError,pig,postPig,getFarm,farm,getCode,stallions,ubications} = useContext(FarmsContext)
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)
  useEffect(() => {
    if(idFarm){
      getFarm(idFarm)
      getPigs(idFarm)
      getCode()
    }else{
      let id= Number(Cookie.get('id_farm'))
      getFarm(id!)
      getPigs(id!)
      getCode()
    }    
  }, [idFarm])

  
  if(farmsLoading && !isModalOpen){
    return <LoadingComponent/>
  }
  const onAdd = async() =>{
    setError(false)
    setError2(false)
    if(!stallions.length){
      setError(true)
      return
    }
    if(!ubications.length){
      setError2(true)
      return
    }
    setFarmAction(undefined)
    setPig(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
     const newPig={...pig,status:false} as IPig
     const ok= await postPig(newPig)
     if(ok){
      toggleModal()
     }
  };

  const onRefresh = async() =>{
    getPigs(idFarm!)
    getCode()
  };

  return (
    <>
     <div className='actionCreateContainer'>
      <AccessErrorComponent/>
        <div style={{display:'flex',gap:'.5rem'}}>
          {user?.id_role===1&&<BackToFarms/>}
          <CardActionArea
            onClick={onRefresh}
            style={style} >
            <CachedOutlined fontSize='small'/>
          </CardActionArea>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'1rem',color:'red'}}>
        {
            error?<p style={{fontSize:'14px'}}>Debe agregar un Semental <Link href='/farms/custom/stallions' style={{textDecoration:'underline'}}>Click!</Link></p>:<></>
          }
        {
            error2?<p style={{fontSize:'14px'}}>Debe agregar una Ubicación <Link href='/farms/custom/ubications' style={{textDecoration:'underline'}}>Click!</Link></p>:<></>
          }
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
        </div>
      </div>
      <p style={{textAlign:'center',padding:'0 0 1rem 0',fontWeight:'bold'}}>{farm?.name}</p>
      <div>
        <div className="pigData pigDataHeader">
          <p>Número</p>
          <p>Ubicación</p>
          <p>Raza</p>
          <p>Situación</p>
        </div>
        {
          pigs.filter(p=>p.status).length
            ?pigs.filter(p=>p.status).map(a=><PigCard pig={a} key={a.id_pig}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction==='EDIT' || farmAction===undefined ? <PostUpdatePig/>:<></>
        }
        {
          farmAction==='DELETE'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
        }
      </AppModal>
    </>
  )
}

export default FarmPage