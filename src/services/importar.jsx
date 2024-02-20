import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
GlobalWorkerOptions.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
import MateriaCard from "../components/card"
import {Button} from "@nextui-org/react";




function Importar() {
  const [archivoPDF, setArchivoPDF] = useState(null);
  const [clases, setClases] = useState([]);

  const manejarArchivo = (e) => {
    let archivoSeleccionado = e.target.files[0];
    if (archivoSeleccionado) {
      let leerArchivo = new FileReader();
      leerArchivo.readAsArrayBuffer(archivoSeleccionado);
      leerArchivo.onload = (e) => {
        setArchivoPDF(e.target.result);
      };
    }
  };

  const leerPDF = async (e) => {
    e.preventDefault();
    console.log(archivoPDF);
    let listaClases = [];
    let numeroCampo = 0;
    let nrc, clave, materia, seccion, nombreProfesor;

    if (archivoPDF !== null) {
      const task = pdfjsLib.getDocument(archivoPDF);
      try {
        const pdf = await task.promise;
        console.log(pdf.numPages);

        for (let j = 1; j <= pdf.numPages; j++) {
          const page = await pdf.getPage(j);
          const contenido = await page.getTextContent();
          contenido.items.forEach(function (item) {
            let elementoString = item.str;
            if (!isNaN(elementoString)) {
              let datoNumerico = parseInt(elementoString);
              if (datoNumerico !== parseInt(nrc)) {
                if (Math.floor(Math.log10(datoNumerico)) + 1 === 5) {
                  numeroCampo++;
                }
              }
            }
            switch (numeroCampo) {
              case 0:
                break;
              case 1:
                nrc = elementoString;
                numeroCampo++;
                break;
              case 2:
                if (elementoString !== ' ' && elementoString !== '') {
                  clave = elementoString;
                  numeroCampo++;
                }
                break;
              case 3:
                if (elementoString !== ' ') {
                  if (/\d/.test(elementoString)) {
                    clave += elementoString;
                  } else {
                    materia = elementoString;
                    numeroCampo++;
                  }
                }
                break;
              case 4:
                if (elementoString !== ' ') {
                  if (/\d/.test(elementoString)) {
                    seccion = elementoString;
                    numeroCampo++;
                  } else {
                    materia += elementoString;
                  }
                }
                break;
              case 7:
                if (elementoString !== ' ' && elementoString !== '-') {
                  if (!/\d/.test(elementoString)) {
                    nombreProfesor = elementoString;
                    numeroCampo++;
                  }
                }
                break;
              case 8:
                if (elementoString !== ' ') {
                  if (/\d/.test(elementoString)) {
                    seccion = seccion.replaceAll('O', '0');
                    nombreProfesor = nombreProfesor.replace('-', ' ');
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
                  } else {
                    nombreProfesor += elementoString;
                  }
                }
                break;
              default:
                if (elementoString !== ' ') {
                  numeroCampo++;
                }
                break;
            }
          });
        }
        setClases(listaClases);
      } catch (e) {
        console.log('Error al intentar cargar el PDF:', e);
      }
    }
  };

  return (
    <>
      <form>
        <label htmlFor="cargar">Seleccione su archivo:</label>
        <input type="file" accept=".pdf" id="cargar" name="archivo" onChange={manejarArchivo} />
      </form>
      <br />
      <Button radius="full"className="bg-gradient-to-tr from-blue-500 to-blue-300 text-white shadow-lg" onClick={leerPDF}>
        Extraer datos
      </Button>
      <br />
      <br />
      <hr />
      <div className="grid grid-cols-3 gap-4 p-4">
        {clases.map((clase, index) => (
        <MateriaCard key={index} clase={clase} />
      ))}
        </div>
    </>
  );
}

export default Importar;
