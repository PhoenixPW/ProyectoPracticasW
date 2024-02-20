export const leerPDF = async (e, archivoPDF, setClases) =>{
    e.preventDefault();
    console.log(archivoPDF);
    let listaClases = []; // Lista en la que se guardaran las clases que se encuentren al leer el PDF
    let numeroCampo = 0; // Representa el numero de campo de la tabla que contiene el PDF.
    let nrc;
    let clave;
    let materia;
    let seccion;
    let nombreProfesor;
    if(archivoPDF!==null)
    { //Se comprueba si el PDF tiene datos.
     const task = pdfjsLib.getDocument(archivoPDF); //Se obtiene la referencia al PDF
     try
     {
       const pdf = await task.promise; // Se accede al PDF.
       console.log(pdf.numPages);
       
       //Se pasaran por todas las paginas del PDF para extraer la informacion de las clases.
       for(let j=1; j<=pdf.numPages; j++)
       {
       const page = await pdf.getPage(j); // Se accede a una de las paginas del PDF.
       const contenido = await page.getTextContent(); // Se obtiene el contenido de la pagina, distribuyendo cada una 
                                                      // de sus partes en un arreglo. 
       contenido.items.forEach( function(item)
       { //Se pasara por cada uno de los elementos del arreglo. 
        let elementoString = item.str //Se convierte el elemento en un String.
        if(!isNaN(elementoString))
        { //Se verifica si el elemento es un numero.
         let datoNumerico = parseInt(elementoString)
         if(datoNumerico !== parseInt(nrc)) //Si ya se ha obtenido una clase, se verifica si el dato extraido es el mismo NRC.
         {
          if( (Math.floor(Math.log10(datoNumerico)) + 1) == 5) // Se verifica si el dato extraido es el NRC de la clase.
          {
           numeroCampo++; //Se indica que se extraera el dato del primer campo de la tabla del PDF.
          }
         }
        }
        switch(numeroCampo)
        { //Se revisa en cual campo se estra trabajando en un determinado momento.
          case 0: //Indica que aun no comienza la extraccion de alguno de los campos.
                 break;
          case 1: //Campo NRC
                 nrc = elementoString;
                 numeroCampo++;
                 break;
          case 2: //Campo clave
                 if(elementoString !== " " && elementoString !== "")
                 { //Se verifica si en el elemento extraido comienza el campo a extraer.
                   //Si es un espacio en blanco, entonces ese elemento representa la linea que existe entre 2 campos en la tabla. 
                  clave = elementoString;
                  numeroCampo++; 
                 }
                 break;
          case 3: //Campo materia
                 if(elementoString !== " ")
                 {
                  if( /\d/.test(elementoString))
                  { //Se verifica si elemento extraido aun pertenece a la clave de la materia.
                   clave += elementoString; //Si pertenece a la clave, se agrega al valor que tiene la variable clave.
                  }
                  else
                  { //Si el elemento extraido no pertenece a la clave, entonces se guarda el elemento en la variable materia.
                   materia = elementoString;
                   numeroCampo++;
                  }
                 }
                 break;
          case 4: //Campo seccion
                 if(elementoString !== " ")
                 {
                  if(/\d/.test(elementoString))
                  {//Se verifica si el elemento extraido pertenece al nombre de la materia.
                   seccion = elementoString; //Si no pertenece al nombre de la materia, entonces se guarda el elemento en la variable seccion.
                   numeroCampo++;                  
                  }
                  else
                  { //Si pertenece al nombre de la materia, se agrega el valor extraido a la variable materia.
                   materia += elementoString; 
                  }
                 }
                 break;
          case 7: //Campo profesor
                 if(elementoString !== " " && elementoString !== "-")
                 {
                  if(/\d/.test(elementoString)==false)
                  { //Se verifica si el elemento extraido pertenece al nombre del profesor,
                   // revisando que el mismo no tenga algun numero.
                   nombreProfesor = elementoString;
                   numeroCampo++;
                  }
                 }
                 break;
          case 8:
                 if(elementoString !== " ")
                 {
                  if(/\d/.test(elementoString))
                  { //Se revisa si se ha llegado al ultimo campo de la tabla del PDF.
                   //
                   // Procesamiento y limpieza de los datos
                   //
                   seccion = seccion.replaceAll("O","0"); //Se transforman las letras O de la seccion en 0's.
                   nombreProfesor = nombreProfesor.replace("-",""); //Se elimina el caracter - del nombre del profesor.
                   let clase = {
                    nrc: nrc,
                    clave: clave,
                    materia: materia,
                    seccion: seccion,
                    profesor: nombreProfesor,
                   };
                   console.log(clase);
                   listaClases.push(clase);
                   numeroCampo = 0;
                  }
                  else
                  { //Si aun no se ha llegado al ultimo campo, entonces elemento extraido pertenece al nombre del profesor.
                   nombreProfesor += elementoString;
                  }
                 }
                 break;
 
          default: if(elementoString !== " ") //Si existe
                   {
                    numeroCampo++;
                   }
                   break;
        }
       }
       );
       }
 
       setClases(listaClases);
     } catch(e){
      console.log("!!!Error al intentar cargar el PDF!!!:", e)
     }
     
    }
   }
 