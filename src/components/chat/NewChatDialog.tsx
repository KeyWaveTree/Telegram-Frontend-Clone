import {
  SidebarGroupContent,
  SidebarInput,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { CircleUser, Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const NewChatDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton size="lg" asChild>
          <button type="button">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Plus className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">New Chat</span>
            </div>
          </button>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 채팅 시작</DialogTitle>
          <DialogDescription>
            새로운 채팅을 시작하려면 아래에 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>

        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the users..."
            className="pl-8"
          />
          <CircleUser className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>

        {/* 선택한 유저 리스트 */}
        <Separator />
        <div className="mb-2">
          <div className="text-xs text-muted-foreground mb-1 px-2">
            선택한 유저
          </div>
          <div className="flex flex-wrap gap-2 px-2">
            {/* 더미 선택된 유저 */}
            <div className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-sm">
              <CircleUser className="size-4 text-muted-foreground" />
              <span>홍길동</span>
              <button
                type="button"
                className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                tabIndex={-1}
              >
                <X className="size-3" />
              </button>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-sm">
              <CircleUser className="size-4 text-muted-foreground" />
              <span>김영희</span>
              <button
                type="button"
                className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                tabIndex={-1}
              >
                <X className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 검색 결과 유저 리스트 및 선택 */}
        <Separator />
        <div className="mt-2">
          <div className="text-xs text-muted-foreground mb-1 px-2">
            검색 결과
          </div>
          <ul className="space-y-1 px-2">
            {/* 더미 검색 결과 유저 */}
            <li>
              <button
                type="button"
                className="flex items-center w-full gap-2 px-3 py-2 rounded hover:bg-accent transition"
              >
                <CircleUser className="size-5 text-muted-foreground" />
                <span className="flex-1 text-sm text-left">이철수</span>
                <span className="text-xs text-muted-foreground">선택</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full gap-2 px-3 py-2 rounded hover:bg-accent transition"
              >
                <CircleUser className="size-5 text-muted-foreground" />
                <span className="flex-1 text-sm text-left">박민수</span>
                <span className="text-xs text-muted-foreground">선택</span>
              </button>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default NewChatDialog;
