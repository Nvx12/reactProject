import axios from "axios";
import { API_URL } from "../config";

const headers = { "content-Type": "application/json" };
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/all`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addUser = async (name, email, phoneNumber) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/add`,
      { name, email, phoneNumber },
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (id,name,email,phoneNumber) =>{
    try {
        const response= await axios.put(`${API_URL}/users/${id}`,{name, email, phoneNumber },{headers:headers})
        return response.data
    } catch (error) {
        console.log(error)
    }
}