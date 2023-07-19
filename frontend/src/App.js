
import { useSelector } from 'react-redux';
import Allroute from './Allroutes/Allroute';
import './App.css';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Modal  from './Components/Modal';

function App() {
  const allState=useSelector((Store)=>Store)
  return (
    <div className="App">
   <Navbar />
   <Allroute />
   <ToastContainer theme="dark" />
   {allState.modalReducer.modalStatus && <Modal></Modal>}
    </div>
  );
}

export default App;
