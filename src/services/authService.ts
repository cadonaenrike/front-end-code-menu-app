import axios from "./axiosConfig";

interface LoginResponse {
  token: string;
}

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post("/auth/login", { username, password });
  return response.data;
};

export { login };
