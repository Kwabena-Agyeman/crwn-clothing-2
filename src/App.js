import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.component';
import Navigation from './components/navigation/navigation.component';
import SignIn from './pages/sign-in/sign-in.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
