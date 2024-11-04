import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, MoreVertical } from "lucide-react"
import { useState } from "react"
import Sidebar from "./Sidebar"

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="sm:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                        <Sidebar isMobile={true} />
                    </SheetContent>
                </Sheet>
                <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Your Avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <h1 className="font-semibold">FlareTalk</h1>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
            </Button>
        </header>
    )
}