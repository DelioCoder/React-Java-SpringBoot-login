import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ErrorScreen from './pages/ErrorScreen';
import TodoScreen from './pages/TodoScreen';
import SoloTodoScreen from './pages/SoloTodoScreen';
import AuthProvider, { useAuthContext } from './context/AuthProvider';

function App() {

  function AuthenticatedRoute({ children })
  {

    const auth = useAuthContext();

    if(auth.isAuthenticated)
    {
      return children;
    }else {
      return <Navigate to="/" />
    }
  }

  return (

      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/home/:email" element={
              <AuthenticatedRoute>
                <HomeScreen />
              </AuthenticatedRoute>
            } />
            <Route path="/todo" element={
              <AuthenticatedRoute>
                <TodoScreen />
              </AuthenticatedRoute>
            } />
            <Route path="/todo/:id" element={
              <AuthenticatedRoute>
                <SoloTodoScreen />
              </AuthenticatedRoute>
            } />
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
        </Router>
      </AuthProvider>

  )
}

export default App
