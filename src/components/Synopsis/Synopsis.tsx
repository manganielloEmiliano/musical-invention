import { FC } from "react";
import { DataRow } from "../DataRow/DataRow";

interface SynopsisProps {
  description: string;
}

export const Synopsis: FC<SynopsisProps> = ({ description }) => {
  return (
    <div className="flex flex-col items-start gap-4 bg-transparent p-8 rounded-lg" style={{ width: "720px" }}>
      {/* DataRow para mostrar la sinopsis */}
      <DataRow 
        imageSrc="/ArrowUpRight.svg"
        altText="Sinopsis"
        label="Sinopsis"
      />

      {/* Descripción del libro con estilos específicos */}
      <p className="text-white font-poppins font-light text-[16px] leading-normal" style={{ fontWeight: 300 }}>
        {description}
      </p>
    </div>
  );
};
