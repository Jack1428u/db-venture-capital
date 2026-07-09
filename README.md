¿Qué es NovaSeed?

NovaSeed es una plataforma fintech peruana que democratiza el acceso al capital semilla
. Conectamos startups tecnológicas en etapa inicial con inversores individuales, permitiendo la compraventa segura y estructurada de fracciones de participación empresarial (equity)
.

✨ Características Principales
Campañas de Fondeo: Creación de metas de inversión con un porcentaje claro de equity a ofrecer
.

Microinversiones Accesibles: Gestión de shares y transacciones a través de billeteras digitales
.

Retorno Transparente: Cálculo y distribución automatizada de dividendos basados en reportes de ingresos auditados
.

Trazabilidad Continua: Sistema de puntajes de confianza e hitos de progreso demostrables
.

🗄️ Arquitectura de Base de Datos


El sistema utiliza un enfoque híbrido optimizado y normalizado hasta la Tercera Forma Normal (3FN) para garantizar rendimiento e integridad referencial
:

1. SQL Server (Relacional)
Propósito: Maneja el núcleo transaccional y financiero
.

Justificación: Elegido por su máxima seguridad, manejo de transacciones complejas y estricto control de integridad referencial
.

2. MongoDB (No Relacional)
Propósito: Gestiona el catálogo de visualización masiva (perfiles de startups, campañas e hitos)
.

Justificación: Destaca por su flexibilidad de esquemas BSON y escalabilidad horizontal (sharding).

Se aplican patrones de diseño Embedded (embebido) y Subset (subconjunto) para reducir latencia y evitar uniones (joins) costosas
.


## Integrantes

- Llontop Loro, Jhon Andersson  

- Molleda Vasquez, Jeremy Cash 

- Utrilla Fernández, Jack Gonzalo 
 
- Vilchez Valencia, Luis Angel 

- Yataco Vigo, Rodrigo David 

 


## Como usar el repositorio


### Organización de carpetas
| Carpeta | Descripción |
|---|---|
| `scripts_sql` | Scripts de carga y creación del modelo de datos relacional |
| `scripts_sql` | Scripts de creación y carga de datos del modelo no relacional |
