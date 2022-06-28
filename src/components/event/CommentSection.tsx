import React, {useEffect, useState} from "react";
import {
    IonAlert,
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonText,
    IonTextarea,
} from "@ionic/react";
import CommentBox from "./CommentBox";
import {star} from "ionicons/icons";
import Comment from "../../model/Comment";
import Event from "../../model/Event";
import {useComments} from "../../store/CommentsContext";

const CommentSection: React.FC<{ event: Event }> = ({event}) => {
    const [rate, setRate] = useState<number>(0);
    const [commentContent, setCommentContent] = useState<string>("")

    const commentsContext = useComments();

    useEffect(() => {
        commentsContext.getCommentsForEvent(event)
    }, [])

    const addComment = () => {
        let newComment: Comment = {
            id: 0,
            rate : rate,
            content : commentContent,
            user: undefined,
            event: event
        }
        commentsContext.addNewComment(newComment);
        return(<IonAlert buttons={['OK']} isOpen={true} message={"Successfully added new comment"} />);
    };


    return (
        <div className="comments">
            <IonRow className="comments-header">
                <IonText className="comments-title">Comments ({commentsContext.commentsForCurrentEvent.length})</IonText>
                {commentsContext.commentsForCurrentEvent.map(comment => {
                    return (
                        <CommentBox key={comment.id} comment={comment}/>
                    );
                })}
            </IonRow>

            <IonGrid className="add-comment">
                <IonText className="comments-title">Write a comment</IonText>
                <IonRow className="row">
                    <IonCol>
                        <IonTextarea placeholder={"Your comment..."} value={commentContent} onIonChange={e => setCommentContent(e.detail.value!)}/>
                    </IonCol>
                </IonRow>
                <IonRow className="comment-rate">
                    <IonRadioGroup>
                        {[...Array(5)].map((item, index) => {
                            const givenRating = index + 1;
                            return (
                                <IonLabel key={index}>
                                    <IonRadio
                                        id="starRadio"
                                        value={givenRating}
                                        onClick={() => {
                                            setRate(givenRating);
                                        }}
                                    />
                                    <IonIcon
                                        id="stars"
                                        icon={star}
                                        color={
                                            givenRating < rate || givenRating === rate
                                                ? "red"
                                                : "grey"
                                        }
                                    />
                                </IonLabel>
                            );
                        })}
                    </IonRadioGroup>
                </IonRow>

                <IonButton color="grey" onClick={addComment}>Add comment</IonButton>
            </IonGrid>
        </div>
    );
};

export default CommentSection;
