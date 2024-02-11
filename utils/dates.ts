export const addZero = (today:Date):string => {
  const date=today.toLocaleString().split(',')[0].split('/') as string[]
  const converted= date.map(d=>{
    if(+d<10){
      return `0${d}`
    }
    return d
  }).reverse().join('-')
  return converted
};