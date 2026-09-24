---
title: "Ventajas del uso de los contratos ERC 3643 frente a los ERC 20 para la emisión de tokens RWA (Real World Assets)"
seoTitle: "ERC-3643 frente a ERC-20: ventajas"
description: "La tecnología blockchain ha abierto un nuevo abanico de posibilidades para la tokenización de activos del mundo real (RWA), permitiendo su representación digita"
pubDate: 2025-01-13
author: "Horacio Lampe"
cover: "../../assets/blog/blog-11.png"
legacy: "blog-post11.html"
---
## Introducción

La tecnología blockchain ha abierto un nuevo abanico de posibilidades para la tokenización de activos del mundo real (RWA), permitiendo su representación digital en la cadena de bloques. Este proceso ofrece numerosas ventajas, como la fragmentación de la propiedad, mayor liquidez y la reducción de intermediarios. Sin embargo, la tokenización de RWA también presenta desafíos, especialmente en términos de cumplimiento normativo. En este contexto, el estándar de token ERC-3643 surge como una solución innovadora que aborda las limitaciones del estándar ERC-20, ampliamente utilizado para la emisión de tokens fungibles.

Este informe analiza las ventajas de utilizar los contratos ERC-3643 en comparación con los ERC-20 para la emisión de tokens RWA. Para ello, se examinarán las características de ambos estándares, se compararán sus funcionalidades y se explorarán ejemplos de proyectos que utilizan ERC-3643. Además, se incluirá una breve descripción de la metodología de investigación empleada para la elaboración de este informe.

## ¿Qué son los tokens ERC-20?

El estándar ERC-20 es un conjunto de reglas que definen cómo se crean y gestionan los tokens fungibles en la blockchain de Ethereum. Estos tokens son intercambiables entre sí, como las monedas fiduciarias, y se utilizan para representar una variedad de activos digitales, como criptomonedas, tokens de utilidad y tokens de gobernanza.

Algunas características clave de los tokens ERC-20 son:

-   **Fungibilidad:** Cada token es idéntico a otro dentro del mismo conjunto.
-   **Transferibilidad:** Los tokens se pueden transferir entre direcciones de Ethereum.
-   **Aprobación:** Los usuarios pueden autorizar a terceros para que gasten sus tokens.
-   **Suministro total:** Se define la cantidad total de tokens que se emitirán.

El estándar ERC-20 ha sido fundamental para el crecimiento del ecosistema Ethereum, facilitando la creación de miles de tokens diferentes. De hecho, es el estándar más popular para la creación de criptomonedas en contratos inteligentes dedicados. Sin embargo, sus limitaciones en términos de cumplimiento normativo lo hacen inadecuado para la tokenización de RWA, que a menudo están sujetos a regulaciones específicas.

## ¿Qué son los tokens ERC-3643?

El estándar ERC-3643, también conocido como T-REX (Token for Regulated Exchanges), es una extensión del ERC-20 diseñada para la tokenización de activos regulados. A diferencia de ERC-20, ERC-3643 incorpora funcionalidades de cumplimiento que permiten la creación de tokens que se ajustan a las leyes de valores y otras regulaciones.

Las principales características de ERC-3643 son:

-   **Tokens con permisos:** Solo los usuarios que cumplen con ciertos criterios pueden poseer y transferir tokens.
-   **Funciones de transferencia condicional:** Las transferencias de tokens se pueden restringir en función de reglas predefinidas.
-   **Identidad digital:** Se utiliza la identidad digital para verificar la identidad de los usuarios y garantizar el cumplimiento.
-   **Cumplimiento en cadena:** La validación del cumplimiento se realiza en la propia blockchain, lo que aumenta la transparencia y la seguridad. Esto significa que las reglas de cumplimiento se integran directamente en el token, y la blockchain puede verificar automáticamente si se cumplen las condiciones necesarias para una transacción.

## Ventajas de ERC-3643 para la emisión de tokens RWA

ERC-3643 ofrece ventajas significativas sobre ERC-20 para la emisión de tokens RWA:

