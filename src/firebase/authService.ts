import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "./firebaseConfig";
import * as crypto from "crypto-js";

export const RegisterUser = async (payload: { name: string; email: string; password: string }) => {
  try {
    const userRef = collection(fireDB, "users");
    const q = await getDocs(query(userRef, where("email", "==", payload.email)));
    if (q.docs.length > 0) {
      return {
        success: false,
        message: "User with this email is already registered",
        data: null,
      };
    }

    const encryptedPassword = crypto.AES.encrypt(payload.password, import.meta.env.VITE_ENCRYPTION_KEY).toString();
    const response = await addDoc(collection(fireDB, "users"), { ...payload, password: encryptedPassword });
    
    return {
      success: true,
      message: "User registered successfully",
      data: response,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
      data: null,
    } 
  }
};