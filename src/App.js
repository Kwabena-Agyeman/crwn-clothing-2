import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.component';
import Navigation from './components/navigation/navigation.component';
import Auth from './pages/authentication/authentication.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default App;
