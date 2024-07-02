const { v4: uuidv4 } = require("uuid");
const user = [];

const createUser = (req, res, next) => {
    const { email, username, password, phone } = req.body;
    if (email && username && password && phone) {
        const id = uuidv4();
        const userData = {
            id,
            email,
            username,
            password,
            phone
        }
        user.push(userData);
        req.session.user = userData;
        renderUser(req, res)

    }
    else {
        //res.status(400).json({ errormessage: 'Please fill out all the fields to register' })
        res.render('register', { errormessage: 'Please fill out all the fields to register' })
    }
};

const loginRedirectUser = (req, res) => {
    res.render('login')
}

const loginUser = (req, res) => {
    const { username, password } = req.body;
    const usersFound = user.find(usersFound => usersFound.username === username && usersFound.password === password)
    console.log("user found: ", usersFound)
    if (usersFound) {
        req.session.user = usersFound;
        res.render('home', { user: req.session.user.username });
    }
    else {
        //res.render('login', {errormessage: 'Invalid username or password'});
        res.status(400).json({errormessage: 'Invalid username or password'})
    }
}

const renderUser = (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    }
    else {
        res.render('register');
    }
}

const userExists = (req, res, next) => {
    const { username } = req.body;
    const userFind = user.find(u => u.username === username);
    if (userFind) {
        return res.status(400).send("User already exists");
    }
    next();
}

const logoutUser = (req, res) => {
    req.session.user = null
    res.render('register')
}

const deleteUser = (req, res) => {
    if (req.session.user) {
        const userId = req.session.user.id
        const userDelete = user.find(u => u.id === userId);
        if (userDelete) {
            user = user.filter(u => u.id !== userId);
            console.log("deleted: ",user)
        }
        req.session.destroy(error => {
            if (error) {
                return res.status(500).send('Unable to log out and delete account');
            }
            res.render('register')
        });
    } else {
        res.render('register')
    }
};

const deleteRedirectUser = (req,res) =>{
    res.render('register')
}
module.exports = {
    createUser,
    renderUser,
    loginRedirectUser,
    userExists,
    logoutUser,
    deleteUser,
    deleteRedirectUser,
    loginUser
}