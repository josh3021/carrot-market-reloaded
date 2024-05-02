"use client";
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface IInputProps {
  name: string;
  errors?: string[];
}

const _Input = (
  {
    name,
    errors,
    ...inputProps
  }: IInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        name={name}
        disabled={pending}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 transition disabled:cursor-wait"
        {...inputProps}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
