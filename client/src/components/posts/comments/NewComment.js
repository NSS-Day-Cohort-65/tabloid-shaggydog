import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, Label } from "reactstrap"
import { postComment } from "../../../managers/commentsManager";

export const NewComment = ({ loggedInUser, postObject, toggle, getAllComments }) => {
    const [commentSubject, setCommentSubject] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [subjectError, setSubjectError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const handleSubmit = () => {
        if (!commentSubject) {
            setSubjectError(true);
        } else if (!commentContent) {
            setContentError(true);
        } else {
            const newComment = {
                postId: postObject.id,
                userProfileId: loggedInUser.id,
                subject: commentSubject,
                content: commentContent
            }

            postComment(newComment).then(() => {
                setCommentSubject("");
                setCommentContent("");
                getAllComments();
                toggle();
            })
        }

        
    }

    return (
        <div className="newCommentForm">
            <Form>
                <FormGroup>
                    <Label htmlFor="newCommentSubject">Subject:</Label>
                    <InputGroup style={{ width: '15rem'}}>
                        <Input 
                            type="text"
                            name="newCommentSubject"
                            invalid={subjectError}
                            onChange={(e) => {
                                setCommentSubject(e.target.value);
                            }}
                        />
                        {
                            subjectError
                            ?
                            <FormFeedback>
                                Subject can't be blank
                            </FormFeedback>
                            :
                            ""
                        }
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="newCommentContent">Add a comment</Label>
                    <InputGroup>
                        <Input 
                            type="text"
                            name="newCommentContent"
                            invalid={contentError}
                            onChange={(e) => {
                                setCommentContent(e.target.value);
                            }}
                        />
                        {
                            contentError
                            ?
                            <FormFeedback>
                                Comment content can't be blank
                            </FormFeedback>
                            :
                            ""
                        }
                        <Button
                            onClick={() => {
                                handleSubmit();
                        }}>
                            Save
                        </Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        </div>
    )
}