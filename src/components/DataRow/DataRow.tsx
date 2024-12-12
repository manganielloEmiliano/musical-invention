import { FC } from 'react';

interface DataRow {
  imageSrc: string;
  altText: string;
  label: string;
  data?: string;
}

export const DataRow: FC<DataRow> = ({ imageSrc, altText, label, data }) => {
  return (
    <div className="w-auto h-[36px] flex items-center mb-4">
      <img src={imageSrc} alt={altText} className="h-full mr-2 w-[24.056px]" />
      <p className="text-white font-poppins text-2xl font-medium leading-none m-0">{`${label}: `}</p>
      <p className="text-white font-poppins text-2xl font-light leading-none m-0 ml-2 flex-grow-0 flex-shrink-0">{data}</p>
    </div>
  );
};
