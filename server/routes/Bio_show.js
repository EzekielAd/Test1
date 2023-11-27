var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Show = require('../models/Bio_show');
let ShowController = require('../controllers/show')
/* Get route for the Bio shows list */

function requireAuth(req,res,next){
    if(!req.isAuthenticated)
    {
        return res.redirect('/login');
    }
    next();
}
// Read Operation
router.get('/', ShowController.DislayShowlist);
/* Get route for Add Show page --> Create */
router.get('/add',requireAuth, ShowController.AddShow); 
/* Post route for Add Show page --> Create */
router.post('/add',requireAuth, ShowController.ProcessShow);
/* Get route for displaying the Edit Show page --> Update */
router.get('/edit/:id',requireAuth, ShowController.EditShow);
/* Post route for processing the Edit Show page --> Update */
router.post('/edit/:id',requireAuth, ShowController.ProcessEditShow);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id',requireAuth, ShowController.DeleteShow);
 module.exports = router;