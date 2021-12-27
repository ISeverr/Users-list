import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from '../../features/navBar/NaviBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from '../../routes/routes';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook'
import './styles.css';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <>
      <AuthContext.Provider value={{ login, logout, token, userId, isAuthenticated }}>
        <Router>
          {routes}
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
