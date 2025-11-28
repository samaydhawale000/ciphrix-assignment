import { Toaster } from 'react-hot-toast';
import './App.css';
import RouteWrapper from './routes/RouteWrapper';
import Navbar from './components/Navbar';
import { useColorMode } from '@chakra-ui/color-mode';

function App() {
    const { colorMode } = useColorMode();
  return (
    <div className={colorMode=='light'? 'light-app' : 'dark-app'}>
      <Navbar/>
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
