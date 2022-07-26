
const Course = require('../models/Course')
const { mongoosesToObject } = require('../../util/mongoose')

class CourseController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, countDeleted]) => {
                res.render('me/stored-courses', {
                    courses: mongoosesToObject(courses),
                    countDeleted
                })
            })
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: mongoosesToObject(courses)
                })
            })
            .catch(next)
    }

    // [GET] /me/stored/news
    storedNews(req, res, next) {
        res.render('me/stored-news')
    }

}

module.exports = new CourseController