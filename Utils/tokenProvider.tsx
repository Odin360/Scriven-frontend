import { useUserStore } from "@/store/useUserStore"
import {StreamChat} from "stream-chat"
export default function TokenProvider(){
    const api_key = "kcghu45jpmy8"
    const api_secret = "uwjw9yjzke9nvhxp5ryrcs9epf82n66bf795x54dy66h8e3jy4bj7npgf892twtv"
    const user_Id = useUserStore(state=>state.id)
    if(!user_Id){return}
    const client = StreamChat.getInstance(api_key,api_secret);
    const token = client.createToken(user_Id)
    console.log(token)
    return token
}