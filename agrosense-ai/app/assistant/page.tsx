"use client";

import { useMemo, useState } from "react";
import { Bot, Mic, Play, SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { TypingDots } from "@/components/loading";
import { VoiceWave } from "@/components/voice-wave";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createRecognizer, speakText, type SupportedLanguage } from "@/lib/speech";
import type { AssistantMessage } from "@/types";

const suggestions = [
  "गेहूं में रोग क्या करें?",
  "Rain tomorrow?",
  "Best crop for sandy soil?",
];

export default function AssistantPage() {
  const [language, setLanguage] = useState<SupportedLanguage>("hinglish");
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content) return;

    const userMessage: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      language,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, language }),
      });
      if (!response.ok) {
        throw new Error("Assistant API error");
      }

      const data = (await response.json()) as { message: string; createdAt: string };

      const assistantMessage: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message,
        language,
        createdAt: data.createdAt ?? new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      toast.error("Assistant is unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const recognizer = createRecognizer(
      language,
      (text) => {
        setInput(text);
      },
      (error) => {
        toast.error(`Speech recognition error: ${error}`);
        setListening(false);
      },
    );

    if (!recognizer) {
      toast.error("Speech recognition not supported on this browser.");
      return;
    }

    recognizer.onend = () => setListening(false);
    recognizer.start();
    setListening(true);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">Voice Farming Assistant</h1>

        <Card className="rounded-3xl border-emerald-100 bg-gradient-to-br from-emerald-100/60 to-background">
          <CardContent className="space-y-5 p-6 text-center">
            <Button
              size="icon"
              className={`mx-auto h-20 w-20 rounded-full ${listening ? "animate-pulse" : ""}`}
              onClick={startListening}
              aria-label="Start voice input"
            >
              <Mic className="h-9 w-9" />
            </Button>
            <VoiceWave active={listening} />
            <p className="text-sm text-muted-foreground">
              {listening ? "Listening..." : "Tap mic and speak naturally."}
            </p>
            <div className="mx-auto max-w-xs">
              <Select
                value={language}
                onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
                <option value="hinglish">Hinglish</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="space-y-4 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about crop health, weather, or farming decisions..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void sendMessage(input);
                  }
                }}
              />
              <Button onClick={() => void sendMessage(input)}>
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((prompt) => (
                <Button
                  key={prompt}
                  size="sm"
                  variant="secondary"
                  onClick={() => void sendMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {!hasMessages ? (
            <Card className="rounded-2xl">
              <CardContent className="p-4 text-sm text-muted-foreground">
                Conversation appears here. Ask in Hindi, English, or Hinglish.
              </CardContent>
            </Card>
          ) : null}

          {messages.map((message) => (
            <Card key={message.id} className="rounded-2xl">
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {message.role === "user" ? "You" : "AgroSense AI"}
                  </p>
                  {message.role === "assistant" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(message.content, language)}
                    >
                      <Play className="h-4 w-4" />
                      Play
                    </Button>
                  ) : null}
                </div>
                <p className="text-sm">{message.content}</p>
              </CardContent>
            </Card>
          ))}

          {loading ? (
            <Card className="rounded-2xl">
              <CardContent className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                <Bot className="h-4 w-4" />
                <TypingDots />
                AgroSense AI is thinking...
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
