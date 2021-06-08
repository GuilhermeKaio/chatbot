import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [chat, setChat] = useState([]);
  const [sender, setSender] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        setChat,
        sender,
        setSender
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  const { chat, setChat, sender, setSender } = context;
  return { chat, setChat, sender, setSender};
}