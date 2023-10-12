import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, Label, ModalBody } from "reactstrap"
import { postReaction } from "../../managers/reactionManager";

export const CreateReactionModal = ({ toggle, getAllReactions }) => {
    const [reactionName, setReactionName] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [error, setError] = useState(false);
    const [locationError, setLocationError] = useState(false);

    const handleCreate = () => {
        if (!reactionName) {
            setError(true);
        } 
        if (!imageLocation) {
            setLocationError(true);
        } 
        
        if (reactionName && imageLocation) {
            const newReaction = {
                name: reactionName,
                imageLocation: imageLocation
            }

            postReaction(newReaction)
                .then(() => {
                    getAllReactions();
                    toggle();
                })
        }
    }

    return (
        <>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="reactionName">Name:</Label>
                        <InputGroup>
                            <Input 
                                type="text"
                                name="reactionName"
                                invalid={error}
                                onChange={(e) => {
                                    setReactionName(e.target.value);
                                }}
                            />
                            {
                                error
                                ?
                                <FormFeedback>
                                    Name can't be blank
                                </FormFeedback>
                                :
                                ""
                            }
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="imageLocation">Image URL:</Label>
                        <InputGroup>
                            <Input
                                type="text"
                                name="imageLocation"
                                invalid={locationError}
                                onChange={(e) => {
                                    setImageLocation(e.target.value);
                                }}
                            />
                            {
                                locationError
                                ?
                                <FormFeedback>
                                    Must have image URL
                                </FormFeedback>
                                :
                                ""
                            }
                        </InputGroup>
                    </FormGroup>
                    <Button
                        onClick={() => {
                            handleCreate();
                        }}>
                            Save
                        </Button>
                </Form>
            </ModalBody>
        </>
    )
}