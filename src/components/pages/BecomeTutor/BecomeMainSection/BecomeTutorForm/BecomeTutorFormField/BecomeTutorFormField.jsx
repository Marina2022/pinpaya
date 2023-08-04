import React from 'react';
import {Field} from "formik";
import s from "../BecomeTutorForm.module.scss";
import TextInput from "../../../../../CommonComponents/form/TextInput/TextInput";


const BecomeTutorFormField = ({name, label, id, ...rest}) => {
  return <Field name={name}>
    {
      (fieldData) => {
        const {field, meta} = fieldData
        return (
          <>
            <label className={s.formLabel} htmlFor={id}>{label}</label>
            <TextInput id={id} {...field} {...rest}  classname={meta.error ? s.error : ''}  />
            <div className={s.errorMessage}>{meta.error}</div>
          </>
        )
      }
    }
  </Field>
}

export default BecomeTutorFormField
