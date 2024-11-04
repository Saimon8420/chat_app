import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import ChatList from "../pages/ChatList"

export default function Sidebar({ isMobile = false }) {
    return (
        <div className={`w-full sm:w-80 border-r ${isMobile ? 'h-full' : 'hidden xl:flex xl:flex-col lg:flex lg:flex-col md:flex md:flex-col sm:flex sm:flex-col'}`}>
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4" />
                    <Input placeholder="Search or start new chat" className="pl-8" />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <ChatList />
            </ScrollArea>
        </div>
    )
}