import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { updateProfileImage } from "../managers/userProfileManager";
import { cloud_Name, preset_key } from "../_env";

function ModalForPicture({ loggedInUser }) {
 const [modal, setModal] = useState(false);
 const [selectedImage, setSelectedImage] = useState("");
 const toggle = () => setModal(!modal);
 //preset key for cloudinary //hide these?

 //function to upload the image to the cloudinary api
 function handleFile(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset_key);
  axios
   .post(`https://api.cloudinary.com/v1_1/${cloud_Name}/image/upload`, formData)
   .then((res) => setSelectedImage(res.data.secure_url))
   .catch((err) => console.log(err));
 }

 function handleSubmit() {
  if (selectedImage !== "") {
   //  console.log(selectedImage);
   updateProfileImage(loggedInUser.id, selectedImage).then(toggle);
  }
  console.log("No File Selected!");
 }

 return (
  <div>
   <Button color="danger" onClick={toggle}>
    Click Me
   </Button>
   <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Upload New Profile Picture!</ModalHeader>
    <ModalBody>
     <input type="file" name="myImage" onChange={handleFile} />
    </ModalBody>
    <ModalFooter>
     <Button color="primary" onClick={handleSubmit}>
      Submit
     </Button>{" "}
     <Button color="secondary" onClick={toggle}>
      Cancel
     </Button>
    </ModalFooter>
   </Modal>
  </div>
 );
}

export default ModalForPicture;
