import s from './Cert.module.scss';
import {useState} from "react";

const Cert = ({item}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const onCertClick = () => {
      setIsModalOpen(true)
    }

    const handleClose = () => {
      setIsModalOpen(false)
    }

    return (
      <>
        <li className={s.certItem} key={item.id} onClick={onCertClick}>
          <img src={'https://web.pinpaya.com/storage/' + item.images} width="150" alt="certificate"/>
        </li>
        {
          isModalOpen && (
            <>
              <div className='overlay1' onClick={handleClose}></div>
              <div className={s.modal}>
                <span className={s.closeBtn} onClick={handleClose}>×</span>
                <img className={s.img} src={`https://web.pinpaya.com/storage/${item.images}`} alt="image"/>
              </div>
            </>
          )
        }
      </>
    );
  }
;

export default Cert;
