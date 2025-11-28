import { Toaster } from 'react-hot-toast';
import './App.css';
import RouteWrapper from './routes/RouteWrapper';

function App() {
  return (
    <div className="App">
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
