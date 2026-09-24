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
  | (Base & { type: 'features'; title: string; lead?: string | string[]; label?: string; includes: string[]; closing?: string })
  | (Base & { type: 'grid'; title: string; lead?: string | string[]; items: { title: string; text: string }[] })
  | (Base & { type: 'steps'; title: string; lead?: string; items: { title: string; text: string }[] })
  | (Base & { type: 'text'; title: string; paragraphs: string[]; tagline?: string; flow?: string[] })
  | (Base & { type: 'infra'; title: string; text?: string; tags?: string[]; items?: { title: string; text: string }[] });

export type ServiceLanding = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  // `image`: archivo en src/assets/servicios/ (sin ruta); se muestra a la derecha del hero
  hero: { eyebrow: string; title: string; paragraphs: string[]; cta: string; image?: string; imageAlt?: string };
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
      'Plataformas de tokenización de activos con blockchain: ERC-20 para empezar o ERC-3643 con identidad, compliance y reglas de transferencia.',
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
      'Wallets Fiat + Cripto White Label para empresas y fintechs: fiat, stablecoins, cripto y activos tokenizados en una misma experiencia, con KYC/AML y APIs.',
    hero: {
      eyebrow: 'Wallet Fiat + Cripto White Label',
      title: 'Su propia wallet. Su marca. Una infraestructura preparada para integrar fiat y activos digitales.',
      paragraphs: [
        'En DAppsFactory desarrollamos Wallets Fiat + Cripto White Label para empresas y Fintechs que buscan ofrecer una experiencia financiera propia sin desarrollar toda la infraestructura desde cero.',
        'Integre en una misma solución dinero fiat, stablecoins, criptomonedas y activos tokenizados, conectando los proveedores y servicios que necesita su modelo de negocio.',
      ],
      cta: 'Quiero desarrollar una wallet',
      image: 'wallet-celulares.png',
      imageAlt: 'Tres pantallas de una wallet de marca: login, cuentas en dólar, euro, USDC y bitcoin, y el balance total con activos tokenizados',
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
  // ---- 03 · Desarrollos Blockchain a Medida ------------------------------------
  {
    slug: 'desarrollo-blockchain',
    name: 'Desarrollos Blockchain a Medida',
    seoTitle: 'Desarrollos Blockchain a Medida · DAppsFactory',
    seoDescription:
      'Desarrollos blockchain a medida: Smart Contracts, dApps, trazabilidad, identidad digital e integraciones con CRM, ERP y core financiero vía APIs.',
    hero: {
      eyebrow: 'Desarrollos Blockchain a Medida',
      title: 'Blockchain diseñado para su modelo de negocio',
      paragraphs: [
        'En DAppsFactory desarrollamos soluciones blockchain a medida para empresas y Fintechs, desde Smart Contracts y aplicaciones descentralizadas hasta plataformas completas integradas con sistemas existentes.',
        'Diseñamos la arquitectura según el caso de uso, los procesos y los requerimientos de cada organización.',
      ],
      cta: 'Cuéntenos su proyecto',
    },
    sections: [
      {
        type: 'features',
        title: 'De una necesidad de negocio a una solución blockchain',
        lead: [
          'No todos los proyectos pueden resolverse con una plataforma estándar.',
          'Cuando el modelo requiere lógica específica, integraciones particulares o una arquitectura propia, diseñamos y desarrollamos la solución desde cero o la integramos sobre la infraestructura existente.',
        ],
        label: 'Podemos desarrollar',
        includes: [
          'Smart Contracts',
          'Aplicaciones descentralizadas (dApps)',
          'Plataformas blockchain',
          'Sistemas de trazabilidad',
          'Identidad digital',
          'Automatización de procesos',
          'Infraestructura para activos digitales',
          'Integraciones Web3',
          'APIs y servicios blockchain',
          'Integraciones con sistemas empresariales',
          'Soluciones de firma y validación',
          'Arquitecturas multichain',
        ],
      },
      {
        type: 'grid',
        title: '¿Qué podemos construir?',
        items: [
          { title: 'Smart Contracts', text: 'Desarrollamos contratos inteligentes para automatizar reglas de negocio, operaciones, permisos y transacciones sobre blockchain.' },
          { title: 'Trazabilidad y certificación', text: 'Creamos soluciones para registrar y verificar información, documentos, activos y procesos mediante registros blockchain.' },
          { title: 'Identidad digital', text: 'Integramos tecnologías de identidad para gestionar credenciales, usuarios, permisos y validaciones dentro de ecosistemas digitales.' },
          { title: 'Pagos y activos digitales', text: 'Desarrollamos infraestructura para integrar stablecoins, tokens y otros activos digitales con aplicaciones y sistemas empresariales.' },
          { title: 'Plataformas Web3', text: 'Construimos aplicaciones y plataformas que permiten a empresas incorporar funcionalidades blockchain sin modificar completamente su infraestructura actual.' },
          { title: 'Integraciones blockchain', text: 'Conectamos blockchain con CRM, ERP, core financiero, wallets, sistemas de pagos, proveedores de identidad y otras plataformas mediante APIs.' },
        ],
      },
      {
        type: 'text',
        title: 'Blockchain integrado a su infraestructura',
        paragraphs: [
          'El verdadero desafío no es solamente desarrollar un Smart Contract.',
          'Una solución empresarial debe poder interactuar con sistemas existentes, gestionar usuarios y permisos, incorporar seguridad y mantenerse operativa en producción.',
          'Por eso diseñamos blockchain como una capa tecnológica integrada al ecosistema de cada organización.',
        ],
        flow: ['Sistemas existentes', 'APIs', 'Blockchain', 'Smart Contracts', 'Aplicaciones'],
      },
      {
        type: 'steps',
        title: 'De la arquitectura a producción',
        items: [
          { title: 'Diagnóstico y arquitectura', text: 'Analizamos el caso de uso, los procesos, integraciones y objetivos del proyecto.' },
          { title: 'Diseño de la solución', text: 'Definimos red blockchain, Smart Contracts, APIs, componentes e infraestructura.' },
          { title: 'Desarrollo e integración', text: 'Construimos la solución y la conectamos con los sistemas y proveedores necesarios.' },
          { title: 'Testing y validación', text: 'Realizamos pruebas funcionales, de integración, rendimiento y seguridad. Cuando el proyecto lo requiere, incorporamos auditorías externas.' },
          { title: 'Producción y soporte', text: 'Desplegamos la solución con documentación, monitoreo y soporte para su operación.' },
        ],
      },
      {
        type: 'infra',
        title: 'Tecnología adaptada al proyecto',
        items: [
          { title: 'A medida', text: 'La arquitectura responde al modelo de negocio y no al revés.' },
          { title: 'Integrable', text: 'Conectamos blockchain con la infraestructura tecnológica existente.' },
          { title: 'Multichain', text: 'Evaluamos la red y tecnología adecuada según las necesidades del proyecto.' },
          { title: 'Escalable', text: 'Diseñamos soluciones preparadas para evolucionar e incorporar nuevas funcionalidades.' },
          { title: 'Seguridad desde el diseño', text: 'Testing, permisos y procesos de validación forman parte de la arquitectura desde las primeras etapas.' },
        ],
      },
    ],
    cta: {
      title: 'Más que desarrollo blockchain',
      text: 'Combinamos arquitectura de software, blockchain, Smart Contracts, APIs e integración de sistemas para construir soluciones que puedan operar dentro de entornos empresariales reales. Desde una funcionalidad específica hasta una plataforma completa.',
      label: 'Hablemos de su proyecto',
    },
    faqs: [
      { q: '¿Qué tipo de desarrollos blockchain realiza DAppsFactory?', a: 'Desarrollamos Smart Contracts, dApps, sistemas de trazabilidad, identidad digital, infraestructura para activos digitales, integraciones Web3 y plataformas blockchain a medida.' },
      { q: '¿DAppsFactory desarrolla Smart Contracts?', a: 'Sí. Diseñamos y desarrollamos Smart Contracts adaptados a las reglas y procesos de cada proyecto.' },
      { q: '¿Una solución blockchain puede integrarse con nuestros sistemas actuales?', a: 'Sí. Podemos conectar la infraestructura blockchain mediante APIs con CRM, ERP, core financiero, sistemas de pagos, wallets y otras plataformas.' },
      { q: '¿Trabajan con diferentes redes blockchain?', a: 'Sí. La tecnología y la red se definen de acuerdo con los requerimientos técnicos y operativos del proyecto.' },
      { q: '¿Es necesario migrar nuestros sistemas actuales a blockchain?', a: 'No necesariamente. Blockchain puede incorporarse como una nueva capa de infraestructura e integrarse con los sistemas existentes.' },
      { q: '¿Realizan auditorías de Smart Contracts?', a: 'Los desarrollos incluyen procesos de testing y revisión. Cuando se requiere una auditoría independiente, puede incorporarse una firma externa especializada.' },
      { q: '¿Pueden desarrollar un MVP o prueba de concepto?', a: 'Sí. Podemos comenzar con un alcance acotado para validar la arquitectura y el caso de uso antes de avanzar hacia una implementación de mayor escala.' },
      { q: '¿Cuánto cuesta un desarrollo blockchain a medida?', a: 'Depende de la arquitectura, Smart Contracts, funcionalidades, integraciones y complejidad del proyecto. El alcance se define luego de analizar los requerimientos técnicos y de negocio.' },
    ],
  },
  // ---- 04 · Pagos Masivos en Cripto ---------------------------------------------
  // BORRADOR: el hero es texto del cliente; el resto lo redactó Claude en el mismo
  // tono para completar la landing, y está pendiente de validación.
  {
    slug: 'pagos-masivos-cripto',
    name: 'Pagos Masivos en Cripto',
    seoTitle: 'Pagos Masivos en Cripto · DAppsFactory',
    seoDescription:
      'Infraestructura de pagos masivos en cripto: grandes volúmenes de transferencias de activos digitales de forma rápida, automatizada y trazable.',
    hero: {
      eyebrow: 'Pagos Masivos en Cripto',
      title: 'Envíe múltiples pagos en cripto de forma inmediata y a escala.',
      paragraphs: [
        'Desarrollamos una infraestructura de pagos masivos en cripto de alta velocidad, diseñada para empresas que necesitan ejecutar grandes volúmenes de transferencias de activos digitales de forma rápida y automatizada.',
        'La solución permite centralizar la gestión de pagos y ejecutar múltiples transacciones sobre blockchain, reduciendo procesos manuales y tiempos operativos.',
        'Puede aplicarse a pagos a usuarios, proveedores, partners, distribución de fondos y otras operaciones que requieran transferencias masivas de activos digitales.',
      ],
      cta: 'Quiero conocer la solución',
    },
    sections: [
      {
        type: 'features',
        title: 'Una infraestructura para operar pagos a escala',
        lead: 'La solución centraliza la gestión de pagos y ejecuta múltiples transacciones sobre blockchain desde una misma operación, con control y registro de cada movimiento.',
        includes: [
          'Carga masiva de destinatarios y montos',
          'Ejecución de lotes de transferencias on-chain',
          'Stablecoins y otros activos digitales',
          'Programación y automatización de pagos',
          'Validación y aprobación de lotes',
          'Estado y trazabilidad de cada transacción',
          'Reporting y conciliación',
          'Integración vía API con sistemas existentes',
          'Gestión de wallets y permisos',
          'Notificaciones a destinatarios',
        ],
        closing: 'De cientos de transferencias manuales a una sola operación, con trazabilidad completa.',
      },
      {
        type: 'grid',
        title: '¿Dónde se aplica?',
        lead: 'Cualquier operación que requiera enviar activos digitales a muchos destinatarios de forma recurrente o en un mismo momento.',
        items: [
          { title: 'Pagos a usuarios', text: 'Acreditaciones, reembolsos e incentivos a la base de usuarios de una plataforma.' },
          { title: 'Pagos a proveedores', text: 'Liquidación de servicios y facturas a proveedores locales e internacionales.' },
          { title: 'Partners y afiliados', text: 'Comisiones y liquidaciones periódicas a redes de partners, agentes o afiliados.' },
          { title: 'Distribución de fondos', text: 'Reparto de fondos entre cuentas, entidades o unidades de negocio.' },
          { title: 'Rendimientos y recompensas', text: 'Distribución de rendimientos, recompensas o beneficios a tenedores de activos digitales.' },
          { title: 'Operaciones recurrentes', text: 'Pagos programados que se repiten con una frecuencia definida, sin intervención manual.' },
        ],
      },
      {
        type: 'text',
        title: 'De un proceso manual a una operación automatizada',
        paragraphs: [
          'Ejecutar cientos de transferencias una por una implica tiempo, errores y costos operativos.',
          'La infraestructura de pagos masivos permite preparar, validar y ejecutar lotes completos de transacciones sobre blockchain, con el estado y la trazabilidad de cada pago.',
          'Operaciones que antes llevaban horas se resuelven en minutos, con control y registro de cada movimiento.',
        ],
        flow: ['Carga', 'Validación', 'Ejecución', 'Trazabilidad'],
      },
      {
        type: 'steps',
        title: 'Del proyecto a producción',
        items: [
          { title: 'Diagnóstico y arquitectura', text: 'Definimos activos, volúmenes, redes, destinatarios y las integraciones necesarias.' },
          { title: 'Configuración', text: 'Adaptamos los flujos de carga, validación y ejecución al modelo operativo de la empresa.' },
          { title: 'Integraciones', text: 'Conectamos wallets, custodia, proveedores y sistemas existentes mediante APIs.' },
          { title: 'Testing y validación', text: 'Probamos los flujos, los límites y la seguridad de la operación antes de salir a producción.' },
          { title: 'Producción', text: 'Despliegue con monitoreo, documentación y soporte para la operación diaria.' },
        ],
      },
      {
        type: 'infra',
        title: 'Pensada para operar a escala',
        items: [
          { title: 'Alta velocidad', text: 'Lotes de transferencias ejecutados de forma inmediata sobre blockchain.' },
          { title: 'Automatizada', text: 'Pagos programados y flujos de aprobación sin procesos manuales.' },
          { title: 'Trazable', text: 'Estado, registro y conciliación de cada transacción.' },
          { title: 'Integrable', text: 'APIs para conectar la operación con los sistemas existentes.' },
          { title: 'Multiactivo', text: 'Stablecoins y otros activos digitales según el modelo de negocio.' },
        ],
      },
    ],
    cta: {
      title: 'Construya su infraestructura de pagos masivos con DAppsFactory',
      text: 'Desarrollamos la tecnología para ejecutar grandes volúmenes de pagos en cripto de forma rápida, automatizada y trazable, integrada con su operación.',
      label: 'Quiero conocer la solución',
    },
    faqs: [
      { q: '¿Qué es una infraestructura de pagos masivos en cripto?', a: 'Es una solución que permite preparar, validar y ejecutar múltiples transferencias de activos digitales en una misma operación sobre blockchain, con trazabilidad de cada pago.' },
      { q: '¿Qué activos se pueden enviar?', a: 'Stablecoins y otros activos digitales, según las redes y proveedores que se integren en cada proyecto.' },
      { q: '¿Cuántos pagos se pueden ejecutar por lote?', a: 'La solución está diseñada para grandes volúmenes. El límite concreto depende de la red, los activos y la configuración definida para cada implementación.' },
      { q: '¿Puede integrarse con nuestros sistemas actuales?', a: 'Sí. La infraestructura puede conectarse mediante APIs con ERP, sistemas de pagos, plataformas propias y otros sistemas existentes.' },
      { q: '¿Cómo se controla y audita cada pago?', a: 'Cada transacción queda registrada con su estado y su referencia on-chain, y la solución puede incorporar flujos de validación y aprobación antes de ejecutar un lote.' },
      { q: '¿Cuánto cuesta implementar pagos masivos en cripto?', a: 'Depende de los activos, volúmenes, integraciones y nivel de personalización requerido. El alcance se define a partir de la arquitectura y las necesidades de cada proyecto.' },
    ],
  },
];
