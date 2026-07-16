import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Components/Home/Home'));
const SignIn = lazy(() => import('./Components/SignIn/SignIn'));
const SignUp = lazy(() => import('./Components/SignUp/SignUp'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="route-loader" role="status" aria-live="polite">
          <span className="route-loader__mark" aria-hidden="true" />
          <span className="route-loader__text">Loading experience</span>
        </div>
      }
    >
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Suspense>
  );
}

export default App;
