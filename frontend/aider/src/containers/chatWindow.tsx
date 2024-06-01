import { ChatIcon } from "../components/chat-icon";
import { Icon } from "@iconify/react";
import axios from "axios";

import "../styles/chat-window.css";
// import { messages } from "../assets/data/messages";
import { MessageCard } from "../components/message-card";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore"; // Import Firestore functions
import { useEffect } from "react";
import { getUser } from "../utils/factory"

const firebaseConfig = {
  apiKey: "AIzaSyAjjQGVJJmRhg37me6TRzoy4hhnE6pg_N8",
  authDomain: "aider-ece4a.firebaseapp.com",
  projectId: "aider-ece4a",
  storageBucket: "aider-ece4a.appspot.com",
  messagingSenderId: "245507022179",
  appId: "1:245507022179:web:a75b45aa1ceb9dfa534756",
  measurementId: "G-J230CLDRHL",
};

// Initialize Firebasefirebase.
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const ChatWindow = () => {
  const [windowOpen, setWindowOpen] = useState<boolean>(false);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const emergencyId = "1"; // From the url
  const user = getUser()

  const sendMessageApiUrl =
    import.meta.env.VITE_APP_API_BOT_URL || "http://localhost:3000/api/chats";

  const messagesRef = collection(doc(db, "emergencies", emergencyId), "chats");

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (snapshot: any) => {
      const newMessages = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [messagesRef]);

  const sendMessage = async () => {
    if (!messageText) return;

    const newMessage = {
      body: messageText,
      emergencyId,
      userId: user ? user._id : '1'
    };

    try {
      const response = await axios.post(sendMessageApiUrl, newMessage);
      console.log("Message sent successfully:", response.data); // Handle response data (optional)
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleToggleChat = () => {
    console.log("clicked...");
    setWindowOpen(!windowOpen);
  };
  const handleKeyPress = () => {
      sendMessage();
    };

  return (
    <div className={`chat-window ${!windowOpen ? "closed" : ""}`}>
      <ChatIcon handleClick={handleToggleChat} count={1} />
      <div className="chat-frame">
        <section className="messages">
          {messages.map((message) => (
            <div className="msg-wrapper">
              <MessageCard message={message} />
            </div>
          ))}
        </section>
        <section className="input-section">
          <div className="chat-input-wrapper">
            <input
              placeholder="type your message"
              type="text"
              className="message-input"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Icon
              className="icn"
              icon="ion:send"
              onClick={ handleKeyPress}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
