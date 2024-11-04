import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function MessageInput() {
    return (
        <div className="p-4 flex items-center space-x-2">
            <Input placeholder="Type a message" className="flex-1" />
            <Button size="icon">
                <Send className="h-4 w-4" />
            </Button>
        </div>
    )
}