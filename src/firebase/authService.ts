import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "./firebaseConfig";
import * as crypto from "crypto-js";

export const LoginUser = async (payload: { email: string; password: string }) => {
  try {
    const userRef = collection(fireDB, "users");
    const q = await getDocs(query(userRef, where("email", "==", payload.email)));
    if (q.docs.length === 0) {
      return {
        success: false,
        message: "Wrong email or password",
        data: null,
      };
    }

    const userData = q.docs[0].data();
    const hashedInputPassword = crypto.SHA256(payload.password).toString();

    if (hashedInputPassword !== userData.password) {
      return {  
        success: false,
        message: "Wrong email or password",
        data: null,
      };
    }

    return {
      success: true,
      message: "Login successful",
      data: userData,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
      data: null,
    };
  }
};

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

    const hashedPassword = crypto.SHA256(payload.password).toString();
    const response = await addDoc(collection(fireDB, "users"), { ...payload, password: hashedPassword });
    
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