import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <div className='App'>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/" exact element={<PrivateRoute component={HomePage} />} />
          <Route element={<LoginPage/>} path='/login'/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
