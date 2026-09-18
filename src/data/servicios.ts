/*
  Landings de los servicios (/servicios/<slug>/). Cada servicio es un objeto con
  sus secciones; la plantilla es src/pages/servicios/[slug].astro. Las secciones
  opcionales se omiten si no están.
*/

export type Plan = {
  eyebrow: string;
  title: string;
  text: string;
  includes: string[];
  ideal: string;
  featured?: boolean;
};

export type ServiceLanding = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; paragraphs: string[]; cta: string };
  plans?: { title: string; lead?: string; items: Plan[]; cta: string };
  grid?: { title: string; lead: string; items: { title: string; text: string }[] };
  steps?: { title: string; lead: string; items: { title: string; text: string }[] };
  compare?: { title: string; paragraphs: string[] };
  infra?: { title: string; text: string; tags: string[] };
  cta: { title: string; text: string; label: string };
  faqs: { q: string; a: string }[];
};

export const serviceLandings: ServiceLanding[] = [
  {
    slug: 'tokenizacion-de-activos',
    name: 'Tokenización de activos',
    seoTitle: 'Tokenización de activos · DAppsFactory',
    seoDescription:
      'Plataformas de tokenización de activos para representar, emitir y administrar activos y derechos mediante blockchain. Base con ERC-20 o Enterprise con ERC-3643, identidad y compliance.',
    hero: {
      eyebrow: 'Tokenización de activos',
      title: 'Convierta activos y derechos en oportunidades digitales',
      paragraphs: [
        'En DAppsFactory desarrollamos plataformas de tokenización de activos para representar, emitir y administrar activos y derechos mediante tecnología blockchain.',
        'Nuestra infraestructura se adapta al tipo de activo, modelo de negocio y nivel de compliance de cada proyecto, desde implementaciones ágiles hasta soluciones Enterprise para escenarios de mayor complejidad.',
      ],
      cta: 'Quiero tokenizar un activo',
    },
    plans: {
      title: 'Una plataforma. Dos alternativas.',
      items: [
        {
          eyebrow: 'Plataforma Base · ERC-20',
          title: 'Ágil y escalable',
          text: 'Una solución ágil y escalable para proyectos que necesitan emitir y administrar activos digitales mediante blockchain.',
          includes: [
            'Emisión y administración de tokens ERC-20',
            'Dashboard de gestión',
            'Wallets y gestión de usuarios',
            'Marketplace',
            'Integración con medios de pago',
            'Smart Contracts',
            'Reporting y trazabilidad',
            'Personalización de marca',
          ],
          ideal: 'Ideal para proyectos que buscan implementar rápidamente una infraestructura funcional y evolucionar a medida que crece el negocio.',
        },
        {
          eyebrow: 'Plataforma Enterprise · ERC-3643',
          title: 'Identidad y compliance integrados',
          text: 'Infraestructura para proyectos que requieren identidad, compliance y reglas de transferencia integradas a la tokenización.',
          includes: [
            'Tokenización mediante ERC-3643',
            'Identidad digital con ONCHAINID',
            'Integración KYC/AML',
            'Gestión de inversores autorizados',
            'Restricciones y reglas de transferencia',
            'Smart Contracts personalizados',
            'Integraciones vía API',
            'Integración con custodios y wallets',
            'Reporting y trazabilidad avanzada',
            'Arquitectura personalizada',
          ],
          ideal: 'Ideal para proyectos institucionales o regulados que requieren un mayor nivel de control, compliance e integración.',
          featured: true,
        },
      ],
      cta: 'Encontrar la solución para mi proyecto',
    },
    grid: {
      title: '¿Qué se puede tokenizar?',
      lead: 'La tokenización puede utilizarse para representar digitalmente diferentes tipos de activos y derechos económicos.',
      items: [
        { title: 'Real Estate', text: 'Propiedades y desarrollos inmobiliarios.' },
        { title: 'Activos financieros', text: 'Participaciones, instrumentos y otros derechos financieros.' },
        { title: 'Créditos y deuda', text: 'Carteras, derechos de cobro y estructuras de financiamiento.' },
        { title: 'Activos productivos', text: 'Maquinaria, infraestructura y proyectos productivos.' },
        { title: 'Ingresos y regalías', text: 'Derechos vinculados a determinados flujos económicos.' },
        { title: 'Otros RWA', text: 'Otros activos y derechos del mundo real que puedan ser representados digitalmente.' },
      ],
    },
    steps: {
      title: 'Del proyecto a producción',
      lead: 'No nos limitamos a emitir un token. Desarrollamos la infraestructura necesaria para que el proyecto pueda operar.',
      items: [
        { title: 'Diagnóstico y arquitectura', text: 'Definimos el activo, modelo operativo y arquitectura tecnológica.' },
        { title: 'Desarrollo', text: 'Configuramos la plataforma y desarrollamos los Smart Contracts necesarios.' },
        { title: 'Integración', text: 'Conectamos wallets, pagos, identidad y sistemas existentes mediante APIs.' },
        { title: 'Validación', text: 'Realizamos testing y las instancias de auditoría que requiera el proyecto.' },
        { title: 'Producción', text: 'Despliegue, monitoreo, documentación y soporte.' },
      ],
    },
    compare: {
      title: 'ERC-20 o ERC-3643',
      paragraphs: [
        'No todos los proyectos de tokenización necesitan la misma tecnología.',
        'ERC-20 permite implementar una infraestructura más simple y flexible para la emisión y administración de tokens.',
        'ERC-3643 incorpora identidad y reglas de compliance directamente en la arquitectura del token, permitiendo gestionar inversores autorizados y establecer restricciones de transferencia.',
        'En DAppsFactory analizamos cada proyecto para definir la arquitectura tecnológica adecuada.',
      ],
    },
    infra: {
      title: 'Más que tokens, infraestructura',
      text: 'Nuestra plataforma puede integrar wallets, Smart Contracts, KYC/AML, pagos, custodia, reporting y APIs, conectando blockchain con la infraestructura existente de cada organización.',
      tags: ['Modular', 'White Label', 'Escalable', 'Integrable'],
    },
    cta: {
      title: 'Construya su proyecto de tokenización con DAppsFactory',
      text: 'Desde una primera implementación hasta una infraestructura Enterprise, desarrollamos la tecnología necesaria para llevar activos y derechos al entorno digital.',
      label: 'Hablemos de su proyecto',
    },
    faqs: [
      {
        q: '¿Qué activos se pueden tokenizar?',
        a: 'Pueden tokenizarse diferentes activos y derechos, incluyendo real estate, activos financieros, créditos, activos productivos, ingresos, regalías y otros RWA.',
      },
      {
        q: '¿Cuál es la diferencia entre ERC-20 y ERC-3643?',
        a: 'ERC-20 es un estándar general para tokens fungibles. ERC-3643 incorpora identidad y reglas de compliance para proyectos que requieren mayor control sobre inversores y transferencias.',
      },
      {
        q: '¿La plataforma puede integrar KYC/AML?',
        a: 'Sí. Puede integrarse con proveedores especializados de identidad y KYC/AML según los requerimientos del proyecto.',
      },
      {
        q: '¿Puede integrarse con nuestros sistemas actuales?',
        a: 'Sí. La plataforma puede conectarse mediante APIs con sistemas financieros, CRM, ERP, wallets, proveedores de pagos y otras soluciones.',
      },
      {
        q: '¿La plataforma es White Label?',
        a: 'Sí. Puede personalizarse con la identidad de marca y experiencia digital de cada empresa.',
      },
      {
        q: '¿Cuánto cuesta una plataforma de tokenización?',
        a: 'El costo depende de la arquitectura, funcionalidades, integraciones y nivel de personalización requerido. DAppsFactory ofrece alternativas Base y Enterprise según la complejidad del proyecto.',
      },
    ],
  },
];
