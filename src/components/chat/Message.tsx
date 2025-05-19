import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

export interface MessageProps {
  nickname: string;
  createdAt: Date;
  content: string;
  isSender: boolean;
}

const Message = ({ nickname, createdAt, content, isSender }: MessageProps) => {
  return (
    <div className={`flex items-start gap-2 ${isSender && "justify-end"}`}>
      {!isSender && (
        <Avatar>
          <AvatarFallback>{nickname.slice(0, 2)}</AvatarFallback>
        </Avatar>
      )}

      <div className={`${isSender && "text-right"}`}>
        <div className="text-xs text-muted-foreground">
          {!isSender && `${nickname} · `}
          {format(createdAt, "yyyy-MM-dd hh:mm:ss")}
        </div>
        <div
          className={`mt-1 max-w-xs px-4 py-2 text-sm rounded-2xl shadow ${isSender ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Message;
