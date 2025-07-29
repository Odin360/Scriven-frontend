import { useRef, useState } from "react";
import { Button, View, Image,Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASEURL } from "@/constants/Api";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import * as FileSystem from 'expo-file-system';





export default function UploadImage() {
  const image = useRef<string|null>(null);
  const [percentage, setPercentage] = useState(0);
  const userId = useUserStore.getState().id;
  const token = useAuthStore.getState().token;
  const [imageUri, setImageUri] = useState<string | null>(null);


const handleImagePicked = async (pickerResult: any) => {
    try {
      if (pickerResult.canceled) {
        alert("Upload cancelled");
        return;
      } else {
        setPercentage(0);
        await uploadImage().then(async()=> await downloadImage());
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    }
  };

const downloadImage =async()=>{try{ FileSystem.downloadAsync(
    `${BASEURL}/image/download/${userId}`,
   `${FileSystem.documentDirectory}`+ `download`,
   {
    headers:{
        "Authorization":`Bearer ${token}`
    }
   }  
).then(({uri})=>{
     setImageUri(uri +`?t=${Date.now()}`)
    console.log("finished Downloading to" + uri)
})}
catch(e){
    console.log(e)
}
}

  const uploadImage = async () => {
    if (!image.current) return alert("No image selected");

    const uriParts = image.current.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("file", {
      uri: image.current,
      name: `${userId}.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    try {
      await axios.post(`${BASEURL}/image/upload/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
            if(progressEvent.total){
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercentage(percent);
        }}
      });
      alert("Upload successful!"); 
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
     image.current=selectedUri;
      await handleImagePicked(result);
    }
  };
  
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1
    });if(!result.canceled && result.assets.length>0){
    image.current=result.assets[0].uri
    await handleImagePicked(result);}
  };



  return (
    {
    percentage,
    handleImagePicked,
    pickImage,
    takePhoto,
    uploadImage,
    downloadImage,
    imageUri
    }
  );
}
export const useImageUpload = ()=>UploadImage()
