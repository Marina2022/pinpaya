import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import TextInput from "../TextInput/TextInput";

import s from './SearchField.module.scss'
import searchBtn from '../../../../assets/search.svg'

const SearchField = ({setMobileIsOpen, onChange,  ...rest}) => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    search: '',
  });

  const search = (e) => {
    e.preventDefault();
    navigate(`/find-tutor?search=${data.search}`);
    setMobileIsOpen && setMobileIsOpen(false);
  }

  const onInputChange = (e)=> {
    onChange && onChange(e)  // onChange из пропсов
    setData({...data, search : e.target.value})
  }

  return (
      <div className={s.searchWrapper}>
        <TextInput value={data?.search} onChange={ev => onInputChange(ev)} {...rest}  />
        <button type="button" className={s.searchBtn} onClick={search}><img src={searchBtn} alt="search button"/> </button>
      </div>
  );
};

export default SearchField;
