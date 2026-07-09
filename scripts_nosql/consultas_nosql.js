use("venture_capital")
// 1. Análisis de control de mando de los fundadores (Founders Equity)
db.startups.aggregate([
    { $match: { status: "active", "reviews.0": { $exists: true } } }, // startups minimo 1 reseña
    { $unwind: "$reviews" },
    { $group: {
        _id: "$name",
        calificacionPromedio: { $avg: "$reviews.rating" },
        totalResenas: { $sum: 1 }
    }},
    { $match: { calificacionPromedio: { $gte: 4 } } } // Solo las que promedian 4 o más
])


use("venture_capital")
// 2. Campañas con alta velocidad de recaudación
db.startups.find(
    {
        status: "active",
        founders: { 
            $elemMatch: { 
                role: "CEO", 
                equitySharePct: { $lt: NumberDecimal("50.00") } 
            } 
        }
    },
    { name: 1, industry: 1, "founders.fullName": 1, "founders.equitySharePct": 1, _id: 0 }
)


use("venture_capital")
// 3. Descubrimiento de Campañas por Nicho (Filtro Tags)
db.fundingCampaigns.find(
    {
        status: "active",
        $expr: {
            $gte: [
                "$amountRaised", 
                { $multiply: ["$fundingGoal", 0.8] }
            ]
        }
    },
    { title: 1, amountRaised: 1, fundingGoal: 1, startup: 1, _id: 0 }
)


use("venture_capital")
// 4. Análisis de Reputación Promedio 
db.fundingCampaigns.find(
    {
        status: "active",
        "tags.tagName": { $all: ["B2B", "SaaS"] }
    },
    { title: 1, "startup.name": 1, tags: 1, minInvestment: 1, _id: 0 }
)


use("venture_capital")
// 5. Comparativa de valoración por tipo de industria
db.startups.aggregate([
    { $match: { status: "active", "reviews.0": { $exists: true } } }, 
    { $unwind: "$reviews" },
    { $group: {
        _id: "$name",
        calificacionPromedio: { $avg: "$reviews.rating" },
        totalResenas: { $sum: 1 }
    }},
    { $match: { calificacionPromedio: { $gte: 4 } } } 
])

use("venture_capital")
// 6. Seguimiento de hitos atrasados
db.startups.find(
    {
        status: "active",
        milestones: {
            $elemMatch: {
                status: { $in: ["pending", "in_progress"] },
                targetDate: { $lt: new Date() } // Fecha objetivo en el pasado
            }
        }
    },
    { name: 1, "milestones.title": 1, "milestones.status": 1, "milestones.targetDate": 1, _id: 0 }
)


use("venture_capital")
// 7. Segmentación de perfiles de inversores clave
db.investors.find(
    {
        isVerified: true,
        isActive: true,
        investorType: { $in: ["angel", "institutional"] },
        riskProfile: "aggressive"
    },
    { fullName: 1, email: 1, phone: 1, country: 1, _id: 0 }
)



use("venture_capital")
// 8. Startups con alto potencial de rentabilidad
db.investors.find(
    {
        isVerified: true,
        isActive: true,
        investorType: { $in: ["angel", "institutional"] },
        riskProfile: "aggressive"
    },
    { fullName: 1, email: 1, phone: 1, country: 1, _id: 0 }
)




use("venture_capital")
// 9. Selección de testimonios destacados de clientes
db.startups.aggregate([
    { $unwind: "$reviews" },
    { $match: { 
        "reviews.isPublic": true, 
        "reviews.rating": 5 
    }},
    { $project: {
        _id: 0,
        startupName: "$name",
        investorId: "$reviews.investorId",
        comentario: "$reviews.reviewText",
        fecha: "$reviews.createdAt"
    }}
])



use("venture_capital")
// 10. Detección de campañas financieras finalizadas
db.fundingCampaigns.find(
    {
        status: "active",
        endDate: { $lt: new Date() }
    },
    { fundingCampaignId: 1, title: 1, endDate: 1, _id: 0 }
)