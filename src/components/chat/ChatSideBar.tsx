import { User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ChatRoomList from "./ChatRoomList";
import ChatUserPanel from "./ChatUserPanel";
import NewChatDialog from "./NewChatDialog";

interface ChatSideBarProps {
  title: string;
}

const ChatSideBar = ({ title }: ChatSideBarProps) => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-extrabold">{title}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Users</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NewChatDialog />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ChatRoomList />
      </SidebarContent>
      <SidebarFooter>
        <ChatUserPanel nickname={"Nextop"} username={"hello@world.com"} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSideBar;
