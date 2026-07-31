const FormField = ({ label, error, children }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#034b43]">
        {label} <span className="text-error">*</span>
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-sm font-medium text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;
