
import './App.css'
import { Navbar } from './components/Navbar/navbar'
import { SearchBar } from './components/SearchBar/Search'
import { CurrentWeather } from './components/CurrentWeather/currentWeather'
function App() {

  return (
    <>
    <Navbar />
    <main className='container'>
      
    <h1>How's the sky looking today?</h1>
    <SearchBar />
    <CurrentWeather />
   </main>
    </>
   
  )
}

export default App
