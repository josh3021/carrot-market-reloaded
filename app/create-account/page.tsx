import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialSignin from "@/components/social-signin";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하당근! 🥕</h1>
        <h2 className="text-xl">
          가입할 이메일 주소를 입력하고 같이 당근해요! 🥕
        </h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="사용하실 이메일을 입력해주세요"
        />
        <FormInput
          name="name"
          placeholder="사용하실 멋진 이름을 입력해주세요!"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="사용하실 비밀번호를 입력해주세요"
        />
        <FormInput
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <FormButton text="가입하기" />
      </form>
      <SocialSignin />
    </div>
  );
}
