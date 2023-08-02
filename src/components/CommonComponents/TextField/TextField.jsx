import React from 'react';
import TextInput from "../TextInput/TextInput";
import s from './TextField.module.scss'
import {Field} from "formik";

const TextField = ({name, ...rest}) => {
  return (


    <Field name={name}>
      {
        (fieldData) => {
          const {field, meta} = fieldData
          return (
            <>
              <TextInput {...rest} {...field} classname={meta.error ? s.errorInput : '' } />
              <div className={s.error}>{meta.error}</div>
            </>
          )
        }
      }
    </Field>

  );
};

export default TextField;
