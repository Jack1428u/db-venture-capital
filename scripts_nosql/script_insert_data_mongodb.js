use("venture_capital");

const startupId1 = new ObjectId();
const startupId2 = new ObjectId();
const adminId1 = new ObjectId();
const founderId1 = new ObjectId();
const founderId2 = new ObjectId();
const campaignId1 = new ObjectId();
const campaignId2 = new ObjectId();
const investorId1 = new ObjectId();
const investorId2 = new ObjectId();
const investorId3 = new ObjectId();


db.startups.insertMany([
    {
        startupId: startupId1,
        name: "EduCloud SaaS",
        description: "Plataforma SaaS B2B para la gestión operativa y académica de instituciones educativas.",
        industry: "EdTech",
        logoUrl: "https://educloud.pe/logo.png",
        websiteUrl: "https://educloud.pe",
        foundingYear: 2023,
        totalValuation: NumberDecimal("500000.00"),
        status: "active",
        createdAt: new Date("2025-09-01T00:00:00Z"),
        admin: {
            adminId: adminId1
        },
        founders: [
            {
                founderId: founderId1,
                fullName: "Carlos Mendoza Ríos",
                role: "CEO",
                equitySharePct: NumberDecimal("60.00")
            }
        ],
        milestones: [
            {
                milestoneId: new ObjectId(),
                title: "MVP lanzado en producción",
                description: "Despliegue del producto inicial con funcionalidades core para colegios.",
                targetDate: new Date("2026-03-01T00:00:00Z"),
                completedDate: new Date("2026-03-01T00:00:00Z"),
                status: "completed",
                evidenceUrl: "https://educloud.pe/releases/mvp",
                category: "Product"
            },
            {
                milestoneId: new ObjectId(),
                title: "Alcanzar 100 instituciones registradas",
                description: "Meta de adquisición de clientes en etapa temprana.",
                targetDate: new Date("2026-06-30T00:00:00Z"),
                completedDate: null,
                status: "in_progress",
                evidenceUrl: "",
                category: "Growth"
            }
        ],
        reviews: [
            {
                reviewId: new ObjectId(),
                investorId: investorId1,
                rating: 5,
                reviewText: "Equipo sólido, producto con alta demanda en el sector educativo.",
                isPublic: true,
                createdAt: new Date("2026-04-10T00:00:00Z")
            },
            {
                reviewId: new ObjectId(),
                investorId: investorId2,
                rating: 4,
                reviewText: "Buen modelo de negocio, esperando ver tracción en más regiones.",
                isPublic: true,
                createdAt: new Date("2026-05-05T00:00:00Z")
            }
        ]
    },
    {
        startupId: startupId2,
        name: "MarketB2B",
        description: "Marketplace mayorista que conecta a proveedores y minoristas en tiempo real.",
        industry: "B2B",
        logoUrl: "https://marketb2b.com/logo.png",
        websiteUrl: "https://marketb2b.com",
        foundingYear: 2024,
        totalValuation: NumberDecimal("350000.00"),
        status: "active",
        createdAt: new Date("2024-11-15T00:00:00Z"),
        admin: {
            adminId: adminId1
        },
        founders: [
            {
                founderId: founderId2,
                fullName: "Valeria Torres Guzmán",
                role: "CTO",
                equitySharePct: NumberDecimal("55.00")
            }
        ],
        milestones: [
            {
                milestoneId: new ObjectId(),
                title: "Integración con API de proveedores",
                description: "Sincronización de inventarios automatizada.",
                targetDate: new Date("2026-07-15T00:00:00Z"),
                completedDate: null,
                status: "pending",
                evidenceUrl: "",
                category: "Technology"
            }
        ],
        reviews: [
            {
                reviewId: new ObjectId(),
                investorId: investorId2,
                rating: 4,
                reviewText: "Gran potencial en el mercado B2B latinoamericano.",
                isPublic: true,
                createdAt: new Date("2026-06-20T00:00:00Z")
            }
        ]
    }
]);

db.fundingCampaigns.insertMany([
    {
        fundingCampaignId: campaignId1,
        title: "EduCloud — Ronda Semilla",
        fundingGoal: NumberDecimal("100000.00"),
        amountRaised: NumberDecimal("45000.00"),
        equityOfferedPct: NumberDecimal("15.00"),
        startDate: new Date("2026-01-15T00:00:00Z"),
        endDate: new Date("2026-06-15T00:00:00Z"),
        minInvestment: NumberDecimal("500.00"),
        status: "active",
        dividendSharePct: NumberDecimal("10.00"),
        startup: {
            startupId: startupId1,
            name: "EduCloud SaaS"
        },
        tags: [
            { tagId: new ObjectId(), tagName: "EdTech", category: "Sector" },
            { tagId: new ObjectId(), tagName: "SaaS", category: "Business Model" }
        ]
    },
    {
        fundingCampaignId: campaignId2,
        title: "MarketB2B — Serie A",
        fundingGoal: NumberDecimal("200000.00"),
        amountRaised: NumberDecimal("120000.00"),
        equityOfferedPct: NumberDecimal("20.00"),
        startDate: new Date("2026-02-01T00:00:00Z"),
        endDate: new Date("2026-07-01T00:00:00Z"),
        minInvestment: NumberDecimal("1000.00"),
        status: "active",
        dividendSharePct: NumberDecimal("15.00"),
        startup: {
            startupId: startupId2,
            name: "MarketB2B"
        },
        tags: [
            { tagId: new ObjectId(), tagName: "B2B", category: "Sector" },
            { tagId: new ObjectId(), tagName: "Marketplace", category: "Business Model" }
        ]
    }
]);

db.investors.insertMany([
    {
        investorId: investorId1,
        fullName: "Marco Delgado Fuentes",
        email: "marco.delgado@invest.pe",
        phone: "+51999888777",
        country: "Peru",
        investorType: "retail",
        riskProfile: "moderate",
        isVerified: true,
        isActive: true
    },
    {
        investorId: investorId2,
        fullName: "Sofía Quispe Vargas",
        email: "sofia.quispe@capital.pe",
        phone: "+51999666555",
        country: "Peru",
        investorType: "retail",
        riskProfile: "aggressive",
        isVerified: true,
        isActive: true
    },
    {
        investorId: investorId3,
        fullName: "Luis Paredes Castro",
        email: "luis.paredes@angel.pe",
        phone: "+51999444333",
        country: "Peru",
        investorType: "angel",
        riskProfile: "high",
        isVerified: false,
        isActive: true
    }
]);