-   **Cumplimiento normativo:** ERC-3643 permite la creación de tokens que cumplen con las regulaciones, lo que facilita la tokenización de activos como valores, bienes raíces y deuda.
-   **Mayor seguridad:** La verificación de la identidad y las transferencias condicionales aumentan la seguridad de las transacciones y reducen el riesgo de fraude. Además, al requerir la identificación de todas las cuentas que realizan transacciones, ERC-3643 permite que la blockchain se convierta en un libro de contabilidad verificable, lo que aumenta la seguridad en comparación con ERC-20.
-   **Transparencia:** El cumplimiento en cadena proporciona un registro auditable de todas las transacciones, lo que aumenta la transparencia y la confianza.
-   **Interoperabilidad:** ERC-3643 es compatible con la infraestructura existente basada en ERC-20, lo que facilita la integración con aplicaciones y plataformas DeFi.
-   **Propiedad fraccionada y mercado secundario:** ERC-3643 permite la creación de tokens que representan la propiedad fraccionada de RWA, lo que facilita el acceso a la inversión en activos que antes eran inaccesibles para pequeños inversores. Además, facilita el desarrollo de mercados secundarios para estos tokens, lo que aumenta la liquidez.
-   **Gestión del ciclo de vida de los valores:** ERC-3643 proporciona más de 120 funciones para controlar y automatizar las operaciones posteriores a la emisión, como el bloqueo o la recuperación de tokens. Esto permite a los emisores cumplir con sus obligaciones regulatorias y gestionar el ciclo de vida de los valores de forma eficiente.
-   **Mayor confianza para los inversores institucionales:** ERC-3643 permite la aplicación de reglas predefinidas para la utilización de activos y los derechos de gobernanza, lo que aumenta la confianza y la transparencia para los inversores institucionales.
-   **Estandarización:** ERC-3643 aborda los desafíos de estandarización que antes dificultaban la entrada de los RWA en el espacio blockchain, lo que facilita una mayor adopción.

## Ejemplos de proyectos que utilizan ERC-3643

-   **Metro Futuro:** DApps Factory ha desarrollado una plataforma para la compra y venta de tokens vinculados a bienes raíces utilizando ERC-3643.
-   **Pivot:** DApps Factory ha desarrollado una plataforma para la compra y venta de tokens vinculados a bienes raíces utilizando ERC-3643.
-   **Aspen Digital Inc.:** Ha tokenizado la propiedad del St. Regis Aspen Resort en Colorado.
-   **Mazer Gaming:** Ha tokenizado su software de juegos y propiedad intelectual.
-   **Lithium Royalty Corp.:** Ha tokenizado sus regalías en proyectos de minería de litio.
-   **ERC3643 Onchain Factory:** Esta herramienta permite a los emisores desplegar y configurar tokens ERC-3643 de forma eficiente en una sola transacción, lo que simplifica el proceso de emisión.

## Conclusión

El estándar ERC-3643 representa un avance significativo en la tokenización de RWA, ofreciendo mayor seguridad, transparencia y cumplimiento normativo en comparación con ERC-20. Si bien su implementación es más compleja y puede resultar en mayores costos, las ventajas que ofrece lo convierten en una opción atractiva para proyectos que buscan tokenizar activos regulados.

La capacidad de ERC-3643 para integrar el cumplimiento normativo en la propia estructura del token, junto con sus funcionalidades avanzadas de gestión de identidad y transferencias condicionales, lo posicionan como un estándar clave para impulsar la adopción de la tokenización de RWA. Al facilitar la inversión en activos fraccionados y el desarrollo de mercados secundarios, ERC-3643 abre nuevas posibilidades para la democratización de las inversiones y la creación de un ecosistema financiero más eficiente e inclusivo.

A medida que la tokenización de RWA continúa creciendo y las regulaciones se vuelven más estrictas, es probable que ERC-3643 se convierta en el estándar dominante para la emisión de tokens que representan activos del mundo real. Su capacidad para abordar las necesidades específicas de los RWA, como la gestión del ciclo de vida de los valores y la garantía de la propiedad, lo convierten en una herramienta fundamental para el futuro de las finanzas descentralizadas.

## Fuentes citadas

1.  [ERC 3643 and how that benefits RWA Tokenization? - Zeeve](https://www.zeeve.io/blog/erc-3643-and-how-that-benefits-rwa-tokenization/)
2.  [ERC-3643 is looking for ways to bring compliance to RWA tokenization - Blockworks](https://blockworks.co/news/erc3643-for)
3.  [What are ERC-20 tokens? | Get Started with Bitcoin.com](https://www.bitcoin.com/get-started/what-are-erc-20-tokens/)
4.  [What is the ERC20 standard? - NBX](https://nbx.com/crypto101/what-is-the-erc20-standard)
5.  [ERC-3643: Unveiling the Future of Financial Compliance in Security Token Contracts](https://www.merklescience.com/erc-3643-unveiling-the-future-of-financial-compliance-in-security-token-contracts)

* * *

### Autor

[](blog-post.html)

**[HORACIO LAMPE](#)**

CEO

* * *
