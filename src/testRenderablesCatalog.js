const testData = {
    "Files": [],
    "Subjects": [
        {
            "Name": "CORPORATION INC",
            "Entity": {
                "Scheme": "http://www.website.com",
                "CharData": "0001445305"
            }
        }
    ],
    "RelationshipSets": [
        {
            "Title": "0001001 - Document - Cover Page",
            "RoleURI": "http://www.website.com/role/CoverPage"
        },
        {
            "Title": "1001002 - Statement - CONDENSED CONSOLIDATED BALANCE SHEETS",
            "RoleURI": "http://www.website.com/role/CONDENSEDCONSOLIDATEDBALANCESHEETS"
        },
        {
            "Title": "1002003 - Statement - CONDENSED CONSOLIDATED BALANCE SHEETS (Parenthetical)",
            "RoleURI": "http://www.website.com/role/CONDENSEDCONSOLIDATEDBALANCESHEETSParenthetical"
        }
    ],
    "Networks": {
        "http://www.website.com/0001445305": {
            "http://www.website.com/role/CoverPage": "5411897514fwe894984few8915wfe",
            "http://www.website.com/role/CONDENSEDCONSOLIDATEDBALANCESHEETS": "883459b49fae34a739704b6db51d6b1d",
            "http://www.website.com/role/CONDENSEDCONSOLIDATEDBALANCESHEETSParenthetical": "1d2ec03fda1e440ad6d6f7953aaa2967"
        }
    }
};

export default testData;