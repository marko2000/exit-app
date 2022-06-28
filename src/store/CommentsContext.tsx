import React, {createContext, useContext, useState} from "react";
import Comment from "../model/Comment";
import Event from "../model/Event";
import {useAuthentication} from "./AuthenticationContext";
import {deleteCommentApi, getAllCommentsApi, getCommentsForEventApi, saveNewCommentApi} from "../api/commentsApi";


const CommentContext = createContext<CommentsContextType>({
    commentsForCurrentEvent: [],
    comments: [],
    addNewComment: () => {
    },
    deleteComment: () => {
    },
    getAllComments: () => {},
    getCommentsForEvent: () => {
    },
})

export const useComments = () => {
    return useContext(CommentContext);
}

type CommentsContextType = {
    commentsForCurrentEvent: Array<Comment>,
    comments: Array<Comment>
    addNewComment: (comment: Comment) => void
    deleteComment: (comment: Comment) => void
    getAllComments: () => void
    getCommentsForEvent: (event: Event) => void
}

export const CommentsProvider: React.FC = (props) => {
    const authentication = useAuthentication();
    const requestConfig: any = {
        headers: {
            'Authorization': authentication.accessToken as string
        }
    }
    const [comments, setComments] = useState<Array<Comment>>([]);
    const [commentsForCurrentEvent, setCommentsForCurrentEvent] = useState<Array<Comment>>([])

    const addNewComment = (comment: Comment) => {
        saveNewCommentApi(comment, authentication.userId!, requestConfig)
            .then(savedComment => {
                let newComments = commentsForCurrentEvent.concat(savedComment);
                setComments([...newComments])
            }).catch(error => console.log(error))
    }

    const getCommentsForEvent = (event: Event) => {
        getCommentsForEventApi(event.id, requestConfig)
            .then(commentsOfEvent => {
                if (commentsOfEvent)
                    setCommentsForCurrentEvent(commentsOfEvent);
            })
            .catch(error => console.log(error))
    }

    const deleteComment = (comment: Comment) => {
        deleteCommentApi(comment, requestConfig)
            .then(deletedComment => {
                setComments(commentsForCurrentEvent.filter(c => c.id !== deletedComment!.id))
            })
            .catch(error => console.log(error))
    }

    const getAllComments = () => {
        getAllCommentsApi(requestConfig)
            .then(commentsOfEvent => {
                if (commentsOfEvent)
                    setComments(commentsOfEvent);
            })
            .catch(error => console.log(error))
    }

    const context: CommentsContextType = {
        commentsForCurrentEvent: commentsForCurrentEvent,
        comments: comments,
        addNewComment: addNewComment,
        getAllComments: getAllComments,
        deleteComment: deleteComment,
        getCommentsForEvent: getCommentsForEvent
    }

    return <CommentContext.Provider value={context}>
            {props.children}
    </CommentContext.Provider>
}

export default CommentsProvider;