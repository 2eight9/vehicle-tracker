import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehicleList } from '@/pages/VehicleList';
import { VehicleDetails } from '@/pages/VehicleDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleList />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;