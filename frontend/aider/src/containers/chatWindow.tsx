import { ChatIcon } from "../components/chat-icon";
import { Icon } from "@iconify/react";

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
  Timestamp
} from "firebase/firestore"; // Import Firestore functions
import { useEffect } from "react";

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

  const messagesRef = collection(
    doc(db, "emergencies", emergencyId),
    "messages"
  );

  useEffect(() => {
    const unsubscribe = getDocs(messagesRef).onSnapshot((snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe(); // Cleanup function for real-time updates
  }, [messagesRef]);

  const sendMessage = async () => {
    if (!messageText) return;

    const newMessage = {
      text: messageText,
      timestamp: Timestamp.now(),
    };

    await addDoc(messagesRef, newMessage);
    setMessageText("");
  };

  const handleToggleChat = () => {
    console.log("clicked...");
    setWindowOpen(!windowOpen);
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
            />
            <Icon className="icn" icon="ion:send" />
          </div>
        </section>
      </div>
    </div>
  );
};
