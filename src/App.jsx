import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/Slices/TokenSlice";
import PageNotFound from "./pages/PageNotFound";


function App() {
  
  const token = useSelector(state => state.token.token); // Access token from Redux store
  const dispatch = useDispatch();

    if(token){
      sessionStorage.setItem('token',JSON.stringify(token))
    }

    useEffect(() => {
      if(sessionStorage.getItem('token')){
        let data = JSON.parse(sessionStorage.getItem('token'))
        dispatch(setToken(data))
      }

    },[])

  return (
    <>
      <Routes>
        <Route path={'/'} element= {<Login />} />
        <Route path={'/Signup'} element= {<Signup />} />
        {token ? <Route path={'/home'} element={<Home />} /> : <Route path="*" element={<PageNotFound />} />}

      </Routes> 
    </>
  );
}

export default App;
