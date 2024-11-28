import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer ";
import { Dashboard } from "./Admin/Dashboard";

function App() {
  return (
    <>
     <NavBar/>
     <Outlet/>
     {/* <Dashboard/> */}
     <Footer/>
    </>
  );
}

export default App;
