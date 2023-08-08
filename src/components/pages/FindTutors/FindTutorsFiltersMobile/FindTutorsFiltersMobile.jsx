import s from './FindTutorsFiltersMobile.module.scss';
import filterIcon from "../../../../assets/findTutor/filter-icon.svg"
import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import FindTutorFilters from "../FindTutorFilters/FindTutorFilters";


const FindTutorsFiltersMobile = (props) => {


  const [isFiltersOpen, setFiltersIsOpen] = useState(false)


  const body = document.querySelector('body')

  const ref = useRef()
  const currentInputOffset = useRef(0)

  useEffect(() => {
    // ref.style.height = 'calc( var(--myVh) * 100 )'
    // ref.current.style.height = window.innerHeight + 'px'
    if (ref.current) {
      ref.current.style.height = 'calc( var(--myVh) * 100 )'
    }
  }, [isFiltersOpen])


  const onFilterBtnClick = () => {
    setFiltersIsOpen(true)
    body.style.overflow = 'hidden'
  }

  const onClose = () => {
    setFiltersIsOpen(false)
    body.style.overflow = 'unset'
    // window.location.reload()
    window.pageYOffset = 0
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

  }

  const onInputFocus = (e) => {
    console.log('onfocus')
    const input = e.target
    const startTop = input.getBoundingClientRect().top
    let currentTop = startTop

    setTimeout(() => {
      currentTop = input.getBoundingClientRect().top
      if (currentTop < startTop) {
        ref.current.style.height = window.innerHeight + Math.abs(currentTop - startTop) + 'px'
      }
      currentInputOffset.current = currentTop - startTop
    }, 300)
  }

  const onInputBlur = (e) => {
    //ref.current.style.height = window.innerHeight  + 'px'
    ref.current.style.height = 'calc( var(--myVh) * 100 )'
  }


  return (
    <div>
      <button className={s.filtersBtn} onClick={onFilterBtnClick}> Filters <img src={filterIcon} alt="filter icon"/>
      </button>

      <AnimatePresence>
        {
          isFiltersOpen && <motion.div
            key={1}
            ref={ref}
            className={s.filtersWrapper}
            initial={{width: 0}}
            animate={{maxWidth: 330, width: '95%'}}
            exit={{width: 0}}
            // style={{marginTop: offset}}

            transition={{
              duration: .2
            }}
          >

            <button className={s.closeBtn} onClick={onClose}>&times;</button>

            <div className={s.filterContent}>
              <FindTutorFilters classname={s.mobileFilters} setIsOpen={setFiltersIsOpen} onInputFocus={onInputFocus}
                                onInputBlur={onInputBlur}  {...props}  />
            </div>

          </motion.div>
        }
        {
          isFiltersOpen && <motion.div
            key={2}
            className='overlay'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
              duration: .2
            }}

            onClick={onClose}
          >

          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default FindTutorsFiltersMobile;
