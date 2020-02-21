module.exports = {
    saveRecord: saveRecord,
    findOne: findOne,
    updateOneRecord: updateOneRecord
}

function saveRecord(model, data) {
    return new Promise((resolve, reject) => {
        try {
            model.create(data, (err, success) => {
                if(err) {
                    console.log('error while saveRecord', err)
                    reject(err);
                } else {
                    resolve({success: true, data: success})
                }
            })
        } catch (error) {
            console.log('error while saveRecord main', error)
            reject(error);
        }
    })
}

function findOne(model, query) {
    return new Promise((resolve, reject) => {
        try {
            model.findOne(query).exec((err, result) => {
                if(err) {
                    console.log('error while findOne', err)
                    reject(err);
                } else {
                    resolve({success: true, data: result})
                }
            });
        } catch (error) {
            console.log('error while findOne main', error)
            reject(error);
        }
    })
}

function updateOneRecord(model, query, data) {
    return new Promise((resolve, reject) => {
        try {
            model.findOneAndUpdate(query, data, { new: true }).exec((err, result) => {
                if(err) {
                    console.log('err on updateOneRecord', err)
                    reject(err);
                } else {
                    resolve({success: true, data: result})
                }
            })
        } catch (error) {
            console.log('error while updateOneRecord main', error)
            reject(error);
        }
    })
}