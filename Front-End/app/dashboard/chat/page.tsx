"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, AlertCircle } from "lucide-react"

const messages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm ViperQB Assistant. How can I help you today?",
    timestamp: "14:32",
  },
  {
    id: 2,
    role: "user",
    content: "Can you show me the pending KYC verifications?",
    timestamp: "14:32",
  },
  {
    id: 3,
    role: "assistant",
    content: "I found 4 pending KYC verifications. Would you like me to navigate to the KYC page?",
    timestamp: "14:33",
    suggestions: [
      { id: "s1", text: "View KYC Queue", action: "navigate_kyc" },
      { id: "s2", text: "Show Statistics", action: "show_kyc_stats" },
    ],
  },
]

export default function ChatPage() {
  const [input, setInput] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant & Chat</h1>
        <p className="text-muted-foreground mt-1">Smart automation with natural language</p>
      </div>

      {/* Chat Window */}
      <Card className="border-border h-96 md:h-[500px] flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg">ViperQB Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-accent text-primary-darker"
                    : "bg-background border border-border text-foreground"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${msg.role === "user" ? "text-primary-darker/60" : "text-muted-foreground"}`}
                >
                  {msg.timestamp}
                </p>
                {msg.suggestions && (
                  <div className="mt-3 space-y-2 flex flex-col gap-2">
                    {msg.suggestions.map((suggestion) => (
                      <Button
                        key={suggestion.id}
                        variant="outline"
                        size="sm"
                        className="text-xs text-left justify-start bg-transparent hover:bg-accent/20 h-auto py-1.5"
                      >
                        {suggestion.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-background"
            />
            <Button size="icon" className="bg-accent hover:bg-accent-dark text-primary-darker">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Info */}
      <Card className="border-border bg-info/5 border-info/20">
        <CardContent className="pt-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-info flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">Note</p>
            <p className="text-sm text-muted-foreground mt-1">
              The AI Assistant can help with navigation, data queries, and automated actions. High-risk actions require
              your explicit approval.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
