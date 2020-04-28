import { v4 } from "uuid"
import { redis } from "../redis";
import {  forgotPasswordPrefix } from "../modules/constants/redisPrefix";


export  const createChangrPasswordUrl = async (userId: string) =>
{
 const token = v4();
 await redis.set(forgotPasswordPrefix + token, userId, "ex", 60*60*24*2); // 2 days expairation
 var url =`http://localhost:40001/user/change-password/${token}`;
 console.log(url);
 
 return url;
}