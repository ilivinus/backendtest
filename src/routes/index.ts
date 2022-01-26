import express from 'express';
import {organisation} from '../controllers';
import {validator} from '../utils';
const router = express.Router();


router.get('/',validator.validateGetReq,organisation.queryOrganisation);
router.post('/',validator.validatePostReq,organisation.createOrganisation)
export default router;
