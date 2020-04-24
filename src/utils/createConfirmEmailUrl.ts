import { v4 } from "uuid"
import { redis } from "../redis";


export  const createConfirmEmailUrl = async (userId: string) =>
{
 const token = v4();
 await redis.set(token, userId, "ex", 60*60*24*2); // 2 days expairation
 var url =`http://localhost:40001/user/confirm/${token}`;
 console.log(url);
 
 return url;
}