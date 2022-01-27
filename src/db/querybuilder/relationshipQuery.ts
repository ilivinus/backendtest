interface Daughter {
    org_name: string
    daughters?: Daughter[]
}

export default function buildRelationshipQuery(
    relation: Daughter,
    relationQuery: string[],
    orgQuery: string[]
) {
    const daughters = relation['daughters']
    const orgName = relation.org_name
    const query: string = buildOrgQuery(orgName)
    if (!orgQuery.includes(query)) {
        orgQuery.push(query)
    }
    if (daughters) {
        for (let idx = 0; idx < daughters.length; idx++) {
            for (let i = idx + 1; i < daughters.length; i++) {
                relationQuery.push(
                    buildSiblingInsertQuery(
                        daughters[idx].org_name,
                        daughters[i].org_name
                    )
                )
            }
            relationQuery.push(
                buildParentDaughterQuery(orgName, daughters[idx].org_name)
            )
            const organisationQuery: string = buildOrgQuery(
                daughters[idx].org_name
            )
            if (!orgQuery.includes(organisationQuery)) {
                orgQuery.push(organisationQuery)
            }
            if (daughters[idx].daughters) {
                buildRelationshipQuery(daughters[idx], relationQuery, orgQuery)
            }
        }
    }
    return orgQuery.concat(relationQuery)
}
function buildOrgQuery(orgName: string) {
    return `INSERT INTO organisation(org_name) VALUES('${orgName}');`
}
function buildParentDaughterQuery(from: string, to: string) {
    return `
        INSERT INTO relationship(from_org, to_org, relationship_type)
            SELECT p.id, d.id, 'parent'  FROM
                (SELECT id FROM organisation WHERE LOWER(org_name) = '${from.toLowerCase()}') p,
                (SELECT id FROM organisation WHERE LOWER(org_name) = '${to.toLowerCase()}') d;

    `
        .split('\n')
        .join('')
}
function buildSiblingInsertQuery(from: string, to: string) {
    return `
        INSERT INTO relationship(from_org,to_org,relationship_type)
            SELECT s1.id, s2.id, 'sister'  FROM 
                (SELECT id FROM organisation WHERE LOWER(org_name) = '${from.toLowerCase()}') s1,
                (SELECT id FROM organisation WHERE LOWER(org_name) = '${to.toLowerCase()}') s2;
    `
        .split('\n')
        .join('')
}
