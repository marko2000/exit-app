import {
  IonCard,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from "@ionic/react";
import Ticket from "../../model/Ticket";
import React from "react";
import Stage from "../../model/Stage";

const TicketCard: React.FC<{ ticket: Ticket; stages: Array<Stage> }> = ({
  ticket,
}) => {
  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonImg src={ticket.image} className="ticket-image"></IonImg>
          </IonCol>
          <IonCol className="ticket-title">
              {ticket.title.substring(0, ticket.title.indexOf(" "))}
              <br />
              {ticket.title.substring(
                ticket.title.indexOf(" "),
                ticket.title.length
              )}
          </IonCol>
        </IonRow>
        <IonRow className="ticket-price">
          {/* <IonLabel color="red" id="ticketPrice" className="ticket-price"> */}
            € {ticket.price} (+ booking free)
          {/* </IonLabel> */}
        </IonRow>

      </IonGrid>
    </IonCard>
  );
};

export default TicketCard;
