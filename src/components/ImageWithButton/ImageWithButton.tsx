import { FC } from "react";

interface ImageWithButtonProps {
  imageUrl: string;
  buttonText: string;
  buttonIconSrc: string;
  onButtonClick?: () => void; // Opción para manejar eventos de clic en el botón
}

export const ImageWithButton: FC<ImageWithButtonProps> = ({
  imageUrl,
  buttonText,
  buttonIconSrc,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-between w-full max-w-[440px] h-full bg-transparent gap-[32px] mt-[32px]">
      {/* Imagen */}
      <img
        src={imageUrl}
        alt="Book"
        className="rounded-lg flex-shrink-0"
        style={{
          width: "440.082px",
          height: "575.927px",
        }}
      />

      {/* Botón */}
      <button
        className="custom-button"
        onClick={onButtonClick}
        style={{
          width: "100%", // Se asegura de que tome el ancho del contenedor
        }}
      >
        <img src={buttonIconSrc} alt="Icon" />
        {buttonText}
      </button>
    </div>
  );
};
