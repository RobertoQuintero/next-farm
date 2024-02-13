

export const EmptyPage = ({title=undefined}:{title?:string| undefined}) => {
  return (
    <div style={{ paddingTop:'3rem',textAlign:'center'}}>
      <h4>Eres nuevo por aquí 🔎</h4>
      {title?<h3>{title}</h3>:<></>}
    </div>
  )
}
