import type {
  ChatRoomCreateRequestDto,
  ChatRoomCreateResponseDto,
  ChatRoomInfoResponseDto,
  ChatRoomsResponseDto,
} from "@/commons/dtos/chat.dto";
import type { MessageDto } from "@/commons/dtos/message.dto";
import type { ChatRoomDto } from "@/commons/dtos/chatroom.dto";
import type { UserInfoDto } from "@/commons/dtos/userinfo.dto";
import type { UserInfo } from "@/commons/types/userinfo.type";
import { hybridDecrypt } from "@/commons/utils/crypto-helper";
import { localStorageUtil } from "@/commons/utils/local-storage";
import config from "@/config";
import axios from "axios";

export const chatrooms = async (): Promise<ChatRoomDto[]> => {
  try {
    const response = await axios.get(`${config.SERVER_URI}/chat/rooms`, {
      withCredentials: true,
    });
    const { chatrooms } = response.data as ChatRoomsResponseDto;
    return chatrooms;
  } catch (error) {
    console.log("Error fetching data:", error);
    //안티코드여서 실제 프로젝트에서는 이렇게 하면 안됨.
    return []; // 에러 발생 시 빈 배열 반환
  }
};

/**방을 만들기 위한 요청에 대한 기능 정의**/

// 메세지 성공 시 호출될 콜백 타입 정의
export type SuccessCreateChatroomCallback = (
  data: ChatRoomCreateResponseDto
) => void;
// 실패 시 호출될 콜백 타입 정의
export type FailureCallback = (error: Error) => void;

export const createChatroom = (
  participants: UserInfoDto[],
  onSuccess: SuccessCreateChatroomCallback,
  onFailure: FailureCallback
): void => {
  axios
    .post(
      `${config.SERVER_URI}/chat/rooms/create`,
      {
        participantIds: participants.map((participant) => participant.id),
      } as ChatRoomCreateRequestDto,
      { withCredentials: true }
    )
    .then((response) => {
      const data = response.data as ChatRoomCreateResponseDto;
      onSuccess(data);
    })
    .catch((err) => {
      // 에러 메시지 추출 및 실패 콜백 실행
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "failed";
      onFailure(new Error(message));
    });
};

export const getChatRoomInfo = async (roomId: string) => {
  //1. 채팅방 목록을 가져오기
  const chatRoomDtos = await chatrooms();
  //2. 채팅방 목록 중 해당 방 ID 검색
  const chatroomInfo = chatRoomDtos.find((dto) => dto.id === roomId);
  return chatroomInfo; //체팅 내용 반환
};

export const getMessages = async (
  roomId: string
): Promise<{ participants: UserInfoDto[]; messages: MessageDto[] }> => {
  //getItem시 return타입이 undefind가 강제이다 보니 뒤에다 !(null이 될 수 없음)를 써줌. 안티코드이다.
  const userInfo = localStorageUtil.getItem<UserInfo>("user")!;

  const chatroomInfo = await getChatRoomInfo(roomId);
  //[]을 아무책임 없이 return을 하므로. 안티 코드이다.
  if (!chatroomInfo) return { messages: [], participants: [] };

  //3.채팅방 개인키 복호화(내가 만든 하이브리드 암호화 방식을 사용)
  const privateKey = hybridDecrypt(
    userInfo.privateKey,
    chatroomInfo.encryptedPrivateKey
  );

  let messages: MessageDto[];
  let participants: UserInfoDto[];

  //4. 채팅방에서 메시지 가져오기
  try {
    const response = await axios.get(
      `${config.SERVER_URI}/chat/rooms/${roomId}`,
      {
        withCredentials: true,
      }
    );

    const responseData = response.data as ChatRoomInfoResponseDto;
    participants = responseData.participants;
    messages = responseData.messages;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { messages: [], participants: [] };
  }

  //복호화 진행
  for (const msg of messages) {
    try {
      msg.content = hybridDecrypt(privateKey, msg.content);
    } catch {
      console.error("Error hybridDecrypt:", msg.content);
    }
  }

  return { participants, messages };
};
