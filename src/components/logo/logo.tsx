import "./logo.css"

import { FC } from "react";

interface LogoProps {
  src: string;
  width: string;
  height: string;
}

export const Logo: FC<LogoProps> = ({ src, width, height }) => {
  return (
    <div className="self-start relative left-[6.5%] mt-[5%] flex">
      <img src={src} alt="Logo" style={{ width, height }} />
    </div>
  );
};
