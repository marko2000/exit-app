import User from "./User";
import Event from "./Event";

interface Comment {
    id: number;
    rate: number;
    content: string;
    event: Event;
    user: User | undefined;
}

export default Comment;