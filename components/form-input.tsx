"use client";
import { HTMLInputTypeAttribute } from "react";
import { useFormStatus } from "react-dom";

interface IFormInputProps {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  errors?: string[];
}

export default function FormInput({
  name,
  type = "text",
  placeholder,
  required = true,
  errors,
}: IFormInputProps) {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-2">
      <input
        disabled={pending}
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 transition disabled:cursor-wait"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
