import { FC } from 'react';
import { DataRow } from '../DataRow/DataRow';

interface DataRowGroupProps {
  rows: {
    imageSrc?: string;  
    altText: string;
    label: string;
    data: string;
  }[];
}

export const DataRowGroup: FC<DataRowGroupProps> = ({ rows }) => {
  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <DataRow
          key={index}
          imageSrc={row.imageSrc || "/ArrowUpRight.svg"}  
          altText={row.altText}
          label={row.label}
          data={row.data}
        />
      ))}
    </div>
  );
};
