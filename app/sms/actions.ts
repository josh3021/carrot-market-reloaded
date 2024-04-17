"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), {
    message: "올바른 전화번호 형식이 아닙니다.",
  });
const tokenSchema = z.coerce
  .number({ invalid_type_error: "인증코드는 숫자여야 합니다." })
  .min(100000, { message: "인증코드는 6자리 숫자입니다." })
  .max(999999, { message: "인증코드는 6자리 숫자입니다." });

interface IActionState {
  token: boolean;
  error?: any;
}

export async function smsLogin(prevState: IActionState, formData: FormData) {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token"),
  };
  if (!prevState.token) {
    // SMS 호출하기
    const result = phoneSchema.safeParse(data.phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    }
    return {
      token: true,
    };
  }
  // SMS 전송 후, 토큰 검증하기
  const result = tokenSchema.safeParse(data.token);
  if (!result.success) {
    console.log(result.error.flatten());
    return {
      token: true,
      error: result.error.flatten(),
    };
  }
  redirect("/");
}
