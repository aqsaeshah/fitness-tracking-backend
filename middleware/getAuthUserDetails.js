
const User = require('../db/userModel')
async function getAuthUserDetails (req){
    const userId = req.user._id;
    const exp = req.user.exp;
    const assign = req.user.iat;
    const exp_date = new Date(exp * 1000);
    const assign_date = new Date(assign * 1000);
    const user = await User.findById(userId)
    return ({ user: user, exp: exp_date, issue: assign_date })
}

module.exports = getAuthUserDetails;