import {
  IonCard,
  IonCol,
  IonGrid,
  IonImg,
  IonLabel,
  IonRow,
  IonTitle,
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
            <IonImg src={ticket.image} className="ticketImage"></IonImg>
          </IonCol>
          <IonCol>
            <IonTitle id="ticketTitle">
              {ticket.title.substring(0, ticket.title.indexOf(" "))}
              <br />
              {ticket.title.substring(
                ticket.title.indexOf(" "),
                ticket.title.length
              )}
            </IonTitle>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonLabel color="red" id="ticketPrice">
            € {ticket.price} (+ booking free)
          </IonLabel>
        </IonRow>

      </IonGrid>
    </IonCard>
  );
};

export default TicketCard;
