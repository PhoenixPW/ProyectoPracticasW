import React from "react";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";

export default function MateriaCard({ clase }) {
  const { nrc, clave, materia, seccion, profesor } = clase;

  return (
    <Card className="max-w-[400px] bg-gray-100">
      <CardHeader className="flex gap-3">
        
        <div className="flex flex-col">
          <p className="text-md">{materia}</p>
          <p className="text-small text-default-500">NRC: {nrc}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-between items-center gap-1">
          <p className="text-small">Sección: {seccion}</p>
          <p className="text-small">Clave: {clave}</p>
        </div>
      </CardBody>
    </Card>
  );
}
