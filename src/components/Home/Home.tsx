import { FC, useEffect } from "react";
import { Bookcard } from "../Bookcard/Bookcard";
import "./home.css";
import { Logo } from "../logo/logo";
import useFetch from "../../hooks/useFetch";

interface Book {
  id: number;
  title: string;
  author: string;
  image_url?: string;
}

export const Home: FC = () => {
  // Recuperar el token y limpiar cualquier comilla no deseada
  let token = localStorage.getItem("auth-token") || "";
  const uid = localStorage.getItem("uid") || "";

  if (!token || !uid) {
    console.error("Error: Falta uno o más valores de autenticación.");
  }

  // Eliminar comillas si el token las contiene
  token = token.replace(/"/g, "");

  console.log("Token limpio:", token);

  const { data, loading, error, fetchData } = useFetch<Book[]>({
    method: "GET",
    url: import.meta.env.VITE_BOOKS_API,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Imprimir la respuesta completa
  useEffect(() => {
    if (data) {
      console.log("Respuesta del servidor:", data); // Aquí se imprime todo el JSON
    }
  }, [data]);

  return (
    <>
      <div className="absolute top-5 left-5">
        <Logo src="/logo-flock.png" width="222px" height="57px" />
      </div>

      <div className="flex justify-center mt-3">
        <h1 className="text-white font-light text-[4.25rem] leading-[4.5rem] font-poppins">
          Flocky Books
        </h1>
      </div>

      {loading && <p className="text-white text-center mt-10">Cargando libros...</p>}
      {error && <p className="text-red-500 text-center mt-10">Error: {error}</p>}

      
      {!loading && !error && Array.isArray(data) && data.length > 0 ? (
        <div className="layout mt-[100px]">
        {data.map((book) => (
          <Bookcard
            key={book.id}
            id={book.id} // Pasa el ID aquí
            title={book.title}
            author={book.author}
            image={book.image_url || "SignupI-Layout/src/assets/libros/image.png"}
          />
        ))}
      </div>
      
      ) : (
        <p className="text-white text-center mt-10">No hay libros disponibles.</p>
      )}
    </>
  );
};
