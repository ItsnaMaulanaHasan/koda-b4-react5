import { Check } from "lucide-react";

const Checkbox = ({ checked, onChange, label, size = 20 }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div
          style={{
            width: size,
            height: size,
            borderColor: checked ? "#ff5f26" : "#d1d5db",
            backgroundColor: checked ? "#ff5f26" : "transparent",
          }}
          className="border-2 rounded transition-all duration-200 flex items-center justify-center"
        >
          {checked && <Check size={size * 0.7} className="text-white" strokeWidth={3} />}
        </div>
      </div>
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};

export default Checkbox;
