import express from 'express'
import { organisation } from '../controllers'
import { validator } from '../utils'
const router = express.Router()

router.get('/', validator.validateGetReq, organisation.queryOrganisation)
router.post('/', validator.validatePostReq, organisation.createOrganisation)
router.get('/cleardb', organisation.databaseClear)

export default router
