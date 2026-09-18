/*
  Contenido editable del sitio. Todo lo que en Claude Design era una "prop"
  (métricas, contacto, links) vive acá para no tocar los componentes.
*/

export const contact = {
  email: 'hello@dappsfactory.com',
  linkedin: 'https://es.linkedin.com/company/dappsfactory',
  instagram: 'https://www.instagram.com/dappsfactory/',
  whatsapp:
    'https://api.whatsapp.com/send/?phone=5491151658509&text=Hola%2C+me+interesa+conocer+m%C3%A1s+sobre+DAppsFactory&type=phone_number&app_absent=0',
  // Formulario del CRM (LeadConnector / GoHighLevel) embebido en /contacto.
  crmFormId: 'rrZtffYMYXrbz5Hwmwqh',
};

// Todos los "Agendar" del sitio van a la página de contacto.
export const agendaHref = '/contacto/';

// ---- Clientes y proyectos (portfolio) ---------------------------------------
// Tomados del sitio anterior (dappsfactory.io/#clientes), reescritos en el tono
// nuevo. Orden: primero lo más cercano al posicionamiento actual (tokenización,
// bancos, cumplimiento). `logo` es un archivo en public/logos/; si falta, la
// tarjeta muestra el nombre del cliente como wordmark.
export type Project = {
  client: string;
  title: string;
  year?: string;
  text: string;
  tags: string[];
  href?: string;
  logo?: string;
};

export const portfolio = {
  eyebrow: 'Clientes y proyectos',
  title: 'Proyectos que ya están operando.',
  lead: 'Una selección de lo que construimos en los últimos años para bancos, fintechs, desarrolladoras y empresas de la región.',
};

export const projects: Project[] = [
  {
    client: 'NYBANQ',
    title: 'Neobanco corporativo con cuentas en USD y USDC',
    // year: pendiente de confirmar
    text: 'Plataforma para empresas de EE. UU. e instituciones reguladas: cuentas business con ACH, wire y FedWire, pagos internacionales, tarjetas, y rieles de stablecoins con on/off ramp y custodia de activos digitales.',
    tags: ['Wallet Fiat + Cripto', 'Stablecoins', 'Pagos'],
    href: 'https://nybanq.com/',
  },
  {
    client: 'Metro Futuro',
    logo: '/logos/metro-futuro.png',
    title: 'Plataforma de tokenización inmobiliaria',
    year: '2024',
    text: 'Compra y venta de tokens vinculados a bienes raíces sobre el estándar ERC-3643: inversión inmobiliaria fraccionada con trazabilidad de cada transacción.',
    tags: ['Tokenización', 'ERC-3643', 'Smart Contracts'],
    href: 'https://www.metro-futuro.com/',
  },
  {
    client: 'Banco Galicia',
    logo: '/logos/banco-galicia.png',
    title: 'POATs: certificados de asistencia en blockchain',
    year: '2023',
    text: 'Plataforma para emitir NFTs como prueba de participación en eventos y capacitaciones, reclamables por colaboradores y clientes del banco.',
    tags: ['NFTs', 'Plataforma web'],
    href: 'https://opensea.io/es/collection/galicia-certificates/',
  },
  {
    client: 'Galicia Seguros',
    logo: '/logos/galicia-seguros.png',
    title: 'Gestión de pólizas y reclamos con evidencia inalterable',
    year: '2023',
    text: 'Solución premiada en el hackathon Techrevolution: gestión de pólizas, consultas con IA y reclamos con imágenes registradas en blockchain.',
    tags: ['Blockchain', 'IA', 'Time stamping'],
  },
  {
    client: 'Certify Forever',
    logo: '/logos/certify-forever.png',
    title: 'Certificados y documentos verificables',
    year: '2023',
    text: 'Producto propio de DAppsFactory para almacenar y verificar certificados, diplomas y documentos en blockchain, a prueba de falsificaciones y alteraciones.',
    tags: ['Producto propio', 'Certificados digitales'],
    href: 'https://www.certifyforever.com/',
  },
  {
    client: 'MB&L',
    title: 'Credenciales académicas en blockchain',
    year: '2023',
    text: 'Certificados digitales seguros, portables y verificables para estudiantes, con metadatos que enriquecen cada credencial y agilizan su validación.',
    tags: ['Certificados digitales', 'Plataforma web'],
    href: 'https://mbyl.net/',
  },
  {
    client: 'Trazor ID',
    logo: '/logos/trazor-id.png',
    title: 'Trazabilidad ambiental para embalajes',
    year: '2023',
    text: 'APIs para registrar en blockchain los certificados de impacto ambiental de la cadena de valor del embalaje, con control fiable del cumplimiento sostenible.',
    tags: ['APIs', 'Trazabilidad', 'ESG'],
  },
  {
    client: 'ERC-6551 Visualizer',
    logo: '/logos/erc-6551-visualizer.png',
    title: 'Visualizador de jerarquías de NFTs',
    year: '2023',
    text: 'Herramienta que muestra en forma de árbol las relaciones entre NFTs con cuentas vinculadas (ERC-6551), en niveles primarios y secundarios.',
    tags: ['Web3', 'Diseño'],
    href: 'https://6551visualizer.com/',
  },
  {
    client: 'DTC',
    logo: '/logos/dtc.png',
    title: 'Marketplace de tarjetas coleccionables digitales',
    year: '2022',
    text: 'Compra, venta e intercambio de tarjetas digitales con propiedad garantizada por smart contracts, entrada y salida con tarjeta de crédito y regalías para creadores.',
    tags: ['Marketplace', 'NFTs', 'Smart Contracts'],
    href: 'https://www.digitaltradingcards.com/',
  },
  {
    client: 'Piece of Cake',
    logo: '/logos/piece-of-cake.png',
    title: 'Wallet de NFTs para usuarios no cripto',
    year: '2023',
    text: 'Creación, envío y recepción de NFTs por QR o email, con login social y sin necesidad de instalar una aplicación.',
    tags: ['Wallet', 'NFTs'],
    href: 'https://www.pieceofcakewallet.com/',
  },
  {
    client: 'Perception Face',
    logo: '/logos/perception-face.png',
    title: 'Marketplace social con pagos fiat y cripto',
    year: '2023',
    text: 'Compra y venta de artículos con tarjeta, Apple Pay, Google Pay o criptomonedas, programa de lealtad y colecciones con impacto social.',
    tags: ['Marketplace', 'Pagos', 'NFTs'],
    href: 'http://www.perceptionface.com',
  },
];

