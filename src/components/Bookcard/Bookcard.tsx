import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";

interface BookcardProps {
  id: number; // Agregamos el ID para identificar el libro
  title: string;
  author: string;
  image: string;
}

export const Bookcard: FC<BookcardProps> = ({ id, title, author, image }) => {
  const navigate = useNavigate(); // Hook para redirección

  const handleNavigate = () => {
    navigate(`/book/${id}`); // Redirige al detalle del libro con el ID
  };

  return (
    <div className="w-[200px] h-[320px] flex flex-col items-center rounded-md overflow-hidden ">
      <div className="w-full h-[60%]">
        <img
          src={image}
          alt="imagen del libro"
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>

      <div className="flex-grow flex flex-col justify-between p-2 w-full">
        <div className="flex flex-col items-start gap-1 overflow-hidden">
          <p className="text-white font-inter text-sm font-medium leading-tight text-left break-words">
            {title}
          </p>
          <p className="text-gray-500 font-inter text-xs font-normal leading-tight text-left break-words truncate">
            {author}
          </p>
        </div>

        <div className=" ">
          <Button
            text="Ver más"
            onClick={handleNavigate} // Llamar a handleNavigate al hacer clic
            type="button"
            buttonIconSrc="/ArrowUpRight.svg"
          />
        </div>
      </div>
    </div>
  );
};
