import { Model, DataType, Optional, DataTypes } from 'sequelize';
import sequelize from './connection';

/*
========================================================
Organisation Model
========================================================
*/
interface OrganisationAttributes {
    id: number,
    org_name: string,
}

interface OrganisationCreationAttributes extends Optional<OrganisationAttributes, "id"> { }

export class Organisation extends Model<OrganisationAttributes, OrganisationCreationAttributes>
    implements OrganisationAttributes {
    declare id: number;
    declare org_name: string;
}

Organisation.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    org_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'organisation',
    createdAt: false,
    updatedAt:false,
    sequelize
})
/*
============================================================
Parent child daughter relation
============================================================
*/

interface RelationAttribute {
    id: number,
    relationship_type: string,
    from_org: number,
    to_org: number
}
interface RelationCreationAttribute extends Optional<RelationAttribute, "id" | "from_org"> { }
export class Relationship extends Model<RelationAttribute, RelationCreationAttribute>
    implements RelationAttribute {
    declare id: number;
    declare relationship_type: string;
    declare from_org: number;
    declare to_org: number;
}
Relationship.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    relationship_type: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    from_org: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    to_org: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: 'relationship',
    createdAt: false,
    updatedAt: false,
    sequelize
})