import express from 'express';
import sequelize from '../db/connection';
import { buildRelationshipQuery, selectionQuery } from '../db/querybuilder';
interface Fakerr {
  relationship_type: string;
  org_name: string
}
async function queryOrganisation(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {

    const page = parseInt(req.query.page as string) - 1
    const reqPageSize = parseInt(req.query.pageSize as string);
    const pageSize = reqPageSize > 100 ? 100 : reqPageSize;

    const query: string = selectionQuery(req.query.name as string, page, pageSize);
    const [relationships,_] = await sequelize.query(query);

    res.status(200).json(relationships)
  } catch (err: any) {
    next(err)
  } finally {
    res.sendStatus(200);
    await sequelize.close()
  }
}
async function createOrganisation(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {

    const list: string[] = buildRelationshipQuery(req.body, [], [])
    await sequelize.query(list.join(''), { raw: true })
    res.sendStatus(200);
  } catch (err: any) {
    next(err)
  }
}
export default { queryOrganisation, createOrganisation };
