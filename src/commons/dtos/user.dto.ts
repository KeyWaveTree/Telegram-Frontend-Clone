import type { UserInfoDto } from "./userinfo.dto";

export interface UserSearchRequestDto {
  nickname: string;
}
export interface UserSearchResponseDto {
  userInfos: UserInfoDto[];
}
