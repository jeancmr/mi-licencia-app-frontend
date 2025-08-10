export default function BackButton({ onGoBack, className = '' }) {
  return (
    <button
      onClick={() => onGoBack()}
      className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition cursor-pointer ${className}`}
      type="button"
    >
      ⬅ Volver
    </button>
  );
}
