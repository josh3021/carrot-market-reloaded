import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">로그인당근! 🥕</h1>
        <h2 className="text-xl">다시 만나서 반가워요!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="email" placeholder="사용하실 이메일을 입력해주세요" />
        <FormInput
          type="password"
          placeholder="사용하실 비밀번호를 입력해주세요"
        />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
