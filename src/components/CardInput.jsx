function CardInput({ label, input }) {
  return (
    <div className="flex flex-col gap-[1.5rem] p-[1.875rem] bg-white rounded-[12px]">
      <div>{label}</div>
      <div className="py-[0.625rem] gap-[0.625rem]">{input}</div>
    </div>
  );
}

export default CardInput;
