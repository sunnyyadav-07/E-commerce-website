import { api } from "./axiosAuthInstance";


export async function registerUser({email,password,fullname,contact,isSeller}){
  const response=await api.post("/register",{email,password,fullname,contact,isSeller});
  return response.data;
}

export async function loginUser({email,password}){
  console.log("aaya")
  const response=await api.post("/login",{email,password});
  console.log("gya")
  return response.data;
}