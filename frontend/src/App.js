import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import MainScreen from './screens/MainScreen'
function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='' element={<MainScreen/>} exact/>
            <Route path='/chat' element={<HomeScreen/>} exact/>
            <Route path='/chat/:id' element={<ChatScreen/>}/>
          </Routes>
         
        </Container>

        </main>
      <Footer/>
    </Router>
  );
}

export default App;