// Franja de logos debajo del hero: los mismos clientes del portfolio.
export const clients = projects.map((p) => ({ name: p.client, src: p.logo }));


// Links absolutos (/#id) para que funcionen también desde /blog y /contacto.
// "Casos" salió del nav para hacerle lugar a Blog y Contacto; sigue
// en el footer.
export const navLinks = [
  { href: '/#soluciones', label: 'Soluciones' },
  { href: '/#proceso', label: 'Cómo trabajamos' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#seguridad', label: 'Seguridad' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contacto/', label: 'Contacto' },
];

// Pendiente del handoff: URLs reales de las 3 páginas de servicio.
export const servicesSection = {
  eyebrow: 'Qué construimos',
  title: 'Cuatro capas. Un mismo sistema.',
  lead: 'Se contratan por separado. Funcionan mejor juntas.',
};

export const services = [
  {
    n: '01',
    name: 'Tokenización de activos',
    caption: 'Un activo entero se fracciona en participaciones idénticas, transferibles y trazables.',
    text:
      'Convertimos un activo real —un inmueble, una cartera de créditos, un fondo— en un instrumento digital que se emite, se transfiere y se liquida on-chain. Con la estructura legal y el registro que tu regulador espera ver.',
    link: { href: '/servicios/tokenizacion-de-activos/', label: 'Ver tokenización de activos' },
  },
  {
    n: '02',
    name: 'Wallets Fiat + Cripto',
    caption: 'Dos flujos de dinero —pesos y cripto— convergen en una sola cuenta.',
    text:
      'Una sola billetera donde conviven pesos, dólares y stablecoins. Onboarding con KYC, cuentas, transferencias y conversión — bajo tu marca y tus reglas de negocio.',
    link: { href: '#', label: 'Ver wallets fiat + cripto' },
  },
  {
    n: '03',
    name: 'Desarrollo Blockchain',
    caption: 'Una llamada emite el activo con sus reglas de cumplimiento adentro.',
    text:
      'Smart contracts auditados, integración con tu core y APIs que tu equipo puede mantener. Sin dependencia eterna del proveedor.',
    link: { href: '#', label: 'Ver desarrollo blockchain' },
  },
  {
    n: '04',
    name: 'Pagos masivos en cripto',
    caption: 'Cientos de transferencias de activos digitales, ejecutadas en una sola operación.',
    text:
      'Infraestructura de alta velocidad para ejecutar grandes volúmenes de pagos en cripto de forma automatizada: a usuarios, proveedores, partners o distribución de fondos. Gestión centralizada, sin procesos manuales ni tiempos operativos.',
    link: { href: '/contacto/', label: 'Quiero conocer la solución' },
  },
];

export const process = {
  eyebrow: 'Cómo trabajamos',
  title: 'Del piloto a producción: el verdadero desafío.',
  lead:
    'Un proyecto blockchain no termina cuando la tecnología funciona. El desafío comienza al integrarlo con sistemas existentes, validar su seguridad, definir modelos de custodia y garantizar una operación estable y escalable.',
};

export const processSteps = [
  {
    n: '01',
    color: '#8E71F5',
    title: 'Diagnóstico y arquitectura',
    text: 'Definimos qué se tokeniza, sobre qué infraestructura blockchain, qué modelo de custodia requiere y bajo qué marco operativo y regulatorio funcionará. El resultado es una arquitectura y un alcance claramente documentados.',
  },
  {
    n: '02',
    color: '#7973F6',
    title: 'Prueba de concepto',
    text: 'Implementamos un alcance acotado y medible para validar la viabilidad técnica y operativa de la solución antes de avanzar hacia una implementación completa.',
  },
  {
    n: '03',
    color: '#3296E3',
    title: 'Integración y auditoría',
    text: 'Integramos la solución con los sistemas existentes y realizamos las instancias de validación necesarias, incluyendo auditoría de Smart Contracts y pruebas de rendimiento y seguridad antes del despliegue.',
  },
  {
    n: '04',
    color: '#01C7C5',
    title: 'Producción y operación',
    text: 'Realizamos la puesta en producción con monitoreo, soporte y documentación técnica, preparando la solución para una operación segura, estable y sostenible en el tiempo.',
  },
];

export const archLayers = [
  { key: 'a', title: 'Tu negocio', sub: 'Core bancario · ERP · CRM · app' },
  { key: 'b', title: 'Capa DAppsFactory', sub: 'APIs · orquestación · custodia · KYC/AML · reporting' },
  { key: 'c', title: 'Redes', sub: 'Ethereum · Polygon · Base · redes permisionadas' },
];

export const casesSection = {
  eyebrow: 'Dónde se aplica',
  title: 'Casos de uso que llevamos a producción',
};

export const cases = [
  {
    n: '01',
    title: 'Tokenización de activos',
    text: 'Digitalizamos activos y derechos mediante tecnología blockchain, permitiendo su fraccionamiento, administración y trazabilidad de acuerdo con la estructura de cada proyecto.',
  },
  {
    n: '02',
    title: 'Activos y carteras de crédito on-chain',
    text: 'Representamos y gestionamos carteras, créditos y derechos económicos mediante infraestructura blockchain, incorporando registros verificables y trazabilidad entre los participantes.',
  },
  {
    n: '03',
    title: 'Wallet Fiat + Cripto White Label',
    text: 'Desarrollamos wallets de marca blanca para que empresas y Fintechs puedan ofrecer una experiencia propia integrando dinero fiat, stablecoins, cripto y activos tokenizados, conectada mediante APIs con la infraestructura necesaria.',
  },
  {
    n: '04',
    title: 'Liquidación y transferencias entre entidades',
    text: 'Desarrollamos infraestructura blockchain para optimizar transferencias y procesos de liquidación entre empresas o entidades, con trazabilidad e integración con los sistemas existentes.',
  },
];

export const security = {
  eyebrow: 'Lo que evalúan las áreas de riesgo y compliance',
  title: 'Infraestructura preparada para entornos empresariales y regulados.',
  lead:
    'Diseñamos cada solución considerando desde el inicio seguridad, custodia, identidad, trazabilidad y los requerimientos regulatorios aplicables al modelo de negocio.',
};

export const securityItems = [
  {
    icon: 'shield',
    title: 'Auditoría y seguridad de Smart Contracts',
    q: '¿Cómo se valida la seguridad del código?',
    a: 'La arquitectura contempla procesos de testing, revisión y auditoría de Smart Contracts según los requerimientos de cada implementación. Cuando el proyecto requiere una auditoría independiente, puede integrarse una firma especializada externa antes de la puesta en producción.',
  },
  {
    icon: 'key',
    title: 'Custodia',
    q: '¿Cómo se administran los activos y las claves?',
    a: 'Definimos la arquitectura de custodia según las necesidades del proyecto: autocustodia, esquemas multisig o MPC, o integración con proveedores especializados. El modelo se establece considerando seguridad, operación y regulación aplicable.',
  },
  {
    icon: 'user-check',
    title: 'KYC / AML',
    q: '¿Cómo se integra el cumplimiento al onboarding?',
    a: 'La plataforma puede integrar proveedores y procesos de identificación, validación y controles KYC/AML dentro del flujo operativo. Las políticas y obligaciones específicas se configuran de acuerdo con la actividad, jurisdicción y sujetos regulados que intervengan.',
  },
  {
    icon: 'file-search',
    title: 'Trazabilidad',
    q: '¿Cómo se auditan las operaciones?',
    a: 'La infraestructura permite mantener registros verificables y trazabilidad de las operaciones on-chain, complementados con la información necesaria de los sistemas integrados para facilitar procesos de control, reporting y auditoría.',
  },
  {
    icon: 'scale',
    title: 'Marco regulatorio',
    q: '¿Cómo se contempla la regulación?',
    a: 'La arquitectura se diseña considerando el marco aplicable a cada proyecto y jurisdicción. En Argentina, por ejemplo, pueden intervenir requisitos de la CNV, UIF o BCRA, dependiendo de la actividad y de los servicios ofrecidos. En proyectos regulados trabajamos junto con los asesores legales y de compliance del cliente para trasladar esos requerimientos a la solución tecnológica.',
  },
];

export const faq = {
  title: 'Preguntas que nos hacen antes de firmar.',
};

// Las primeras `faqVisible` se muestran de entrada (las que decide un comprador);
// el resto queda plegado detrás de "Ver más preguntas" pero sigue en la página
// para buscadores y para el FAQPage de schema.org.
export const faqVisible = 8;

export const faqs = [
  {
    q: '¿Qué tipos de activos se pueden tokenizar?',
    a: 'La tecnología permite representar digitalmente diferentes tipos de activos y derechos, incluyendo proyectos inmobiliarios, instrumentos financieros, activos productivos y otros Real World Assets (RWA). La estructura tecnológica y legal depende del activo, los derechos representados, los inversores objetivo y la jurisdicción.',
  },
  {
    q: '¿Cuál es la diferencia entre ERC-20 y ERC-3643?',
    a: 'ERC-20 es un estándar general para tokens fungibles. ERC-3643 incorpora una capa de identidad y reglas de cumplimiento que permite restringir transferencias según criterios previamente definidos. En DAppsFactory, ERC-3643 está disponible en proyectos Enterprise que requieren este nivel de control.',
  },
  {
    q: '¿Una plataforma de tokenización necesita autorización regulatoria?',
    a: 'Depende del activo, los derechos representados, la forma de comercialización, los participantes y la jurisdicción. La utilización de blockchain no determina por sí sola el tratamiento regulatorio. En proyectos regulados, DAppsFactory implementa tecnológicamente los requisitos definidos junto con los equipos legales y de compliance correspondientes.',
  },
  {
    q: '¿DAppsFactory ofrece soluciones de custodia de activos digitales?',
    a: 'DAppsFactory diseña e integra la arquitectura tecnológica de custodia según el proyecto. Puede contemplar autocustodia, multisig, MPC o integración con proveedores especializados de custodia. La alternativa adecuada depende de los requisitos operativos, de seguridad y regulatorios.',
  },
  {
    q: '¿Las soluciones blockchain pueden integrarse con sistemas existentes?',
    a: 'Sí. Una implementación empresarial puede conectarse con sistemas existentes como CRM, ERP, core financiero, plataformas de pagos, aplicaciones móviles, sistemas de identidad y herramientas de reporting mediante APIs y servicios de integración.',
  },
  {
    q: '¿Cuánto cuesta desarrollar una plataforma de tokenización?',
    a: 'El costo depende del alcance, las integraciones, el nivel de personalización y los requisitos regulatorios. DAppsFactory cuenta con alternativas para proyectos que necesitan una infraestructura base y desarrollos Enterprise para implementaciones de mayor complejidad.',
  },
  {
    q: '¿Cuánto tiempo lleva implementar un proyecto blockchain?',
    a: 'Depende del alcance y las integraciones requeridas. El proceso normalmente comprende diagnóstico y arquitectura, validación o prueba de concepto cuando corresponde, desarrollo e integración, testing y auditoría, y finalmente puesta en producción y soporte.',
  },
  {
    q: '¿Cómo empezar un proyecto de tokenización o Wallet Fiat + Cripto?',
    a: 'El primer paso es definir el caso de negocio, los activos o servicios que se quieren integrar, los usuarios objetivo, la jurisdicción y las integraciones necesarias. A partir de ese diagnóstico, DAppsFactory puede definir la arquitectura tecnológica y el alcance de implementación.',
  },
  {
    q: '¿Qué es DAppsFactory?',
    a: 'DAppsFactory es una empresa de desarrollo e infraestructura blockchain para empresas, Fintechs e instituciones financieras. Desarrollamos soluciones de tokenización de activos, Wallets Fiat + Cripto, Smart Contracts, integraciones blockchain y plataformas a medida.',
  },
  {
    q: '¿Qué empresa desarrolla plataformas de tokenización de activos en Argentina y Latinoamérica?',
    a: 'DAppsFactory desarrolla plataformas de tokenización para proyectos en Argentina y Latinoamérica. La infraestructura puede incluir emisión y administración de tokens, wallets, onboarding de inversores, KYC/AML, marketplace, pagos, reporting e integración con sistemas existentes, según las necesidades de cada proyecto.',
  },
  {
    q: '¿DAppsFactory desarrolla tokenización inmobiliaria?',
    a: 'Sí. DAppsFactory desarrolla infraestructura para proyectos de tokenización inmobiliaria, incluyendo fraccionamiento digital, gestión de inversores, wallets, distribución de activos y mercados secundarios cuando la estructura jurídica y regulatoria del proyecto lo permite.',
  },
  {
    q: '¿DAppsFactory utiliza ERC-3643 para tokenización?',
    a: 'Sí. Para proyectos Enterprise que requieren tokenización con controles de identidad y compliance, DAppsFactory puede implementar ERC-3643, un estándar diseñado para activos tokenizados que necesitan reglas de transferencia, gestión de inversores autorizados e identidad on-chain.',
  },
  {
    q: '¿DAppsFactory desarrolla Wallets Fiat + Cripto?',
    a: 'Sí. Desarrollamos Wallets Fiat + Cripto para empresas y Fintechs que necesitan integrar dinero tradicional y activos digitales dentro de una misma experiencia. Dependiendo del proyecto, pueden conectarse cuentas fiat, stablecoins, criptomonedas, activos tokenizados, pagos, identidad digital y otros servicios mediante APIs.',
  },
  {
    q: '¿Una Wallet Fiat + Cripto puede integrarse con bancos y proveedores de pagos?',
    a: 'Sí. La arquitectura puede diseñarse para integrarse mediante APIs con bancos, proveedores de pagos, servicios de custodia, exchanges, proveedores KYC/AML y otros componentes de la infraestructura financiera. Las integraciones disponibles dependen de los proveedores y de la jurisdicción donde opere el proyecto.',
  },
  {
    q: '¿DAppsFactory desarrolla soluciones blockchain a medida?',
    a: 'Sí. Además de las plataformas de tokenización y wallets, DAppsFactory desarrolla Smart Contracts, integraciones blockchain, sistemas de identidad digital, infraestructura Web3 y soluciones blockchain empresariales adaptadas a modelos de negocio específicos.',
  },
  {
    q: '¿DAppsFactory realiza auditorías de Smart Contracts?',
    a: 'Los proyectos contemplan procesos de testing y revisión de Smart Contracts. Cuando se requiere una auditoría independiente, la solución puede incorporar una auditoría realizada por una firma externa especializada antes de la puesta en producción.',
  },
  {
    q: '¿Cómo se gestiona el KYC y AML en una plataforma de tokenización?',
    a: 'La infraestructura puede integrar proveedores especializados de identidad, KYC/AML, screening y otros controles dentro del proceso de onboarding. Las reglas específicas dependen del modelo de negocio, la jurisdicción y las obligaciones regulatorias de las entidades que intervienen.',
  },
  {
    q: '¿DAppsFactory trabaja con bancos y Fintechs?',
    a: 'Sí. DAppsFactory forma parte de InnovAction Group y desarrolla infraestructura blockchain orientada a empresas, Fintechs e instituciones financieras, incluyendo proyectos que requieren integración con sistemas financieros existentes, seguridad, compliance y trazabilidad.',
  },
  {
    q: '¿DAppsFactory trabaja con proyectos fuera de Argentina?',
    a: 'Sí. DAppsFactory desarrolla proyectos blockchain para empresas de Latinoamérica. La arquitectura tecnológica se adapta al modelo de negocio y, cuando existen requisitos regulatorios específicos, se implementan en coordinación con los responsables legales y de compliance del proyecto.',
  },
];
