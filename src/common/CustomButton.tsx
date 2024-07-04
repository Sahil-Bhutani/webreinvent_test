import React, { FC } from "react";

interface CustomButtonProps {
  text: string;
  disabled: boolean;
  action?: any
}

const CustomButton: FC<CustomButtonProps> = ({ text, disabled ,action}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={action}
      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {text}
    </button>
  );
};

export default React.memo(CustomButton);
