import ReactSelect from 'react-select'
import cn from 'classnames'

import s from './Select.module.scss'

const Select = ({options, classname, onChange, value, error}) => {

  return (
    <div className={cn(s.wrapper, classname)}>


      <ReactSelect options={options}
        // react-select в onChange отправляет не (e), а value. А в value - объект
        // типа   {value: '', label: ''), а не value из html-селекта
                   value={value}
                   onChange={onChange}
                   className={s.select}
                   theme={(theme) => ({
                     ...theme,
                     colors: {
                       ...theme.colors,
                       primary25: '#ddd',
                       primary:  '#777',
                     },
                   })}
                   styles={{
                     control: (baseStyles, { isFocused, isSelected }) => ({
                       ...baseStyles,
                       height: 47,
                       paddingLeft: '10px',
                       fontSize: 16,
                       borderColor: error ? 'red' : '#E0E0E0',
                       cursor: 'pointer',
                       "&:hover": {
                         border:  error ?  "1px solid red" : "1px solid #777",
                       }
                     }),

                     indicatorSeparator: (baseStyles) => ({
                       ...baseStyles,
                       display: 'none',
                     }),

                     dropdownIndicator: (baseStyles) => ({
                       ...baseStyles,
                       color: '#6c757d',
                     }),

                     option: (baseStyles) => ({
                       ...baseStyles,
                       fontSize: 16,
                       lineHeight: 1.4
                     }),
                   }}
      />
    </div>
  );
};

export default Select;
