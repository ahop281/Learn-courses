
class NewsController {

    // [GET] /news
    index(req, res, next) {
        res.render('news')
    }

    // [GET] /news
    getItem(req, res, next) {
        res.send('News Details!!!')
    }

}

module.exports = new NewsController