//MANAGES THE ROUTES

//Pages imports
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PasswordForgotten from "../pages/PasswordForgotten/PasswordForgotten";
import SignUp from "../pages/SignUp/SignUp";
import ServicesSearcher from "../pages/ServicesSearcher/ServicesSearcher";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserPublicPresentation from "../pages/UserPublicPresentation/UserPublicPresentation";
import SetPass from "../pages/SetPass/SetPass";
import ChatManager from "../pages/ChatManager/ChatManager";

//React imports
import { Route, Routes } from "react-router-dom";

export default function Router() {

  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" >
          <Route index element={<Login />} />
          <Route path="passwordForgotten" >
            <Route index element={<PasswordForgotten />} />
            <Route path="setpass" >
              < Route path=":userRole" element={<SetPass />} />
              </Route>
            </Route>
          </Route>
          <Route path="/servicesSearcher" element={<ServicesSearcher />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/registro" element={<SignUp />} >
            <Route path=":typeUser" element={<SignUp />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} >
            <Route path=":userID" element={<Dashboard />} >
              <Route path=":pageRequired" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/userInfo/:userID" element={<UserPublicPresentation />} />
          <Route path="/chatManager" element={<ChatManager />} />
          <Route path="*" element={<h1>Error 404: La página no existe</h1>} />
      </Routes>
    </div >
  )
}