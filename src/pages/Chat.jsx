import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

export default function Chat() {
  // State untuk input pesan user
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Fungsi kirim pesan user + request balasan dari backend
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    const botReply = await fetchBotReply(message);
    setIsTyping(false);
    setMessages((prev) => [...prev, botReply]);
  };

  // Koneksi ke backend untuk mendapatkan balasan bot
  const fetchBotReply = async (userText) => {
    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      return { text: data.reply, sender: "bot" };
    } catch (error) {
      console.error("Chat backend error:", error);

      return { text: "⚠️ Server tidak merespon. Coba lagi nanti.", sender: "bot" };
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-2xl shadow-md h-[94vh] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      {/* Area tampilan chat */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-inner overflow-y-auto relative">

        {messages.length === 0 && !isTyping && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500 px-8">
            <p className="text-lg font-medium leading-relaxed">
              AI Assistant siap membantu.<br />
              Tanyakan seputar Maintenance & Prediksi Mesin.
            </p>
          </div>
        )}

        {/* Daftar pesan */}
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-4 bg-gray-200 rounded-full rounded-bl-none">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>
      </div>

      {/* Input pesan */}
      <form onSubmit={handleSend} className="mt-4 flex items-center gap-3 bg-white rounded-xl border px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Tulis pesan ..."
          className="flex-1 outline-none text-gray-700 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="p-2 hover:bg-gray-100 rounded-full transition">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}