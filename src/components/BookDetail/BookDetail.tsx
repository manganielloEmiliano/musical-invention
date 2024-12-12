import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Logo } from "../logo/logo";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { ImageWithButton } from "../ImageWithButton/ImageWithButton";
import { DataRowGroup } from "../DataRowGroup/DataRowGroup";
import { DataRow } from "../DataRow/DataRow";
import { Synopsis } from "../Synopsis/Synopsis";
import { Sidebar } from "../Sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import dayjs from "dayjs"; 

interface BookDetailData {
  title: string;
  author: string;
  image_url?: string;
  genre: string;
  publisher: string;
  pages: number;
  published_date?: string;
  sinopsis: string;
  reading_time: string;
}

export const BookDetail: FC = () => {
  const { id } = useParams<{ id: string }>();

  let token = localStorage.getItem("auth-token") || "";
  token = token.replace(/"/g, "");

  const bookApiUrl = `${import.meta.env.VITE_BOOKS_API_DETAIL}`.replace("{book_id}", id || "");

  const { data: book, loading, error, fetchData } = useFetch<BookDetailData>({
    method: "GET",
    url: bookApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <p className="text-white text-center mt-10">Cargando detalles del libro...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  }

  if (!book) {
    return <p className="text-white text-center mt-10">No se encontraron detalles del libro.</p>;
  }

  // Formatear la fecha de publicación con Day.js
  const formattedDate = book.published_date
    ? dayjs(book.published_date).format("DD/MM/YYYY") 
    : "Desconocido";

  const rowsData = [
    { altText: "Género", label: "Género", data: book.genre },
    { altText: "Editorial", label: "Editorial", data: book.publisher },
    { altText: "Publicación", label: "Publicación", data: formattedDate },
    { altText: "Páginas", label: "Páginas", data: book.pages.toString() },
  ];

  return (
    <>
      {/* Logo */}
      <div className="absolute top-5 left-5">
        <Logo src="/logo-flock.png" width="222px" height="57px" />
      </div>

      {/* Título principal */}
      <div className="flex justify-center mt-3">
        <h1 className="text-white font-light text-[4.25rem] leading-[4.5rem] font-poppins">
          Flocky Books
        </h1>
      </div>

      {/* Contenedor principal de detalles del libro y sidebar */}
      <div className="flex mx-auto mt-10" style={{ width: "1256px", height: "726px" }}>
        <div
          className="flex flex-col items-center bg-transparent rounded-lg"
          style={{ width: "768px", height: "726px" }}
        >
          <Breadcrumbs bookTitle={book.title} />
          <ImageWithButton
            imageUrl={book.image_url || "/placeholder.png"}
            buttonText="Empezar a leer"
            buttonIconSrc="/ArrowUpRight.svg"
          />
        </div>
        <div
          className="flex flex-row gap-8 bg-transparent p-8 rounded-lg"
          style={{ width: "768px", height: "726px" }}
        >
          <div className="flex flex-col items-start gap-8">
            <div className="flex justify-center mt-3">
              <h2 className="text-white font-poppins font-semibold text-[42px] leading-[22.641px] w-[720px] h-[34px]">
                {book.title}
              </h2>
            </div>
            <p className="text-white font-poppins font-normal text-[32px] leading-[22.641px]">
              Autor: {book.author}
            </p>
            <DataRow
              imageSrc="/reloj.svg"
              altText="reloj"
              label="Tiempo de lectura"
              data={book.reading_time}
            />
            <DataRowGroup rows={rowsData} />
            <Synopsis description={book.sinopsis} />
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};
