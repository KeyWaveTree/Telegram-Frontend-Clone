export interface AuthLoginRequestDto {
  username: string;
  password: string;
}

export interface AuthLoginResponseDto {
  nickname: string;
  accessToken: string;
  id: string;
  publicKey: string;
  encryptedPrivateKey: string;
}

export interface AuthSignupRequestDto {
  username: string;
  password: string;
  nickname: string;
}
export interface AuthSignupResponseDto {
  nickname: string;
  accessToken: string;
  encryptedPrivateKey: string;
  publicKey: string;
}
