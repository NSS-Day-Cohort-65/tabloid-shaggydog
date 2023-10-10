import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, getProfiles } from "../../managers/userProfileManager";

export default function UserProfileDetails() {
 const [userProfiles, setUserProfiles] = useState([]);
 const [userProfile, setUserProfile] = useState();

 const { id } = useParams();

 useEffect(() => {
  getProfiles().then(setUserProfiles);
 }, []);

 useEffect(() => {
  setUserProfile(
   userProfiles.find((userProfile) => userProfile.id == parseInt(id))
  );
 }, [userProfiles]);

 if (!userProfile) {
  return null;
 }
 return (
  <>
   <img src={userProfile.imageLocation} alt={userProfile.firstName} />
   <h3>{userProfile.fullName}</h3>
   <p>Username: {userProfile.userName}</p>
   <p>Email: {userProfile.email}</p>
   <p>
    Creation Date: {userProfile.createDateTime.split("T")[0]} Time:{" "}
    {userProfile.createDateTime.split("T")[1]}
   </p>
   <p>Roles:</p>
   {userProfile.roles.length > 0
    ? userProfile.roles.map((role, index) => {
       return <p>{role}</p>;
      })
    : "Default User"}
  </>
 );
}
