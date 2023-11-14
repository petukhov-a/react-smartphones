import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);