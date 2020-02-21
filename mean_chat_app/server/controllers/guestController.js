const commonQuery = require('../shared/commonQuery');
const UserModel = require('../schemas/users');

var jwt = require('jsonwebtoken');

module.exports = {
    userSignUp: userSignUp,
    userLogin: userLogin
}

function userSignUp(req, res) {
    async function userSignUp() {
        try {
            let data = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            }
            let result = await commonQuery.saveRecord(UserModel, data);
            console.log('result', result)
            if(result.success === true) {
                res.json({
                    code: 200,
                    data: result.data,
                    message: 'User registered successfully'
                })
            } else {
                res.json({
                    code: 403,
                    message: 'Internal server error'
                })
            }
        } catch (error) {
            console.log('error on userSignUp', error);
            res.json({
                code: 500,
                message: 'Internal server error'
            })
        }
    }
    userSignUp();
}

function userLogin(req, res) {
    async function userLogin() {
        try {
            let query = {
                email: req.body.email,
                password: req.body.password
            }
            let result = await commonQuery.findOne(UserModel, query);
            if(result.success === true) {
                let token = jwt.sign({
                    data: result.data
                }, 'secret', { expiresIn: '1h' });
                console.log('token', token);
                let token_result = await commonQuery.updateOneRecord(UserModel, { _id: result.data._id }, { token: token });
                if(result.success === true) {
                    res.json({
                        code: 200,
                        data: { token : token_result.data.token, _id: token_result.data._id },
                        message: 'Logged in successfully'
                    })
                } else {
                    res.json({
                        code: 403,
                        message: 'Internal server error'
                    })
                }
            } else {
                res.json({
                    code: 403,
                    message: 'Internal server error'
                })
            }
        } catch (error) {
            console.log('error on userLogin main', error);
            res.json({
                code: 500,
                message: 'Internal server error'
            })
        }
    } userLogin();
}