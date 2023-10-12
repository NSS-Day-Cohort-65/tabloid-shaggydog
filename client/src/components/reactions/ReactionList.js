import { useEffect, useState } from "react"
import { fetchReactions } from "../../managers/reactionManager";
import { Button, Table } from "reactstrap";

export const ReactionList = ({ loggedInUser }) => {
    const [reactions, setReactions] = useState();

    const getAllReactions = () => {
        fetchReactions().then(setReactions);
    }

    useEffect(
        () => {
            getAllReactions();
        },
        []
    )

    if (!reactions) return;
    
    return (
        <div className="container">
            <h4>Reactions</h4>
            <div className="sub-menu bg-light">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reactions.map((r) => (
                            <tr key={`reaction--${r.id}`}>
                                <th scope="row">{r.id}</th>
                                <td>{r.name}</td>
                                <td>
                                    <img 
                                        src={`${r.imageLocation}`}
                                        alt={`${r.name}`}
                                        width={25}
                                        height={25}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button>
                    Create Reaction
                </Button>
            </div>
        </div>
    )
}