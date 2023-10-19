const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'myNewSecret123456';

async function register(email, firstName, lastName, password) {
    const duplicated = await User.findOne({ email }).collation({
        locale: 'en',
        strength: 2,
    });

    if (duplicated) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        firstName,
        lastName,
        hashedPassword,
    });

    //TODO: See assignment if register create user session
    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({
        locale: 'en',
        strength: 2,
    });

    if (!user) {
        throw new Error('Incorrect username or password!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
        throw new Error('Incorrect username or password!');
    }

    return createSession(user);
}

function createSession({ _id, email, firstName, lastName }) {
    const payload = {
        _id,
        email,
        firstName,
        lastName,
    };

    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken,
};
