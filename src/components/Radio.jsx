const Radio = ({ id, checked, onChange, value, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative">
        <input id={id} type="radio" value={value} checked={checked} onChange={onChange} className="sr-only" />
        <div
          style={{
            width: 20,
            height: 20,
            borderColor: checked ? "#ff5f26" : "#d1d5db",
          }}
          className="border-2 rounded-full transition-all duration-200 flex items-center justify-center"
        >
          {checked && (
            <div
              style={{
                width: 20 * 0.5,
                height: 20 * 0.5,
                backgroundColor: "#ff5f26",
              }}
              className="rounded-full"
            />
          )}
        </div>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export default Radio;
