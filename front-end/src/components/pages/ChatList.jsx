import ChatItem from "./ChatItem"

const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?" },
    { id: 3, name: "Bob Johnson", lastMessage: "Thanks for the help!" },
]

export default function ChatList() {
    return (
        <>
            {chats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
            ))}
        </>
    )
}