import { Toaster } from 'react-hot-toast';
import './App.css';
import RouteWrapper from './routes/RouteWrapper';
import Navbar from './components/Navbar';
import { useColorMode } from '@chakra-ui/color-mode';
import { useLocation } from "react-router-dom";

function App() {
  const { colorMode } = useColorMode();
  const location = useLocation();

  const hideNavbarRoutes = ["/login", '/sign-up'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className={colorMode === 'light' ? 'light-app' : 'dark-app'}>
      {!shouldHideNavbar && <Navbar />}

      <RouteWrapper />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              background: "#dfffe7",
              color: "green",
            },
          },
          error: {
            style: {
              background: "#ffe6e6",
              color: "red",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
