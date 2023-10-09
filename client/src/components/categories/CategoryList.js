import { useEffect, useState } from "react"
import { fetchCategories } from "../../managers/categoryManager";
import { Table } from "reactstrap";


export const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}