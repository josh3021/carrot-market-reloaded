"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import { z } from "zod";

function checkPassword({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  return password === confirmPassword;
}

const formSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "이메일은 문자열이어야 합니다.",
        required_error: "이메일은 필수 입력 사항입니다.",
      })
      .email({ message: "이메일 형식이 올바르지 않습니다." }),
    username: z
      .string({
        invalid_type_error: "이름은 문자열이어야 합니다.",
        required_error: "이름은 필수 입력 사항입니다.",
      })
      .trim()
      .min(USERNAME_MIN_LENGTH, "이름은 최소 5글자 이상입니다.")
      .max(USERNAME_MAX_LENGTH, "이름은 최대 20글자 이하입니다."),
    password: z
      .string({
        invalid_type_error: "비밀번호는 문자열이어야 합니다.",
        required_error: "비밀번호는 필수 입력 사항입니다.",
      })
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 10글자 이상입니다.")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string({
        invalid_type_error: "비밀번호 확인은 문자열이어야 합니다.",
        required_error: "비밀번호 확인은 필수 입력 사항입니다.",
      })
      .min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
  console.log(result.data);
}
