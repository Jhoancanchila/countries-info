interface InputSearchProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  handleChange: (value: string) => void;
  value?: string;
}

const InputSearch = ({ isExpanded, setIsExpanded, handleChange, value }: InputSearchProps) => {

  // Manejador para expandir/colapsar el input
  const toggleInput = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      {/* Input visible en pantallas grandes */}
      <input
        type="search"
        placeholder="Buscar..."
        className="hidden xs:block w-full input input-bordered transition-all duration-300"
        onChange={(e) => handleChange(e.target.value)}
        value={value}
      />

      {/* Icono de lupa visible en pantallas pequeñas */}
      <div className="xs:hidden">
        {!isExpanded ? (
          <button
            onClick={toggleInput}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        ) : (
          <input
            type="search"
            placeholder="Buscar..."
            className="w-full input input-bordered md:w-auto transition-all duration-300"
            style={{ width: isExpanded ? "100%" : "0", opacity: isExpanded ? 1 : 0 }}
            autoFocus
            onChange={(e) => handleChange(e.target.value)}
            value={value}
          />
        )}
      </div>
    </div>
  );
};

export default InputSearch;