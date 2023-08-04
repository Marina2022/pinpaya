import s from './TextareaField.module.scss';
import {Field} from "formik";
import cn from "classnames";
import React from "react";

const TextareaField = ({name, classname, ...rest}) => {
  return (
    <Field name={name}>
      {
        (fieldData) => {
          const {field, meta} = fieldData
          return (
            <>
              <textarea {...rest} {...field} className={cn(s.textarea, meta.error ? s.errorTextarea : '', classname)} />
              <div className={s.error}>{meta.error}</div>
            </>
          )
        }
      }
    </Field>
  );
};

export default TextareaField;
