"use server";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo") as File,
    title: formData.get("title") as string,
    price: Number(formData.get("price") as string),
    description: formData.get("description") as string,
  };
  if (!data.photo.type.startsWith("image/")) {
    return { error: "이미지 파일만 업로드 가능합니다." };
  }
  if (data.photo.size > MAX_FILE_SIZE) {
    return { error: "이미지 파일은 5MB 이하만 업로드 가능합니다." };
  }
  console.log(data);
}
