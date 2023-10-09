import { useEffect, useState } from "react"
import { deleteCategory, fetchCategories } from "../../managers/categoryManager";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";


export const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    const handleDelete = (id) => {
        deleteCategory(id).then(() => {
            navigate("/categories");
        })
    }

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
        </div>
    )
}