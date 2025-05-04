
import { BrowserRouter, Router } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/product-card'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'

function App() {
  

  return (
    <BrowserRouter>
    <Rotes path="/*">
    <Router path = "/admin/*" element ={<AdminPage/>}/>
    <Router path = "/login" element ={<LoginPage/>}/>
    <Router path = "/" element ={<h1>Home</h1>}/>
    <Router path = "/*" element ={<h1>404 Not Found</h1>}/>
    </Rotes>
    </BrowserRouter>
  )
}

export default App
