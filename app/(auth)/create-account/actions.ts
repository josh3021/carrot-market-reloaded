"use server";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import { login } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
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
    // .refine(checkUniqueEmail, "이미 사용 중인 이메일입니다."),
    username: z
      .string({
        invalid_type_error: "이름은 문자열이어야 합니다.",
        required_error: "이름은 필수 입력 사항입니다.",
      })
      .trim()
      .min(USERNAME_MIN_LENGTH, "이름은 최소 5글자 이상입니다.")
      .max(USERNAME_MAX_LENGTH, "이름은 최대 20글자 이하입니다."),
    // .refine(checkUniqueUsername, "이미 사용 중인 사용자명입니다."),
    // .transform((value) => `🔥${value}🔥`)
    password: z
      .string({
        invalid_type_error: "비밀번호는 문자열이어야 합니다.",
        required_error: "비밀번호는 필수 입력 사항입니다.",
      })
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 10글자 이상입니다."),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string({
        invalid_type_error: "비밀번호 확인은 문자열이어야 합니다.",
        required_error: "비밀번호 확인은 필수 입력 사항입니다.",
      })
      .min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "이미 사용 중인 이메일입니다.",
        fatal: true,
      });
      return z.never();
    }
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        path: ["username"],
        message: "이미 사용 중인 사용자명입니다.",
        fatal: true,
      });
      return z.never();
    }
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
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const user = await db.user.create({
    data: {
      email: result.data.email,
      username: result.data.username,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });
  await login(user.id);

  redirect("/profile");
}
