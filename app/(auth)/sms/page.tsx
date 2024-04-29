"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMS() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS로 로그인</h1>
        <h2 className="text-xl">본인의 휴대폰으로 진행해주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="6자리 인증코드를 입력해주세요."
            minLength={6}
            maxLength={6}
            required
            errors={state.error?.formErrors ?? []}
            key="token"
          />
        ) : (
          <Input
            name="phone"
            type="number"
            placeholder="휴대폰 번호를 입력해주세요."
            required
            minLength={9}
            maxLength={12}
            errors={state.error?.formErrors ?? []}
            key="phone"
          />
        )}
        <Button text={state.token ? "인증코드 확인" : "인증코드 전송"} />
      </form>
    </div>
  );
}
