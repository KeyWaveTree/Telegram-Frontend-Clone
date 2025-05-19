import { MessageSquare } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { ChatRoomElementProps } from "./ChatRoomElement";
import { Input } from "@/components/ui/input";

const ChatRoomList = () => {
  const list = [{ lastMessage: "Hello World", roomname: "Test" }];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Messages</SidebarGroupLabel>
      <SidebarMenu>
        {/* 메시지, 채팅방 검색 */}
        <SidebarMenuItem>
          <Input type="text" placeholder="Search" />
        </SidebarMenuItem>

        {/* 채팅방 리스트 */}
        {list.map(({ lastMessage, roomname }: ChatRoomElementProps) => (
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-full">
                  <MessageSquare className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{roomname}</span>
                  <span className="truncate text-xs">{lastMessage}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
export default ChatRoomList;
