import { useEffect, useState } from "react"
import { fetchCategories, deleteCategory, postCategory } from "../../managers/categoryManager";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { ConfirmDeleteCategoryModal } from "./ConfirmDeleteCategoryModal";


export const CategoryList = ({ loggedInUser }) => {
    const [categories, setCategories] = useState([]);

    const [newCategoryName, setNewCategoryName] = useState("");
    const [createModal, setCreateModal] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    const onDismiss = () => setCreateVisible(false);
    const toggle = () => {
        setCreateModal(!createModal);
        if (createVisible) setCreateVisible(false);
    };


    const getAllCategories = () => {
        fetchCategories().then(setCategories);
    }

    const handleCreate = () => {
        if (!newCategoryName) {
            setCreateVisible(true)
        }
        else {
            const newCategory = {
                name: newCategoryName
            };

            postCategory(newCategory)
                .then(() => {
                    toggle();
                    getAllCategories();
                })
        }
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
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr key={`categories-${c.id}`}>
                                <th scope="row">{c.id}</th>
                                <td>{c.name}</td>
                                {loggedInUser?.roles.includes("Admin") ? (
                                    <ConfirmDeleteCategoryModal category={c} getAllCategories={getAllCategories} />
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
                Create Category
            </Button>
            <Modal isOpen={createModal} toggle={toggle}>
                <div className="alert-float" style={{ position: 'absolute', top: 10, left: 150 }}>
                    <Alert color="info" isOpen={createVisible} toggle={onDismiss}>
                        Please enter a name
                    </Alert>
                </div>
                <ModalHeader toggle={toggle}>Add Category</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="categoryName">Name:</Label>
                            <Input
                                type="text"
                                name="categoryName"
                                onChange={(e) => {
                                    setNewCategoryName(e.target.value);
                                }}
                            />
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