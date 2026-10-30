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
  · stats     números medidos, con una nota al pie que dice de dónde salen
  · demo      el producto: logo, video de la demo y link a su sitio
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
  | (Base & { type: 'infra'; title: string; text?: string; tags?: string[]; items?: { title: string; text: string }[] })
  | (Base & {
      type: 'stats';
      title: string;
      lead?: string;
      items: { value: string; label: string; text: string }[];
      /** De dónde salen los números: sin esto, no se publican. */
      nota: string;
    })
  | (Base & {
      type: 'demo';
      /** Logo del producto, en public/logos/. */
      logo?: string;
      logoAlt?: string;
      title: string;
      lead?: string;
      video: { src: string; poster: string };
      videoAlt?: string;
      caption?: string;
      link?: { href: string; label: string };
    });

export type ServiceLanding = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  // `image`: archivo en src/assets/servicios/ (sin ruta); se muestra a la derecha del hero
  hero: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    cta: string;
    /** Segundo botón, discreto, para un destino externo (el sitio del producto). */
    link?: { href: string; label: string };
    /** Video del banner, servido desde public/. Si está, se muestra en lugar de
        `image`; con prefers-reduced-motion queda el poster quieto. */
    video?: { src: string; poster: string };
    /** Ilustración animada (SVG con capas) en lugar de `image`. Con
        prefers-reduced-motion se muestra `image`, que queda de respaldo. */
    motion?: 'sempay';
    image?: string;
    imageAlt?: string;
  };
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
      image: 'metro-futuro.png',
      imageAlt: 'Metrofuturo, plataforma de inversión en metros cuadrados tokenizados, en una notebook y un celular',
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
      image: 'galicia.png',
      imageAlt: 'Plataforma de certificados en blockchain de Banco Galicia: el panel para emitirlos y la colección publicada, vista desde un celular',
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
  // ---- 04 · Pagos masivos en cripto ----------------------------------------
  // La protagoniza SemPay (sempayment.com), el producto propio. Los números
  // son los de la demo filmada el 26/10/2026 sobre Arc testnet, la misma que
  // publica el sitio de SemPay; la red se aclara donde se muestran, porque
  // quien evalúa esto lo va a verificar.
  {
    slug: 'pagos-masivos-cripto',
    name: 'Pagos Masivos en Cripto',
    seoTitle: 'Pagos masivos en USDC y EURC · DAppsFactory',
    seoDescription:
      'SemPay ejecuta miles de pagos en USDC y EURC en un solo lote: una firma, comprobante on-chain por pago y los fondos siempre en su wallet.',
    hero: {
      eyebrow: 'Pagos Masivos en Cripto',
      title: 'Envíe múltiples pagos en cripto de forma inmediata y a escala.',
      paragraphs: [
        'Desarrollamos SemPay: una infraestructura que ejecuta miles de transferencias en USDC y EURC desde una sola operación. Se carga un Excel, se firma una vez y cada pago llega con su comprobante en blockchain.',
        'Los fondos nunca salen de la wallet de la empresa. El contrato solo puede tomar exactamente lo que se firmó, y únicamente para ese lote.',
        'Ya está construido y se puede probar. Si su operación necesita otra cosa, desarrollamos la infraestructura a medida sobre la misma base.',
      ],
      cta: 'Quiero conocer la solución',
      link: { href: 'https://www.sempayment.com/', label: 'Ver SemPay' },
      motion: 'sempay',
      image: 'sempay-hero.png',
      imageAlt:
        'Una planilla de empleados que se abre en pagos hacia varias wallets, cada uno con su comprobante',
    },
    sections: [
      {
        type: 'stats',
        title: 'Un lote de 5.002 pagos, medido',
        lead: '2.500 pagos en USDC y 2.500 en EURC en la misma operación. Los números son de una corrida real, no de una estimación.',
        items: [
          { value: '5.002', label: 'de 5.002 confirmadas', text: 'Ninguna transacción falló.' },
          { value: '2:33', label: 'minutos', text: 'Tiempo real de envío del lote completo.' },
          { value: '~33', label: 'pagos por segundo', text: 'Promedio sostenido, con picos cerca de 50.' },
          { value: '0,0033', label: 'USDC de gas por pago', text: 'Un tercio de centavo, sin importar el monto.' },
          { value: '1', label: 'firma por lote', text: 'Una aprobación autoriza las 5.002 transacciones.' },
          { value: '100', label: 'relayers en paralelo', text: 'Al terminar devuelven el gas que no usaron.' },
        ],
        nota: 'Demo filmada el 26 de octubre de 2026 sobre Arc testnet, la red de Circle. Lote 3286473979534202183.',
      },
      {
        type: 'demo',
        logo: '/logos/sempay.svg',
        logoAlt: 'SemPay',
        title: 'Así se ve mientras paga',
        lead: 'El lote completo, del arranque hasta la última confirmación. Sin cortes y sin acelerar el reloj de la pantalla.',
        video: { src: '/media/sempay-demo.mp4', poster: '/media/sempay-demo-poster.jpg' },
        videoAlt: 'SemPay ejecutando el lote: el contador avanza hasta 5.002 de 5.002 pagos confirmados',
        caption: 'La velocidad no la pone la interfaz: son cien relayers enviando en paralelo contra el contrato.',
        link: { href: 'https://www.sempayment.com/', label: 'Probar SemPay' },
      },
      {
        type: 'steps',
        title: 'De la planilla a los comprobantes',
        lead: 'Cuatro pasos. No hay registro, ni formularios, ni esperas: la wallet de la empresa es la cuenta.',
        items: [
          {
            title: 'Conectar la wallet',
            text: 'MetaMask, Ledger o cualquier wallet compatible. Los fondos quedan donde están.',
          },
          {
            title: 'Subir el Excel o CSV',
            text: 'Una fila por pago: wallet, monto y referencia. O armar el lote desde el sistema propio con la API.',
          },
          {
            title: 'Verificar y firmar una vez',
            text: 'El navegador recalcula el lote antes de firmar y lo compara con el archivo. Si algo no coincide, no se firma.',
          },
          {
            title: 'Seguir los pagos en vivo',
            text: 'Cada pago con su hash de transacción. Al terminar se exporta el Excel de comprobantes, listo para conciliar.',
          },
        ],
      },
      {
        type: 'grid',
        title: 'Por qué importa cómo está construido',
        lead: 'Lo que distingue a SemPay no es la velocidad: es que no hay que confiar en nadie para conseguirla.',
        items: [
          {
            title: 'Sin custodia',
            text: 'El dinero no se deposita en ningún lado. Queda en la wallet de la empresa hasta el momento exacto de cada pago.',
          },
          {
            title: 'Una firma, y acotada',
            text: 'Se firma la huella del lote. Nadie puede agregar, quitar ni cambiar un pago sin que esa huella deje de coincidir.',
          },
          {
            title: 'Verificación en el navegador',
            text: 'Antes de cada firma, el navegador recalcula el lote por su cuenta. Si el servidor cambiara un monto o una dirección, no firma.',
          },
          {
            title: 'Contrato auditable',
            text: 'El contrato que ejecuta los pagos está verificado y se puede revisar en el explorador de la red. El código es público.',
          },
          {
            title: 'Prueba por pago',
            text: 'Cada transferencia queda atada al lote firmado y tiene su registro en blockchain. No hay planilla que conciliar a mano.',
          },
          {
            title: 'Costo a la vista',
            text: 'La comisión y el gas se muestran antes de firmar, no después. En Arc el gas se paga en el mismo USDC.',
          },
        ],
      },
      {
        type: 'features',
        title: 'Dónde se usa',
        lead: 'Cualquier operación que tenga que pagarle a muchas personas o empresas a la vez, de forma recurrente o en un mismo momento.',
        label: 'Casos de uso',
        includes: [
          'Sueldos de todo el equipo en un solo lote',
          'Pagos a proveedores con la referencia de cada factura',
          'Comisiones de vendedores y afiliados, período a período',
          'Liquidaciones entre plataformas y partners',
          'Premios, incentivos y airdrops corporativos',
          'Remesas a familias y colaboradores en otros países',
          'Acreditaciones y reembolsos a usuarios',
          'Distribución de rendimientos a tenedores de activos',
        ],
        closing: 'De cientos de transferencias de a una a una sola operación, con comprobante de cada pago.',
      },
      {
        type: 'infra',
        title: 'Conectado a su sistema',
        text: 'Los lotes se pueden crear desde el sistema que ya usa la empresa, sin pasar por la interfaz.',
        items: [
          {
            title: 'API REST',
            text: 'Se arma el lote con una llamada, en JSON, Excel o CSV, y se firma con la wallet.',
          },
          {
            title: 'Webhooks firmados',
            text: 'Avisos por pago y por lote, firmados y ordenados, para actualizar el sistema propio.',
          },
          {
            title: 'Reintentos seguros',
            text: 'Si una llamada se repite, el lote no se duplica. Está pensado para fallar sin romper nada.',
          },
          {
            title: 'Dos monedas',
            text: 'USDC y EURC en el mismo lote, cada fila en la moneda que corresponda.',
          },
        ],
      },
      {
        type: 'text',
        title: '¿Y si necesita otra cosa?',
        paragraphs: [
          'SemPay resuelve el caso más común: pagar a muchos destinatarios en stablecoins, rápido y con prueba de cada pago.',
          'Pero hay operaciones que necesitan otros activos, otras redes, flujos de aprobación propios o una integración profunda con el core de la empresa.',
          'En esos casos desarrollamos la infraestructura a medida, sobre la misma base que ya está construida y probada.',
        ],
        tagline: 'La diferencia entre partir de cero y partir de algo que ya funciona.',
      },
    ],
    cta: {
      title: 'Pague a miles de personas en una sola operación',
      text: 'Contanos el volumen, los activos y los sistemas con los que tiene que conectarse, y vemos si SemPay resuelve tu caso tal como está o conviene desarrollarlo a medida.',
      label: 'Quiero conocer la solución',
    },
    faqs: [
      {
        q: '¿Hay que registrarse?',
        a: 'No. Se conecta la wallet y se empieza: no hay formularios de alta, ni aprobaciones, ni espera.',
      },
      {
        q: '¿Ustedes custodian los fondos?',
        a: 'No, en ningún momento. El dinero queda en la wallet de la empresa y el contrato solo puede tomar lo que autorizan las firmas, y solo para ese lote.',
      },
      {
        q: '¿Qué activos se pueden enviar?',
        a: 'USDC y EURC, y los dos pueden ir en el mismo lote: cada fila en la moneda que corresponda. Para otros activos o redes, se evalúa como desarrollo a medida.',
      },
      {
        q: '¿Cuántos pagos entran en un lote?',
        a: 'La corrida filmada fue de 5.002 transacciones en una sola operación, y antes se hizo una de 10.000 pagos en 4 minutos y 32 segundos. El límite práctico depende de la red y de la configuración de cada implementación.',
      },
      {
        q: '¿En qué red funciona hoy?',
        a: 'En Arc, la red de Circle, donde el gas se paga en el mismo USDC y no hace falta comprar otro token. Las mediciones publicadas son sobre Arc testnet.',
      },
      {
        q: '¿Qué pasa si un pago falla?',
        a: 'Cada pago es independiente dentro del lote: si uno no entra, el resto sigue. Todo queda registrado con su estado, y un pago nunca se ejecuta dos veces.',
      },
      {
        q: '¿Se puede integrar con nuestros sistemas?',
        a: 'Sí. Hay una API REST para crear los lotes desde el sistema propio y webhooks firmados para seguir el estado de cada pago, con claves, límites de uso y reintentos seguros.',
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Una comisión del 1% del lote más el gas de la red, que en la corrida medida fue de un tercio de centavo por pago. Las dos cosas se muestran antes de firmar.',
      },
      {
        q: '¿Funciona con Ledger?',
        a: 'Sí, y con cualquier wallet que siga el estándar habitual de conexión. La wallet de la empresa es la cuenta.',
      },
    ],
  },
];
