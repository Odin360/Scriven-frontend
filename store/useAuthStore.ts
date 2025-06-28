import {create} from 'zustand';
import {persist} from 'zustand/middleware';


interface AuthStore{
    token:string | null,
    email:string | null,
    password:string | null,
    signedIn:boolean,
    setSignedIn:(boolean:boolean) => void
    setToken:(token:string | null)=>void
    setEmail:(email:string | null)=>void
     setPassword:(password:string | null)=>void
}
export const useAuthStore = create<AuthStore>()(
    persist((set)=>({
        email:null,
        password:null,
   token:null,
   signedIn:false,
   setSignedIn:(boolean)=>set({signedIn:boolean}),
   setToken:(token)=>set({token:token}),
   setEmail:(email)=>set({email:email}),
     setPassword:(password)=>set({password:password}),
    }),
{
name:"auth-storage"
})
)