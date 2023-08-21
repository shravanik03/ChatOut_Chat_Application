const {register, login, allUsers, searchUser} = require("../controllers/usersController");

const router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/chat-app/src/userPics/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + file.originalname;
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.post("/register", upload.single('file') , register);
router.post("/login",login);
router.get("/allUsers/:id",allUsers);
router.get("/:id/", searchUser);

module.exports = router;