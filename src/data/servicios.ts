/*
  Landings de los servicios (/servicios/<slug>/). Cada servicio declara sus
  secciones en el orden que quiera; la plantilla (src/pages/servicios/[slug].astro)
  las renderiza y alterna el fondo claro/oscuro (arranca en claro después del
  hero oscuro; se puede fijar con `theme`).

  Tipos de sección:
  · plans     dos (o más) alternativas en tarjetas, con "Puede incluir"
  · features  una sola lista "Puede incluir" en dos columnas + frase de cierre
  · grid      grilla de ítems numerados (título + línea)
  · steps     pasos numerados con cabecera sticky
  · text      título + párrafos (el último resaltado) y opcional tagline o flujo
  · infra     título + texto y etiquetas (tags) o ítems con descripción (items)
*/

type Base = { theme?: 'light' | 'dark' };

export type Plan = {
  eyebrow: string;
  title: string;
  text: string;
  includes: string[];
  ideal: string;
  featured?: boolean;
};

export type Section =
  | (Base & { type: 'plans'; title: string; lead?: string; items: Plan[]; cta?: string })
  | (Base & { type: 'features'; title: string; lead?: string; includes: string[]; closing?: string })
  | (Base & { type: 'grid'; title: string; lead?: string; items: { title: string; text: string }[] })
  | (Base & { type: 'steps'; title: string; lead?: string; items: { title: string; text: string }[] })
  | (Base & { type: 'text'; title: string; paragraphs: string[]; tagline?: string; flow?: string[] })
  | (Base & { type: 'infra'; title: string; text?: string; tags?: string[]; items?: { title: string; text: string }[] });

export type ServiceLanding = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; paragraphs: string[]; cta: string };
  sections: Section[];
  cta: { title: string; text: string; label: string };
  faqs: { q: string; a: string }[];
};

