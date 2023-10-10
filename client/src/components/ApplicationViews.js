import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import { CategoryList } from "./categories/CategoryList";
import { PostList } from "./posts/PostList";
import { TagList } from "./tags/TagList";
import { PostDetails } from "./posts/PostDetails";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>
                            <PostList />
                        </AuthorizedRoute>
                    }
                />
                <Route
                    path="/posts"
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>
                            <PostList loggedInUser={loggedInUser} />
                        </AuthorizedRoute>
                    }
                />
                <Route path="/userprofiles">
                    <Route
                        index
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                                <UserProfileList />
                            </AuthorizedRoute>
                        }
                    />
                    <Route
                        path=":id"
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                                <UserProfileDetails />
                            </AuthorizedRoute>
                        }
                    />
                </Route>
                <Route path="/categories">
                    <Route
                        index
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser} >
                                <CategoryList loggedInUser={loggedInUser} />
                            </AuthorizedRoute>
                        }
                    />
                </Route>
                <Route path="/tags">
                    <Route
                        index
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                                <TagList />
                            </AuthorizedRoute>
                        }
                    />
                </Route>
                <Route
                    path="/login"
                    element={<Login setLoggedInUser={setLoggedInUser} />}
                />
                <Route
                    path="/register"
                    element={<Register setLoggedInUser={setLoggedInUser} />}
                />
            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
}
