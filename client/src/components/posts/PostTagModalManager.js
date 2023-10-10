import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deletePost } from "../../managers/postManager";
import { fetchTags, postPostTag } from "../../managers/tagManager";

export const PostTagModalManager = ({ post, getData }) => {
 const [modal, setModal] = useState(false);
 const [tags, setTags] = useState([]);
 const [selectedTag, setSelectedTag] = useState(null);

 //get the list of tags
 async function getData() {
  fetchTags().then(setTags);
 }
 //use effect to to fetch data on load
 useEffect(() => {
  getData();
 }, []);

 const toggle = () => setModal(!modal);
 const handleDeleteButton = () => {
  deletePost(post)
   .then(() => {
    getData();
   })
   .then(toggle);
 };

 const handleSelect = (e) => {
  setSelectedTag(e.target.value);
 };

 const handleSubmit = () => {
  const newTagRelationship = {
   PostId: post.id,
   TagId: parseInt(selectedTag),
  };
  postPostTag(newTagRelationship).then(toggle);
 };

 return (
  <div>
   <Button color="info" onClick={toggle}>
    # IT UPP BB
   </Button>
   <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Add NEW ZESTY TAGG!</ModalHeader>
    <ModalBody>
     <select onChange={handleSelect}>
      <option selected disabled>
       Select New Tag
      </option>
      {tags.map((tag) => {
       return <option value={tag.id}>{tag.name}</option>;
      })}
     </select>
    </ModalBody>
    <ModalFooter>
     <Button color="primary" onClick={handleSubmit}>
      Confirm #TAGGY TAG
     </Button>{" "}
     <Button color="danger" onClick={toggle}>
      Cancel
     </Button>
    </ModalFooter>
   </Modal>
  </div>
 );
};
