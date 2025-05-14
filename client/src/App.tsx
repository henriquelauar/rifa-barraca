import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import RifaForm from './pages/RifaPage';
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RifaForm />}/>
        <Route path="/admin" element={<AdminPage />}/>
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}