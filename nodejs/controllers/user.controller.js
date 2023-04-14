var app = require('../app')

function runSql(sql, response) {
    app.db.query(sql, function(error, data) {
        var returnData = {}

        if (error) {
            returnData.error = error
        } else {
            returnData.data = data
        }

        response.send(JSON.stringify(returnData))
    })
}

exports.list = function(request, response) {
    var sql = 'SELECT * FROM `buraityte-users`'

    runSql(sql, response)
}

exports.findUser = function(request, response) {
    var sql = 'SELECT * FROM `buraityte-users` WHERE id='+request.params.id

    runSql(sql, response)
}

exports.delete = function(request, response) {
    var sql = 'DELETE FROM `buraityte-users` WHERE id='+request.params.id;
    runSql(sql, response);
}

exports.update = function(request, response) {
    var {first_name, last_name, email} = request.body;

    var changeValues = '';

    if (first_name) {
        changeValues += `first_name="`+first_name+`"`
    }
    if (last_name) {
        changeValues += `last_name="`+last_name+`"`
    }
    if (email) {
        changeValues += `email="`+email+`"`
    }

    var sql = `UPDATE \`buraityte-users\` 
    SET `+changeValues+`
    WHERE id=`+request.params.id;

    runSql(sql, response)
}

exports.save = function(request, response) {
     var {first_name, last_name, email} = request.body;

     response.send(request.body)

    var sql = `
        INSERT INTO \`buraityte-users\`
        (first_name, last_name, email)
        VALUES("`+first_name+`","`+last_name+`","`+email+`")
    `

    runSql(sql, response)
}