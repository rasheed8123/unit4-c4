

const authorise = () => {

    if(req.user._id !== req.params.id){
        return res.send(401).send({message:"logged in user cannot access this info"})
      }
    else{
        return next();
    }
}    

module.exports = authorise;