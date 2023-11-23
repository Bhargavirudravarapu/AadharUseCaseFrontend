import "./App.css";
import { Route ,BrowserRouter, Routes} from 'react-router-dom';
import Home from "./Components/Home";

import Footer from "./Components/Footer";
import About from "./Components/About";
import Contact from "./Components/Contact";
import UserRecordsPage from "./Components/UserRecordsPage";
import CreationPage from "./Components/CreationPage";
import UpdatePage from "./Components/UpdatePage";
import UserList from "./Components/UserList";

function App() {
  return (
    <div className="App">
      {/* <Home />
      <About />
      <Contact />*/}
       
      <Routes>
      <Route path = "/Home" element={<Home/>}></Route>
      <Route path = "/About" element={<About/>}></Route>
      <Route path = "/Contact" element={<Contact/>}></Route>
      <Route path = "/UserDetails" element={<UserRecordsPage/>}></Route>
      <Route path = "/CreationPage" element={<CreationPage/>}></Route> 
      <Route path = "/UpdatePage" element={<UpdatePage/>}></Route>
      <Route path = "/UserList" element={<UserList/>}></Route>
    </Routes>  
    </div>
  );
}

export default App;