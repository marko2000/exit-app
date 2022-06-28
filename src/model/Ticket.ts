import Stage from "./Stage";
import User from "./User";

interface Ticket {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    purchaseDate: Date;
    discount: number;
    stage: Stage | undefined;
    owner: User | undefined;
}

export default Ticket;