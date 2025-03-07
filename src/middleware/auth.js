const adminAuth = (req,res,next)=>{
    console.log('Admin logged in with authatication');
    const token ="abc";
    const adminAuthorized = token === "abc";
    if(!adminAuthorized){
       res.status(401).send('unauthorized user')
    }else {
     next();
    }
}


const userAuth =(req,res, next)=> {
    console.log('user authorized for get data');
    const token ="123";
    const userAuthorized = token === "123";
    if(!userAuthorized){
        res.status(401).send('unauthorized user')
    }  else {
        next();
    }
}

module.exports = {adminAuth, userAuth}