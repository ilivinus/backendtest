export default function selectionQuery(
    org_name: string,
    page: number,
    pageSize: number
) {
    return `
    SELECT relationship_type, org_name FROM organisation org
	INNER JOIN
		(
			SELECT
            to_org as other_id,
			relationship_type as rel, CASE WHEN relationship_type = 'parent' THEN 'daughter' WHEN relationship_type = 'sister' THEN 'sister' ELSE '' END as relationship_type
            FROM relationship r JOIN organisation o ON r.from_org = o.id
            WHERE LOWER(o.org_name) = LOWER('${org_name}')
        UNION
            SELECT 
            from_org as other_id,
			relationship_type as rel, CASE WHEN relationship_type = 'parent' THEN 'parent' WHEN relationship_type = 'sister' THEN 'sister' ELSE '' END as relationship_type
            FROM relationship r JOIN organisation o ON r.to_org = o.id
            WHERE LOWER(o.org_name) = LOWER('${org_name}')
		) AS aux
	ON org.id = aux.other_id
	ORDER BY org.org_name ASC LIMIT ${pageSize} OFFSET ${page}
    `
}
