import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { fetchTags } from "../../managers/tagManager";
import { Table } from "reactstrap";


export const TagList = () => {
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTags().then(setTags);
    }, []);

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Tags</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>Id #</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((t) => (
                            <tr key={`tags-${t.id}`}>
                                <th scope="row">{t.id}</th>
                                <td>{t.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}