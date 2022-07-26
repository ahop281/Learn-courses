
const User = require('../models/User')
const { mongooseToObject, mongoosesToObject } = require('../../util/mongoose')

class CourseController {

    // [GET] /users/login
    login(req, res, next) {
        res.render('users/login')
    }

    // [GET] /users/signup
    signup(req, res, next) {
        res.render('users/signup')
    }
}

module.exports = new CourseController