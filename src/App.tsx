import { PrimeReactProvider } from 'primereact/api';
import Router from './components/Router';

const App = () => {
  return (
    <PrimeReactProvider>
      <Router />
    </PrimeReactProvider>
  );
};

export default App;
