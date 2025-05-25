import type { ChatRoomSendMessageRequestDto } from "@/commons/dtos/chat.dto";
import type { ChatRoomDto } from "@/commons/dtos/chatroom.dto";
import type { MessageDto } from "@/commons/dtos/message.dto";
import type { UserInfo } from "@/commons/types/userinfo.type";
import { hybridDecrypt, hybridEncrypt } from "@/commons/utils/crypto-helper";
import config from "@/config";
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket;
  private chatroomPublicKey: string = ""; //방의 공개키
  private chatroomPrivateKey: string = ""; //방의 개인키

  constructor() {
    //인스턴스는 생성하되, 연결은 나중에
    this.socket = io(config.SERVER_URI, { withCredentials: true });
  }

  //서버로 보낼때 부터 암호화를 해주니 기존 보안 문제인 서버에서 보이는 메세지 문제 해결
  connect(
    roomId: string,
    { privateKey }: UserInfo,
    { encryptedPrivateKey, publicKey }: ChatRoomDto
  ) {
    if (!this.socket.connected) {
      this.socket.io.opts.query = { room: roomId }; //동적쿼리

      //공개키는 공개키로
      this.chatroomPublicKey = publicKey;

      //내가 만들었던 하이브리드 복호화 방식을 사용.(사용자들의 개인키를 알고있고, 암호화된 개인키까지 가지고 있어야 복호화 가능)
      this.chatroomPrivateKey = hybridDecrypt(privateKey, encryptedPrivateKey);
      this.socket.connect();
      console.log("connected");
    }
  }

  //callback 함수와 같은 역할
  onReceiveMessage(handler: (message: MessageDto) => void) {
    //소켓온에 있는 작업을 다 해야 핸들러 적용가능
    this.socket.on("message", (message: MessageDto) => {
      message.content = hybridDecrypt(this.chatroomPrivateKey, message.content);
      handler(message);
    });
  }

  sendMessage(message: ChatRoomSendMessageRequestDto) {
    //
    message.content = hybridEncrypt(this.chatroomPublicKey, message.content);
    this.socket.emit("message", message);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();
