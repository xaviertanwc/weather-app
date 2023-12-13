import logo from './logo.svg';
import { Button, Layout } from 'antd';
import './App.css';
import Home from './components/home/home'
import AppHome from './components/home/home';
import { Content, Header } from 'antd/es/layout/layout';

function App() {
  return (
    <div className='App'>
      <div className='content'>
        <AppHome></AppHome>
      </div>
    </div>
  );
}

export default App;
