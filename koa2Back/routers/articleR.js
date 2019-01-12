var articleC=require('../controller/articleC');
var router=require('koa-router')();
router.post('/addOrEditArticle',articleC.addOrEditArticle)
router.post('/delArticle',articleC.delArticle)
router.post('/addOrEditAboutUs',articleC.addOrEditAboutUs)
router.post('/findAboutUs',articleC.findAboutUs)
router.post('/findArticleById',articleC.findArticleById)
router.post('/findArticleForPage',articleC.findArticleForPage)
module.exports=router
