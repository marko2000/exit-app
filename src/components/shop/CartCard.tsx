import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/react";
import { cartOutline, removeCircleOutline } from "ionicons/icons";
import { useTickets } from "../../store/TicketsContext";
import Ticket from "../../model/Ticket";
import {useError} from "../../store/ErrorContext";

const CartCard: React.FC = () => {
  const ticketsContext = useTickets();
  const {addError} = useError()

  function removeFromCart(ticket: Ticket) {
    ticketsContext.removeFromCart(ticket);
  }
  function getTotal() {
    let i;
    let total = 0;
    for (i = 0; i < ticketsContext.newTickets.length; i++) {
      total +=
        ticketsContext.newTickets[i].price -
        (ticketsContext.newTickets[i].price * ticketsContext.newTickets[i].discount) /
          100;
    }
    localStorage.setItem("amount", total.toString());
    return total;
  }

  const buyTickets = () => {
    let invalidTicket = ticketsContext.newTickets.find(ticket => !ticket.stage);
    if(invalidTicket){
      addError("All tickets in cart must have selected stage.\nTicket: " + invalidTicket.title + " must have stage selected.\n Remove it from the cart and select stage for it.")
      return;
    }
    ticketsContext.saveTickets(ticketsContext.newTickets)?.catch(() => addError("Could not save tickets from cart."));
  };

  return (
    <IonCard>
      <IonItem color="red">
        <IonIcon icon={cartOutline} slot="start" />
        <IonLabel>Added to cart</IonLabel>
        <IonLabel slot="end">Total: {getTotal()}</IonLabel>
      </IonItem>

      <IonCardContent>
        <IonList>
          {ticketsContext.newTickets &&
            ticketsContext.newTickets.map((ticket) => (
              <IonItem key={ticket.id}>
                {ticket.title}
                <IonButton color="red" onClick={() => removeFromCart(ticket)}>
                  <IonIcon
                    icon={removeCircleOutline}
                    slot="end" 
                  ></IonIcon>
                </IonButton>
              </IonItem>
            ))}
        </IonList>
      </IonCardContent>
      <IonCardHeader>
        <IonButton expand={"block"} color="grey" onClick={buyTickets}>
          Buy selected tickets
        </IonButton>
      </IonCardHeader>
    </IonCard>
  );
};
export default CartCard;
