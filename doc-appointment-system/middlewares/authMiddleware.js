const jwt =require('jsonwebtoken')

module.exports =  (req,res,next)=>{
try {
    // console.log(req.headers)
    const token = req.headers['authorization'].split(" ")[1]
    
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
   
            if (err) {
                return res.status(200).send({ message: 'auth', success: false })
            }

            else {
                req.body.userId = decoded.id
                next()
            }
        })
} catch (error) {
    console.log(error)
    res.status(401).send({message:'auth failed',success:false})
}
}

