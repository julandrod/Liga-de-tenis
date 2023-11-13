import { useField } from "formik";

const SelectInputForm = ({ labelText, ...props }) => {
  // Hook from formik to use his properties
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mt-3">{labelText}</label>
      <select
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
          meta.touched && meta.error ? "border-red-700 border-2" : ""
        }`}
        // properties onBlur, onChange, value
        {...field}
      >
        <option disabled value="">
          -- Select an status --{" "}
        </option>
        <option value="pending">pending</option>
        <option value="done">done</option>
        <option value="cancel">cancel</option>
      </select>
    </div>
  );
};

export default SelectInputForm;
