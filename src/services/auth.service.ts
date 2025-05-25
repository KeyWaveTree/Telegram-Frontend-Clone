import type {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthSignupRequestDto,
  AuthSignupResponseDto,
} from "@/commons/dtos/auth.dto";
import type { UserInfo } from "@/commons/types/userinfo.type";
import { decryptAES } from "@/commons/utils/crypto-helper";
import { localStorageUtil } from "@/commons/utils/local-storage";
import config from "@/config";
import axios from "axios";
import { Cookies } from "react-cookie";

// 로그인 성공 시 호출될 콜백 타입 정의
export type SuccessLoginCallback = (data: AuthLoginResponseDto) => void;
// 회원가입 성공 시 호출될 콜백 타입 정의
export type SuccessSignupCallback = (data: AuthSignupResponseDto) => void;
// 실패 시 호출될 콜백 타입 정의
export type FailureCallback = (error: Error) => void;

/**
 * 로그인 처리 함수
 * 1. 서버에 로그인 요청을 보냄
 * 2. 응답으로 받은 암호화된 개인키를 비밀번호로 복호화
 * 3. 사용자 정보를 localStorage에 저장
 * 4. 성공/실패 콜백 실행
 */
export const login = (
  body: AuthLoginRequestDto,
  onSuccess: SuccessLoginCallback,
  onFailure: FailureCallback
): void => {
  axios
    .post(`${config.SERVER_URI}/auth/login`, body, { withCredentials: true })
    .then((response) => {
      const data = response.data as AuthLoginResponseDto;

      // 개인키 복호화 후 사용자 정보 저장
      localStorageUtil.setItem<UserInfo>("user", {
        id: data.id,
        nickname: data.nickname,
        publicKey: data.publicKey,
        privateKey: decryptAES(body.password, data.encryptedPrivateKey),
      });

      onSuccess(data);
    })
    .catch((err) => {
      // 에러 메시지 추출 및 실패 콜백 실행
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Login failed";
      onFailure(new Error(message));
    });
};

/**
 * 회원가입 처리 함수
 * 1. 서버에 회원가입 요청을 보냄
 * 2. 성공 시 콜백 실행
 * 3. 실패 시 에러 메시지 전달
 */
export const signup = (
  body: AuthSignupRequestDto,
  onSuccess: SuccessSignupCallback,
  onFailure: FailureCallback
): void => {
  axios
    .post(`${config.SERVER_URI}/auth/signup`, body, { withCredentials: true })
    .then((response) => {
      onSuccess(response.data as AuthSignupResponseDto);
    })
    .catch((err) => {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Signup failed";
      onFailure(new Error(message));
    });
};

/**
 * 로그아웃 처리 함수
 * 1. access_token 쿠키 삭제
 * 2. localStorage에서 사용자 정보 제거
 */
export const logout = () => {
  new Cookies().remove("access_token");
  localStorageUtil.removeItem("user");
};
