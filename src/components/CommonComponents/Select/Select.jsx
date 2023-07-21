import ReactSelect from 'react-select'
import cn from 'classnames'

import s from './Select.module.scss'

const Select = ({options, classname, onChange, value}) => {
  return (
    <div className={cn(s.wrapper, classname)}>
      <ReactSelect options={options}
                   value={value}
                   onChange={onChange}
                   className={s.select}
                   styles={{
                     control: (baseStyles, state) => ({
                       ...baseStyles,
                       height: 47,
                       paddingLeft: '10px',
                       fontSize: 16,
                       borderColor: '#E0E0E0',
                       cursor: 'pointer'
                     }),

                     indicatorSeparator: (baseStyles, state) => ({
                       ...baseStyles,
                       display: 'none',
                     }),

                     dropdownIndicator: (baseStyles, state) => ({
                       ...baseStyles,
                       color: '#242424',
                     }),

                     option: (baseStyles, state) => ({
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
