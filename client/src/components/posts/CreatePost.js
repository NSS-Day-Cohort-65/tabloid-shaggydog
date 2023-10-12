import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../managers/postManager"
import { fetchCategories } from "../../managers/categoryManager"
import { Button } from "reactstrap"


export const CreatePost = ({ loggedInUser }) => {
    const [post, update] = useState({
        title: "",
        content: "",
        imageLocation: "",
        categoryId: 0,
        userProfileId: loggedInUser.id,
        isApproved: loggedInUser.roles.includes("Admin") ? true : false
    })
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories().then(setCategories)
    }, [])

    const handleSave = (evt) => {
        evt.preventDefault()
        createPost(post).then((res) => navigate(`/posts/${res.id}`))
    }
    return (
        <>
            <form>
                <h2>Make a New Post</h2>
                <fieldset>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Cool Title Goes Here..."
                            value={post.title}
                            onChange={
                                (evt) => {
                                    const copy = {...post}
                                    copy.title = evt.target.value
                                    update(copy)
                                }
                            }/>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>Content:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Hippity hoppity, get your ass off my property"
                            value={post.content}
                            onChange={
                                (evt) => {
                                    const copy = {...post}
                                    copy.content = evt.target.value
                                    update(copy)
                                }
                            }/>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>Category:</label>
                        <select onChange={
                            (evt) => {
                                const copy = {...post}
                                copy.categoryId = parseInt(evt.target.value)
                                update(copy)
                            }
                        }>
                            <option value={0}>Choose Category...</option>
                            {categories.map((c) => {
                                return <option value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>Header Image URL:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="http://battlekid.fart"
                            value={post.imageLocation}
                            onChange={
                                (evt) => {
                                    const copy = {...post}
                                    copy.imageLocation = evt.target.value
                                    update(copy)
                                }
                            }/>
                    </div>
                </fieldset>
                <Button onClick={(clickEvent)=>handleSave(clickEvent)}>Save</Button>
            </form>
        </>
    )
}