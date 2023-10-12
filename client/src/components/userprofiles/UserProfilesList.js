import { useEffect, useState } from "react";
import { activateProfile, deactivateProfile, getProfiles } from "../../managers/userProfileManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { UserProfileDeactivation } from "./UserProfileDeactivation";

export default function UserProfileList({ loggedInUser }) {
  const [userprofiles, setUserProfiles] = useState([]);

  const navigate = useNavigate();

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };

  useEffect(() => {
    getUserProfiles();
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>User Profile List</h4>
        <Button onClick={() => navigate('/userprofiles/deactivated')}>Show Deactivated Profiles</Button>
        <Table>
          <thead>
            <tr>
              <th>Id #</th>
              <th>Full Name</th>
              <th>Display Name</th>
              <th>Admin?</th>
              <th></th>
              <th></th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            {userprofiles.map((up) => (
              <tr key={`user-${up.id}`}>
                <th scope="row">{up.id}</th>
                <td>{up.fullName}</td>
                <td>{up.userName}</td>
                <td>{up.roles}</td>
                <td> <Link to={`/userprofiles/${up.id}`}>Details</Link></td>
                <td> <Link to={`/userprofiles/edit/${up.id}`}>Edit</Link></td>
                <td>{up.isActive.toString()}</td>
                {up.isActive ? (
                  <td>
                    {loggedInUser?.roles.includes("Admin") ? (
                      <UserProfileDeactivation userProfile={up} getUserProfiles={getUserProfiles} />
                    ) : (
                      ""
                    )}
                  </td>
                ) : ""
                }
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

