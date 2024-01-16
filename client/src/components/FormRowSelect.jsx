const FormRowSelect = ({
  name,
  labelText,
  defaultValue,
  selectOptions,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor="jobStatus" className="form-label">
        {labelText ? labelText : name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {selectOptions.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
