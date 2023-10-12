import { useNavigate, useParams } from "react-router-dom";
import { fetchSinglePost } from "../../managers/postManager";
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, Button } from "reactstrap";
import { ManagePostTagsModal } from "./ManagePostTagsModal";

import { PostTagModalManager } from "./PostTagModalManager";
import { createSubscription, endSubscription, fetchUserSubscriptions } from "../../managers/subscriptionManager";
import { fetchReactions } from "../../managers/reactionManager";

export const PostDetails = ({ loggedInUser }) => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [tagsModalOpen, setTagsModalOpen] = useState(false)
    const [reactions, setReactions] = useState();
    const navigate = useNavigate()
    const [userSubscribed, setUserSubscribed] = useState(false);
    const [userSubscription, setUserSubscription] = useState();

    const toggleTagsModal = () => {
        setTagsModalOpen(!tagsModalOpen);
    }

    const getPostById = () => {
        fetchSinglePost(parseInt(id)).then(setPost);
    };

    const getSubscriptionStatus = () => {
        fetchUserSubscriptions(loggedInUser.id)
        .then((res) => {
            if (res.find(s => s.providerUserProfileId === post.userProfileId && s.endDateTime === null)) {
                setUserSubscription(res.find(s => s.providerUserProfileId === post.userProfileId));
                setUserSubscribed(true);
            } else {
                setUserSubscribed(false);
            }
        })
    }

    const handleSubscribe = () => {
        if (!userSubscribed) {
            const newSubscription = {
                subscriberUserProfileId: loggedInUser.id,
                providerUserProfileId: post.userProfile.id
            }

            createSubscription(newSubscription)
                .then(getSubscriptionStatus);
        } else {
            endSubscription(userSubscription.id)
                .then(getSubscriptionStatus);
        }
    }

    useEffect(() => {
        fetchReactions().then(setReactions).then(() => {
            getPostById();
        });
    }, []);

    useEffect(() => {
        if (post) {
            getSubscriptionStatus();
        }
    }, [post]);

    if (!post) {
        return ``;
    }

    return (
        <>
            <h2>{post.title}</h2>
            <img src={post.imageLocation} width={250} height={300}></img>
            <p>{post.content}</p>
            <p>
                Published: {post.publishDateTime}, Author: {post.userProfile.fullName}
            </p>
            <div className="postReactions">
                {reactions.map((r) => (
                    <span key={`postReaction--${r.id}`}>
                        <img 
                            src={`${r.imageLocation}`} 
                            alt={`${r.name}`}
                            id="postReaction"
                            width={25}
                            height={25}
                            />
                        {
                            post.postReactionDTOs.find((prdto) => (
                                prdto.name === r.name
                            ))
                            ?
                            post.postReactionDTOs.find((prdto) => (prdto.name === r.name)).count
                            :
                            ""
                        }
                    </span>
                ))}
            </div>

            <Button
            color="link"
            onClick={() => {
                handleSubscribe();
            }}
            >
                {
                    userSubscribed
                    ?
                    "Unsubscribe"
                    :
                    "Subscribe"
                }
            </Button>
            
            {loggedInUser?.id === post?.userProfileId ? (
                <>
                    <Button
                        onClick={() => { toggleTagsModal() }}>
                        Manage Tags
                    </Button>
                    <Button onClick={() => {navigate("edit")}}>
                      Edit Post
                    </Button>
                    <Modal isOpen={tagsModalOpen} toggle={toggleTagsModal}>
                        <ModalHeader toggle={toggleTagsModal}>Manage Tags</ModalHeader>
                        <ManagePostTagsModal toggle={toggleTagsModal} post={post} setPost={setPost} getPostById={getPostById} />
                    </Modal>
                    <PostTagModalManager post={post} />
                </>
            ) : (
                ""
            )}
        </>
    );
}; //do the details of a post, should have everything you need here
