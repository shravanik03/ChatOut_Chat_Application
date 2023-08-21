const generateToken = require('../middlewares/generateToken');
const User = require('../model/UserModel');

module.exports.register = async (req, res, next) => {
    try {
        const picName = req.file ? req.file.filename : "default-avatar-image.jpg";
        console.log(picName);
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ msg: "One or more required fields are not filled", status: false });
        }
        // const usernameCheck = await User.findOne({ name });
        // if (usernameCheck) {
        //     return res.json({ msg: "Username already used", status: false });
        // }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {

            return res.json({ msg: "Email already used", status: false });
        }
        const user = await User.create({
            name,
            email,
            password,
            pic: picName,
        });
        // delete User.password;
        console.log("User created");
        return res.status(200).json({ msg: "", status: true, token: generateToken(user._id), user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user1 = await User.findOne({ email });
        if (!user1)
            return res.json({ msg: "Incorrect email or password", status: false });
        const isPasswordValid = await user1.matchPassword(password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect email or password", status: false });
        return res.json({ msg: "", status: true, user1 });
    } catch (ex) {
        next(ex);
    }
};

module.exports.allUsers = async (req, res, next) => {
    try{
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "name",
            "email",
            "pic",
            "_id",
        ]);
        return res.json(users);
    }catch(ex){
        next(ex);
    }
};
// /api/user?search=shravani
module.exports.searchUser = async (req, res, next) => {
    try{
        const keyword = req.query.search ? {
           
            name: {$regex: req.query.search, $options: "i"},
            
        } : {};
        const users = await User.find(keyword).find({_id: {$ne:req.params.id} });
        res.json(users);
    }catch(ex){
        next(ex);
    }
}