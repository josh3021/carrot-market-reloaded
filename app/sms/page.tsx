import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";

export default function SMS() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS로 로그인</h1>
        <h2 className="text-xl">본인의 휴대폰으로 진행해주세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="number" placeholder="휴대폰 번호를 입력해주세요." />
        <FormInput type="number" placeholder="6자리 인증코드를 입력해주세요." />
        <FormButton text="인증코드 전송" />
      </form>
    </div>
  );
}
