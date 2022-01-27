import { Relationship, Organisation } from './models'

const dbInit = () => Promise.all([Relationship.sync(), Organisation.sync()])
export default dbInit
