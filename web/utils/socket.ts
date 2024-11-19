import { io, Socket } from "socket.io-client";
import { Data } from "./types";

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  if (!socketUrl) {
    throw new Error("NEXT_PUBLIC_SOCKET_URL is not defined");
  }

  if (!socket) {
    socket = io(socketUrl);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToPumpUpdates = (callback: (data: Data) => void) => {
  const socket = initializeSocket();
  socket.on("pump-update", callback);
  return () => socket.off("pump-update");
};
