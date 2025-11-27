import axios from 'axios';

const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});

export default nextServer;
