"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMMERCIAL_ASSETS } from "@/app/properties/page";
import Image from "next/image";
import { 
  X, 
  Send, 
  Minus,
  RotateCcw, 
  ArrowUpRight,
  MessageSquare,
  Building2
} from "lucide-react";
import { 
  findMatchingAnswer, 
  QUICK_PROMPT_CHIPS, 
  ChatAnswerAction 
} from "@/lib/chatbotKnowledge";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  actions?: ChatAnswerAction[];
}

const INITIAL_MESSAGE: Message = {
  id: "welcome-1",
  sender: "bot",
  text: "Welcome to PM Commercial. How may we assist with your asset acquisition or leasing mandates today?",
  time: "Just now",
  actions: [
    { label: "Browse Assets", href: "/properties" },
    { label: "Executive Advisory", href: "/contact" }
  ]
};

export default function HomeChatBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Contextual asset detection based on active URL
  const activeAssetId = pathname?.startsWith("/properties/")
    ? pathname.replace("/properties/", "").split("/")[0]
    : null;
  const activeAsset = activeAssetId
    ? COMMERCIAL_ASSETS.find((p) => p.id === activeAssetId || String(p.id).toLowerCase() === activeAssetId.toLowerCase())
    : null;

  const contextualInitialMessage: Message = activeAsset
    ? {
        id: `welcome-asset-${activeAsset.id}`,
        sender: "bot",
        text: `Welcome to PM Commercial Executive Advisory. I see you are viewing ${activeAsset.name} in ${activeAsset.location}. Would you like me to connect you with the lead broker or send the confidential offering memorandum?`,
        time: "Just now",
        actions: [
          { label: "Request Offering Memo", href: "/contact" },
          { label: "Schedule Viewing", href: "/contact" },
          { label: "All Portfolio Assets", href: "/properties" }
        ]
      }
    : INITIAL_MESSAGE;

  const [messages, setMessages] = useState<Message[]>([contextualInitialMessage]);

  // Update initial message if user navigates to an asset dossier
  useEffect(() => {
    if (activeAsset && messages.length <= 1) {
      setMessages([
        {
          id: `welcome-asset-${activeAsset.id}`,
          sender: "bot",
          text: `Welcome to PM Commercial Executive Advisory. I see you are viewing ${activeAsset.name} (${activeAsset.location}). Would you like me to connect you with the lead broker or send the offering memorandum?`,
          time: "Just now",
          actions: [
            { label: "Request Offering Memo", href: "/contact" },
            { label: "Schedule Viewing", href: "/contact" },
            { label: "All Portfolio Assets", href: "/properties" }
          ]
        }
      ]);
    }
  }, [activeAssetId]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (window.innerWidth > 640) {
        inputRef.current?.focus();
      }
    }
  }, [isOpen, messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
    setHasInteracted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setIsTyping(false);
  };

  const submitQuery = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isTyping) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: currentTime
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const matchResult = findMatchingAnswer(trimmed);

      const cleanActions: ChatAnswerAction[] = (matchResult.actions || []).map((act) => ({
        label: act.label,
        href: act.href || "/contact"
      }));

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: matchResult.response,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: cleanActions.length > 0 ? cleanActions : [
          { label: "Contact Advisory Desk", href: "/contact" }
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(inputValue);
  };

  return (
    <aside aria-label="PM Commercial Executive Advisory Desk">
      {/* ── Floating Sharp Square Launcher (Matches Header/Footer #0F172A & #0F766E) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && !hasInteracted && (
          <div 
            onClick={handleOpen}
            className="mb-2.5 hidden sm:flex items-center gap-2 bg-[#0F172A] text-white text-[11px] tracking-widest uppercase py-2 px-3.5 rounded-none border border-[#0F766E] shadow-2xl cursor-pointer hover:bg-[#1E293B] transition-all"
          >
            <span className="w-1.5 h-1.5 bg-[#14B8A6] rounded-none" />
            <span className="font-medium">Executive Advisory Desk</span>
          </div>
        )}

        <button
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Executive Advisory Desk" : "Open Executive Advisory Desk"}
          className="relative p-0 w-14 h-14 bg-[#0F172A] hover:bg-[#1E293B] text-white border border-[#0F766E] shadow-2xl rounded-none cursor-pointer flex items-center justify-center transition-all duration-200"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <>
              <MessageSquare className="w-5 h-5 text-[#14B8A6]" />
              {hasUnread && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="relative inline-flex rounded-none h-2 w-2 bg-[#14B8A6] border border-[#0F172A]" />
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* ── Executive Dossier Chat Window ── */}
      {isOpen && (
        <section 
          aria-label="Executive Advisory Desk Window"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[600px] max-h-[82vh] bg-[#0F172A] text-white border-t-2 border-[#0F766E] border-x border-b border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-none animate-in fade-in duration-200"
        >
          {/* Header in Deep Ink Slate */}
          <div className="px-4 py-3.5 bg-[#0F172A] text-white flex items-center justify-between border-b border-white/10 rounded-none">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 border border-white/10 bg-[#1E293B] rounded-none overflow-hidden shrink-0">
                <Image
                  src="https://i.pravatar.cc/500?img=11"
                  alt="Client Concierge"
                  fill
                  sizes="36px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h3 
                  className="font-bold text-xs tracking-[0.16em] uppercase text-white"
                  style={{ fontFamily: "\x27Cinzel\x27, serif" }}
                >
                  Executive Advisory Desk
                </h3>
                <p className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Client Concierge</span>
                  <span>&middot;</span>
                  <span className="text-[#14B8A6] flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 bg-[#14B8A6] rounded-none inline-block" />
                    Online
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart inquiry"
                aria-label="Restart inquiry"
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-none transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClose}
                title="Minimize window"
                aria-label="Minimize window"
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-none transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClose}
                title="Close desk"
                aria-label="Close desk"
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-none transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Reply Suggestion Chips */}
          <div className="bg-[#0F172A] border-b border-white/10 px-3.5 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none rounded-none text-xs">
            <span className="text-[9px] tracking-widest text-white/40 uppercase whitespace-nowrap mr-1 font-semibold">
              MANDATES:
            </span>
            {QUICK_PROMPT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => submitQuery(chip.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-none bg-[#1E293B] border border-white/10 text-white/70 hover:text-[#14B8A6] hover:border-[#0F766E] transition-colors text-[10px] uppercase tracking-wider cursor-pointer shrink-0 font-medium"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B1120] rounded-none">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 bg-[#1E293B] border border-white/10 rounded-none overflow-hidden shrink-0 mt-0.5 relative">
                    <Image
                      src="https://i.pravatar.cc/500?img=11"
                      alt="Advisor"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-1.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`p-3.5 rounded-none text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#0F766E] text-white border border-[#0F766E] shadow-sm"
                        : "bg-[#1E293B] text-white/90 border border-white/10 shadow-sm font-light"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Commercial Action Direct Links */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act, actIdx) => (
                        <Link
                          key={actIdx}
                          href={act.href || "/contact"}
                          onClick={handleClose}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-[10px] tracking-wider uppercase font-semibold rounded-none transition-colors"
                        >
                          <span>{act.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-white/80" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[9px] text-white/40 px-0.5 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 bg-[#1E293B] border border-white/10 rounded-none overflow-hidden shrink-0 mt-0.5 relative">
                  <Image
                    src="https://i.pravatar.cc/500?img=11"
                    alt="Advisor"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 bg-[#1E293B] border border-white/10 rounded-none flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-[#14B8A6] rounded-none animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-[#14B8A6] rounded-none animate-pulse [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-[#14B8A6] rounded-none animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Active Asset Context Banner */}
          {activeAsset && (
            <div className="px-4 py-2 bg-[#1E293B] border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
              <span className="flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                <span className="truncate">Context: <strong className="text-white font-medium">{activeAsset.name}</strong></span>
              </span>
              <span className="text-[#14B8A6] font-mono text-[10px] shrink-0 ml-2 font-semibold">
                {activeAsset.priceDisplay}
              </span>
            </div>
          )}

          {/* Footer Input Area with Exact Brand Palette */}
          <div className="p-3 bg-[#0F172A] border-t border-white/10 space-y-2 rounded-none">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Inquire about acquisitions, floor plates, yields..."
                className="flex-1 px-3.5 py-2.5 text-xs bg-[#1E293B] text-white placeholder-white/40 border border-white/10 focus:border-[#0F766E] focus:outline-none rounded-none transition-all"
              />

              {/* Sharp Teal Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Submit inquiry"
                className="p-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-none border border-[#0F766E] flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-white/40 px-0.5 font-light">
              <span>PM Commercial &middot; Executive Advisory</span>
              <span className="text-[#14B8A6]">Encrypted Protocol</span>
            </div>
          </div>
        </section>
      )}
    </aside>
  );
}
