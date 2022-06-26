import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonImg,
  IonLabel
} from "@ionic/react";
import Ticket from "../../model/Ticket";

const TicketCard: React.FC<{ ticket: Ticket }> = (ticket) => {
  function addToCart() {
    console.log("Add to cart button clicked. Ticket id: " + ticket.ticket.id);
  }
  return (
    <IonCard>
      <IonCardHeader className="ticket-header">
        <IonImg src={ticket.ticket.img} className="ticket-image" />
        <IonLabel className="ticket-title">{ticket.ticket.title}</IonLabel>
      </IonCardHeader>
      <IonCardContent className="ticket-card-content">
        <IonLabel color="red" id="ticket-price">
          € {ticket.ticket.price} (+ booking free)
        </IonLabel>
          <IonButton
            color="red"
            size="default"
            className="add-to-cart"
            onClick={addToCart}
          >
            Add to cart
          </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TicketCard;
