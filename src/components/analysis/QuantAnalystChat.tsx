import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Loader2, X, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImpactAnalysis, NewsItem, holdings } from "@/data/mockPortfolio";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface QuantAnalystChatProps {
  analysis: ImpactAnalysis;
  selectedNews: NewsItem;
}

const QuantAnalystChat = ({ analysis, selectedNews }: QuantAnalystChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("quant-analyst-chat", {
        body: {
          messages: updatedMessages,
          context: {
            headline: selectedNews.headline,
            source: selectedNews.source,
            analysis,
            portfolio: holdings.map((h) => ({
              ticker: h.ticker,
              name: h.name,
              sector: h.sector,
              weight: h.weight,
              thesis: h.thesis,
              catalysts: h.catalysts,
              breakConditions: h.breakConditions,
            })),
          },
        },
      });

      if (error) throw error;
      const reply = data?.reply || "I couldn't generate a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
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
    <>
      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full w-14 h-14 shadow-lg shadow-primary/30 p-0"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[560px] glass-card rounded-2xl border border-border/50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-secondary/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">AI Quant Analyst</h4>
                  <p className="text-[10px] text-muted-foreground">Ask follow-up questions about this analysis</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Ask me anything about this analysis, the portfolio impact, or alternative scenarios.
                  </p>
                  <div className="space-y-2">
                    {[
                      "What's the worst-case scenario here?",
                      "Should I trim any positions?",
                      "How does this compare to 2022?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); }}
                        className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-secondary/50 border border-border/30 text-foreground/80 hover:bg-secondary/80 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/70 border border-border/30 text-foreground"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&>p]:mb-1.5 [&>ul]:mb-1.5 [&>ol]:mb-1.5">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/70 border border-border/30 rounded-xl px-3 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/30 bg-secondary/20">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="min-h-[40px] max-h-[80px] text-sm resize-none bg-background/50"
                  rows={1}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="h-10 w-10 p-0 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuantAnalystChat;
