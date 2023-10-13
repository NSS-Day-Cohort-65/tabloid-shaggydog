import { useEffect, useState } from "react";
import { fetchUserSubscriptions } from "../../managers/subscriptionManager";

export const SubscriptionList = ({ loggedInUser }) => {
    const [subscriptions, setSubscriptions] = useState([])


    useEffect(() => {
        fetchUserSubscriptions(loggedInUser.id).then(setSubscriptions)

    }, [])

    if (!subscriptions) {
        return <p>Subscribe to something!</p>
    }

    return (
        <>
            <h1>My Posts</h1>

            <div id="postListContainer">
                {subscriptions.map((s) => (
                    <div key={s.id} className="authorContainer">
                        <h3>{s.providerUserProfile.fullName}</h3>
                        {s.providerUserProfile?.posts.map((p) => (
                            <div key={p.id} className="postContainer">
                                <h4>{p.title}</h4>
                                <p>{p.content}</p>
                            </div>
                        ))
                        }
                    </div>

                ))
                }

            </div>
        </>
    );
}