
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [isKeySet, setIsKeySet] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem("gemini-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsKeySet(true);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    localStorage.setItem("gemini-api-key", apiKey);
    setIsKeySet(true);
    toast.success("API key saved successfully");
  };

  const clearApiKey = () => {
    localStorage.removeItem("gemini-api-key");
    setApiKey("");
    setIsKeySet(false);
    toast.success("API key removed");
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !apiKey || isLoading) return;
    
    const userMessage = { role: "user" as const, content: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: inputMessage }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();
      
      if (data.error) {
        toast.error(`Error: ${data.error.message || "Failed to get response"}`);
        return;
      }

      if (data.candidates && data.candidates[0].content) {
        const aiMessage = {
          role: "assistant" as const,
          content: data.candidates[0].content.parts[0].text
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        toast.error("Received an empty response from the AI");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast.error("Failed to connect to Gemini API. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <Button 
          onClick={toggleChat} 
          size="icon" 
          className="rounded-full h-12 w-12 shadow-lg bg-portfolio-purple hover:bg-portfolio-purple/90"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="w-80 shadow-xl transition-all duration-300 ease-in-out">
          <CardHeader className="p-3 border-b flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-portfolio-purple" />
              <span className="font-medium">Portfolio Assistant</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              {!isKeySet ? (
                <CardContent className="p-3 h-72 flex flex-col justify-center">
                  <div className="space-y-3">
                    <p className="text-sm text-center">Please enter your Gemini API key to continue:</p>
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="API Key"
                      className="text-sm"
                    />
                    <Button 
                      onClick={saveApiKey} 
                      className="w-full bg-portfolio-purple hover:bg-portfolio-purple/90"
                    >
                      Save API Key
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Get your API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
                    </p>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardContent className="p-3 h-72 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center text-muted-foreground">
                        <Bot className="h-12 w-12 mb-2 text-portfolio-purple opacity-50" />
                        <p className="text-sm">Hi there! I'm your portfolio assistant.</p>
                        <p className="text-xs">Ask me anything about Arjun's skills, projects or experience.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((message, index) => (
                          <div 
                            key={index} 
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div 
                              className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                                message.role === "user" 
                                  ? "bg-portfolio-purple text-white" 
                                  : "bg-muted"
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="max-w-[90%] rounded-lg px-3 py-2 text-sm bg-muted">
                              <div className="flex space-x-1 items-center">
                                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-3 pt-2 border-t flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="text-sm"
                      disabled={isLoading}
                    />
                    <Button 
                      size="icon" 
                      onClick={sendMessage} 
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-portfolio-purple hover:bg-portfolio-purple/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                  <div className="p-2 pt-0 text-center">
                    <button 
                      onClick={clearApiKey} 
                      className="text-xs text-muted-foreground hover:underline"
                    >
                      Clear API Key
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
