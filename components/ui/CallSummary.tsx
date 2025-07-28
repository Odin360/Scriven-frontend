import { useEffect, useState, useRef } from "react";
import { useSpeechRecognition } from "../SpeechRecognition";
import { BookIcon } from "phosphor-react-native";
import { TouchableOpacity, View, Text } from "react-native";
import axios from "axios";
import { BASEURL } from "@/constants/Api";
import { useTeamStore } from "@/store/useTeamStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function CallSummary() {
  const {
    handleStart,
    handleStop,
    transcript,
    recognizing,
    setTranscript
  } = useSpeechRecognition();
  const teamId = useTeamStore(state=>state.id)
  const token = useAuthStore(state=>state.token)
  const [temporaryContainer, setTemporaryContainer] = useState("");
  const intervalRef = useRef<number | null>(null);

  // Handle transcript updates
  useEffect(() => {
    if (transcript.trim() !== "") {
      setTemporaryContainer((prev)=>prev + " " + transcript.trim());
       setTranscript("")
    }
  }, [transcript]);

  // Send temporary data to backend every 5 minutes
  useEffect(() => {
    intervalRef.current = setInterval(async() => {
      if (temporaryContainer.trim() !== "") {
        // Here you'd send to your backend
        console.log("Sending:", temporaryContainer);
         try{
            await axios.put(`${BASEURL}/teams/transcript`,
                {"teamId":teamId,"transcript":temporaryContainer},
                {headers:{
                    "Authorization":`Bearer ${token}`
                }
                })
         }
         catch(e){
            console.log(e)
         }
        setTemporaryContainer(""); // reset temp
      }
    }, 300000); // 5 minutes = 300000ms

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [temporaryContainer]);

  const toggleRecognition = () => {
    if (recognizing) {
      handleStop();
    } else {
      handleStart();
    }
  };

  return (
    <TouchableOpacity onPress={toggleRecognition}>
      <BookIcon color={recognizing?"red":"white"} weight="fill" />
    </TouchableOpacity>
  );
}
