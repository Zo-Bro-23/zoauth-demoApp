const zoauth = require('zoauth')
const express = zoauth.expressObject
const app = zoauth.expressApp

zoauth.runAuthServer(r => {
    console.log(r.data)
    zoauth.getDetails(r.company, r.data)
        .then(res => {
            if(r.company == 'github'){
                r.responseObject.redirect(`http://localhost:5210?${r.company}=${res.login}`)
            }else if(r.company == 'discord'){
                r.responseObject.redirect(`http://localhost:5210?${r.company}=${res.user.username}`)
            }else{
                r.responseObject.redirect(`http://localhost:5210?${r.company}=${res.name}`)
            }
        })
})
app.use('/', express.static(`${__dirname}/frontend/files/`))
app.get('/', (req, resp) => {
    resp.sendFile('/frontend/index.html', {root: __dirname})
})

module.exports = app