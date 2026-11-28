import express from 'express'
import { BugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

app.get('/api/bug', (req, res) => {
    BugService.query()
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.error('Cannot get bugs', err)
            res.status(400).send('Cannot load bugs')
        })
})


app.listen(3030, () =>  loggerService.info('Server ready at port 3030'))