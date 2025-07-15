import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TeamStore{
    id:string|null,
    name:string|null,
    drive:string|null,
    setTeamDrive:(drive:string)=>void
    setTeamId:(id:string)=>void,
    setTeamName:(name:string)=>void,
    
}
export const useTeamStore=create<TeamStore>()(
    persist(
        (set)=>({
            id:null,
            name:null,
            drive:null,
            setTeamDrive:(drive:string)=>set({
                drive:drive
            }),
            setTeamId:(id:string)=>set({
                id:id
            }),
            setTeamName:(name:string)=>set({
                name:name
            })
        }),
        {
            name:"team-storage"
        }
    )
)