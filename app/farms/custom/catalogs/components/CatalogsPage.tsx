import Link from 'next/link'

const arr=[
  {title:'Ubicaciones',href:'/farms/custom/ubications'},
  {title:'Tareas',href:'/farms/custom/tasks'},
  {title:'Etapas',href:'/farms/custom/stages'},
  {title:'Razas',href:'/farms/custom/races'},
  {title:'Sementales',href:'/farms/custom/stallions'},
  {title:'Motivos de baja',href:'/farms/custom/loss_reasons'},
]

const CatalogsPage = () => {
  

  return (
    <>
      <div>
        {
          arr.map(a=>
          <div className='rowCard' key={a.title}>
          <Link href={a.href}  style={{width:'100%'}}><p>{a.title}</p></Link>  
          </div>
          )
        }
      </div>
    </>
  )
}

export default CatalogsPage