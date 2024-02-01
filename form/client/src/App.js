import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import UserForm  from './pages/UserForm';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <div className='App'>
      <nav>
        <ul>
          <li>
            <Link to='/'> Home</Link>
          </li>
          <li>
            <Link to='/users/detail'> Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<UserForm/>}/>
        <Route path='/users/detail' element={<UserDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
