import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);
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
        <Table>
          <thead>
            <tr>
              <th>Id #</th>
              <th>Full Name</th>
              <th>Display Name</th>
              <th>Admin?</th>
              <th></th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

