const zoauth = require('zoauth')
const app = zoauth.expressApp

zoauth.setCredentials({
    google: {
        redirect_uri: "https://demo.zoauth.zohan.tech/callback/google"
    },
    discord: {
        redirect_uri: "https://demo.zoauth.zohan.tech/callback/discord"
    },
    facebook: {
        redirect_uri: "https://demo.zoauth.zohan.tech/callback/facebook/"
    },
    microsoft: {
        redirect_uri: "https://demo.zoauth.zohan.tech/callback/microsoft/"
    },
    github: {
        redirect_uri: "https://demo.zoauth.zohan.tech/callback/github"
    },
    amazon: {
        redirect_uri: "https://demo.zoauth.zohan.tech/callback/amazon"
    }
})
zoauth.runAuthServer(r => {
    console.log(r.data)
    zoauth.getDetails(r.company, r.data)
        .then(res => {
            if (r.company == 'github') {
                r.responseObject.redirect(`https://demo.zoauth.zohan.tech?${r.company}=${res.login}`)
            } else if (r.company == 'discord') {
                r.responseObject.redirect(`https://demo.zoauth.zohan.tech?${r.company}=${res.user.username}`)
            } else {
                r.responseObject.redirect(`https://demo.zoauth.zohan.tech?${r.company}=${res.name}`)
            }
        }, err => {
            err.responseObject.redirect(`https://demo.zoauth.zohan.tech/${r.company}=${'An error occured. Please try again.'}`)
        })
})

module.exports = app