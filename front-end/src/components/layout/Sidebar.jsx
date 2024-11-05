import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquarePlus, Search } from "lucide-react"
import ChatList from "../pages/ChatList"
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

export default function Sidebar({ isMobile = false }) {
    const [newChat, setNewChat] = useState("");
    const [isNewChat, setIsNewChat] = useState(false);
    const { getToken } = useAuth();


    useEffect(() => {
        const handleSearch = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/search`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userData: newChat }),
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }

                const res = await response.json();

                console.log("User data:", res); // Log the fetched user data
            } catch (error) {
                console.error("Fetch user failed:", error.message);
            }
        }

        if (isNewChat && newChat !== "") {
            handleSearch();
        }
    }, [newChat, getToken, isNewChat])



    return (
        <div className={`w-full relative sm:w-80 border-r ${isMobile ? 'h-full' : 'hidden xl:flex xl:flex-col lg:flex lg:flex-col md:flex md:flex-col sm:flex sm:flex-col'}`}>
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4" />
                    <Input placeholder={`${isNewChat ? "Search by name,email" : "Search chat"}`} className="pl-8" onBlur={() => setIsNewChat(false)} value={newChat} onChange={(e) => {
                        setNewChat(e.target.value)
                    }} />
                </div>
            </div>
            {
                !isNewChat &&
                <ScrollArea className="flex-1">
                    <ChatList />
                </ScrollArea>
            }

            {
                !isNewChat &&
                <div className="absolute bottom-6 right-2 cursor-pointer" onClick={() => setIsNewChat(true)}>
                    <MessageSquarePlus size={24} className="text-primary" />
                </div>
            }

        </div>
    )
}