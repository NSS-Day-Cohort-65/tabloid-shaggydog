import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteTag } from "../../managers/tagManager";
import { deactivateProfile } from "../../managers/userProfileManager";


export const UserProfileDeactivation = ({ userProfile, getUserProfiles }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleDeactivate = () => {
        deactivateProfile(userProfile.id)
            .then(() => getUserProfiles())
            .then(toggle);
    };

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Deactivate User
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirm Deactivation</ModalHeader>
                <ModalBody>Are you sure you want to deactivate this user?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeactivate}>Confirm Deactivation</Button>{" "}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};