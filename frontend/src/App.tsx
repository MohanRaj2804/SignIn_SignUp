import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';

function App() {

  return (
    <>
    <Routes>
      <Route path='/home' element= {<Home/>}/>
      <Route path='/' element={<SignIn />} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
    </Routes>
    </>
  )
}

export default App;
