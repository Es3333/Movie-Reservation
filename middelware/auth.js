const jwt =require('jsonwebtoken')

exports.vertifytoken = async (req,res,next)=>{

    const token = req.header('Authorization').split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }
try {
    req.user =await jwt.verify(token, 'fkdlps')
    next();
}catch (err){
        res.json({message : err})
}
}
exports.isAdmin=async (req,res,next)=>{
console.log(req.user.role )
    if('admin' === 'admin'){
        next();
    }
   else{
        res.json({message:'only admins are allowed'})
    }


}
