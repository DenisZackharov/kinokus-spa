import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviesList from './components/MoviesList/MoviesList';
import Movie from './components/Movie/Movie';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;
