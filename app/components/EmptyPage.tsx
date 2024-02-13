

export const EmptyPage = ({title=undefined}:{title?:string| undefined}) => {
  return (
    <div style={{ paddingTop:'3rem',textAlign:'center'}}>
      <h4>Eres nuevo por aquí 🔎</h4>
      {title?<h5>{title}</h5>:<></>}
    </div>
  )
}
