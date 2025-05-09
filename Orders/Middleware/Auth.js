const jwt = require('jsonwebtoken');

const authorization=((req,res,next)=>{
      console.log(req.headers.authorization);
        let token=req.headers.authorization.slice(7)
        let decode=jwt.decode(token)
        console.log(decode,token)
        let userid=decode._id
        req.userid=userid
        next()
      
        

})
module.exports={authorization}