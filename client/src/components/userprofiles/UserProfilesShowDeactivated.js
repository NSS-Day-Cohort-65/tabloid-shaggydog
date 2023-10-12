import { useEffect, useState } from "react";
import { activateProfile, getDeactivatedProfiles, getProfiles } from "../../managers/userProfileManager";
import { Button, Table } from "reactstrap";

export default function UserProfilesShowDeactivated({ loggedInUser }) {
    const [userProfiles, setUserProfiles] = useState([]);
    const [filterdUserProfiles, setFilteredUserProfiles] = useState([])

    useEffect(() => {
        getDeactivatedProfiles().then(setUserProfiles);
    }, [])

    const handleActivate = (e) => {
        e.preventDefault()
        activateProfile(e.target.value)
            .then(() => getDeactivatedProfiles())
            .then(setUserProfiles);
    }

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>User Profile List</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>Id #</th>
                            <th>Full Name</th>
                            <th>Display Name</th>
                            <th>Admin?</th>
                            <th>Active?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userProfiles.map((up) => (
                            <tr key={`user-${up.id}`}>
                                <th scope="row">{up.id}</th>
                                <td>{up.fullName}</td>
                                <td>{up.userName}</td>
                                <td>{up.roles}</td>
                                <td>{up.isActive.toString()}</td>
                                <Button
                                    color="success"
                                    value={up.id}
                                    onClick={handleActivate}>Reactivate</Button>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

