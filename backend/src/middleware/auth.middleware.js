// temp

function requireAuth(req,res,next){
  if(!res.session.userId){
    return res.status(401).json({error:"Unauthorized"});
  }
  next();
};

module.exports = {requireAuth}