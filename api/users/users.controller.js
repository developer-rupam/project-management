const router = require('express').Router();
const bodyParser = require('body-parser');
const {check,validationResult} = require('express-validator');
const schema = require('./users.model');

/************* Setup middleware **********/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true}));


/*********** Add user type *************/
router.post('/addUserType',[
    //check if field is not empty
    check('name').not().isEmpty().trim().escape(),
    check('status').not().isEmpty().trim().escape(),
],(req,res)=>{
    /*** check validation result***/
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            status : 422,
            message : 'Validation error',
            errors: errors.array()
        })
    }

    schema.create({
        user_type_name : req.body.name,
        is_active : req.body.status,
    },(error,result)=>{
        if(error){
            return res.json({
                status : 500,
                message : 'Users type creation failed',
                error : error
            })
        }

        return res.json({
            status : 200,
            message : 'User type created successfully',
            result : result,
        })
    })
});



/************* Exporting module to app.js *************/
module.exports = router;