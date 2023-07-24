import s from './FindTutorsFiltersMobile.module.scss';
import filterIcon from "../../../../assets/findTutor/filter-icon.svg"
import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import FindTutorFilters from "../FindTutorFilters/FindTutorFilters";



const FindTutorsFiltersMobile = (props) => {

  const [isFiltersOpen, setFiltersIsOpen] = useState(false)

  const body = document.querySelector('body')

  const onFilterBtnClick = () => {
    setFiltersIsOpen(true)
    body.style.overflow = 'hidden'
  }
  const onClose = () => {
    setFiltersIsOpen(false)
    body.style.overflow = 'unset'
  }

  return (
    <div>
      <button className={s.filtersBtn} onClick={onFilterBtnClick}> Filters <img src={filterIcon} alt="filter icon"/>
      </button>

      <AnimatePresence>
        {
          isFiltersOpen && <motion.div
            key={1}
            className={s.filtersWrapper}
            initial={{width: 0}}
            animate={{maxWidth: 330, width: '95%'}}
            exit={{width: 0}}

            transition={{
              duration: .2
            }}
          >
            <button className={s.closeBtn} onClick={onClose}>&times;</button>
            <div className={s.filterContent}>
              <FindTutorFilters classname={s.mobileFilters}  {...props}  />
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
