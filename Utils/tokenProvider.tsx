import { BASEURL } from "@/constants/Api";
import axios from "axios";

export const TokenProvider = async (userId: string, token: string) => {
  if (!userId) return;

  try {
    const { data } = await axios.get(
      `${BASEURL}/users/generateToken/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};
