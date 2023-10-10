import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, ModalBody } from "reactstrap"
import { putTag } from "../../managers/tagManager";

export const EditTagModal = ({ tagObject, toggle, getAllTags }) => {
    const [tag, setTag] = useState(tagObject.name.substring(1));
    const [error, setError] = useState(false);

    const handleEdit = () => {
        const newTag = {
            id: tagObject.id,
            name: `#${tag}`
        }

        if (!tag) {
            setError(true);
        }
        else {
            putTag(tagObject.id, newTag)
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
                        <Label htmlFor="tagEdit">Name:</Label>
                        <InputGroup>
                            <InputGroupText>#</InputGroupText>
                            <Input 
                            type="text"
                            name="tagEdit"
                            defaultValue={tagObject.name.substring(1)}
                            invalid={error}
                            onChange={(e) => {
                                setTag(e.target.value);
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
                    <Button
                    onClick={() => {
                        handleEdit();
                    }}>
                        Save
                    </Button>
                </Form>
            </ModalBody>
        </>
    )
}