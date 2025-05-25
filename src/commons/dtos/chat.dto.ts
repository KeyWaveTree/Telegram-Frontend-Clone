import type { ContentType } from "../enums/content.enum";
import type { ChatRoomDto } from "./chatroom.dto";
import type { MessageDto } from "./message.dto";
import type { UserInfoDto } from "./userinfo.dto";

export interface ChatRoomsResponseDto {
  chatrooms: ChatRoomDto[];
}

export interface ChatRoomCreateRequestDto {
  participantIds: string[];
}

export interface ChatRoomCreateResponseDto {
  id: string;
  name: string;
  publicKey: string;
  encryptedPrivateKey: string;
}

export interface ChatRoomInfoResponseDto {
  roomId: string;
  participants: UserInfoDto[];
  messages: MessageDto[];
}

export interface ChatRoomSendMessageRequestDto {
  content: string;
  contentType: ContentType;
}
