import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event) {
      const value = event.target.type === 'text' ? event.target.value : event.target.checked;
      setValues({
        ...fields,
        [event.target.id]: value
      });
    }
  ];
}