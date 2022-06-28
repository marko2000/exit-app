import React, {createContext, useContext, useState} from "react";
import Ticket from "../model/Ticket";
import {useAuthentication} from "./AuthenticationContext";
import {getAllTicketsApi, getTicketsForUserApi, saveTicketsApi} from "../api/ticketsApi";
import {StagesProvider} from "./StagesContext";

const availableTickets: Array<Ticket> = [
    {
        id: 1,
        title: "Regular 4-Day Ticket",
        image: "/images/tickets/4.png",
        price: 119,
        discount: 0,
        purchaseDate: new Date(),
        stage: undefined,
        owner: undefined,
        description:
            "This is a general admission pass, giving you 4 nights of EXIT Festival in the beautiful scenery of the Petrovaradin Fortress.",
    },
    {
        id: 2,
        title: "4-Day Ticket (5 for 4)",
        image: "/images/tickets/4.png",
        price: 95,
        discount: 0,
        purchaseDate: new Date(),
        stage: undefined,
        owner: undefined,
        description:
            "This is a general admission pass, giving you 4 nights of EXIT Festival in the beautiful scenery of the Petrovaradin Fortress.",
    },
    {
        id: 3,
        title: "VIP GOLD 4-Day Ticket",
        image: "/images/tickets/4gold.png",
        price: 300,
        discount: 0,
        purchaseDate: new Date(),
        stage: undefined,
        owner: undefined,
        description:
            "This is a VIP pass, giving you 4 nights of EXIT Festival in the beautiful scenery of the Petrovaradin Fortress and special access to our VIP facilities.",
    },
    {
        id: 4,
        title: "Regular 2-Day Ticket",
        image: "/images/tickets/1.png",
        price: 34,
        discount: 0,
        purchaseDate: new Date(),
        stage: undefined,
        owner: undefined,
        description:
            "This is a general admission day ticket, giving you 1 entry on 1 night of EXIT Festival in the beautiful scenery of the Petrovaradin Fortress, including the headline concert of Nick Cave and The Bad Seeds.",
    },
    {
        id: 5,
        title: "VIP GOLD Day 2 Ticket",
        image: "/images/tickets/1gold.png",
        price: 100,
        discount: 0,
        purchaseDate: new Date(),
        stage: undefined,
        owner: undefined,
        description:
            "This is a VIP day ticket, giving you 1 entry on 1 night of EXIT Festival in the beautiful scenery of the Petrovaradin Fortress, including the headline concert of Nick Cave and The Bad Seeds, with special access to our VIP facilities.",
    },
];

const TicketContext = createContext<TicketContextType>({
    newTickets: [],
    purchasedTickets: [],
    availableTickets: availableTickets,
    addToCart: () => {
    },
    saveTickets: () => null,
    removeFromCart: () => {
    },
    getAllTickets: () => {
    },
    getAllTicketsOfUser: () => {
    }
})

export const useTickets = () => {
    return useContext(TicketContext);
}

type TicketContextType = {
    newTickets: Array<Ticket>,
    purchasedTickets: Array<Ticket>
    availableTickets: Array<Ticket>,
    addToCart: (ticket: Ticket) => void
    removeFromCart: (ticket: Ticket) => void
    saveTickets: (ticket: Ticket[]) => Promise<void> | null
    getAllTickets: () => void
    getAllTicketsOfUser: (userId: number) => void
}

export const TicketsProvider: React.FC = (props) => {
    const authentication = useAuthentication();
    const requestConfig: any = {
        headers: {
            'Authorization': authentication.accessToken as string
        }
    }
    const [purchasedTickets, setPurchasedTickets] = useState<Array<Ticket>>([]);
    const [newTickets, setNewTickets] = useState<Array<Ticket>>([]);

    const saveTickets = (tickets: Ticket[]): Promise<void> => {
        return saveTicketsApi(tickets, requestConfig, authentication.userId!)
            .then(savedTickets => {
                if (savedTickets) {
                    setPurchasedTickets(purchasedTickets.concat(savedTickets))
                    setNewTickets([]);
                }
            })
    }

    const getAllTickets = () => {
        getAllTicketsApi(requestConfig)
            .then(tickets => {
                if (tickets)
                    setPurchasedTickets(tickets);
            })
            .catch(error => console.log(error))
    }

    const getAllTicketsOfUser = (userId: number) => {
        getTicketsForUserApi(userId, requestConfig)
            .then(tickets => {
                if (tickets)
                    setPurchasedTickets(tickets)
            })
            .catch(error => console.log(error))
    }

    const addToCart = (ticket: Ticket) => {
        setNewTickets(newTickets.concat(ticket));
    }

    const removeFromCart = (ticket: Ticket) => {
        setNewTickets(newTickets.filter(t => t !== ticket));
    }

    const context: TicketContextType = {
        newTickets: newTickets,
        purchasedTickets: purchasedTickets,
        availableTickets: availableTickets,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        saveTickets: saveTickets,
        getAllTickets: getAllTickets,
        getAllTicketsOfUser: getAllTicketsOfUser
    }

    return <TicketContext.Provider value={context}>
        <StagesProvider>
            {props.children}
        </StagesProvider>
    </TicketContext.Provider>
}

export default TicketsProvider;