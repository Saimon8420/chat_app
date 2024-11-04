import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?" },
    { id: 3, name: "Bob Johnson", lastMessage: "Thanks for the help!" },
]

export default function ChatArea() {
    const { id } = useParams()
    const chat = chats.find(c => c.id === parseInt(id))

    if (!chat) {
        return <div className="flex-1 flex items-center justify-center">Chat not found</div>
    }

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={`/placeholder-avatar-${chat.id}.jpg`} alt={chat.name} />
                        <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h2 className="font-semibold">{chat.name}</h2>
                </div>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
            <MessageList />
            <MessageInput />
        </div>
    )
}