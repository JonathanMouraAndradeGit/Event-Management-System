import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuComp from './Components/menuComp/MenuComp';
import Form1 from './Components/Form1/Form1';
import Field from './Components/Field/Field';
import FormUser from './Components/FormUser/FormUser';
import FormOng from './Components/FormOng/FormOng';
import FormEvent from './Components/FormEvent/FormEvent';
import SldInputComp from './Components/SldInputComp/SldInputComp'
import ProgressForm from './Components/progressForm/ProgressForm';
import LoginComp from './Components/LoginComp/LoginComp';

import EventList from './Components/EventList/EventList';
import MenageUser from './Components/MenageUser/MenageUser';

import EventPage from './Components/EventPage/EventPage';

import UserEventsPage from './Components/userEventsPage/UserEventsPage';

import DynamicMsg from './Components/DynamicMsg/DynamicMsg';

import { useContext, createContext } from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import UpdateEvent from './Components/UpdateEvent/UpdateEvent';
import 'leaflet/dist/leaflet.css';
import Main from './Components/Main/Main';
export const ctx = createContext();
function App() {
  let [userCred, setUserCred] = useState({})
  let [msg, setMsg] = useState([])
  //let ctx = createContext(setMsg)
  useEffect(() => {
    setUserCred(JSON.parse(localStorage.getItem("token")))
    console.log(JSON.parse(localStorage.getItem("token")))
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <MenuComp auth={userCred} setAuth={setUserCred}></MenuComp>
        <DynamicMsg arrMsg={msg} setMsg={setMsg}></DynamicMsg>
        <div className="content">
          <ctx.Provider value={setMsg}>
            <Routes>
              <Route path='/' element={<Main></Main>}>

              </Route>
              <Route path='/frm1' element={<Form1>
                <div id='side1' className='sidep'><FormUser></FormUser></div>
                <div id='side2' className='sidep'>
                  <ProgressForm></ProgressForm></div>
              </Form1>}>
              </Route>
              <Route path='/frm2' element={<FormEvent></FormEvent>}>

              </Route>

              <Route path='/frm3' element={<LoginComp auth={userCred} setAuth={setUserCred}></LoginComp>}></Route>

              <Route path='/frm4' element={<EventList></EventList>}></Route>

              <Route path='/frm5' element={<MenageUser auth={userCred} setAuth={setUserCred}></MenageUser>}></Route>

              <Route path='/frm6/:id?' element={<UpdateEvent></UpdateEvent>}></Route>

              <Route path='/frm7/:id?' element={<EventPage path="http://localhost:4000/uploads/"></EventPage>}></Route>

              <Route path='/frm8' element={<UserEventsPage></UserEventsPage>}></Route>
            </Routes>
          </ctx.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

//<Route path='' element={}></Route>
