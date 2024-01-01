
export function privateRoute(req,res,next){
    //if (!req.session['user']) {
    if (!req.isAuthenticated()) {
            return res.status(403).json({
            status:'error',
            message:'Debe loggearse para acceder',
        })
    }
    next()
}