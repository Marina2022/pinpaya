import s from './SelectField.module.scss'
import Select from "../Select/Select";
import {Field} from "formik";
import React from "react";

const SelectField = ({name, classname, options,  ...rest}) => {
  return (
    <Field name={name}>
      {
        ({field, form, meta}) => {
          const onChange = (value) => form.setFieldValue(name, value)
          return <>

            <Select options={options}
                    {...field}
                    onChange={onChange}
                    error={meta.error}
                    classname={s.select}
            />
            <div className={s.errorMessage}>{meta.error}</div>

          </>
        }
      }
    </Field>
  );
};

export default SelectField;
