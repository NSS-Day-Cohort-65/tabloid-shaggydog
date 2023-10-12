import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editPost, fetchSinglePost } from "../../managers/postManager";
import { Button } from "reactstrap";
import { fetchCategories } from "../../managers/categoryManager";

export const EditPost = () => {
    const {id} = useParams()
    const [post, setPost] = useState();
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchSinglePost(id).then(setPost);
        fetchCategories().then(setCategories)
    }, []
    )

    const handleSubmitPostUpdates = (event) => {
        event.preventDefault()
        editPost(post.id, post).then(() => navigate(`/posts/${post.id}`))
    }
    
    if (!post) {
        return null 
    }

    return (
        <>
            <form>
                <h2>Edit Post</h2>
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
                                    setPost(copy)
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
                                    setPost(copy)
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
                                setPost(copy)
                            }
                        }>
                            <option value={0} hidden></option>
                            {categories.map((c) => {
                                return <option value={c.id} selected={c.id === post.categoryId}>{c.name}</option>
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
                                    setPost(copy)
                                }
                            }/>
                    </div>
                </fieldset>
                <Button 
                    onClick={handleSubmitPostUpdates}
                >Save</Button>
                <Button 
                    onClick={() => navigate(`/posts/${post.id}`)}
                >Cancel</Button>
            </form>
        </>
    )
}