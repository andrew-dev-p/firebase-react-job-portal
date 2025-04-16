import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ProfileFormValues } from "../pages/user/Profile";
import { fireDB } from "./firebaseConfig";

export const updateUserProfile = async (payload: Partial<ProfileFormValues>) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user) {
    throw new Error("User not found in local storage");
  }

  try {
    await updateDoc(
      doc(fireDB, "users", user.id),
      payload
    )
    return {
      success: true,
      message: "User profile updated successfully",
      data: payload
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update user profile",
      data: null
    }
  }
}

export const getUserProfile = async () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user) {
    throw new Error("User not found in local storage");
  }
  
  try {
    const response = await getDoc(doc(fireDB, "users", user.id));
    return {
      success: true,
      message: "User profile fetched successfully",
      data: response.data()
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch user profile",
      data: null
    }
  }
}