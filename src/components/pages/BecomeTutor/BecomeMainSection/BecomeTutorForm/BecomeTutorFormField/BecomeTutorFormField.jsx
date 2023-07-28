import React from 'react';
import {Field} from "formik";
import cn from "classnames";
import s from "../BecomeTutorForm.module.scss";
import TextInput from "../../../../../CommonComponents/TextInput/TextInput";


const BecomeTutorFormField = ({name, label, id, ...rest}) => {
  return <Field name={name}>
    {
      (fieldData) => {
        const {field, meta} = fieldData
        return (
          <>
            <label className={cn(s.formLabel, {[s.error]: meta.error})} htmlFor={id}>{label}</label>
            <TextInput id={id} {...field} {...rest}   />
          </>
        )
      }
    }
  </Field>
}

export default BecomeTutorFormField
