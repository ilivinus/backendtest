const dd = {
    "org_name": "Paradise Island",
    "daughters": [
        {
            "org_name": "Banana tree",
            "daughters": [
                {
                    "org_name": "Yellow Banana"
                },
                {
                    "org_name": "Brown Banana"
                },
                {
                    "org_name": "Black Banana"
                }
            ]
        },
        {
            "org_name": "Big banana tree",
            "daughters": [
                {
                    "org_name": "Yellow Banana"
                },
                {
                    "org_name": "Brown Banana"
                },
                {
                    "org_name": "Green Banana"
                },
                {
                    "org_name": "Black Banana",
                    "daughters": [
                        {
                            "org_name": "Phoneutria Spider"
                        }
                    ]
                }
            ]
        }
    ]
}
const list  = []
function listRelationship(relation,parent) {
    for (const property of relation) {
        list.push({parent: parent,child: property["org_name"]});
        if(property["daughters"]){
            listRelationship(property["daughters"],property["org_name"])
        }
    }

}
listRelationship([dd],null)
console.log(list,"####")