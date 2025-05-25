import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { ChatRoomElementProps } from "./ChatRoomElement";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { chatrooms } from "@/services/chat.service";
import ChatRoomElement from "./ChatRoomElement";
const ChatRoomList = () => {
  const [rooms, setRooms] = useState<ChatRoomElementProps[]>([]);
  useEffect(() => {
    (async () => {
      const chatRoomDtos = await chatrooms();
      const chatRoomList: ChatRoomElementProps[] = chatRoomDtos.map(
        ({ name, id }): ChatRoomElementProps => {
          return {
            roomname: name,
            lastMessage: "",
            roomId: id,
          };
        }
      );
      setRooms(chatRoomList);
    })();
  }, []);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Messages</SidebarGroupLabel>
      <SidebarMenu>
        {/* 메시지, 채팅방 검색 */}
        <SidebarMenuItem>
          <Input type="text" placeholder="Search" />
        </SidebarMenuItem>

        {/* 채팅방 리스트 */}
        {rooms.map(
          ({ lastMessage, roomname, roomId }: ChatRoomElementProps) => (
            <ChatRoomElement
              lastMessage={lastMessage}
              roomname={roomname}
              roomId={roomId}
            />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
export default ChatRoomList;
