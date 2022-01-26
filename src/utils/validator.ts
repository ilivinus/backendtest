import express from 'express';

export function validateGetReq(req: express.Request, res: express.Response, next: express.NextFunction) {
    //page,pageSize,name
    let isValid = true;
    let errorMessage = ''
    if (!Object.keys(req.query).length) {
        isValid = false;
        errorMessage += "No query input supplied"
    }
    if (!req.query.hasOwnProperty('name')) {
        isValid = false;
        errorMessage += "query [name] missing"
    }
    if (!req.query.hasOwnProperty('page')
        && !isNaN(parseInt(req.query.page as string))) {
        isValid = false;
        errorMessage += "query [page] missing"
    }
    if (!req.query.hasOwnProperty('pageSize')
        && !isNaN(parseInt(req.query.page as string))) {
        isValid = false;
        errorMessage += "query [pageSize] missing"
    }
    if (!isValid) res.status(400).json({ error: errorMessage });
    next();
}

export function validatePostReq(req: express.Request, res: express.Response, next: express.NextFunction) {
    let isValid = true;
    let errorMessage = ''
    if (!req.body && typeof req.body !== 'object') {
        isValid = false;
        errorMessage += 'invalid object format';
    }
    if (!req.body.hasOwnProperty('org_name')) {
        isValid = false;
        errorMessage += 'input is invalid';
    }
    if (!isValid) res.status(400).json({ error: errorMessage })
    next();
}

export default { validateGetReq, validatePostReq }