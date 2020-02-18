## fofifa_app_back

# endpoint: 
/api

# queries:

login(username: String!, password: String!): AUTHPAYLOAD,

descentes:[DESCENTE],
lieux:[LIEU],
missions:[MISSION]

# mutations: 

newUser(groupe: GROUP,userInfo: userInfo, loginInfo: loginInfo): USER,

addLieu(region: String!, district:String!) : LIEU,
updateLieu(IdLieu: ID,region: String!, district:String!) : LIEU,

addDescente( dateDescente: String!, description: String!): DESCENTE,
updateDescente(IdDescente: ID! ,dateDescente: String, description: String): DESCENTE,

addMission(commune: String, fokotany: String, village: String, IdDescente: ID, IdLieu: ID): MISSION,
updateMission(IdMission:ID ,commune: String, fokotany: String, village: String, IdDescente: ID, IdLieu: ID): MISSION