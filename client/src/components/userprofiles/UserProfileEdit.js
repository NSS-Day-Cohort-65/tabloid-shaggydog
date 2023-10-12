import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { demoteProfile, editProfile, getProfileAndRoles, promoteProfile } from "../../managers/userProfileManager"
import { Alert, Button } from "reactstrap"


export const UserProfileEdit = () => {
    const {id} = useParams()
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const render = () => {
        getProfileAndRoles(parseInt(id)).then(setUser)
    }

    const promoteUserClick = (evt) => {
        evt.preventDefault()
        promoteProfile(parseInt(id)).then(render())
    }

    const demoteUserClick = (evt) => {
        evt.preventDefault()
        demoteProfile(parseInt(id)).then(render())
        .catch(Window.Alert("You're the only admin left!"))
    }

    const handleSave = (evt) => {
        evt.preventDefault()
        editProfile(user).then(navigate("/userprofiles"))
    }

    const cancel = (evt) => {
        evt.preventDefault()
        navigate("/userprofiles")
    }

    useEffect(() => {
        render()
    }, [])

    if (!user) {
        return null;
       }
       return (
        <>
        <img src={user.imageLocation} alt={user.firstName} />
        <form>
            <fieldset>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.firstName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.firstName = evt.target.value
                                setUser(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.lastName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.lastName = evt.target.value
                                setUser(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.userName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.userName = evt.target.value
                                setUser(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.email = evt.target.value
                                setUser(copy)
                            }
                        }/>
                </div>
            </fieldset>
            {user.roles.some(role => role.name === "Admin")
            ? <Button onClick={(clickEvent)=>demoteUserClick(clickEvent)}>Demote</Button> 
            : <Button onClick={(clickEvent)=>promoteUserClick(clickEvent)}>Make Admin</Button>}
            <Button onClick={(clickEvent)=> handleSave(clickEvent)}>Save</Button>
            <Button onClick={(clickEvent)=>cancel(clickEvent)}>Cancel</Button>
        </form>
        </>
       )

    //save button to make PUT
    //cancel button which is redirect to userprofile list
}