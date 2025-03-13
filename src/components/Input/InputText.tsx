import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

type InputTextProps = {
  label: string;
  name: "firstName" | "lastName";
  register: UseFormRegister<any>;
  error?: FieldError;
};

const InputText: React.FC<InputTextProps> = ({ label, name, register, error }) => {
  return (
    <div>
      {/* Label for the input */}
      <label className="block font-semibold">{label}</label>
      {/* The input field itself */}
      <input
        {...register(name, {
          required: `${label} is required`,
          minLength: { value: 2, message: "Min length is 2" },
          maxLength: { value: 12, message: "Max length is 12" },
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: "Only characters from a-z and A-Z are accepted",
          },
        })}
        className="w-full p-2 border rounded-lg"
      />
      {/* Display error message if there's an error */}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputText;
