"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { startStream } from "./actions";

export default function AddStream() {
  const [state, dispatch] = useFormState(startStream, null);
  return (
    <form action={dispatch} className="p-5 flex flex-col gap-2">
      <Input
        name="title"
        required
        placeholder="Title for your stream!"
        errors={state?.formErrors}
      />
      <Button text="Start streaming" />
    </form>
  );
}
