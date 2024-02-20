import React from "react";

interface IconTypeProps {
  size: number;
}

type IconType = (props: IconTypeProps) => JSX.Element;

interface props {
  message: string;
  icon: IconType;
}
const NotFound = ({ message, icon }: props) => {
  return (
    <div className="flex justify-center flex-col items-center my-10 text-gray-400 opacity-60">
      {React.createElement(icon, { size: 50 })}
      <h3 className="mt-5">{message}</h3>
    </div>
  );
};

export default NotFound;
