import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
export const SignUpSchema = z.object({
    username:z.string().min(4,"Username must be atleast 4 characters long"),
    email:z.string().email("Please enter a valid email"),
    password:z.string().min(8,"Password must be atleast 8 characters")
})
export const SignInSchema = z.object({
       email:z.string().email("Please enter a valid email"),
    password:z.string().min(8,"Password must be atleast 8 characters"),
   
})
export const ResetPasswordSchema = z.object({
    newPassword:z.string().min(8,"Password must be atleast 8 characters"),
    confirmPassword:z.string().min(8,"Password must be atleast 8 characters")
})
export const EmailSchema = z.object({
    email:z.string().email("Please enter a valid email")})
   







