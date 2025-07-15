import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStore {
    username:string | null,
    email:string | null,
    id:string | null,
    setUsername:(username:string)=>void,
    setUserEmail:(email:string)=>void,
    setUserId:(id:string)=>void
}
export const useUserStore=create<UserStore>()(
    persist(
        (set)=>({
          username:null,
          email:null,
          id:null,
          setUsername:(username:string)=>set({username:username}),
          setUserEmail:(email:string)=>set({email:email}),
          setUserId:(id:string)=>set({id:id})
        }),
        {
            name:"user-store"
        }
    )
)