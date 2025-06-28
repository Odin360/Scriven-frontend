import { useNavigationState } from "@react-navigation/native";

export const  usePreviousNavigationName =()=>{
  const previousRoute=  useNavigationState((state)=>{
        if(state.routes.length>1){
            return state.routes[state.index-1]?.name
        }
        else
        {return null}
    })
    return previousRoute
}