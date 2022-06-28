import React from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonRow, IonText,} from "@ionic/react";
import {personOutline, time} from "ionicons/icons";
import Comment from "../../model/Comment";

const CommentBox: React.FC<{ comment: Comment }> = ({comment}) => {
    return (
        <IonCard className="comment-card">
            <IonCardHeader className="comment-header">
                <IonIcon className="comment-user" icon={personOutline}></IonIcon>
            </IonCardHeader>
            <IonCardContent className="comment-content">
                <IonRow className="comment-info">
                    <IonCol size="6" className="comment-name">
                        <IonText>Rate: {comment.rate}</IonText>
                    </IonCol>
                    <IonCol size="7" className="comment-time">
                        <IonIcon icon={time} id="timeIconComm"></IonIcon>
                        May 27, 2015
                    </IonCol>
                </IonRow>

                <IonText className="comment-text">
                    {comment.content}
                </IonText>
            </IonCardContent>
        </IonCard>
    );
};

export default CommentBox;
