import { useEffect, useState } from "react"
import { fetchCategories, deleteCategory, fetchCategory } from "../../managers/categoryManager";
import {  Button, Modal, ModalHeader, Table } from "reactstrap";
import { ConfirmDeleteCategoryModal } from "./ConfirmDeleteCategoryModal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";


export const CategoryList = ({ loggedInUser }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const toggle = () => {setCreateModal(!createModal)};
    const editToggle = () => {setEditModal(!editModal)};


    const getAllCategories = () => {
        fetchCategories().then(setCategories);
    }

    const handleDelete = (id) => {
        deleteCategory(id).then(() => {
            getAllCategories();
        })
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Categories</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>Id #</th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr key={`categories-${c.id}`}>
                                <th scope="row">{c.id}</th>
                                <td>{c.name}</td>
                                <td>
                                    <Button
                                        color="warning"
                                        onClick={() => {
                                            fetchCategory(c.id).then(setSelectedCategory).then(editToggle);
                                        }}
                                    >Edit</Button>
                                </td>
                                <td>
                                    {loggedInUser?.roles.includes("Admin") ? (
                                        <ConfirmDeleteCategoryModal category={c} getAllCategories={getAllCategories} />
                                    ) : (
                                        ""
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button
                color="success"
                onClick={toggle}>
                Create Category
            </Button>
            <Modal isOpen={createModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Category</ModalHeader>
                <CreateCategoryModal toggle={toggle} getAllCategories={getAllCategories}/>
            </Modal>
            <Modal isOpen={editModal} toggle={editToggle}>
                <ModalHeader toggle={editToggle}>Edit Category</ModalHeader>
                <EditCategoryModal categoryObject={selectedCategory} toggle={editToggle} getAllCategories={getAllCategories}/>
            </Modal>
        </div>
    )
}