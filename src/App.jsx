import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";


function App() {
  
  //  const [token,setToken] = useState(false)

  return (
    <>
      <Routes>
        <Route path={'/'} element= {<Signup/>} />
        <Route path={'/Login'} element= {<Login/>} />
        <Route path = {'/home'} element = {<Home/>}/>

      </Routes> 
    </>
  );
}

export default App;
