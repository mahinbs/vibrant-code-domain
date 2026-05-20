type Props = {
  text: string;
  visible: boolean;
};

export function FounderMicroResponse({ text, visible }: Props) {
  if (!visible || !text) return null;
  return (
    <p className="founder-micro-in mt-4 text-[14px] leading-relaxed text-white/65 md:text-[15px]">
      {text}
    </p>
  );
}
