import logo from './logo.svg';
import { Button, Layout } from 'antd';
import './App.css';
import Home from './components/home/home'
import AppHome from './components/home/home';
import { Content, Header } from 'antd/es/layout/layout';
import { useState } from 'react';

function App() {
  const [isBright, setIsBright] = useState(true);

  const updateBackground = (isBright) => {
    setIsBright(isBright);
  }

  return (
    <div className='App' >
      <img src={require(isBright? './assets/images/bg-light.png' : './assets/images/bg-dark.png')}></img>
      <div className='content'>
        <AppHome updateBackground={updateBackground}></AppHome>
      </div>
    </div>
  );
}

export default App;
