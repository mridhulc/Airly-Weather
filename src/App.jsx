import { useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'
import { useAuth } from './Context/AuthContext'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  const [input, setInput] = useState('')
  const { weather, thisLocation, values, place, setPlace } = useStateContext()
  const { user, isAuthenticated, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Airly</h1>
        <div className='flex items-center gap-4'>
          <div className='glassCard w-[30rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
            <input onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity()
              }
            }} type="text" placeholder='Search city' className='focus:outline-none w-full text-[#212121] text-lg glassCard' value={input} onChange={e => setInput(e.target.value)} />
          </div>
          {isAuthenticated ? (
            <div className='flex items-center gap-4'>
              <span className='text-lg'>Welcome, {user.name || user.email}</span>
              <button
                onClick={logout}
                className='bg-red-500 px-4 py-2 rounded hover:bg-red-600'
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='flex gap-2'>
              <button
                onClick={() => setShowLogin(true)}
                className='glassCard bg-blue-500 px-4 py-2 rounded hover:bg-blue-600'
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className='glassCard bg-green-500 px-4 py-2 rounded hover:bg-green-600'
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1, 7).map(curr => {
              return (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              )
            })
          }
        </div>
      </main>
      {showLogin && <Login onToggle={() => {
        setShowLogin(false)
        setShowSignup(true)
      }} onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onToggle={() => {
        setShowSignup(false)
        setShowLogin(true)
      }} onClose={() => setShowSignup(false)} />}
    </div>
  )
}

export default App
