import React from "react";

import Message from './../Message/index'; 

import { useChat } from './../../context/Chat';

export default function ChatBox() {
  const { chat, sender } = useChat();
  
  return (
    <div className="chatbox">
      {chat.map((message, i) => (
         <Message key={i} className={sender[i]} order={chat.length - i}>
           {message}
         </Message>
      ))}
    </div>
  );
}