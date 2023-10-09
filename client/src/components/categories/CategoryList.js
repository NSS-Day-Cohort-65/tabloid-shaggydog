import { useEffect, useState } from "react"
import { fetchCategories, deleteCategory, postCategory } from "../../managers/categoryManager";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Table } from "reactstrap";


export const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const [newCategoryName, setNewCategoryName] = useState("");
    const [createModal, setCreateModal] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    const toggle = () => {
        setCreateModal(!createModal);
        if (createVisible) setCreateVisible(false);
    };
    const onDismiss = () => setCreateVisible(false);

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
            }

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
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr key={`categories-${c.id}`}>
                                <th scope="row">{c.id}</th>
                                <td>{c.name}</td>
                                <td>
                                    <Button
                                        color="danger"
                                        onClick={() => {
                                            handleDelete(c.id);
                                        }}
                                    >Delete</Button>
                                </td>
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
                <div className="alert-float" style={{position: 'absolute', top: 10, left: 150}}>
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
                            Submit
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}