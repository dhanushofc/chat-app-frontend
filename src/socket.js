import { io } from "socket.io-client";

// Your live backend URL from Render 👇
const socket = io("https://chat-app-backend-dxyi.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
