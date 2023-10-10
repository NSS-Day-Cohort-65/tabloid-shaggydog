import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteTag } from "../../managers/tagManager";


export const ConfirmDeleteTagModal = ({ tag, getAllTags }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleDeleteButton = () => {
        deleteTag(tag.id)
            .then(() => {
                getAllTags();
            })
            .then(toggle);
    };

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
                <ModalBody>Are you sure you want to delete this tag?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteButton}>Confirm Delete</Button>{" "}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};