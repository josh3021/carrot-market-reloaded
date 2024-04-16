import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login() {
  async function handleForm(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("i run in the server");
  }
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">로그인당근! 🥕</h1>
        <h2 className="text-xl">다시 만나서 반가워요!</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="사용하실 이메일을 입력해주세요"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="사용하실 비밀번호를 입력해주세요"
        />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
