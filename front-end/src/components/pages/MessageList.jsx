import { ScrollArea } from "@/components/ui/scroll-area"

const messages = [
    { id: 1, sender: "John Doe", content: "Hey, how are you?" },
    { id: 2, sender: "You", content: "I'm good, thanks! How about you?" },
    { id: 3, sender: "John Doe", content: "Doing great! Any plans for the weekend?" },
]

export default function MessageList() {
    return (
        <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`mb-4 ${message.sender === "You" ? "text-right" : "text-left"}`}
                >
                    <div className="inline-block p-2 rounded-lg bg-accent">
                        <p className="font-medium">{message.sender}</p>
                        <p>{message.content}</p>
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}