
import { Header, Footer, MovieGrid, MovieDetails } from "./layout"

import { HashRouter as Router, Routes, Route } from 'react-router'


function App() {
  

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<MovieGrid />}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
      </Routes>
      
      <Footer/>
    </Router>
  )
}

export default App
