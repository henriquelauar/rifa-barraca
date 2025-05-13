import { ToastContainer } from 'react-toastify';
import './App.css';
import RifaForm from './pages/RifaForm';

function App() {
  return (
    <div className="App">
      <RifaForm />
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
    </div>
  );
}

export default App;