// refactorizado: 08/07/2025
use("venture_capital");

// Startups: fundadores, hitos y reseñas. (info unificada)
db.createCollection("startups", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "startups",
            "required": [
                "startupId", "name", "description", "industry", "logoUrl", 
                "websiteUrl", "totalValuation", "status", "createdAt", 
                "admin", "founders", "milestones", "reviews"
            ],
            "additionalProperties": false,
            "properties": {
                "_id": { "bsonType": "objectId" },
                "startupId": { 
                    "bsonType": "objectId",
                    "description": "Debe coincidir con el identificador único mapeado desde SQL Server"
                },
                "name": { "bsonType": "string" },
                "description": { "bsonType": "string" },
                "industry": { "bsonType": "string" },
                "logoUrl": { "bsonType": "string" },
                "websiteUrl": { "bsonType": "string" },
                "foundingYear": { "bsonType": ["int", "null"] },
                "totalValuation": { 
                    "bsonType": "decimal",
                    "description": "Representación Decimal128 puramente informativa para el catálogo web"
                },
                "status": { "bsonType": "string" },
                "createdAt": { "bsonType": "date" },
                "admin": {
                    "bsonType": "object",
                    "required": ["adminId"],
                    "additionalProperties": false,
                    "properties": {
                        "adminId": { "bsonType": "objectId" }
                    }
                },
                "founders": {
                    "bsonType": "array",
                    "description": "Información de perfil de los cofundadores. Relación acotada.",
                    "items": {
                        "bsonType": "object",
                        "required": ["founderId", "fullName", "role", "equitySharePct"],
                        "additionalProperties": false,
                        "properties": {
                            "founderId": { "bsonType": "objectId" },
                            "fullName": { "bsonType": "string" },
                            "role": { "bsonType": "string" },
                            "equitySharePct": { "bsonType": "decimal" }
                        }
                    }
                },
                "milestones": {
                    "bsonType": "array",
                    "description": "Roadmap e hitos alcanzados por la startup para generar confianza pública.",
                    "items": {
                        "bsonType": "object",
                        "required": ["milestoneId", "title", "description", "targetDate", "status", "category"],
                        "additionalProperties": false,
                        "properties": {
                            "milestoneId": { "bsonType": "objectId" },
                            "title": { "bsonType": "string" },
                            "description": { "bsonType": "string" },
                            "targetDate": { "bsonType": "date" },
                            "completedDate": { "bsonType": ["date", "null"] },
                            "status": { "bsonType": "string" },
                            "evidenceUrl": { "bsonType": "string" },
                            "category": { "bsonType": "string" }
                        }
                    }
                },
                "reviews": {
                    "bsonType": "array",
                    "description": "Reseñas y puntuaciones históricas otorgadas por los inversionistas.",
                    "items": {
                        "bsonType": "object",
                        "required": ["reviewId", "investorId", "rating", "reviewText", "isPublic", "createdAt"],
                        "additionalProperties": false,
                        "properties": {
                            "reviewId": { "bsonType": "objectId" },
                            "investorId": { "bsonType": "objectId" },
                            "rating": { 
                                "bsonType": "int",
                                "description": "Equivalente al tinyint (1 a 5) definido en el modelo lógico original" 
                            },
                            "reviewText": { "bsonType": "string" },
                            "isPublic": { "bsonType": "bool" },
                            "createdAt": { "bsonType": "date" }
                        }
                    }
                }
            }
        }
    },
    "validationLevel": "strict",
    "validationAction": "error"
});

db.createCollection("fundingCampaigns", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "fundingCampaigns",
            "required": [
                "fundingCampaignId", "startup", "title", "fundingGoal", 
                "amountRaised", "equityOfferedPct", "startDate", "endDate", 
                "minInvestment", "status", "dividendSharePct", "tags"
            ],
            "additionalProperties": false,
            "properties": {
                "_id": { "bsonType": "objectId" },
                "fundingCampaignId": { "bsonType": "objectId" },
                "title": { "bsonType": "string" },
                "fundingGoal": { "bsonType": "decimal" },
                "amountRaised": { 
                    "bsonType": "decimal",
                    "description": "Monto acumulado. Espejo de lectura de SQL Server para evitar sobreventas de equity."
                },
                "equityOfferedPct": { "bsonType": "decimal" },
                "startDate": { "bsonType": "date" },
                "endDate": { "bsonType": "date" },
                "minInvestment": { "bsonType": "decimal" },
                "status": { "bsonType": "string" },
                "dividendSharePct": { "bsonType": "decimal" },
                "startup": {
                    "bsonType": "object",
                    "required": ["startupId", "name"],
                    "additionalProperties": false,
                    "properties": {
                        "startupId": { "bsonType": "objectId" },
                        "name": { 
                            "bsonType": "string",
                            "description": "Dato desnormalizado (patrón Subset) para renderizar el feed sin hacer $lookup"
                        }
                    }
                },
                "tags": {
                    "bsonType": "array",
                    "description": "Clasificación de industrias y tecnologías de la campaña.",
                    "items": {
                        "bsonType": "object",
                        "required": ["tagId", "tagName", "category"],
                        "additionalProperties": false,
                        "properties": {
                            "tagId": { "bsonType": "objectId" },
                            "tagName": { "bsonType": "string" },
                            "category": { "bsonType": "string" }
                        }
                    }
                }
            }
        }
    },
    "validationLevel": "strict",
    "validationAction": "error"
});

// Manejo únicamente información de perfil para el Login, búsquedas y segmentación de UI.
db.createCollection("investors", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "investors",
            "required": ["investorId", "fullName", "email", "country", "investorType", "isVerified", "isActive"],
            "additionalProperties": false,
            "properties": {
                "_id": { "bsonType": "objectId" },
                "investorId": { "bsonType": "objectId" },
                "fullName": { "bsonType": "string" },
                "email": { "bsonType": "string" },
                "phone": { "bsonType": "string" },
                "country": { "bsonType": "string" },
                "investorType": { "bsonType": "string" },
                "riskProfile": { "bsonType": ["string", "null"] },
                "isVerified": { "bsonType": "bool" },
                "isActive": { "bsonType": "bool" }
            }
        }
    },
    "validationLevel": "strict",
    "validationAction": "error"
});


// NOTA: las relaciones
// Las relaciones descritas a continuación representan 
// los vínculos entre colecciones para el renderizado de diagramas ER en MongoDB Compass


// "relationships": [
//     {
//       "id": "8014cda5-382f-4ab0-96bc-ad0318366e90",
//       "relationship": [
//         {
//           "ns": "venture_capital_final.fundingCampaigns",
//           "cardinality": 1,
//           "fields": [
//             "startup"
//           ]
//         },
//         {
//           "ns": "venture_capital_final.startups",
//           "cardinality": null,
//           "fields": [
//             "_id"
//           ]
//         }
//       ],
//       "isInferred": false
//     }
// ]