export const addZero = (today:Date):string => {
  const date=[today.getFullYear(),today.getMonth()+1,today.getDate()]
  const converted= date.map(d=>{
    if(+d<10){
      return `0${d}`
    }
    return d
  }).join('-')
  return converted
};

export const buildDate=(date:Date)=>{
  return `${addZero(date)} ${date.toLocaleTimeString().substring(0,8)}`
}

export const buildDateReverse=(date:string)=>{
  const day = date?.split('T')[0]
  const hour=date?.split('T')[1].split('.')[0]
  return `${day} ${hour}`
}