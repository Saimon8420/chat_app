import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

export default function ChatItem({ chat }) {
    return (
        <Link to={`/chat/${chat.id}`} className="block">
            <div className="p-4 cursor-pointer hover:bg-accent">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={`/placeholder-avatar-${chat.id}.jpg`} alt={chat.name} />
                        <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="font-medium">{chat.name}</p>
                        <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}