import {IonButton, IonCard, IonCol, IonGrid, IonImg, IonLabel, IonRow, IonTitle,} from "@ionic/react";
import Ticket from "../../model/Ticket";

const TicketCard: React.FC<{ ticket: Ticket }> = (ticket) => {
  function addToCart() {
    console.log("Add to cart button clicked. Ticket id: " + ticket.ticket.id);
  }
  return (
    <IonCard slot="start">
      <IonGrid>
        <IonRow>
          <IonCol size="3">
            <IonImg src={ticket.ticket.img} className="ticket-image"></IonImg>
          </IonCol>
          <IonCol size="9">
            <IonTitle id="ticket-title">{ticket.ticket.title}</IonTitle>

            <br />
          </IonCol>
          <IonCol>
            <IonRow>
              <IonLabel color="red" id="ticket-price">
                € {ticket.ticket.price} (+ booking free)
              </IonLabel>
            </IonRow>
            <br />
            <IonRow>
              <IonButton
                color="red"
                size="default"
                id="readMoreBtn"
                onClick={addToCart}
              >
                Add to cart
              </IonButton>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow></IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default TicketCard;
