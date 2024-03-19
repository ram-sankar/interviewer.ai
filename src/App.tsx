import { RouterProvider } from "react-router-dom";
import { auth} from "./api/firebase";
import routes from "./config/routes";
import {useEffect,useState} from "react";
function App() {
  const [userName,setUserName]=useState("");
useEffect(()=>{
auth.onAuthStateChanged((user:any)=>{
  if (user){
    setUserName(user.displayName)
  }else setUserName("");

})
},[])
  return (
    <>
      <main className="App">
        <RouterProvider router={routes} />
      </main>
    </>
  );
}

export default App;