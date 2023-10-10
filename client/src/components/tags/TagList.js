import { useEffect, useState } from "react"
import { fetchTag, fetchTags, postTag } from "../../managers/tagManager";
import { Alert, Button, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { EditTagModal } from "./EditTagModal";
import { CreateTagModal } from "./CreateTagModal";
import { ConfirmDeleteTagModal } from "./ConfirmDeleteTagModal";


export const TagList = ({ loggedInUser }) => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState();

    const [newTagName, setNewTagName] = useState("");
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const toggle = () => { setCreateModal(!createModal) };
    const editToggle = () => { setEditModal(!editModal) };


    const getAllTags = () => {
        fetchTags().then(setTags);
    }

    const handleCreate = () => {
        if (!newTagName) {
            setCreateVisible(true)
        }
        else {
            const newTag = {
                name: `#${newTagName}`
            };

            postTag(newTag)
                .then(() => {
                    toggle();
                    getAllTags();
                })

        }
    }

    useEffect(() => {
        getAllTags();
    }, []);



    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Tags</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>Id #</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((t) => (
                            <tr key={`tags-${t.id}`}>
                                <th scope="row">{t.id}</th>
                                <td>{t.name}</td>
                                <td>
                                    <Button
                                        color="warning"
                                        onClick={() => {
                                            fetchTag(t.id).then(setSelectedTag).then(editToggle);
                                        }}
                                    >Edit</Button>
                                </td>
                                {loggedInUser?.roles.includes("Admin") ? (
                                    <ConfirmDeleteTagModal tag={t} getAllTags={getAllTags} />
                                ) : (
                                    ""
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button
                onClick={toggle}>
                Create Tag
            </Button>
            <Modal isOpen={createModal} toggle={toggle}>
                <div className="alert-float" style={{ position: 'absolute', top: 10, left: 150 }}>
                    <Alert color="info" isOpen={createVisible} toggle={onDismiss}>
                        Please enter a name
                    </Alert>
                </div>
                <ModalHeader toggle={toggle}>Add Tag</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="tagName">Name:</Label>
                            <InputGroup>
                                <InputGroupText>#</InputGroupText>
                                <Input
                                    type="text"
                                    name="tagName"
                                    onChange={(e) => {
                                        setNewTagName(e.target.value)
                                    }}
                                />
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
            </Modal>
        </div>
    )
}