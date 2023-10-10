import { Button, ModalBody } from "reactstrap"
import { deletePostTag } from "../../managers/tagManager"
import { useEffect, useState } from "react";


export const ManagePostTagsModal = ({post, toggle, getPostById}) => {
    const [selectedPostTags, setSelectedPostTags] = useState()

    useEffect(() => {
        setSelectedPostTags(post.postTags)
    }, []
    )
    
    const handleDeletePostTags = async (deselectedPostTags) => {
        for (const d of deselectedPostTags) {
            await deletePostTag(d.id)
        }
        await getPostById()
        await toggle()
    }

    const handleCheckboxChange = (event) => {
        const matchingPostTag = post.postTags.find(pt => pt.id === parseInt(event.target.value))

        if (event.target.checked) {
            setSelectedPostTags([...selectedPostTags, matchingPostTag])
        } else {
            setSelectedPostTags(selectedPostTags.filter(pt => pt.id != parseInt(event.target.value)))
        }
    }

    if (!selectedPostTags) {
        return null
    }
    
    return (
        <>
            <ModalBody>
                <div>
                    {
                        post.postTags.length
                        ? post.postTags.map(pt => {
                            return <div key={`tag--${pt.id}`}>
                                <input 
                                type="checkbox" 
                                value={pt.id} 
                                checked={!!selectedPostTags.find(s => s.id == pt.id)}
                                onChange={handleCheckboxChange}/>
                                <p>{pt.tag.name}</p>
                            </div>
                        })
                        : <p>No tags have been assigned to this post</p>
                    }
                </div>
                <Button style={{display: post.postTags.length ? "block" : "none"}} 
                    onClick={() => {
                        const deselectedPostTags = post.postTags.filter(pt => {
                        const foundPostTag = selectedPostTags.find(s => s.id == pt.id)
                        return !foundPostTag && pt
                    })

                    if (deselectedPostTags.length) {
                        handleDeletePostTags(deselectedPostTags)
                    } else {
                        window.alert(`You must deselect at least one tag in order to save changes.`)
                    }
                }}>
                    Save
                </Button>
            </ModalBody>
        </>
    )
}