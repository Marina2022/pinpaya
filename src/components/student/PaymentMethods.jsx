import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function PaymentMethods(){
    const {t, i18n} = useTranslation();

    return(
        <>
            <div className="bg-white p-4">
                <h2 className="mb-2">{t('payment_methods')}</h2>
                <Table hover className="mt-3 bg-white">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t('card')}</th>
                        <th>{t('method')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <div className="p-2">{t('no_method')}</div>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}
