import "./App.css";
import React ,{ lazy,Suspense}from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import NavBar from "./Components/NavBar";
import SignUpForm from "./Components/SignUpForm";
import HomePage from "./Components/HomePage";
import MyListPage from "./Components/MyListPage";
import NotfoundPage from "./Components/NotfoundPage";
import AuthSourcePage from "./Components/AuthSourcePage";
import { BrowserRouter } from "react-router-dom";
const SourcePage=lazy(()=>import( "./Components/SourcePage")) ;
const ProfilePage=lazy(()=>import( "./Components/ProfilePage"))
const PopularPage=lazy(()=>import( "./Components/PopularPage"))

const App=()=> {
  return (
    <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div>loading.........</div>}>
        <Routes>
          <Route path="articale/top" element={<PopularPage />} />
          <Route path="users/profile" element={<ProfilePage />} />
          <Route path="users/list" element={<MyListPage />} />
          <Route path="users/signin" element={<LoginForm />} />
          <Route path="users/signup" element={<SignUpForm />} />
          <Route path="/AuthSource" element={<AuthSourcePage />} />
          <Route path="/Source" element={<SourcePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
          </Suspense>
    </BrowserRouter>
  );
}

export default App;
