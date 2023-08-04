import React from 'react';
import TextInput from "../TextInput/TextInput";
import s from './TextField.module.scss'
import {Field} from "formik";
import cn from "classnames";

const TextField = ({name, classname, ...rest}) => {
  return (

    <Field name={name}>
      {
        (fieldData) => {
          const {field, meta} = fieldData
          return (
            <>
              <TextInput {...rest} {...field} classname={cn(meta.error ? s.errorInput : '', classname)} />
              <div className={s.error}>{meta.error}</div>
            </>
          )
        }
      }
    </Field>

  );
};

export default TextField;
