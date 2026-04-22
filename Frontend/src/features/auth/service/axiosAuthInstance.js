import axios from "axios";
 export const api=axios.create({
  baseURL:"/api/auth",
  withCredentials:true
})

// api.interceptors.request.use((req) => {
//   console.log("🔥 METHOD:", req.method);
//   console.log("🔥 URL:", req.baseURL + req.url);
//   return req;
// });
// api.interceptors.response.use((res) => {
//   console.log("🔥 RESPONSE:", res);
//   return res;
// });