import { FC } from "react";

export const Sidebar: FC = () => {
  return (
    <div className="flex flex-col items-center  rounded-lg   min-w-[56px] ">
      <img
        src="/TabladecontenidoIcono.png"
        alt="TablaContenido"
        className="mb-[30px] w-[56px] h-[56px] "
      />
      <img
        src="/BusquedacontenidoIcono.png"
        alt="Busqueda"
        className="mb-[30px] w-[56px] h-[56px]"
      />
      <img
        src="/AgregarafavIcono.png"
        alt="agregarFav"
        className="w-[56px] h-[56px] "
      />
    </div>
  );
};
