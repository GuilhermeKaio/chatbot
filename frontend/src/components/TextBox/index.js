import React, { useState} from "react";
import { ReactComponent as SendIcon } from './../../icons/send.svg';

import api from './../../service/api';
import { isAuthenticated, getToken, saveToken, deleteToken } from './../../service/auth';

import { useChat } from './../../context/Chat';

export default function TextBox() {
  const [text, setText] = useState('');
  const { setChat, setSender } = useChat();
  let config = {};

  async function handleMessage(){
    setChat(oldArray => [...oldArray, text]);
    setSender(oldArray => [...oldArray, 'user']);

    let parts = text.split(' ');

    if(parts[0].toLowerCase() === 'login'){
      await api.post(`api/auth`, { email: parts[1],	password: parts[2] }, config,)
      .then( res => {
        saveToken(res.data.token);
        setChat(oldArray => [...oldArray, `You have successfully logged in!`]);
        setSender(oldArray => [...oldArray, 'bot']);
        return;
      })
      .catch(function (error){
        setChat(oldArray => [...oldArray, `Sorry we had an error with your message 😓`]);
        setSender(oldArray => [...oldArray, 'bot']);
      });

      return;
    };

    if(parts[0].toLowerCase() === 'register'){
      if(!parts[3]){
        setChat(oldArray => [...oldArray, `You have to call the command with a argument, like this:`]);
        setSender(oldArray => [...oldArray, 'bot']);
        setChat(oldArray => [...oldArray, `Register <email> <password> <currency code>`]);
        setSender(oldArray => [...oldArray, 'bot']);
        return;
      }
      await api.post(`api/reg`, { email: parts[1],	password: parts[2], currency: parts[3] }, config,)
      .then( res => {
        saveToken(res.data.token);
        setChat(oldArray => [...oldArray, `You have successfully registered!`]);
        setSender(oldArray => [...oldArray, 'bot']);
        return;
      })
      .catch(function (error){
        setChat(oldArray => [...oldArray, `Sorry we had an error with your message 😓`]);
        setSender(oldArray => [...oldArray, 'bot']);
      });

      return;
    };

    const logged = await isAuthenticated();
    if(!logged){
      setChat(oldArray => [...oldArray, `You have to log on your account, type:`]);
      setSender(oldArray => [...oldArray, 'bot']);
      setChat(oldArray => [...oldArray, `Login <email> <password>`]);
      setSender(oldArray => [...oldArray, 'bot']);

      return;
    }
    else{
      config = {
        headers: {
          Authorization: getToken(),
        }
      }
    }

    if(parts[0].toLowerCase() === 'logout'){
      deleteToken();
      setChat(oldArray => [...oldArray, `You logged out!`]);
      setSender(oldArray => [...oldArray, 'bot']);
      return;
    };

    if(parts.length > 2){
      setChat(oldArray => [...oldArray, `Looks like your command has too many arguments 😆`]);
      setSender(oldArray => [...oldArray, 'bot']);
      return;
    }

    if(parts[0].toLowerCase() === 'balance'){
      await api.get(`api/balance`, config,)
      .then( res => {
        setChat(oldArray => [...oldArray, `Your balance is ${res.data.balance} in ${res.data.currency}`]);
        setSender(oldArray => [...oldArray, 'bot']);
      })
      .catch(function (error){
        setChat(oldArray => [...oldArray, `Sorry we had an error with your message 😓`]);
        setSender(oldArray => [...oldArray, 'bot']);
      });

      return;
    };

    if(parts[0].toLowerCase() === 'deposit'){
      if(!parts[1]){
        setChat(oldArray => [...oldArray, `You have to call the command with a argument, like this:`]);
        setSender(oldArray => [...oldArray, 'bot']);
        setChat(oldArray => [...oldArray, `Deposit <Number>`]);
        setSender(oldArray => [...oldArray, 'bot']);
        return;
      }

      await api.post(`api/deposit`, { amount: parts[1] }, config)
      .then( res => {
        setChat(oldArray => [...oldArray, `Now balance is ${res.data.balance} in ${res.data.currency}`]);
        setSender(oldArray => [...oldArray, 'bot']);
      })
      .catch(function (error){
        setChat(oldArray => [...oldArray, `Sorry we had an error with your message 😓`]);
        setSender(oldArray => [...oldArray, 'bot']);
      });

      return;
    };

    if(parts[0].toLowerCase() === 'withdraw'){
      if(!parts[1]){
        setChat(oldArray => [...oldArray, `You have to call the command with a argument, like this:`]);
        setSender(oldArray => [...oldArray, 'bot']);
        setChat(oldArray => [...oldArray, `Withdraw <Number>`]);
        setSender(oldArray => [...oldArray, 'bot']);
        return;
      }


      await api.post(`api/withdraw`, { amount: parts[1] }, config)
      .then( res => {
        setChat(oldArray => [...oldArray, `Now balance is ${res.data.balance} in ${res.data.currency}`]);
        setSender(oldArray => [...oldArray, 'bot']);
      })
      .catch(function (error){
        setChat(oldArray => [...oldArray, `Sorry we had an error with your message 😓`]);
        setSender(oldArray => [...oldArray, 'bot']);
      });

      return;
    };

    if(parts[0].toLowerCase() === 'exchange'){
      if(!parts[1]){
        setChat(oldArray => [...oldArray, `You have to call the command with a argument, like this:`]);
        setSender(oldArray => [...oldArray, 'bot']);
        setChat(oldArray => [...oldArray, `Exchange <Currency code>`]);
        setSender(oldArray => [...oldArray, 'bot']);
        return;
      }


      await api.post(`api/exchange`, { target: parts[1] }, config)
      .then( res => {
        setChat(oldArray => [...oldArray, `Now balance is ${res.data.balance} in ${res.data.currency}`]);
        setSender(oldArray => [...oldArray, 'bot']);
      })
      .catch(function (error){
        setChat(oldArray => [...oldArray, `Sorry we had an error with your message 😓`]);
        setSender(oldArray => [...oldArray, 'bot']);
      });

      return;
    };

    setChat(oldArray => [...oldArray, `I didn't understand your command 😥`]);
    setSender(oldArray => [...oldArray, 'bot']);
  }
    return (
      <section className="textbox">
        <input
          type="text" 
          value={ text }
          placeholder="Enter a message"
          onChange={ (e) => setText(e.target.value)}
        />
        <li className="text-item">
          <a className="text-button" onClick={ async () => await handleMessage() }>
            <SendIcon/>
          </a>
        </li>
      </section>
    );

    
};