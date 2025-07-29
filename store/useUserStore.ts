import { create } from "zustand"
import { persist,createJSONStorage } from "zustand/middleware"

interface UserStore {
    username:string | null,
    theme:string,
    email:string | null,
    id:string | null,
    setUsername:(username:string)=>void,
    setUserEmail:(email:string)=>void,
    setUserId:(id:string)=>void,
    setTheme:(theme:string)=>void
}
export const useUserStore=create<UserStore>()(
    persist(
        (set)=>({
          username:null,
          theme:'default',
          email:null,
          id:null,
          setUsername:(username:string)=>set({username:username}),
          setUserEmail:(email:string)=>set({email:email}),
          setUserId:(id:string)=>set({id:id}),
          setTheme:(theme:string)=>set({theme:theme})
        }),
        {
            name:"user-store",
            storage:createJSONStorage(()=>localStorage)
        }
    )
)