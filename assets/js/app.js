/**
 * IMMUNOTEC LANDING PAGE & LINK-IN-BIO - VUE 3 APPLICATION
 * CRO (Conversion Rate Optimization) & Tracking Engine
 * Inspirado en la arquitectura visual y experiencia de Hotmart
 */

const { createApp, ref, reactive, computed, onMounted } = Vue;

const app = createApp({
  setup() {
    // Configuración global cargada desde config.js
    const config = window.APP_CONFIG || {
      advisor: {
        name: "Equilibrio y Bienestar",
        role: "Consultor de Bienestar y Salud Celular Immunotec",
        city: "México / Internacional",
        email: "equilibrionutricion8@gmail.com",
        whatsappNumber: "522441235715",
        whatsappDefaultMessage: "¡Hola! Vi tu página de Equilibrio y Bienestar y quiero información sobre los productos Immunotec."
      },
      socialLinks: {
        facebook: "https://www.facebook.com/share/1DWUMNvaXq/",
        instagram: "https://www.instagram.com/equilibrionutricion8?stkn=NHp1MjhkYWFuenJ1",
        tiktok: "https://www.tiktok.com/@equilibriobienestarnut",
        youtube: "https://www.youtube.com/channel/UCixehQX5txYGv-WPZ8OeeeA",
        whatsappDirect: "https://wa.me/522441235715"
      },
      leadCaptureMethod: 'whatsapp',
      pixels: {}
    };

    // Estado del Formulario
    const form = reactive({
      name: '',
      email: '',
      phone: '',
      goal: 'Sistema Inmune',
      message: '',
      contactPreference: 'whatsapp'
    });

    const errors = reactive({
      name: '',
      email: '',
      phone: ''
    });

    // Metas de bienestar disponibles para selección rápida
    const wellnessGoals = [
      { id: 'inmune', label: 'Sistema Inmune', icon: '🛡️', desc: 'Refuerzo de defensas y glutatión celular' },
      { id: 'energia', label: 'Energía & Vitalidad', icon: '⚡', desc: 'Combate el cansancio y aumenta tu rendimiento diario' },
      { id: 'deporte', label: 'Rendimiento Deportivo', icon: '🏃', desc: 'Fuerza, resistencia y óptima recuperación muscular' },
      { id: 'salud_general', label: 'Salud General & Longevidad', icon: '🌿', desc: 'Protección celular frente al estrés oxidativo' },
      { id: 'distribuidor', label: 'Distribución / Negocio', icon: '💼', desc: 'Conoce cómo emprender como asesor independiente' }
    ];

    // ========================================================
    // SECCIÓN ESTILO HOTMART: AUDIENCE SELECTOR ("Para quién es")
    // ========================================================
    const activeAudienceTab = ref('defensas');

    const audienceTabs = [
      { id: 'defensas', label: 'Para Defensas & Salud', icon: '🛡️' },
      { id: 'deportistas', label: 'Para Deportistas & Fitness', icon: '🏃' },
      { id: 'longevidad', label: 'Para Adultos & Vitalidad', icon: '🌿' },
      { id: 'emprendedores', label: 'Para Emprendedores & Negocio', icon: '💼' }
    ];

    const audienceData = {
      defensas: {
        tag: 'Inmunidad & Prevención Diaria',
        title: 'Protege tu cuerpo desde la célula con el precursor maestro de glutatión.',
        subtitle: 'Ideal para personas y familias que desean un sistema inmunológico fuerte, resistente y preparado ante cualquier cambio de estación o estrés ambiental.',
        image: 'assets/img/hero-wellness.jpg',
        features: [
          'Precursor bioactivo de glutatión probado clínicamente en humanos.',
          'Apoya la producción óptima de anticuerpos y glóbulos blancos.',
          'Ayuda a desintoxicar órganos vitales como hígado, pulmones y riñones.',
          'Apto para todas las edades, sin lactosa, sin gluten y sin azúcares añadidos.'
        ],
        stats: [
          { number: '+45', label: 'Años de investigación' },
          { number: '100%', label: 'Biodisponible' },
          { number: '#1', label: 'Patente mundial' }
        ],
        recommendedProduct: 'Immunocal® Regular',
        ctaGoal: 'Sistema Inmune',
        ctaText: 'Quiero asesoría para blindar mis defensas'
      },
      deportistas: {
        tag: 'Alto Rendimiento & Recuperación',
        title: 'Entrena más fuerte, acelera la recuperación y reduce el ácido láctico.',
        subtitle: 'Diseñado para atletas de élite, corredores, crossfitters y entusiastas del gimnasio que exigen el máximo rendimiento muscular sin sustancias prohibidas.',
        image: 'assets/img/science-lifestyle.jpg',
        features: [
          'Aumento clínico comprobado de hasta un 13% en fuerza y masa muscular magra.',
          'Fórmula avanzada con CMP™ (moduladores de citocinas) y RMF para balance de pH.',
          'Certificación Informed-Sport (libre de dopaje, seguro para competencia olímpica).',
          'Recuperación celular ultra rápida tras entrenamientos de alta intensidad.'
        ],
        stats: [
          { number: '+13%', label: 'Fuerza muscular demostrada' },
          { number: '0%', label: 'Sustancias dopantes (Clean Sport)' },
          { number: '24/7', label: 'Recuperación celular' }
        ],
        recommendedProduct: 'Immunocal® Platinum + Booster Energy',
        ctaGoal: 'Rendimiento Deportivo',
        ctaText: 'Quiero asesoría para mejorar mi rendimiento deportivo'
      },
      longevidad: {
        tag: 'Salud Integral & Envejecimiento Saludable',
        title: 'Mantén tu agilidad, salud ósea y claridad mental a cualquier edad.',
        subtitle: 'Para adultos que buscan preservar su energía natural, proteger sus articulaciones y combatir el estrés oxidativo responsable del envejecimiento celular prematuro.',
        image: 'assets/img/consultation.jpg',
        features: [
          'Neutraliza los radicales libres más agresivos a nivel mitocondrial.',
          'Apoya la densidad ósea y flexibilidad articular gracias a minerales quelados.',
          'Favorece la concentración, claridad mental y un descanso nocturno reparador.',
          'Respaldo en los libros de referencia médica internacional PDR (EE.UU.) y CPS (Canadá).'
        ],
        stats: [
          { number: '85+', label: 'Estudios publicados en PubMed' },
          { number: '30+', label: 'Países con registro sanitario' },
          { number: '1:1', label: 'Seguimiento en dosificación' }
        ],
        recommendedProduct: 'Immunocal® Platinum + Omega Gen V',
        ctaGoal: 'Salud General & Longevidad',
        ctaText: 'Quiero asesoría para vitalidad y longevidad'
      },
      emprendedores: {
        tag: 'Distribución Oficial & Oportunidad',
        title: 'Genera ingresos promoviendo ciencia real y bienestar con Immunotec.',
        subtitle: 'Conviértete en Consultor Independiente y accede a un modelo de negocio probado con expansión internacional, tienda virtual personalizada y comisiones semanales.',
        image: 'assets/img/consultation.jpg',
        features: [
          'Sin necesidad de inventarios pesados: Immunotec envía directamente a tu cliente.',
          'Plataforma digital con tienda online propia en más de 30 países.',
          'Precios de mayorista con hasta 45% de descuento en tus consumos y ventas.',
          'Acompañamiento, capacitaciones médicas y comerciales desde el primer día.'
        ],
        stats: [
          { number: '30+', label: 'Países para expandirte' },
          { number: 'Semanal', label: 'Pago de comisiones' },
          { number: '100%', label: 'Modelo digital y flexible' }
        ],
        recommendedProduct: 'Paquete de Inicio / Membresía de Consultor',
        ctaGoal: 'Distribución / Negocio',
        ctaText: 'Quiero información sobre cómo ser distribuidor'
      }
    };

    // ========================================================
    // SECCIÓN ESTILO HOTMART: CALCULADORA / EVALUADOR DE RUTINA
    // ========================================================
    const calc = reactive({
      goal: 'inmune',
      activity: 'moderado',
      age: '36-50'
    });

    const calculatedRecommendation = computed(() => {
      let comboName = 'Combo Inmuno-Protección Esencial';
      let product = 'Immunocal® Regular (1 a 2 sobres al día)';
      let booster = 'Recomendado: Booster Nrf2 Antioxidante';
      let benefit = 'Elevación rápida de glutatión y refuerzo del 100% de tus defensas celulares naturales.';
      let benefitPct = '+180% de síntesis antioxidante celular';

      if (calc.goal === 'deporte' || calc.activity === 'intenso') {
        comboName = 'Combo Atleta Pro & Rendimiento';
        product = 'Immunocal® Platinum (2 sobres diarios)';
        booster = 'Combinado con: Booster Energy Performance';
        benefit = 'Máxima recuperación de fibras musculares, aumento de fuerza comprobada y menor dolor post-entreno.';
        benefitPct = '+13% de fuerza y recuperación 2x más rápida';
      } else if (calc.goal === 'antiage' || calc.age === '51+') {
        comboName = 'Combo Longevidad Activa & Articulaciones';
        product = 'Immunocal® Platinum + Omega Gen V';
        booster = 'Combinado con: Booster Nrf2 con brócoli sulforafano';
        benefit = 'Protección integral ósea, articular y cardiovascular, combatiendo la oxidación celular.';
        benefitPct = 'Blindaje mitocondrial y soporte antiinflamatorio natural';
      } else if (calc.goal === 'energia') {
        comboName = 'Combo Vitalidad Total & Claridad';
        product = 'Immunocal® Regular + Booster Energy';
        booster = 'Activador Nrf2 con cafeína vegetal de té verde y guaraná';
        benefit = 'Energía sostenida durante todo el día sin picos de ansiedad ni bajones por la tarde.';
        benefitPct = 'Claridad mental y energía limpia por más de 6 horas';
      } else if (calc.goal === 'negocio') {
        comboName = 'Plan Emprendedor Independiente Immunotec';
        product = 'Kit de Afiliación con Descuento Mayorista';
        booster = 'Incluye tienda virtual internacional y oficina virtual';
        benefit = 'Comienza tu distribución en más de 30 países con respaldo científico y asesoría de equipo.';
        benefitPct = 'Márgenes de hasta 45% y comisiones semanales';
      }

      return {
        comboName,
        product,
        booster,
        benefit,
        benefitPct
      };
    });

    // ========================================================
    // PREGUNTAS FRECUENTES (FAQ INTERACTIVO ESTILO HOTMART)
    // ========================================================
    const openFaqIndex = ref(0);

    const toggleFaq = (index) => {
      openFaqIndex.value = openFaqIndex.value === index ? null : index;
    };

    const faqList = [
      {
        question: '¿Qué es el Glutatión y por qué no se puede tomar en pastillas normales?',
        answer: 'El glutatión es el antioxidante maestro del cuerpo, fundamental para la inmunidad, la desintoxicación y la salud celular. Si tomas glutatión directamente en pastillas o cápsulas, el sistema digestivo (los jugos gástricos) lo destruye antes de que llegue a las células. Immunocal® es único y patentado porque NO es glutatión procesado: entrega cisteína bioactiva enlazada, la materia prima exacta que tus células necesitan para fabricar su propio glutatión de manera 100% natural y eficiente.'
      },
      {
        question: '¿Cuál es la diferencia entre Immunocal Regular e Immunocal Platinum?',
        answer: 'Immunocal Regular es el aislado de proteína de suero no desnaturalizado original, perfecto para personas de todas las edades que desean fortalecer su sistema inmune y elevar defensas. Immunocal Platinum contiene toda la base de Regular MÁS dos componentes patentados: CMP™ (péptidos moduladores de citocinas para reducir la inflamación celular) y RMF (fórmula moduladora redox para equilibrar el pH, salud ósea y muscular). Platinum es el recomendado para adultos, personas con dolor articular o deportistas.'
      },
      {
        question: '¿Tiene contraindicaciones o efectos secundarios?',
        answer: 'Immunocal es un suplemento alimenticio completamente seguro con calidad de grado farmacéutico. No contiene grasa, gluten ni lactosa (menos del 1% de traza residual, por lo que es tolerado incluso por personas intolerantes a la lactosa). La única contraindicación médica estricta es para personas que hayan recibido un trasplante reciente de órganos con tratamiento inmunosupresor (para evitar que las defensas eleven su respuesta de rechazo), o personas con alergia severa a las proteínas del suero de leche.'
      },
      {
        question: '¿En cuánto tiempo se empiezan a notar los resultados?',
        answer: 'Los niveles de glutatión celular comienzan a elevarse desde los primeros días de consumo constante. La mayoría de las personas reportan mayor energía, mejor calidad de sueño y menor pesadez a partir de las primeras 2 a 3 semanas. Para metas crónicas de bienestar o rendimiento deportivo, se recomienda un programa inicial continuo de al menos 90 días con seguimiento personalizado de tu asesor.'
      },
      {
        question: '¿Cómo se prepara correctamente para no dañar sus propiedades?',
        answer: 'Debido a que la cisteína bioactiva es termosensible, Immunocal NUNCA debe mezclarse con líquidos calientes ni batirse en licuadoras de metal con alta fricción. Se prepara fácilmente en el vaso mezclador oficial de Immunotec: añades 30 ml de agua, jugo natural o yogur a temperatura ambiente o frío, viertes el sobre, agitas durante 15 segundos y disfrutas de inmediato.'
      },
      {
        question: '¿Cómo puedo comprar con precio oficial de descuento o membresía?',
        answer: 'Al contactarnos como asesores independientes oficiales, te vinculamos directamente con la plataforma de fábrica de Immunotec en tu país. Esto te permite acceder a los precios con descuento de Cliente Preferente (hasta un 25% menos) o a los paquetes de membresía con precio de mayorista (hasta 45% de descuento), garantizando producto 100% original con envío y factura oficial de la compañía.'
      },
      {
        question: '¿En qué países tienen entrega oficial a domicilio?',
        answer: 'Immunotec cuenta con distribución y centros de distribución legalmente establecidos en más de 30 países, incluyendo México, Estados Unidos, Canadá, Colombia, Perú, Guatemala, Ecuador, República Dominicana, España, Reino Unido, Irlanda, Portugal, Italia y más. El pedido se entrega por paquetería certificada directo a la puerta de tu hogar.'
      }
    ];

    // ========================================================
    // TESTIMONIOS Y PRUEBA SOCIAL ESTILO HOTMART
    // ========================================================
    const testimonials = [
      {
        name: 'Dra. Carmen Valenzuela',
        role: 'Médico General & Asesora',
        city: 'Ciudad de México, MX',
        avatar: 'CV',
        rating: 5,
        text: 'Como profesional de la salud, lo primero que revisé fue el respaldo en el PDR de EE.UU. y los estudios en PubMed. Immunocal no es un producto milagro, es ciencia celular pura que apoya la fisiología del cuerpo como ningún otro suplemento.',
        highlight: 'Respaldo científico comprobado'
      },
      {
        name: 'Alejandro Morales',
        role: 'Triatleta & Entrenador',
        city: 'Medellín, CO',
        avatar: 'AM',
        rating: 5,
        text: 'Llevo 2 años usando Immunocal Platinum junto con Booster Energy. Mis tiempos de recuperación entre sesiones dobles de entrenamiento bajaron notablemente y el ácido láctico ya no me frena como antes. Totalmente limpio para doping.',
        highlight: 'Recuperación muscular insuperable'
      },
      {
        name: 'Martha Sotomayor (62 años)',
        role: 'Cliente Preferente',
        city: 'Lima, PE',
        avatar: 'MS',
        rating: 5,
        text: 'Empecé por recomendación de mi hermana porque sentía mucha pesadez y cansancio al final de la tarde. Hoy mi energía es constante, duermo profundo y me siento con vitalidad para jugar con mis nietos todos los fines de semana.',
        highlight: 'Vitalidad renovada a los 60+'
      },
      {
        name: 'Roberto & Sofía Méndez',
        role: 'Consultores Independientes',
        city: 'Houston, TX (EE.UU.)',
        avatar: 'RM',
        rating: 5,
        text: 'Comenzamos como consumidores para mejorar las defensas de la familia. Al ver los resultados, decidimos compartirlo. Hoy tenemos un equipo de distribución en 4 países y un negocio que nos da libertad de tiempo y estabilidad.',
        highlight: 'Crecimiento e ingresos con propósito'
      }
    ];

    // Estados de UI y Modales
    const isSubmitting = ref(false);
    const submitted = ref(false);
    const submitSuccessMessage = ref('');
    const floatingChatOpen = ref(false);
    const unreadMessagesCount = ref(1);

    // Detección de parámetros de campaña (UTM) desde Redes Sociales
    const utmParams = reactive({
      source: '',
      medium: '',
      campaign: '',
      term: '',
      content: ''
    });

    // Simulador de Chat Interactivo en el Hero
    const chatMessages = ref([
      {
        id: 1,
        sender: 'advisor',
        time: 'En línea',
        text: '¡Hola! 👋 Soy tu asesor de bienestar Immunotec. Cuéntame qué meta tienes y te compartiré información útil y personalizada.'
      }
    ]);

    const chatOptions = [
      { text: '🛡️ Quiero fortalecer mi Sistema Inmune', goal: 'Sistema Inmune', reply: '¡Excelente decisión! Immunocal® es el precursor de glutatión patentado número 1 en el mundo. Con gusto te explico cómo tomarlo y cuál es el ideal para ti.' },
      { text: '⚡ Necesito más energía y menos fatiga', goal: 'Energía & Vitalidad', reply: '¡Perfecto! Para la energía celular y claridad mental, la combinación de Immunocal con Booster es fantástica. Cuéntame tu rutina en el formulario para asesorarte.' },
      { text: '🏃 Rendimiento físico y deporte', goal: 'Rendimiento Deportivo', reply: '¡Genial! Immunocal Platinum y Booster Energy son los favoritos de atletas de alto rendimiento para acelerar la recuperación y reducir ácido láctico.' },
      { text: '📦 ¿Cuáles son los precios y combos oficiales?', goal: 'Salud General & Longevidad', reply: 'Tenemos precios directos de laboratorio con descuento especial de cliente preferente o membresía. Déjame tus datos y te envío la lista de precios oficial de tu país.' }
    ];

    // Interacción del chat interactivo
    const handleChatOptionClick = (option) => {
      chatMessages.value.push({
        id: Date.now(),
        sender: 'user',
        time: 'Ahora',
        text: option.text
      });

      form.goal = option.goal;

      setTimeout(() => {
        chatMessages.value.push({
          id: Date.now() + 1,
          sender: 'advisor',
          time: 'Ahora',
          text: option.reply
        });
      }, 500);

      triggerPixelEvent('ViewContent', { content_name: option.goal });
    };

    // Validación de inputs (Contacto exclusivo por WhatsApp)
    const validateForm = () => {
      let isValid = true;
      errors.name = '';
      errors.email = '';
      errors.phone = '';

      if (!form.name.trim()) {
        errors.name = 'Por favor escribe tu nombre completo.';
        isValid = false;
      } else if (form.name.trim().length < 3) {
        errors.name = 'El nombre debe tener al menos 3 caracteres.';
        isValid = false;
      }

      if (!form.phone.trim()) {
        errors.phone = 'Por favor ingresa tu número de WhatsApp con código de área.';
        isValid = false;
      } else if (form.phone.trim().replace(/\D/g, '').length < 8) {
        errors.phone = 'Ingresa un número válido de WhatsApp (mínimo 8-10 dígitos).';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (form.email.trim() && !emailRegex.test(form.email.trim())) {
        errors.email = 'Ingresa un formato de correo válido (ej: nombre@correo.com).';
        isValid = false;
      }

      return isValid;
    };

    // Motor de Tracking para Meta Pixel, TikTok Pixel y Google Analytics
    const triggerPixelEvent = (eventName, params = {}) => {
      if (typeof window.fbq === 'function') {
        try {
          window.fbq('track', eventName, params);
          console.log(`[Tracking] Meta Pixel evento '${eventName}':`, params);
        } catch (e) {
          console.warn('[Tracking] Error enviando a Meta Pixel:', e);
        }
      }

      if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') {
        try {
          const ttEventMap = {
            'Lead': 'SubmitForm',
            'Contact': 'Contact',
            'ViewContent': 'ViewContent',
            'PageView': 'PageView'
          };
          const ttEventName = ttEventMap[eventName] || eventName;
          window.ttq.track(ttEventName, params);
          console.log(`[Tracking] TikTok Pixel evento '${ttEventName}':`, params);
        } catch (e) {
          console.warn('[Tracking] Error enviando a TikTok Pixel:', e);
        }
      }

      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', eventName, params);
          console.log(`[Tracking] GA4 evento '${eventName}':`, params);
        } catch (e) {
          console.warn('[Tracking] Error enviando a GA4:', e);
        }
      }
    };

    // Construcción del enlace personalizado de WhatsApp
    const buildWhatsAppUrl = (customText = null) => {
      const phone = config.advisor.whatsappNumber || '522441235715';
      let message = customText;

      if (!message) {
        if (form.name.trim()) {
          message = `¡Hola ${config.advisor.name}! 👋\n\n` +
                    `Mi nombre es *${form.name.trim()}*.\n` +
                    (form.phone.trim() ? `📱 Mi WhatsApp: *${form.phone.trim()}*\n` : '') +
                    (form.email.trim() ? `📧 Correo: ${form.email.trim()}\n` : '') +
                    `🎯 Mi meta principal: *${form.goal}*\n` +
                    (form.message.trim() ? `💬 Mis dudas u objetivos: "${form.message.trim()}"\n` : '') +
                    (utmParams.source ? `📍 Origen: Redes Sociales (${utmParams.source})\n` : '') +
                    `\nQuisiera recibir orientación personalizada sobre los productos Immunotec.`;
        } else {
          message = config.advisor.whatsappDefaultMessage || "¡Hola! Vi tu página de Equilibrio y Bienestar y quiero información sobre los productos Immunotec.";
        }
      }

      return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    // Apertura directa de WhatsApp con tracking de Contacto
    const openWhatsApp = (customText = null) => {
      triggerPixelEvent('Contact', {
        content_name: 'WhatsApp Click',
        status: 'Advisor Chat Initiated'
      });
      const url = buildWhatsAppUrl(customText);
      window.open(url, '_blank');
    };

    // Enviar WhatsApp directo con los datos de la Calculadora de Rutina
    const consultCalculatedRoutineOnWhatsApp = () => {
      const rec = calculatedRecommendation.value;
      const text = `¡Hola ${config.advisor.name}! 👋 Utilicé la calculadora en tu página.\n\n` +
                   `🎯 Mi meta: *${calc.goal.toUpperCase()}*\n` +
                   `🏃 Nivel de actividad: *${calc.activity.toUpperCase()}*\n` +
                   `🎂 Rango de edad: *${calc.age}*\n\n` +
                   `💡 Me recomendó el *${rec.comboName}* (${rec.product} + ${rec.booster}).\n` +
                   `¿Me podrías brindar precios y cómo adquirirlo en mi país con descuento oficial?`;
      openWhatsApp(text);
    };

    // Reiniciar formulario para nueva consulta
    const resetForm = () => {
      submitted.value = false;
      form.name = '';
      form.email = '';
      form.phone = '';
      form.message = '';
      form.goal = 'Sistema Inmune';
      form.contactPreference = 'whatsapp';
      errors.name = '';
      errors.email = '';
      errors.phone = '';
    };

    // Envío del Formulario (CRO Lead Generation - Conexión directa a WhatsApp)
    const submitForm = async () => {
      if (!validateForm()) {
        const firstErrorEl = document.querySelector('.text-red-500');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      isSubmitting.value = true;

      triggerPixelEvent('Lead', {
        content_name: form.goal,
        user_name: form.name,
        user_email: form.email,
        contact_preference: 'whatsapp',
        traffic_source: utmParams.source || 'Direct'
      });

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        goal: form.goal,
        message: form.message,
        contactPreference: 'whatsapp',
        submittedAt: new Date().toISOString(),
        utm: { ...utmParams }
      };

      try {
        if (config.leadCaptureMethod === 'formspree' && config.formspreeId) {
          const response = await fetch(`https://formspree.io/f/${config.formspreeId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!response.ok) throw new Error('Error al enviar a Formspree');
        } else if (config.leadCaptureMethod === 'webhook' && config.webhookUrl) {
          await fetch(config.webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        // Respaldo de lead en localStorage
        try {
          const storedLeads = JSON.parse(localStorage.getItem('immunotec_leads') || '[]');
          storedLeads.push(payload);
          localStorage.setItem('immunotec_leads', JSON.stringify(storedLeads));
        } catch (storageErr) {
          console.warn('No se pudo guardar copia local en localStorage:', storageErr);
        }

        submitted.value = true;
        submitSuccessMessage.value = `¡Gracias ${form.name.split(' ')[0]}! Conectando con tu asesor por WhatsApp...`;

        setTimeout(() => {
          openWhatsApp();
        }, 1000);

      } catch (err) {
        console.error('Error al registrar lead:', err);
        submitted.value = true;
        submitSuccessMessage.value = `¡Gracias ${form.name.split(' ')[0]}! Haz clic en el botón abajo para abrir WhatsApp.`;
      } finally {
        isSubmitting.value = false;
      }
    };

    // Selección de meta desde cualquier botón o chip
    const selectGoalAndScroll = (goalName) => {
      form.goal = goalName;
      const target = document.getElementById('formulario');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Scroll suave genérico a sección
    const scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Inicialización y captura de UTMs
    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      utmParams.source = urlParams.get('utm_source') || (document.referrer ? new URL(document.referrer).hostname : 'Direct');
      utmParams.medium = urlParams.get('utm_medium') || '';
      utmParams.campaign = urlParams.get('utm_campaign') || '';
      utmParams.term = urlParams.get('utm_term') || '';
      utmParams.content = urlParams.get('utm_content') || '';

      const metaParam = urlParams.get('meta') || urlParams.get('goal');
      if (metaParam) {
        const found = wellnessGoals.find(g => g.id.toLowerCase() === metaParam.toLowerCase());
        if (found) form.goal = found.label;
      }

      console.log('Landing Immunotec inicializada. Origen detectado:', utmParams.source);
    });

    return {
      config,
      form,
      errors,
      wellnessGoals,
      isSubmitting,
      submitted,
      submitSuccessMessage,
      floatingChatOpen,
      unreadMessagesCount,
      chatMessages,
      chatOptions,
      handleChatOptionClick,
      submitForm,
      openWhatsApp,
      resetForm,
      selectGoalAndScroll,
      scrollToSection,
      // Nuevos estados estilo Hotmart
      activeAudienceTab,
      audienceTabs,
      audienceData,
      calc,
      calculatedRecommendation,
      consultCalculatedRoutineOnWhatsApp,
      openFaqIndex,
      toggleFaq,
      faqList,
      testimonials
    };
  }
});

app.mount('#app');
