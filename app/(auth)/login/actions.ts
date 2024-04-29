"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { login as sessionLogin } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

async function checkEmailExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, "존재하지 않는 이메일입니다."),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const ok = await bcrypt.compare(result.data.password, user?.password ?? "");
  if (ok && user) {
    await sessionLogin(user.id);
    redirect("/profile");
  } else {
    return {
      fieldErrors: {
        password: ["비밀번호가 일치하지 않습니다."],
        email: [],
      },
    };
  }
}
