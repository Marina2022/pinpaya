import s from './SelectField.module.scss'
import Select from "../Select/Select";
import {Field} from "formik";
import React from "react";
import cn from "classnames";

const SelectField = ({name, classname, options, fontSize,  ...rest}) => {
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
                    classname={cn(s.select, classname)}
                    fontSize={fontSize}
            />
            <div className={s.errorMessage}>{meta.error}</div>

          </>
        }
      }
    </Field>
  );
};

export default SelectField;
