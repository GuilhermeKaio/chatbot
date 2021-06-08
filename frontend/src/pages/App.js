import React from 'react';
import { ReactComponent as LogoutIcon } from './../icons/logout.svg';
import { ReactComponent as SendIcon } from './../icons/send.svg';

function App() {
  return ( 
    <section className="container">
      <Navbar>
        <NavItem icon={<LogoutIcon/>} />
      </Navbar>
      <ChatBox>
        <Message className="bot" order="1">
          1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed lectus non nulla bibendum dignissim. Proin a tincidunt massa.
        </Message>
        <Message className="user" order="0">
          2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed lectus non nulla bibendum dignissim. Proin a tincidunt massa.
        </Message>
      </ChatBox>
      <TextBox icon={<SendIcon/>}> 

      </TextBox>
    </section>
    
  );
}

function Navbar(props) {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
}
  
function NavItem(props) {
      
    return (
      <li className="nav-item">
        <a href="#" className="icon-button">
          {props.icon}
        </a>
      </li>
    );
}

function ChatBox(props) {
  return (
    <chat className="chatbox">
      {props.children}
    </chat>
  );
}

function TextBox(props) {
  return (
    <section className="textbox">
      <input/>
      <li className="text-item">
        <a href="#" className="text-button">
          {props.icon}
        </a>
      </li>
    </section>
  );
}

function Message(props) {
  return (
    <section className={'message ' + props.className} style={{order : props.order}}>
      <p>
        {props.children}
      </p>
    </section>
    
  )
}




export default App;
