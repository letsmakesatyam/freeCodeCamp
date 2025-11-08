import ratelimit from "../config/upstash.js";
const rateLimiter = async(req, res, next) => {
   try{
       const { success } = await ratelimit.limit("my_limiter_key");
       if(!success){
           
        return res.status(429).json({ error: "Too many requests. Please try again later." });
       } 
        next();   
    }   
    catch(err){ 
        console.error("Rate Limiter Error:", err);
        return res.status(500).send("Rate Limiter Internal Server Error");
       
    }
    
}     
export default rateLimiter;   


    