export const  compareObjects=<T extends object>(obj1:T, obj2:T)=> {
  // Obtener las claves de ambos objetos
  const keysObj1 = Object.keys(obj1) ;
  const keysObj2 = Object.keys(obj2);
  // Verificar si la cantidad de propiedades es la misma
  if (keysObj1.length !== keysObj2.length) {
      return false;
  }
  for (let key of keysObj1) {
    //@ts-ignore
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  // Verificar si todas las claves de obj2 existen en obj1 y tienen los mismos valores
  for (let key of keysObj2) {
    //@ts-ignore
      if (!obj1.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
          return false;
      }
  }
  // Si todas las claves tienen los mismos valores en ambos objetos, retornar true
  return true;
}