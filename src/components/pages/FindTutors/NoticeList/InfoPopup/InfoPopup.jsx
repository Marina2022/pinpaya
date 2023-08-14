import OurRegularPopup from "../../../../CommonComponents/OurRegularPopup/OurRegularPopup";
import {useTranslation} from "react-i18next";
import WhereInfo from "./InfoPopupContents/WhereInfo";
import ChooseInfo from "./InfoPopupContents/ChooseInfo";
import PayInfo from "./InfoPopupContents/PayInfo";
import RefundInfo from "./InfoPopupContents/RefundInfo";

const InfoPopup = ({popupIndex, ...rest}) => {
  const {t, i18n} = useTranslation();

  return (
    <div className='infoPopup'>
      <OurRegularPopup {...rest}>

        {
          popupIndex === 0 && <WhereInfo lang={i18n.languages[0]}/>
        }

        {
          popupIndex === 1 && <ChooseInfo lang={i18n.languages[0]}/>
        }

        {
          popupIndex === 2 && <PayInfo lang={i18n.languages[0]}/>
        }

        {
          popupIndex === 3 && <RefundInfo lang={i18n.languages[0]}/>
        }

      </OurRegularPopup>
    </div>
  );
};

export default InfoPopup;
