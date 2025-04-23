
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";

// -----------------------------------------
// SECURITY NOTE:
// Never expose your API key in frontend! Store securely on the backend or use a .env for build-time variables only.
// For local development: create a `.env` file & use `import.meta.env.VITE_GEMINI_API_KEY`.
// For now, we will blank the key for safety!
const API_KEY_PLACEHOLDER = ""; // Set your Gemini API key in a .env file. (VITE_GEMINI_API_KEY)
// -----------------------------------------

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      if (!API_KEY_PLACEHOLDER) {
        throw new Error("AI API key not set. Please add your Gemini API key to a .env file.");
      }

      const ai = new GoogleGenAI({ apiKey: API_KEY_PLACEHOLDER });

      const contents = [
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        })),
        {
          role: "user",
          parts: [{ text: inputMessage }]
        }
      ];

      const config = {
        thinkingConfig: {
          thinkingBudget: 0,
        },
        responseMimeType: 'text/plain',
        systemInstruction: [
          {
            text: `You are a helpful and professional AI portfolio assistant also an AI twin of Kosinepalli Arjun Sai, an AI/ML engineer, GenAI researcher, and tech startup founder from Tirupati, India. Your role is to guide visitors through Arjun's portfolio, projects, research, and experience. Always be concise yet informative, engaging but technical when required.
Arjun is a final-year B.Tech student at Mohan Babu University (CGPA: 9.82/10), pursuing a minor in AI at IIT Ropar (CGPA: 9.0/10). He’s skilled in Python (expert), ML frameworks (TensorFlow, PyTorch, Scikit-learn), and has hands-on experience with NLP, LLM fine-tuning, anomaly detection, time-series forecasting, and deploying ML apps using Streamlit, FastAPI, and cloud platforms (GCP, AWS).
He has developed impactful projects like:
T+1 Sentinel: A trade risk engine for DTCC using Isolation Forest and LSTM.
FIR LegalMate: A GenAI-based legal drafting tool using LLMs and LangChain.
He’s also authored two conference papers and is filing a patent on AI-based lip sync and dubbing.
Arjun is an incoming intern at DTCC and works as a freelance LLM engineer at Outlier AI, having improved domain-specific LLM performance by 15%. He has attended Amazon ML Summer School and led the IEEE AI/ML student chapter at MBU.
He’s won 1st place at national hackathons (IBM CodeVerse, Xhorizon) and has certifications from DeepLearning.AI and Coding Ninjas.
When answering, offer to show GitHub repositories, live app demos, explain technologies used, or walk through a project/research paper. If the user seems interested in startup work, mention his stealth-mode GenAI drone startup GarudaOne, focused on content creators.
Always reflect Arjun's curiosity, passion for building, and technical depth in your tone.`,
          }
        ],
      };

      const model = "gemini-2.0-flash-lite";

      const response = await ai.models.generateContentStream({
        model,
        config,
        contents
      });

      let text = "";
      for await (const chunk of response) {
        if (chunk && typeof chunk.text === "string") {
          text += chunk.text;
        }
      }

      if (text) {
        const aiMessage = {
          role: "assistant" as const,
          content: text
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        toast.error("Received an empty response from the AI");
      }
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      toast.error(error?.message || "Failed to connect to Gemini API. Please check the API key.");
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

  const renderMessageWithLinks = (message: string) => {
    const sectionMap: Record<string, string> = {
      "about": "about",
      "experience": "experience",
      "projects": "projects",
      "publications": "publications",
      "skills": "skills",
      "achievements": "achievements",
      "certifications": "certifications"
    };

    let processedMessage = message;

    Object.entries(sectionMap).forEach(([keyword, sectionId]) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      processedMessage = processedMessage.replace(regex, (match) => {
        return `<span class="text-portfolio-purple cursor-pointer hover:underline" data-section="${sectionId}">${match}</span>`;
      });
    });

    return (
      <div
        dangerouslySetInnerHTML={{ __html: processedMessage }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.dataset.section) {
            handleScrollToSection(target.dataset.section);
          }
        }}
      />
    );
  };

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `I've navigated you to the ${sectionId} section.`
      }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-br from-portfolio-purple via-portfolio-magenta to-portfolio-orange animate-pulse-glow border-4 border-white/60"
          style={{
            boxShadow: "0 8px 32px 0 rgba(139,92,246,0.25)",
            position: "relative"
          }}
        >
          <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-portfolio-purple opacity-25 left-0 top-0"></span>
          <Bot className="relative h-8 w-8 text-white" />
        </Button>
      )}
      {isOpen && (
        <div className="animate-scale-in origin-bottom-right">
          <Card className="w-80 shadow-xl transition-all duration-300 ease-in-out border-0 relative glass-morphism
            bg-white/80 dark:bg-dark/80 backdrop-blur-2xl before:content-[''] before:absolute before:-inset-1
            before:rounded-2xl before:bg-gradient-to-br before:from-portfolio-purple before:via-portfolio-magenta before:to-portfolio-orange before:opacity-60 before:-z-10">
            {/* Glow/Highlight Border Animated */}
            <span className="pointer-events-none absolute -inset-1 rounded-2xl z-0 bg-gradient-to-br from-portfolio-purple via-portfolio-magenta to-portfolio-orange opacity-80 animate-gradient-x blur-[8px]"></span>
            <CardHeader className="p-3 border-b border-portfolio-purple/30 flex flex-row justify-between items-center bg-white/60 dark:bg-dark/60 rounded-t-2xl shadow-sm">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-portfolio-purple" />
                <span className="font-semibold text-portfolio-purple drop-shadow-sm text-lg tracking-wide">Portfolio Assistant</span>
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
                <CardContent className="p-3 h-72 overflow-y-auto bg-white/40 dark:bg-dark/40 transition-all glass-effect rounded-b-none rounded-t-none">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-center text-muted-foreground animate-fade-in">
                      <Bot className="h-12 w-12 mb-2 text-portfolio-purple opacity-50 animate-float" />
                      <p className="text-base text-portfolio-purple/90 font-medium">Hi there! I'm your portfolio assistant.</p>
                      <p className="text-xs mt-1 text-muted-foreground">Ask me anything about Arjun's skills, projects or experience.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[90%] rounded-lg px-3 py-2 text-sm shadow
                              ${message.role === "user"
                                ? "bg-gradient-to-br from-portfolio-purple to-portfolio-magenta text-white font-semibold animate-fade-in-up"
                                : "bg-muted bg-opacity-80 text-gray-900 dark:text-gray-200 animate-fade-in"
                              }`}
                            style={{
                              border: message.role === "user"
                                ? "1.5px solid #D946EF"
                                : "1px solid #e5e7eb"
                            }}
                          >
                            {message.role === "assistant"
                              ? renderMessageWithLinks(message.content)
                              : message.content
                            }
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
                <CardFooter className="p-3 pt-2 border-t border-portfolio-purple/20 flex gap-2 bg-white/80 dark:bg-dark/30 rounded-b-2xl">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="text-sm bg-white/80 dark:bg-dark/40 border-portfolio-purple/10 focus:border-portfolio-purple focus:ring-portfolio-purple shadow"
                    disabled={isLoading}
                  />
                  <Button
                    size="icon"
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-br from-portfolio-purple via-portfolio-magenta to-portfolio-orange hover:brightness-105 drop-shadow-lg"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}
      <style>
        {`
        /* Animated pulse for launch btn */
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 #D946EF44, 0 8px 32px 0 #8B5CF633; }
          70% { box-shadow: 0 0 0 16px #D946EF00, 0 8px 32px 0 #8B5CF61A; }
          100% { box-shadow: 0 0 0 0 #D946EF44, 0 8px 32px 0 #8B5CF633; }
        }
        .animate-pulse-glow { animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        /* Moving gradient border on Card */
        @keyframes gradient-x {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease-in-out infinite; }
        /* Modern glassmorphism utility */
        .glass-morphism { backdrop-filter: blur(18px) saturate(110%); -webkit-backdrop-filter: blur(18px) saturate(110%);
          border-radius: 1rem; border: 1.5px solid rgba(139,92,246,0.22); }
        `}
      </style>
    </div>
  );
};

export default ChatBot;

