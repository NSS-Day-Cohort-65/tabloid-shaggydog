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
import { MyPosts } from "./posts/MyPosts";
import { PostDetails } from "./posts/PostDetails";
import { CreatePost } from "./posts/CreatePost";
import { PostComments } from "./posts/comments/PostComments";
import { NotApprovedPosts } from "./posts/NotApprovedPosts";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
 return (
  <Routes>
   <Route path="/">
    <Route
     index
     element={
      <AuthorizedRoute loggedInUser={loggedInUser}>
       <PostList loggedInUser={loggedInUser} />
      </AuthorizedRoute>
     }
    />
    <Route path="/posts">
     <Route
      index
      element={
       <AuthorizedRoute loggedInUser={loggedInUser}>
        <PostList loggedInUser={loggedInUser} />
       </AuthorizedRoute>
      }
     />
     <Route
      path=":id/comments"
      element={
       <AuthorizedRoute loggedInUser={loggedInUser}>
        <PostComments loggedInUser={loggedInUser} />
       </AuthorizedRoute>
      }
     />
    </Route>
    <Route
     path="/posts/:id"
     element={
      <AuthorizedRoute loggedInUser={loggedInUser}>
       <PostDetails loggedInUser={loggedInUser} />
      </AuthorizedRoute>
     }
    />
    <Route
     path="myposts"
     element={
      <AuthorizedRoute loggedInUser={loggedInUser}>
       <MyPosts loggedInUser={loggedInUser} />
      </AuthorizedRoute>
     }
    />
    <Route
     path="createpost"
     element={
      <AuthorizedRoute loggedInUser={loggedInUser}>
       <CreatePost loggedInUser={loggedInUser} />
      </AuthorizedRoute>
     }
    />
    <Route
     path="/unapprovedPosts"
     element={
      <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
       <NotApprovedPosts />
      </AuthorizedRoute>
     }
    />
    <Route path="/userprofiles">
     <Route
      index
      element={
       <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
        <UserProfileList loggedInUser={loggedInUser} roles={["Admin"]} />
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
       <AuthorizedRoute loggedInUser={loggedInUser}>
        <CategoryList loggedInUser={loggedInUser} />
       </AuthorizedRoute>
      }
     />
    </Route>
    <Route path="/tags">
     <Route
      index
      element={
       <AuthorizedRoute loggedInUser={loggedInUser}>
        <TagList loggedInUser={loggedInUser} />
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
