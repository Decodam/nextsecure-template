import axios, { AxiosError } from 'axios';
import { UserProfileType } from "@/types/user.type"; 
import { ResponseMessage } from "@/types/response.type"; // Adjust path as needed



export async function fetchUserProfile(): Promise<ResponseMessage<UserProfileType>> {
  try {
    const response = await axios.get('/api/auth/profile', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data.data,
      message: 'User profile fetched successfully',
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return {
      success: false,
      data: null,
      error: {
        status: axiosError.response?.status || 500,
        message: axiosError.message || 'Failed to fetch user profile',
      },
    };
  }
}