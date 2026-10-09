/**
 * BASE DE CONOCIMIENTO OFICIAL DE PRODUCTOS E INFORMACIÓN CIENTÍFICA IMMUNOTEC
 * Para el Motor de Asesoría y Cierre de Ventas con IA (Gemini)
 * Marca: Equilibrio y Bienestar - Asesor Independiente Immunotec
 * Fuente oficial: https://www.immunotec.com/es-MX/products
 */

window.IMMUNOTEC_KNOWLEDGE_BASE = {
  brand: {
    name: "Equilibrio y Bienestar",
    officialRole: "Consultores y Asesores Independientes Certificados de Immunotec",
    description: "Plataforma de orientación personalizada en nutrición celular, defensas y longevidad.",
    guarantee: "Todos los pedidos se gestionan con la fábrica oficial de Immunotec. Producto 100% original con envío certificado a domicilio en más de 30 países.",
    scamWarning: "ADVERTENCIA IMPORTANTE: Immunotec no vende a través de Mercado Libre, Amazon o plataformas no autorizadas. Comprar allí anula la garantía de satisfacción de 30 días y conlleva alto riesgo de producto caducado o adulterado. Solo compra a través de un asesor oficial registrado."
  },

  science: {
    glutathione: {
      definition: "El Glutatión es el antioxidante maestro del organismo humano, producido naturalmente dentro de cada una de nuestras células.",
      whyOralGlutathioneFails: "Tomar pastillas o cápsulas de glutatión procesado NO funciona porque los jugos gástricos y el tracto digestivo lo degradan y destruyen antes de llegar a la célula. La única manera eficaz y científicamente validada es entregar a la célula CISTEÍNA BIOACTIVA ENLAZADA (termosensible), que es el precursor exacto y limitante para que el cuerpo sintetice su propio glutatión.",
      vitalFunctions: [
        "I - Inmunológico: Optimiza y modula la respuesta de glóbulos blancos y anticuerpos.",
        "D - Desintoxicante: Neutraliza y elimina toxinas, metales pesados, pesticidas y carcinógenos (principalmente en hígado y riñones).",
        "E - Energía Celular: Protege las mitocondrias, aumentando la producción de ATP (energía pura).",
        "A - Antioxidante Maestro: Recicla otros antioxidantes como las vitaminas C y E, neutralizando radicales libres."
      ],
      scientificBacking: [
        "+45 años de investigación médica iniciada por el Dr. Gustavo Bounous y la Dra. Patricia Kongshavn en la Universidad McGill (Canadá).",
        "Aparece en el PDR (Physicians' Desk Reference de EE.UU.) y en el CPS (Compendium of Pharmaceuticals and Specialties de Canadá).",
        "Más de 85 estudios científicos publicados y revisados por pares en PubMed.",
        "Patentes de método de uso en EE.UU., Canadá y más de 30 países para el tratamiento y prevención celular.",
        "Mención de honor en el libro del Dr. Luc Montagnier (Premio Nobel de Medicina 2008), quien dedicó un capítulo entero a Immunocal en su libro sobre estrés oxidativo."
      ]
    }
  },

  products: [
    {
      id: "immunocal-regular",
      name: "Immunocal® Regular (Clásico - Caja Azul)",
      badge: "Precursor Maestro de Glutatión",
      category: "Nutrición Celular / Sistema Inmune",
      description: "Aislado de proteína de suero de leche no desnaturalizado con cisteína bioactiva enlazada (Bonded Cysteine). Es la fórmula clásica que eleva y mantiene niveles óptimos de glutatión.",
      benefits: [
        "Fortalece y equilibra el sistema inmunitario de forma natural.",
        "Favorece la desintoxicación de órganos vitales como hígado, pulmones y riñones.",
        "Eleva los niveles de energía celular y combate la fatiga crónica.",
        "Retrasa el envejecimiento celular neutralizando el estrés oxidativo.",
        "No contiene grasa, ni gluten, ni azúcares añadidos. Menos del 1% de lactosa residual (apto para intolerantes)."
      ],
      whoIsItFor: "Para toda la familia: niños, jóvenes, adultos, mujeres embarazadas o en lactancia (con supervisión), personas que desean prevenir enfermedades y personas convalecientes.",
      dosageRecommendation: "Mantenimiento / Prevención: 1 sobre al día en ayunas. Apoyo moderado: 2 sobres al día (1 en la mañana, 1 a media tarde). Retos de salud importantes: 3 a 4 sobres al día repartidos.",
      presentation: "Caja con 30 sobres de 10 gramos cada uno."
    },
    {
      id: "immunocal-platinum",
      name: "Immunocal® Platinum (Fórmula Avanzada - Caja Plata)",
      badge: "Fórmula Avanzada Antiinflamatoria & pH",
      category: "Adultos, Desgaste Celular & Rendimiento",
      description: "Contiene toda la base de cisteína bioactiva de Immunocal Regular MÁS dos componentes patentados exclusivos: CMP™ (Cytokine Modulating Proteins) y RMF (Redox Modulating Formula).",
      benefits: [
        "CMP™: Péptidos que modulan las citocinas inflamatorias, reduciendo la inflamación celular y el dolor articular.",
        "RMF: Mezcla natural de citratos de potasio, magnesio y calcio que balancean el pH corporal, reducen la acidez celular y protegen la densidad ósea.",
        "Ayuda a preservar la masa muscular magra y la fuerza física (combate la sarcopenia).",
        "Aumenta la fuerza muscular demostrada clínicamente hasta en un 13%.",
        "Ideal para articulaciones, dolor crónico, deportistas y personas mayores de 35-40 años."
      ],
      whoIsItFor: "Adultos de 35+ años, personas con dolores en articulaciones, retos inflamatorios o degenerativos, hipertensos, deportistas de alta exigencia.",
      dosageRecommendation: "Mantenimiento: 1 sobre al día. Desgaste o dolor articular: 2 sobres al día (1 por la mañana, 1 por la tarde). Retos crónicos: 3 a 4 sobres al día (se puede combinar 2 Regular + 2 Platinum).",
      presentation: "Caja con 30 sobres de 12.5 gramos cada uno."
    },
    {
      id: "immunocal-sport",
      name: "Immunocal® Sport",
      badge: "Alto Rendimiento & Óxido Nítrico",
      category: "Deporte y Fitness de Élite",
      description: "Fórmula diseñada específicamente para atletas y deportistas de élite. Combina la cisteína bioactiva con precursores de óxido nítrico (Nitro Bst), extracto de remolacha, L-citrulina, cereza ácida y magnesio.",
      benefits: [
        "Aumenta la vasodilatación y el flujo de oxígeno a los músculos gracias al óxido nítrico.",
        "Acelera la recuperación muscular y disminuye los dolores post-entrenamiento (DOMS).",
        "Certificación Informed-Sport: Libre de sustancias dopantes, 100% seguro para deportistas olímpicos y de competición.",
        "Reduce la acumulación de ácido láctico durante entrenamientos de alta intensidad."
      ],
      whoIsItFor: "Deportistas, personas que van al gimnasio, corredores, ciclistas, triatletas y profesionales del fitness.",
      dosageRecommendation: "1 sobre 30 a 45 minutos antes del entrenamiento o actividad deportiva intensa.",
      presentation: "Caja con 30 sobres."
    },
    {
      id: "immunocal-booster-optimizer",
      name: "Immunocal Booster (Optimizer) - Verdes",
      badge: "Catalizador Nrf2 & 50 Superalimentos",
      category: "Potenciador Celular",
      description: "Contiene sulforafano (extracto concentrado de semillas de brócoli) y fitonutrientes de más de 50 frutas y verduras orgánicas. Activa el interruptor epigenético Nrf2 del cuerpo.",
      benefits: [
        "Multiplica la efectividad del glutatión: hace que trabaje hasta 3 veces más tiempo dentro de la célula.",
        "Enciende los genes antioxidantes propios de defensa celular.",
        "Aporta selenio, vitamina C y fitonutrientes esenciales.",
        "Sabor a frutas naturales muy agradable que se mezcla perfectamente en el mismo vaso con Immunocal."
      ],
      whoIsItFor: "Cualquier persona que ya tome Immunocal y desee potenciar sus resultados al máximo nivel.",
      dosageRecommendation: "1 sobre al día, preferentemente mezclado junto con tu sobre de Immunocal en el mismo vaso.",
      presentation: "Caja con 30 sobres."
    },
    {
      id: "immunocal-booster-energy",
      name: "Immunocal Booster Energy - Rojos",
      badge: "Energía Limpia & Sostenida",
      category: "Energía y Concentración",
      description: "Combina el poder del Nrf2 con 3 fuentes botánicas naturales de cafeína (extracto de té verde, grano de café verde y semilla de guaraná), más un complejo de vitaminas B y vitamina C.",
      benefits: [
        "Brinda energía limpia, rápida y sostenida por hasta 6 horas continuas.",
        "Sin taquicardias, sin temblores ni el típico 'bajón' de las bebidas energéticas tradicionales.",
        "No contiene azúcar añadida ni químicos artificiales dañinos.",
        "Mejora el estado de alerta, el enfoque mental y el rendimiento físico."
      ],
      whoIsItFor: "Estudiantes, profesionistas, conductores, deportistas o personas que padecen cansancio diurno y necesitan energía saludable.",
      dosageRecommendation: "1 sobre disuelto en agua por la mañana o antes de requerir un boost de energía.",
      presentation: "Caja con 30 sobres."
    },
    {
      id: "omega-gen-v",
      name: "Omega Gen V",
      badge: "5 en 1 para Corazón, Cerebro y Ojos",
      category: "Salud Cardiovascular & Cerebral",
      description: "Suplemento premium que combina 5 ingredientes sinérgicos en una sola perla: Omega-3 de alta pureza (EPA y DHA), Coenzima Q10, Cúrcuma, Vitamina E y Piperina (extracto de pimienta negra para máxima absorción).",
      benefits: [
        "Protege el sistema cardiovascular y apoya niveles saludables de triglicéridos.",
        "CoQ10 genera energía celular directamente en las mitocondrias del músculo cardíaco.",
        "Cúrcuma y Vitamina E brindan potente acción antiinflamatoria sistémica.",
        "Apoya la concentración, memoria y salud visual a largo plazo.",
        "Libre de regusto a pescado gracias a su proceso de purificación molecular."
      ],
      whoIsItFor: "Adultos que desean proteger su corazón, presión arterial, memoria y articulaciones.",
      dosageRecommendation: "2 cápsulas blandas al día junto con las comidas principales.",
      presentation: "Frasco con 60 cápsulas blandas."
    },
    {
      id: "k-21",
      name: "K-21+ Mineral Herbal Complex",
      badge: "Tónico Adaptógeno & Digestivo",
      category: "Balance Metabólico & Antiestrés",
      description: "Fórmula líquida concentrada a base de hierbas adaptógenas (Rhodiola rosea, tomillo, manzanilla, alfalfa) y minerales esenciales como potasio, yodo y magnesio.",
      benefits: [
        "Ayuda al cuerpo a adaptarse y resistir el estrés físico y emocional diario.",
        "Apoya la digestión óptima y la función hepática.",
        "Aporta potasio biodisponible para el equilibrio de fluidos y salud muscular.",
        "Sabor herbal fresco y agradable."
      ],
      whoIsItFor: "Personas con estrés elevado, problemas digestivos frecuentes o fatiga adrenal.",
      dosageRecommendation: "1 a 2 cucharadas (15 a 30 ml) diluidas en agua fría diariamente.",
      presentation: "Botella líquida de 1 Litro (1000 ml)."
    },
    {
      id: "cogniva",
      name: "Cogniva con Synapsa®",
      badge: "Nootrópico Celular para la Mente",
      category: "Memoria, Foco & Concentración",
      description: "Masticable sabor a frutas formulado con Synapsa® (extracto patentado de Bacopa monnieri clínicamente probado), extracto de té verde y vitamina B12.",
      benefits: [
        "Acelera el procesamiento mental y la retención de información.",
        "Mejora la memoria de trabajo y la concentración bajo presión.",
        "Ideal para estudiar, trabajar o prevenir deterioro cognitivo relacionado con la edad.",
        "Presentación masticable práctica y deliciosa sin necesidad de agua."
      ],
      whoIsItFor: "Estudiantes universitarios, profesionistas de alta demanda mental y personas mayores.",
      dosageRecommendation: "1 masticable al día por la mañana o media tarde.",
      presentation: "Caja con 30 masticables."
    },
    {
      id: "magistral",
      name: "Magistral",
      badge: "Salud Prostática Masculina",
      category: "Salud del Hombre",
      description: "Fórmula líquida tradicional para el bienestar de la próstata a base de Saw Palmetto, corteza de Pygeum africanum, hoja de Damiana y zinc.",
      benefits: [
        "Ayuda a mantener la función urinaria normal y confortable en hombres.",
        "Disminuye la frecuencia de micción nocturna (despertarse a orinar).",
        "Apoya la salud y tamaño normal de la próstata a partir de los 40 años."
      ],
      whoIsItFor: "Hombres mayores de 40 años o con molestias urinarias leves.",
      dosageRecommendation: "1 cucharada (15 ml) al día.",
      presentation: "Botella líquida de 500 ml."
    }
  ],

  preparationInstructions: {
    title: "Protocolo Oficial de Preparación de Immunocal",
    goldenRules: [
      "1. NUNCA calentar ni usar líquidos calientes (la cisteína bioactiva es termosensible y el calor la desnaturaliza/inactiva).",
      "2. NUNCA usar licuadora eléctrica de aspas metálicas (la alta fricción y las aspas rompen los enlaces de la proteína).",
      "3. Usar siempre el vaso mezclador oficial con rejilla (shaker) de Immunotec o agitar suavemente."
    ],
    stepByStep: [
      "Paso 1: Vierte 30 ml (aproximadamente 1 onza, el equivalente a 2 dedos de agua) de agua natural, jugo de naranja/manzana o yogur líquido a temperatura ambiente o frío en el vaso mezclador.",
      "Paso 2: Abre el sobre de Immunocal y vacíalo dentro del vaso.",
      "Paso 3: Coloca la tapa hermética y agita vigorosamente durante 15 a 20 segundos.",
      "Paso 4: Si deseas, añade un poco más de agua o jugo para ajustar la consistencia y bébelo de inmediato.",
      "Nota: Si tomas Booster (Optimizer), puedes vaciar ambos sobres (Immunocal + Booster) en el mismo vaso y mezclarlos juntos."
    ]
  },

  safetyAndContraindications: {
    safety: "Immunocal cuenta con la designación GRAS (Generally Recognized As Safe) de la FDA de EE.UU. Es un suplemento de grado farmacéutico sin sobredosis tóxica reportada.",
    strictContraindication: "ÚNICA CONTRAINDICACIÓN MÉDICA ESTRICTA: Personas que hayan recibido un trasplante de órganos vivos (riñón, hígado, corazón, etc.) y estén bajo tratamiento médico inmunosupresor. Esto se debe a que Immunocal eleva y fortalece el sistema inmunológico, lo que podría aumentar el riesgo de rechazo del órgano trasplantado.",
    lactoseTolerance: "Contiene menos del 1% de lactosa residual (la lactosa se elimina casi en su totalidad durante el proceso patentado de microfiltración). La inmensa mayoría de intolerantes a la lactosa lo consumen sin ningún problema.",
    pregnancyAndKids: "Immunocal Regular es seguro para niños y mujeres embarazadas o en periodo de lactancia, ya que es proteína láctea de la más alta calidad biológica (similar a las proteínas de la leche materna)."
  },

  purchasingAndDiscounts: {
    discountOptions: [
      {
        type: "Cliente Minorista",
        discount: "Precio de lista público",
        description: "Compra directa sin compromiso ni registro."
      },
      {
        type: "Cliente Preferente",
        discount: "Hasta 25% de Descuento",
        description: "Acceso a precios reducidos oficiales registrándote como cliente preferente oficial de fábrica con entrega a domicilio."
      },
      {
        type: "Paquete de Inicio / Membresía de Consultor",
        discount: "Hasta 40% a 45% de Descuento (Precio de Mayorista)",
        description: "La mejor opción de ahorro para familias o tratamientos de 3 a 6 meses. Incluye paquetes combinados (ejemplo: 4 cajas de Immunocal Platinum o combos familiares) con el precio más bajo por caja garantizado y sin obligación de compras mensuales forzosas."
      }
    ],
    shippingCoverage: "Envíos directos y garantizados en México, Estados Unidos, Canadá, Colombia, Perú, Guatemala, Ecuador, España, República Dominicana, Reino Unido, y más de 30 países.",
    deliveryTime: "De 2 a 5 días hábiles promedio vía paqueterías líderes (DHL, FedEx, Estafeta, UPS) con número de rastreo oficial."
  },

  salesStrategy: {
    salesFlow: [
      "1. Empatía y Escucha: Preguntar amablemente qué necesidad o meta de salud tiene el cliente o su familiar.",
      "2. Educación Científica Simple: Explicar por qué el Glutatión es la clave y por qué Immunocal es el único patentado para elevarlo.",
      "3. Recomendación Específica: Indicar el producto ideal (Regular para prevención/niños; Platinum para adultos/dolor articular; Sport para ejercicio; combos con Booster/Omega para casos crónicos).",
      "4. Justificación del Valor: Destacar los avales (PDR, estudios PubMed, +45 años de ciencia, cero efectos secundarios).",
      "5. Cierre y Derivación a WhatsApp: Ofrecer cotizar el paquete con descuento de fábrica (hasta 25% o 45%) y derivar al prospecto con uno de los 4 asesores oficiales con mensaje pre-armado."
    ]
  }
};
