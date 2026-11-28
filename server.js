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

app.get('/api/bug/save', (req, res) => {
    const bugToSave = {
        _id: req.query._id,
        title: req.query.title,
        description: req.query.description,
        severity: +req.query.severity
    }
    BugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bug')

        })
})



app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    BugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            loggerService.error('Cannot get bug', err)
            res.status(400).send('Cannot get bug')
        })
})


app.get('/api/bug/:bugId/remove', (req, res) => {
    const { bugId } = req.params
    BugService.remove(bugId)
        .then(() => res.send(`Bug removed successfully - ${bugId}`))
        .catch(err => {
            loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })

})



app.listen(3030, () => loggerService.info('Server ready at port 3030'))