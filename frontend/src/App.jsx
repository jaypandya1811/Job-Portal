import Nav from './nav'
import Home from './Home'
import Jobform from './Jobform'
import Joblist from './Joblist'
import Applications from './Applications'
import Applyforjob from './Applyforjob'
import Registeruser from './Registeruser'
import Login from './Login'
import Edituserdetails from './Edituserdetails'
import { Routes,Route } from 'react-router-dom'
import Savedjobs from './Savedjobs'

function App() {
  return (
    <>
    <Nav></Nav>
    <Routes> 
      <Route path='/' element={<Home />} />
      <Route path='/jobs' element={<Joblist />} />
      <Route path='/applications/:id' element={<Applications />} />
      <Route path='/register' element={<Registeruser />} />
      <Route path='/login' element={<Login />} />
      <Route path='/edituser/:id' element={<Edituserdetails />} />
      <Route path='/newjobpost' element={<Jobform />}></Route>
      <Route path='/applytojob/:id' element={<Applyforjob />}></Route>
      <Route path='/savedjobs/:id' element={<Savedjobs />}></Route>
    </Routes>
    </>
  )
}

export default App