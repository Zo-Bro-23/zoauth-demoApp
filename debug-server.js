const zoauth = require('zoauth')
const app = zoauth.expressApp

app.get('/', (req, resp) => {
    resp.sendFile('index.html', { root: __dirname + '/frontend' })
})

zoauth.setCredentials({
    google: {
        redirect_uri: "http://localhost:5210/callback/google"
    },
    discord: {
        redirect_uri: "http://localhost:5210/callback/discord"
    },
    facebook: {
        redirect_uri: "http://localhost:5210/callback/facebook/"
    },
    microsoft: {
        redirect_uri: "http://localhost:5210/callback/microsoft/"
    },
    github: {
        redirect_uri: "http://localhost:5210/callback/github"
    },
    amazon: {
        redirect_uri: "http://localhost:5210/callback/amazon"
    }
})
zoauth.runAuthServer(r => {
    zoauth.getDetails(r.company, r.data)
        .then(res => {
            if (r.company == 'github') {
                r.responseObject.redirect(`http://localhost:5210?${r.company}=${res.login}`)
            } else if (r.company == 'discord') {
                r.responseObject.redirect(`http://localhost:5210?${r.company}=${res.user.username}`)
            } else {
                r.responseObject.redirect(`http://localhost:5210?${r.company}=${res.name}`)
            }
        }, err => {
            err.responseObject.redirect(`http://localhost:5210/${r.company}=${'An error occured. Please try again.'}`)
        })
})