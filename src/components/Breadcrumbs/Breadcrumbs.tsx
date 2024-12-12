import { FC } from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  bookTitle: string;
}

export const Breadcrumbs: FC<BreadcrumbProps> = ({ bookTitle }) => {
  return (
    <div className="flex items-center gap-[11.32px] justify-start w-[473px] h-[36.8px]">
      <span className="flex items-center">
        {/* Imagen del libro con tamaño fijo */}
        <img
          src="/Book.svg"
          alt="book svg"
          className="rounded-full"
          style={{ width: "36.791px", height: "36.791px" }}
        />
        <Link
          to="/"
          className="ml-[11.32px] text-white font-poppins text-[18px] font-light"
        >
          Flocky Books
        </Link>
        <span className="flex items-center ml-[11.32px]">
          <img
            src="/flecha.svg"
            alt="flecha"
            style={{ width: "auto", height: "auto" }}
          />
        </span>
      </span>
      <span className="ml-[11.32px] text-white font-poppins text-[18px] font-light">
        {bookTitle}
      </span>
    </div>
  );
};
