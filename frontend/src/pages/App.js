import React from 'react';

import Navbar from './../components/Navbar/index';
import TextBox from './../components/TextBox/index';
import ChatBox from './../components/ChatBox/index';

import ChatProvider from "./../context/Chat";

function App() {
  return ( 
    <section className="container">
      <Navbar/>
      <ChatProvider>
        <ChatBox/>
        <TextBox/>
      </ChatProvider>
    </section>
    
  );
}

export default App;
