import fs from 'fs'
import { utilService } from "./util.service.js";

const bugs = utilService.readJsonFile('data/bug.json')


export const BugService = {
    query
}

function query() {
   return Promise.resolve(bugs)
}

