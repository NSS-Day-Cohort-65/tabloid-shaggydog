import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, ModalBody } from "reactstrap"
import { postTag } from "../../managers/tagManager";

export const CreateTagModal = ({ toggle, getAllTags }) => {
    const [tagName, setTagName] = useState("");
    const [error, setError] = useState(false);

    const handleCreate = () => {
        const newTag = {
            name: `#${tagName}`
        }

        if (!tagName) {
            setError(true);
        }
        else {
            postTag(newTag)
                .then(() => {
                    getAllTags();
                    toggle();
                })
        }
    }

    return (
        <>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="tagName">Name:</Label>
                        <InputGroup>
                            <InputGroupText>#</InputGroupText>
                            <Input 
                            type="text"
                            name="tagName"
                            invalid={error}
                            onChange={(e) => {
                                setTagName(e.target.value);
                            }}/>
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