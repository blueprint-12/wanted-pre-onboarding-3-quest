import { User } from "../types/user";
import { BASE_URL } from "./const";
import axios from "axios";

type LoginResult = { msg: "success" | "fail" };

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  const loginRes = await axios
    .post(`${BASE_URL}/auth/login`, {
      ...args,
      withCredentials: true,
    })
    .then((res) => {
      console.log("res", res);
      return { msg: "success" };
    })
    .catch((err) => {
      console.log("err", err);
      return { msg: "fail" };
    });

  return loginRes as LoginResult;
};

export const getCurrentUserInfo = async (): Promise<User | null> => {
  // TODO 3-2: GET, '/profile' 호출
  // 호출 성공시 유저 정보 반환
  // 마찬가지로 사용하는 기술에 맞추어 적절히 withCredential 설정하기
  const UserInfoRes = await axios
    .get(`${BASE_URL}/profile`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("userInfo", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("err", err);
      return null;
    });

  return UserInfoRes;
};
