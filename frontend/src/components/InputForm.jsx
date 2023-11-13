import { useField } from "formik";

/**
 * Component that render an input form, with the useField hook can validate some input values
 * @param {*} param0 
 * @returns 
 */
const InputForm = ({ labelText, ...props }) => {
  // Hook from formik to use his properties
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mt-3">{labelText}</label>
      <input
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
          meta.touched && meta.error ? "border-red-700 border-2" : ""
        }`}
        // properties onBlur, onChange, value
        {...field}
        // properties for the input, name, type, placeholder
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="text-red-700">{meta.error}</div>
      )}
    </div>
  );
};

export default InputForm;
