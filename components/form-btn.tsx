interface IFormButtonProps {
  loading?: boolean;
  text: string;
}

export default function FormButton({
  loading = false,
  text,
}: IFormButtonProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? "로딩중..." : text}
    </button>
  );
}
