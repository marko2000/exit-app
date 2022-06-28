import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonImg,
  IonLabel
} from "@ionic/react";
import Ticket from "../../model/Ticket";

const TicketCard: React.FC<Ticket> = (ticket) => {
  const addItem = (items: Array<Ticket>, newItem: Ticket) => {
    items.push(newItem)
    return items;
  }

  const addToCart = () => {
    console.log(ticket)
    localStorage.getItem("cartItems") ? localStorage.setItem("cartItems", JSON.stringify(addItem(JSON.parse(localStorage.getItem("cartItems")!).filter((e: Ticket) => e !== null), ticket))) : localStorage.setItem("cartItems", JSON.stringify(ticket));
  }

  return (
    <IonCard>
      <IonCardHeader className="ticket-header">
        <IonImg src={ticket.image} className="ticket-image" />
        <IonLabel className="ticket-title">{ticket.title}</IonLabel>
      </IonCardHeader>
      <IonCardContent className="ticket-card-content">
        <IonLabel color="red" id="ticket-price">
          € {ticket.price} (+ booking free)
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
