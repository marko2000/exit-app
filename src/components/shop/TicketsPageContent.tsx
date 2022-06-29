import React, { useState } from "react";
import {IonCol, IonGrid, IonImg, IonRow, IonSelect, IonSelectOption, IonButton} from "@ionic/react";
import CartCard from "./CartCard";
import AvailableTicketsAccordion from "./AvailableTicketsAccordion";
import {useError} from "../../store/ErrorContext";
import ErrorNotification from "../error/ErrorNotification";
import axios from "axios";

const TicketsPageContent: React.FC = () => {
    const {error} = useError()
    const [to, setTo] = useState()
    const [conversion, setConversion] = useState()

    const convert = (to: string) => {
        let amount = localStorage.getItem("amount")

        axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=EUR&amount=${amount}`, {
            headers: {
                'apiKey': 'peP7TkjIn8ruFtkQ2TEZQdzJf78bKINs'
            }
        })
        .then(response => {console.log(response.data.result)
            setConversion(response.data.result)
        })

        
    }

    return (
        <>
            {error && <ErrorNotification/>}
            <IonImg src={"/images/tickets.jpeg"} className="img-top"></IonImg>
            <IonGrid className="tickets-grid">
                <IonRow>
                    <IonCol className="accordion-group">
                        <AvailableTicketsAccordion/>
                    </IonCol>
                    <IonCol className="side-tickets">
                        <CartCard/>
                    </IonCol>
                </IonRow>
                <IonRow className="conversion">
                    <div style={{display: "flex", width: "70%", justifyContent: 'space-between'}}>
                    <IonSelect className="currency-select" interface="action-sheet" placeholder="Select currency" onIonChange={e => {setTo(e.detail.value)}}>
                        <IonSelectOption value="RSD">RSD</IonSelectOption>
                        <IonSelectOption value="USD">USD</IonSelectOption>
                        <IonSelectOption value="GBP">GBP</IonSelectOption>
                    </IonSelect>
                    <IonButton size="default" onClick={() => convert(to!)}>Convert</IonButton>
                    </div>
                    {conversion ? <span className="conversion-value">{Math.round(conversion)}  {to}</span> : null}
                </IonRow>
            </IonGrid>
        </>
    );
}

export default TicketsPageContent;