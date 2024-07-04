import React, { ChangeEvent, FC } from "react";

interface CustomInputProps {
  labelName: string;
  labelText: string;
  inputType: string;
  inputName: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  labelName,
  labelText,
  inputType,
  inputName,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <label
        htmlFor={labelName}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelText}
      </label>
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </>
  );
};

export default React.memo(CustomInput);
