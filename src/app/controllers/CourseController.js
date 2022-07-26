
const Course = require('../models/Course')
const { mongooseToObject, mongoosesToObject } = require('../../util/mongoose')

class CourseController {

    // [GET] /courses
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('courses/list', {
                    courses: mongoosesToObject(courses)
                })
            })
            .catch(next)
    }

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                if(course) {
                    res.render('courses/show', { course: mongooseToObject(course) })
                }
                else {
                    res.status(404).send('')
                }
            })
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body)
        const formData = { ...req.body }
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hq720.jpg`

        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                if(course) {
                    res.render('courses/edit', { course: mongooseToObject(course) })
                }
                else {
                    res.status(404).send('')
                }
            })
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = { ...req.body }
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hq720.jpg`

        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'DELETE':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.status(404).send('Action is invalid!')
                break;
        }
    }
}

module.exports = new CourseController