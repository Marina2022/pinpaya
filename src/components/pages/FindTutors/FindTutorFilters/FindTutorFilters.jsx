import s from './FindTutorFilers.module.scss';
import {Spinner} from "react-bootstrap";
import {countries} from "../../../../data";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axiosClient from "../../../../axios-client";
import {useLocation} from "react-router-dom";
import Select from "../../../CommonComponents/form/Select/Select";
import Checkbox from "../../../CommonComponents/form/Checkbox/Checkbox";

import SearchField from "../../../CommonComponents/form/SearchField/SearchField";
import cn from "classnames";

// const onInputFocus = () => {
//
//   console.log(window.pageYOffset)
//
//   //
//   // if (window.innerHeight < 992)
//   //   console.log('focus')
//   //   window.scrollTo(0, 0);
//   // document.body.scrollTop = 0;
// }

const FindTutorFilters = ({
                            setLoading,
                            setTutors,
                            subjects,
                            languages,
                            loading,
                            classname,
                            setIsOpen,
                            onInputFocus,
                            onInputBlur
                          }) => {
    const {t, i18n} = useTranslation();

    const [checkTeach, setCheckTeach] = useState(false);
    const [checkTrial, setCheckTrial] = useState(false);
    const [checkVideo, setCheckVideo] = useState(false);

    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const [data, setData] = useState({
      search: '',
      subject: {value: '', label: 'All'},
      location: {value: '', label: 'All'},
      language: {value: '', label: 'All'},
      price: {value: '', label: 'All'}
    });
    const [dataShort, setDataShort] = useState({
      search: '',
      subject: '',
      location: '',
      language: '',
      price: ''
    });


    let check_price = params.get('price');
    let check_subject = params.get('subject');
    let search_input = params.get('search');

    useEffect(() => {
      if (check_price || check_subject) {

        if (check_price) {
          setDataShort({...dataShort, price: check_price})
        }
        if (check_subject) {
          setDataShort({...dataShort, subject: check_subject})
        }
        if (search_input) {
          setDataShort({...dataShort, search: search_input})
        }

        searchActionShort();
      }

    }, [check_price, check_subject])

    const searchAction = () => {
      setLoading(true);
      const payload = {
        checkTeach: checkTeach,
        checkTrial: checkTrial,
        checkVideo: checkVideo,
        data: {
          search: data.search,
          subject: data.subject.value,
          location: data.location.value,
          language: data.language.value,
          price: data.price.value
        }
      }

      axiosClient.post('/search', payload).then(({data}) => {
        setTutors(data.data);
        setLoading(false);
      }).catch(err => {
        setLoading(false)
      })
    }

    const searchActionShort = () => {
      const payloadShort = {
        data: dataShort
      }

      axiosClient.post('/search', payloadShort).then(({data}) => {
        setTutors(data.data);
      })
    }

    const send = (e) => {
      e.preventDefault();
      searchAction();
      setIsOpen && setIsOpen(false);
      // window.location.reload()

      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      window.pageYOffset = 0
      document.body.style.height = window.innerHeight + 'px'
      document.body.style.overflow = 'unset'

    }

    const subjectOptions =
      [
        {
          value: '',
          label: t('all')
        },
        ...subjects.map(({id, name}) => ({
          value: id, label: name
        }))
      ]

    const countryOptions =
      [
        {
          value: '',
          label: t('all')
        },
        ...countries.map((item) => ({
          value: item, label: item
        }))
      ]

    const langOptions =
      [
        {
          value: '',
          label: t('all')
        },
        ...languages.map(({id, name}) => ({
          value: id, label: name
        }))
      ]

    const prices = [
      {id: "1-10", name: "1-10 €"},
      {id: "10-20", name: "10-20 €"},
      {id: "20+", name: "20+ €"},
    ]

    const priceOptions =
      [
        {
          value: '',
          label: t('all')
        },
        ...prices.map(({id, name}) => ({
          value: id, label: name
        }))
      ]

    return (
      // <div>
        <form className={cn(s.filterForm, classname)} onSubmit={send}>

          <SearchField
            placeholder={t('search_placeholder')}
            value={data?.search}
            onChange={ev => setData({...data, search: ev.target.value})}
            classname={s.searchField}
            onFocus={onInputFocus}
          />

          <label className={s.formLabel}>{t('i_want_learn')}
            <Select options={subjectOptions}
                    onInputFocus={onInputFocus}
                    onInputBlur={onInputBlur}
                    value={data?.subject}
                    onChange={selectValue => setData({...data, subject: selectValue})}

            />
          </label>

          <label className={s.formLabel}>{t('tutor_from')}
            <Select options={countryOptions}
                    onInputFocus={onInputFocus}
                    onInputBlur={onInputBlur}
              // value={data?.location}
              // onChange={selectValue => setData({...data, location: selectValue})}
            />
          </label>

          <label className={s.formLabel}>{t('tutor_speaks')}
            <Select options={langOptions}
                    value={data?.language}
                    onChange={selectValue => setData({...data, language: selectValue})}
                    onInputFocus={onInputFocus}
                    onInputBlur={onInputBlur}
            />
          </label>

          <label className={s.formLabel}>{t('price_per_hour')}
            <Select options={priceOptions}
                    value={data?.price}
                    onInputFocus={onInputFocus}
                    onChange={selectValue => setData({...data, price: selectValue})}
                    onInputBlur={onInputBlur}
            />
          </label>

          <div className={s.checkBoxGroup}>

            <Checkbox value={checkTeach} onChange={(e) => setCheckTeach(!checkTeach)} label={t('search_1')} id='check1'/>
            <Checkbox value={checkTrial} onChange={(e) => setCheckTrial(!checkTrial)} label={t('search_2')} id='check2'/>
            <Checkbox value={checkVideo} onChange={(e) => setCheckVideo(!checkVideo)} label={t('search_3')} id='check3'/>
          </div>


          <button className={s.searchBtn} type="submit">
            {
              loading ?
                <Spinner animation="border" role="status" style={{width: '20px', height: '20px'}}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner> : t('search')
            }
          </button>
        </form>
      // </div>

    )
      ;
  }
;

export default FindTutorFilters;


