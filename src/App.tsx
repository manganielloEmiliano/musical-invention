import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp, Login, Home, PrivateRoute, PublicRoute, BookDetail } from './components'; // Asegúrate de importar BookDetail
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

          {/* Rutas privadas */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          
          {/* Ruta para el detalle del libro */}
          <Route path="/book/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} /> {/* Asegúrate de que BookDetail esté importado */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

