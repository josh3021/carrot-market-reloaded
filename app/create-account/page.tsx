"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import SocialSignin from "@/components/social-signin";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하당근! 🥕</h1>
        <h2 className="text-xl">
          가입할 이메일 주소를 입력하고 같이 당근해요! 🥕
        </h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="사용하실 이메일을 입력해주세요"
          errors={state?.fieldErrors.email ?? []}
          required
        />
        <Input
          name="username"
          placeholder="사용하실 멋진 이름을 입력해주세요!"
          errors={state?.fieldErrors.username ?? []}
          minLength={USERNAME_MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="사용하실 비밀번호를 입력해주세요"
          errors={state?.fieldErrors.password ?? []}
          min={PASSWORD_MIN_LENGTH}
          required
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          errors={state?.fieldErrors.confirmPassword ?? []}
          min={PASSWORD_MIN_LENGTH}
          required
        />
        <Button text="가입하기" />
      </form>
      <SocialSignin />
    </div>
  );
}
