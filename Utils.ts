
const fs = require('fs')

let chequear = (path: string) => {
   
    return fs.existsSync(path)
    
}
let escribir = (data: object, path: string) => {
   return fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
let leer= (path: string) => {
    try {
        if(chequear(path)){
           let result = JSON.parse(fs.readFileSync(path))
           return result  
        }
    } catch (error) {
        console.log(error);
    }
}
let guardar = (path: string, data: object) => {
    if (chequear(path)){
        let guardarDatos: any =  [...leer(path), data];
        return escribir(guardarDatos, path)
    } else {
        
        console.log('creando...');
        return escribir([data], path);
    }
}
export {chequear, escribir, leer, guardar}