export const serviceLandings: ServiceLanding[] = [
  // ---- 01 · Tokenización de activos ----------------------------------------
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
    sections: [
      {
        type: 'plans',
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
      {
        type: 'grid',
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
      {
        type: 'steps',
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
      {
        type: 'text',
        title: 'ERC-20 o ERC-3643',
        paragraphs: [
          'No todos los proyectos de tokenización necesitan la misma tecnología.',
          'ERC-20 permite implementar una infraestructura más simple y flexible para la emisión y administración de tokens.',
          'ERC-3643 incorpora identidad y reglas de compliance directamente en la arquitectura del token, permitiendo gestionar inversores autorizados y establecer restricciones de transferencia.',
          'En DAppsFactory analizamos cada proyecto para definir la arquitectura tecnológica adecuada.',
        ],
      },
      {
        type: 'infra',
        title: 'Más que tokens, infraestructura',
        text: 'Nuestra plataforma puede integrar wallets, Smart Contracts, KYC/AML, pagos, custodia, reporting y APIs, conectando blockchain con la infraestructura existente de cada organización.',
        tags: ['Modular', 'White Label', 'Escalable', 'Integrable'],
      },
    ],
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

  // ---- 02 · Wallet Fiat + Cripto White Label ----------------------------------
  {
    slug: 'wallet-fiat-cripto',
    name: 'Wallet Fiat + Cripto White Label',
    seoTitle: 'Wallet Fiat + Cripto White Label · DAppsFactory',
    seoDescription:
      'Wallets Fiat + Cripto de marca blanca para empresas y Fintechs: dinero fiat, stablecoins, criptomonedas y activos tokenizados en una misma experiencia, con onboarding, KYC/AML, custodia y APIs.',
    hero: {
      eyebrow: 'Wallet Fiat + Cripto White Label',
      title: 'Su propia wallet. Su marca. Una infraestructura preparada para integrar fiat y activos digitales.',
      paragraphs: [
        'En DAppsFactory desarrollamos Wallets Fiat + Cripto White Label para empresas y Fintechs que buscan ofrecer una experiencia financiera propia sin desarrollar toda la infraestructura desde cero.',
        'Integre en una misma solución dinero fiat, stablecoins, criptomonedas y activos tokenizados, conectando los proveedores y servicios que necesita su modelo de negocio.',
      ],
      cta: 'Quiero desarrollar una wallet',
    },
    sections: [
      {
        type: 'features',
        title: 'Una wallet adaptada a su negocio',
        lead: 'Nuestra solución White Label permite configurar funcionalidades, integraciones y experiencia de usuario de acuerdo con las necesidades de cada proyecto.',
        includes: [
          'Cuentas y saldos fiat mediante proveedores integrados',
          'Stablecoins y criptomonedas',
          'Activos tokenizados',
          'Compra, venta y conversión de activos',
          'Envío y recepción de fondos',
          'Pagos y transferencias',
          'Onboarding digital',
          'Integración KYC/AML',
          'Integración con custodios',
          'APIs financieras y blockchain',
          'Back-office y reporting',
          'Personalización de marca',
        ],
        closing: 'Una única experiencia para operar entre el sistema financiero tradicional y la infraestructura blockchain.',
      },
      {
        type: 'text',
        title: 'White Label: su producto, nuestra tecnología',
        paragraphs: [
          'La wallet se personaliza con la identidad, experiencia y modelo de negocio de su empresa.',
          'DAppsFactory desarrolla e integra la infraestructura tecnológica mientras su organización mantiene el control sobre la propuesta comercial y la relación con sus usuarios.',
        ],
        tagline: 'Su marca. Sus usuarios. Su ecosistema.',
      },
      {
        type: 'grid',
        title: '¿Qué puede integrar una Wallet Fiat + Cripto?',
        items: [
          { title: 'Fiat', text: 'Integre cuentas, saldos, transferencias y medios de pago a través de bancos y proveedores financieros.' },
          { title: 'Stablecoins y cripto', text: 'Permita operar con activos digitales y conectar diferentes redes y proveedores de infraestructura blockchain.' },
          { title: 'Activos tokenizados', text: 'Integre tokens y RWA dentro de la misma experiencia, permitiendo visualizar y gestionar diferentes tipos de activos digitales.' },
          { title: 'Pagos', text: 'Conecte proveedores locales e internacionales para construir experiencias de pago adaptadas a cada mercado.' },
          { title: 'Identidad y compliance', text: 'Integre onboarding, proveedores KYC/AML y controles requeridos por el modelo operativo.' },
          { title: 'APIs e integraciones', text: 'Conecte la wallet con core financiero, CRM, ERP, plataformas de inversión y otros sistemas existentes.' },
        ],
      },
      {
        type: 'text',
        title: 'De la wallet al ecosistema financiero',
        paragraphs: [
          'Una Wallet Fiat + Cripto no es solamente una interfaz.',
          'Detrás de cada operación conviven diferentes componentes: bancos, proveedores de pagos, blockchain, custodia, liquidez, identidad y compliance.',
          'Nuestra propuesta es integrar esas capas dentro de una arquitectura que permita construir una experiencia simple para el usuario.',
        ],
        flow: ['Fiat', 'Stablecoins', 'Cripto', 'Activos tokenizados'],
      },
      {
        type: 'steps',
        title: 'Del proyecto a producción',
        items: [
          { title: 'Diagnóstico y arquitectura', text: 'Definimos funcionalidades, mercados, activos, proveedores e integraciones necesarias.' },
          { title: 'Configuración y desarrollo', text: 'Personalizamos la wallet, los flujos de usuario y la infraestructura tecnológica.' },
          { title: 'Integraciones', text: 'Conectamos bancos, pagos, custodia, blockchain, KYC/AML y sistemas existentes.' },
          { title: 'Testing y validación', text: 'Validamos los flujos, integraciones, seguridad y funcionamiento de la solución.' },
          { title: 'Producción', text: 'Realizamos el despliegue con monitoreo, documentación y soporte.' },
        ],
      },
      {
        type: 'infra',
        title: 'Más que una wallet, infraestructura financiera digital',
        items: [
          { title: 'White Label', text: 'Una experiencia completamente adaptada a su marca.' },
          { title: 'Modular', text: 'Integre únicamente las funcionalidades que necesita.' },
          { title: 'Multiactivo', text: 'Fiat, stablecoins, cripto y activos tokenizados desde una misma solución.' },
          { title: 'Integrable', text: 'Arquitectura preparada para conectarse mediante APIs con su ecosistema.' },
          { title: 'Escalable', text: 'Una infraestructura diseñada para incorporar nuevos productos, proveedores y mercados.' },
        ],
      },
    ],
    cta: {
      title: 'Construya su Wallet Fiat + Cripto con DAppsFactory',
      text: 'Desarrollamos la infraestructura para conectar finanzas tradicionales y activos digitales dentro de una experiencia White Label adaptada a su negocio.',
      label: 'Hablemos de su proyecto',
    },
    faqs: [
      {
        q: '¿Qué es una Wallet Fiat + Cripto White Label?',
        a: 'Es una solución de marca blanca que permite a una empresa ofrecer una wallet bajo su propia identidad, integrando servicios fiat y activos digitales dentro de una misma experiencia.',
      },
      {
        q: '¿La wallet puede manejar fiat y criptomonedas?',
        a: 'Sí. La solución puede integrar servicios para operar con dinero fiat, stablecoins, criptomonedas y otros activos digitales, según los proveedores seleccionados para cada proyecto.',
      },
      {
        q: '¿Puede integrar stablecoins?',
        a: 'Sí. Podemos integrar stablecoins y la infraestructura necesaria para su compra, conversión, transferencia y utilización dentro de la wallet.',
      },
      {
        q: '¿Puede incluir activos tokenizados?',
        a: 'Sí. La wallet puede integrarse con plataformas de tokenización y permitir visualizar y gestionar activos tokenizados desde la misma experiencia.',
      },
      {
        q: '¿DAppsFactory provee cuentas bancarias, custodia o servicios de pago?',
        a: 'DAppsFactory desarrolla e integra la infraestructura tecnológica. Los servicios financieros, de custodia y pagos pueden ser prestados por bancos y proveedores especializados integrados a la solución.',
      },
      {
        q: '¿Se puede integrar KYC/AML?',
        a: 'Sí. La wallet puede conectarse con proveedores especializados para incorporar procesos de identificación y controles KYC/AML dentro del onboarding.',
      },
      {
        q: '¿Puede conectarse con nuestros sistemas actuales?',
        a: 'Sí. La arquitectura puede integrarse mediante APIs con core financiero, CRM, ERP, plataformas de pagos y otros sistemas.',
      },
      {
        q: '¿La wallet puede personalizarse con nuestra marca?',
        a: 'Sí. La solución White Label permite adaptar identidad visual, experiencia de usuario, funcionalidades e integraciones al producto de cada empresa.',
      },
      {
        q: '¿Cuánto cuesta desarrollar una Wallet Fiat + Cripto?',
        a: 'El costo depende de las funcionalidades, activos, países, proveedores, integraciones y nivel de personalización requerido. El alcance se define a partir de la arquitectura y necesidades del proyecto.',
      },
    ],
  },
];
