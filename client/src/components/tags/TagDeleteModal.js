import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"


export const TagDeleteModal = ({ isOpen, toggle, deleteT }) => {
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
                <ModalBody>Are you sure you want to delete this tag?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteT}>Confirm Delete</Button>{" "}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};