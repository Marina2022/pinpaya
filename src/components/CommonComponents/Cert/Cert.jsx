import s from './Cert.module.scss';
import {useState} from "react";

const Cert = ({item}) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onCertClick = () => {
    setIsModalOpen(true)
  }


return (
  <>
    <li className={s.certItem} key={item.id} onClick={onCertClick}>
      {/*<a target="_blank" href={`https://web.pinpaya.com/storage/${item.images}`}>*/}
        <img src={'https://web.pinpaya.com/storage/' + item.images} width="150" alt="certificate"/>
      {/*</a>*/}
    </li>

    {
      isModalOpen && (
        <>
          <div className='overlay1' onClick={() => {
            setIsModalOpen(false)
          }}></div>
          <div className={s.modal}>


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
