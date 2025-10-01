function Alert({ type, message, onClose }) {
  if (!message) return null;

  const alertStyles = {
    success: "border-green-500",
    error: "border-red-500",
  };

  const buttonStyles = {
    success: "bg-green-500 hover:bg-green-600",
    error: "bg-red-500 hover:bg-red-600",
  };

  return (
    <div className="fixed inset-0 zbg-opacity-40 flex items-center justify-center z-50" onClick={onClose}>
      <div className={`bg-white rounded-lg shadow-lg p-6 max-w-sm w-[90%] text-center border-l-4 ${alertStyles[type]}`} onClick={(e) => e.stopPropagation()}>
        <p className="text-gray-800 mb-4 text-base">{message}</p>
        <button onClick={onClose} className={`px-6 py-2 rounded-lg text-white font-medium transition ${buttonStyles[type]}`}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Alert;
