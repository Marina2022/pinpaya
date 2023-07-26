import s from './FindTutorFilers.module.scss';
import {Spinner} from "react-bootstrap";
import {countries} from "../../data";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axiosClient from "../../axios-client";
import {useLocation} from "react-router-dom";
import Select from "../../components/CommonComponents/Select/Select";
import Checkbox from "../../components/CommonComponents/Checkbox/Checkbox";

import SearchField from "../../components/CommonComponents/SearchField/SearchField";
import cn from "classnames";


const FindTutorFilters = ({setLoading, setTutors, subjects, languages, loading, classname, setIsOpen}) => {
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
      <>
        <form className={cn(s.filterForm, classname)} onSubmit={send}>

          <SearchField
            placeholder={t('search_placeholder')}
            value={data?.search}
            onChange={ev => setData({...data, search: ev.target.value})}
          />

          <label className={s.formLabel}>{t('i_want_learn')}
            <Select options={subjectOptions}
                    value={data?.subject}
                    onChange={selectValue => setData({...data, subject: selectValue})}
            />
          </label>

          <label className={s.formLabel}>{t('tutor_from')}
            <Select options={countryOptions}
                    value={data?.location}
                    onChange={selectValue => setData({...data, location: selectValue})}
            />
          </label>

          <label className={s.formLabel}>{t('tutor_speaks')}
            <Select options={langOptions}
                    value={data?.language}
                    onChange={selectValue => setData({...data, language: selectValue})}
            />
          </label>

          <label className={s.formLabel}>{t('price_per_hour')}
            <Select options={priceOptions}
                    value={data?.price}
                    onChange={selectValue => setData({...data, price: selectValue})}
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
      </>

    )
      ;
  }
;

export default FindTutorFilters;


