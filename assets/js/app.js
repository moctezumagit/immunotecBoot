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
        whatsappNumber: "522227708716",
        whatsappDefaultMessage: "¡Hola! Vi tu página de Equilibrio y Bienestar y quiero información sobre los productos Immunotec."
      },
      socialLinks: {
        facebook: "https://www.facebook.com/share/1DWUMNvaXq/",
        instagram: "https://www.instagram.com/equilibrionutricion8?stkn=NHp1MjhkYWFuenJ1",
        tiktok: "https://www.tiktok.com/@equilibriobienestarnut",
        youtube: "https://www.youtube.com/channel/UCixehQX5txYGv-WPZ8OeeeA",
        whatsappDirect: "https://wa.me/522227708716"
      },
      googleSheetsUrl: '',
      leadCaptureMethod: 'whatsapp',
      formspreeId: '',
      webhookUrl: '',
      pixels: {}
    };

    // Función para normalizar números celulares de México (+52 1 [10 dígitos]) para WhatsApp
    const normalizeMexicanWhatsApp = (num) => {
      if (!num) return '5212227708716';
      const digits = String(num).replace(/\D/g, '');
      if (digits.length === 13 && digits.startsWith('521')) {
        return digits;
      }
      if (digits.length === 12 && digits.startsWith('52')) {
        return '521' + digits.substring(2);
      }
      if (digits.length === 10) {
        return '521' + digits;
      }
      return digits;
    };

    // Lista de asesores disponibles para atención personalizada
    const advisors = ref(config.advisors || [
      {
        id: 1,
        name: "Asesora Claudia",
        role: "Consultora en Bienestar y Salud Celular",
        specialty: "Salud Familiar",
        phone: "2431067294",
        whatsappNumber: "5212431067294",
        phoneDisplay: "243 106 7294",
        image: "assets/img/asesores/asesor-1.jpg",
        objectPosition: "center 15%",
        status: "En línea",
        customMessage: "¡Hola Claudia! Vi tu perfil en la página de Immunotec y deseo orientación personalizada sobre salud y bienestar celular."
      },
      {
        id: 2,
        name: "Asesor Roberto",
        role: "Consultor en Vitalidad y Envejecimiento Saludable",
        specialty: "Vitalidad Activa",
        phone: "2441235715",
        whatsappNumber: "5212441235715",
        phoneDisplay: "244 123 5715",
        image: "assets/img/asesores/asesor-2.jpg",
        objectPosition: "center 12%",
        status: "En línea",
        customMessage: "¡Hola Roberto! Vi tu perfil en la página de Immunotec y quiero información sobre suplementación para vitalidad y salud."
      },
      {
        id: 3,
        name: "Asesora Mariana",
        role: "Consultora en Nutrición Celular y Estilo de Vida",
        specialty: "Nutrición & Rutinas",
        phone: "2227708716",
        whatsappNumber: "5212227708716",
        phoneDisplay: "222 770 8716",
        image: "assets/img/asesores/asesor-3.jpg",
        objectPosition: "center 20%",
        status: "En línea",
        customMessage: "¡Hola Mariana! Vi tu perfil en la página de Immunotec y me gustaría conocer la mejor rutina para energía y defensas."
      },
      {
        id: 4,
        name: "Asesor David",
        role: "Consultor en Rendimiento Deportivo y Fuerza",
        specialty: "Deporte & Fitness",
        phone: "2225688665",
        whatsappNumber: "5212225688665",
        phoneDisplay: "222 568 8665",
        image: "assets/img/asesores/asesor-4.png",
        objectPosition: "center 18%",
        status: "En línea",
        customMessage: "¡Hola David! Vi tu perfil en la página de Immunotec y busco asesoría sobre suplementación deportiva y rendimiento celular."
      }
    ]);

    const selectedAdvisor = ref(advisors.value[0] || null);

    const selectAdvisor = (adv) => {
      selectedAdvisor.value = adv;
    };

    // Genera enlace universal y validado a WhatsApp (funciona en móvil, desktop y web)
    const getAdvisorWhatsAppUrl = (adv, customMsg = null) => {
      if (!adv) return '#';
      const phone = normalizeMexicanWhatsApp(adv.whatsappNumber || adv.phone);
      const message = customMsg || adv.customMessage || config.advisor.whatsappDefaultMessage;
      return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    };

    const contactAdvisor = (adv, event = null) => {
      selectedAdvisor.value = adv;
      triggerPixelEvent('Contact', {
        content_name: `WhatsApp Asesor: ${adv.name}`,
        advisor_phone: adv.phone,
        status: 'Advisor Chat Initiated'
      });
      const url = getAdvisorWhatsAppUrl(adv);
      try {
        const win = window.open(url, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = url;
        }
      } catch (e) {
        window.location.href = url;
      }
    };

    // =========================================================================
    // EMBUDO DE VIDEO INTERACTIVO CON RAMIFICACIÓN CONDICIONAL (CLIPS M1 A M5)
    // =========================================================================
    const funnelSteps = {
      1: {
        id: 1,
        title: "Paso 1: Presentación & Calificación",
        subtitle: "Evaluación inicial de bienestar",
        badge: "Paso 1 de 4",
        progress: 25,
        videoSrc: "assets/video/M1.mp4",
        questionTitle: "Pregunta de Calificación 1",
        questionDesc: "¿Deseas continuar hacia tu plan personalizado de bienestar y salud celular?",
        yesText: "Sí, continuar",
        yesSubtext: "Pasa al video 2",
        noText: "No en este momento",
        noSubtext: "Finalizar consulta",
        nextYes: 2,
        nextNo: 5
      },
      2: {
        id: 2,
        title: "Paso 2: Evaluación de Salud Celular",
        subtitle: "Profundizando en tus prioridades",
        badge: "Paso 2 de 4",
        progress: 50,
        videoSrc: "assets/video/M2.mp4",
        questionTitle: "Pregunta de Calificación 2",
        questionDesc: "¿Estás dispuesto(a) a incorporar una rutina con respaldo científico para tus metas de salud?",
        yesText: "Sí, me interesa",
        yesSubtext: "Pasa al video 3",
        noText: "No por ahora",
        noSubtext: "Finalizar consulta",
        nextYes: 3,
        nextNo: 5
      },
      3: {
        id: 3,
        title: "Paso 3: Compromiso & Orientación 1 a 1",
        subtitle: "Validación para sesión con especialista",
        badge: "Paso 3 de 4",
        progress: 75,
        videoSrc: "assets/video/M3.mp4",
        questionTitle: "Pregunta de Calificación 3",
        questionDesc: "¿Te gustaría recibir orientación personalizada 1 a 1 con un especialista sin costo?",
        yesText: "Sí, quiero hablar con un especialista",
        yesSubtext: "Pasa a elegir horario de llamada",
        noText: "No por ahora",
        noSubtext: "Finalizar consulta",
        nextYes: 4,
        nextNo: 5
      },
      4: {
        id: 4,
        title: "Paso 4: Coordinación de Llamada",
        subtitle: "Selecciona tu momento preferido",
        badge: "Paso Final",
        progress: 100,
        videoSrc: "assets/video/M4.mp4",
        questionTitle: "¿Cuándo prefieres que hablemos?",
        questionDesc: "Elige la alternativa que mejor se adapte a tu horario y ritmo de vida:"
      },
      5: {
        id: 5,
        title: "Agradecimiento & Comunidad",
        subtitle: "Recursos y contenido gratuito",
        badge: "Finalizado",
        progress: 100,
        videoSrc: "assets/video/M5.mp4",
        isDisqualified: true,
        messageTitle: "Gracias por tu sinceridad",
        messageDesc: "En este momento nuestro programa podría no adaptarse a lo que buscas, pero te invitamos a seguir nuestro contenido gratuito en redes sociales y explorar nuestra comunidad."
      }
    };

    const videoFunnel = reactive({
      currentStep: 1,
      isPlaying: false,
      isPausedForAnswer: false,
      hasEnded: false,
      autoplayBlocked: false,
      selectedSlotOption: null, // 'proxima_hora' | 'hoy_dia' | 'elegir_fecha'
      bookingSubmitted: false,
      calendarUrl: '',
      whatsappBookingUrl: '',
      bookingForm: {
        name: '',
        phone: '',
        timeSlot: 'Mañana (9:00 AM - 12:00 PM)',
        date: new Date().toISOString().split('T')[0],
        time: '11:00',
        notes: ''
      },
      bookingErrors: {
        name: '',
        phone: ''
      }
    });

    const currentFunnelStepData = computed(() => {
      return funnelSteps[videoFunnel.currentStep] || funnelSteps[1];
    });

    // Control de reproducción del video interactivo
    const playFunnelStep = (stepNumber) => {
      videoFunnel.currentStep = stepNumber;
      videoFunnel.isPausedForAnswer = false;
      videoFunnel.hasEnded = false;
      videoFunnel.autoplayBlocked = false;
      if (stepNumber !== 4) {
        videoFunnel.selectedSlotOption = null;
        videoFunnel.bookingSubmitted = false;
      }

      setTimeout(() => {
        const vid = document.getElementById('funnelVideoPlayer');
        if (vid) {
          const stepData = funnelSteps[stepNumber];
          if (stepData && !vid.src.includes(stepData.videoSrc)) {
            vid.src = stepData.videoSrc;
            vid.load();
          }
          vid.currentTime = 0;
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              videoFunnel.isPlaying = true;
              videoFunnel.autoplayBlocked = false;
            }).catch((err) => {
              console.log('[Video Funnel] Autoplay pausado o bloqueado por navegador:', err);
              videoFunnel.autoplayBlocked = true;
              videoFunnel.isPlaying = false;
            });
          }
        }
      }, 100);
    };

    const answerFunnelQuestion = (isYes) => {
      const stepData = funnelSteps[videoFunnel.currentStep];
      if (!stepData) return;

      const nextStep = isYes ? stepData.nextYes : stepData.nextNo;
      triggerPixelEvent('CustomEvent', {
        content_name: `Video Funnel Paso ${videoFunnel.currentStep} -> ${isYes ? 'SI' : 'NO'}`,
        step: videoFunnel.currentStep,
        answer: isYes ? 'YES' : 'NO',
        nextStep: nextStep
      });

      playFunnelStep(nextStep);
    };

    const restartFunnel = () => {
      videoFunnel.currentStep = 1;
      videoFunnel.selectedSlotOption = null;
      videoFunnel.bookingSubmitted = false;
      videoFunnel.bookingErrors.name = '';
      videoFunnel.bookingErrors.phone = '';
      playFunnelStep(1);
    };

    const replayCurrentFunnelVideo = () => {
      const vid = document.getElementById('funnelVideoPlayer');
      if (vid) {
        vid.currentTime = 0;
        vid.play().then(() => {
          videoFunnel.isPlaying = true;
          videoFunnel.isPausedForAnswer = false;
          videoFunnel.hasEnded = false;
          videoFunnel.autoplayBlocked = false;
        }).catch(() => {});
      }
    };

    const onFunnelVideoEnded = () => {
      videoFunnel.isPlaying = false;
      videoFunnel.isPausedForAnswer = true;
      videoFunnel.hasEnded = true;
    };

    const onFunnelVideoPlay = () => {
      videoFunnel.isPlaying = true;
      videoFunnel.autoplayBlocked = false;
    };

    const onFunnelVideoPause = () => {
      videoFunnel.isPlaying = false;
      videoFunnel.isPausedForAnswer = true;
    };

    // Opción A: En la próxima hora
    const selectOptionA_ProximaHora = () => {
      videoFunnel.selectedSlotOption = 'proxima_hora';
      
      const customMessage = `¡Hola! Acabo de ver el video interactivo de Immunotec y solicito una llamada en la próxima hora para revisar mi plan y orientación personalizada.`;
      
      // Enviar registro asíncrono a Google Sheets
      sendToGoogleSheets({
        name: 'Interesado en llamada urgente',
        phone: '',
        email: '',
        goal: 'Llamada urgente en la próxima hora',
        message: 'Solicitud inmediata generada desde Opción A del embudo interactivo (M4)',
        source: 'Video Funnel M4 - Próxima Hora',
        submittedAt: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
      });
      
      triggerPixelEvent('Lead', {
        content_name: 'Video Funnel: Llamada próxima hora',
        channel: 'WhatsApp'
      });

      openWhatsApp(customMessage);
    };

    // Opción B: Hoy durante el día
    const selectOptionB_HoyDia = () => {
      videoFunnel.selectedSlotOption = 'hoy_dia';
      videoFunnel.bookingSubmitted = false;
    };

    // Opción C: Elegir día y hora
    const selectOptionC_ElegirFecha = () => {
      videoFunnel.selectedSlotOption = 'elegir_fecha';
      videoFunnel.bookingSubmitted = false;
    };

    // Generador de enlace directo a Google Calendar
    const createGoogleCalendarUrl = ({ title, details, dateStr, timeStr, durationMinutes = 30 }) => {
      try {
        const [year, month, day] = dateStr.split('-').map(Number);
        const [hour, minute] = timeStr.split(':').map(Number);
        const startDate = new Date(year, month - 1, day, hour, minute);
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

        const pad = (n) => String(n).padStart(2, '0');
        const formatGCal = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

        const dates = `${formatGCal(startDate)}/${formatGCal(endDate)}`;
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent('Llamada telefónica / WhatsApp')}`;
      } catch (err) {
        return 'https://calendar.google.com';
      }
    };

    // Confirmación y envío del formulario de reserva (Opciones B y C)
    const submitBookingFunnel = async () => {
      videoFunnel.bookingErrors.name = '';
      videoFunnel.bookingErrors.phone = '';

      if (!videoFunnel.bookingForm.name.trim()) {
        videoFunnel.bookingErrors.name = 'Por favor ingresa tu nombre completo.';
        return;
      }
      if (!videoFunnel.bookingForm.phone.trim()) {
        videoFunnel.bookingErrors.phone = 'Por favor ingresa tu número de WhatsApp para contactarte.';
        return;
      }

      const isHoy = videoFunnel.selectedSlotOption === 'hoy_dia';
      const slotText = isHoy ? videoFunnel.bookingForm.timeSlot : `${videoFunnel.bookingForm.date} a las ${videoFunnel.bookingForm.time} hrs`;

      // Calcular fecha/hora aproximada para Google Calendar
      let dateForCalendar = videoFunnel.bookingForm.date;
      let timeForCalendar = videoFunnel.bookingForm.time || '11:00';
      if (isHoy) {
        dateForCalendar = new Date().toISOString().split('T')[0];
        if (videoFunnel.bookingForm.timeSlot.includes('Mañana')) timeForCalendar = '10:30';
        else if (videoFunnel.bookingForm.timeSlot.includes('Mediodía') || videoFunnel.bookingForm.timeSlot.includes('Tarde')) timeForCalendar = '14:00';
        else timeForCalendar = '18:00';
      }

      const eventTitle = `Orientación Immunotec - ${videoFunnel.bookingForm.name.trim()}`;
      const eventDetails = `Cita de orientación 1 a 1 de bienestar celular con especialista Immunotec.\nCliente: ${videoFunnel.bookingForm.name.trim()}\nWhatsApp: ${videoFunnel.bookingForm.phone.trim()}\nHorario seleccionado: ${slotText}\nHoja de Registro: https://docs.google.com/spreadsheets/d/1PB66cmuNtO3IHkrKeSmiHiAdnHXUow_x-r6Zx9EFjZY/edit?gid=0#gid=0`;

      const calUrl = createGoogleCalendarUrl({
        title: eventTitle,
        details: eventDetails,
        dateStr: dateForCalendar,
        timeStr: timeForCalendar
      });
      videoFunnel.calendarUrl = calUrl;

      // Mensaje para confirmar por WhatsApp
      const waMessage = `¡Hola! Acabo de registrar mi cita en el video interactivo de Immunotec.\n\n👤 *Nombre:* ${videoFunnel.bookingForm.name.trim()}\n📱 *WhatsApp:* ${videoFunnel.bookingForm.phone.trim()}\n📅 *Horario preferido:* ${slotText}\n\nQuedo a la espera de la llamada para mi orientación.`;
      
      const activeAdv = selectedAdvisor.value || advisors.value[0];
      videoFunnel.whatsappBookingUrl = getAdvisorWhatsAppUrl(activeAdv, waMessage);

      // Guardar en Google Sheets (Hoja de cálculo en la nube)
      await sendToGoogleSheets({
        name: videoFunnel.bookingForm.name.trim(),
        phone: videoFunnel.bookingForm.phone.trim(),
        email: '',
        goal: `Cita Video Funnel: ${slotText}`,
        message: `Cliente agendó desde Embudo Interactivo M4 (${videoFunnel.selectedSlotOption}). Horario: ${slotText}. Notas: ${videoFunnel.bookingForm.notes || 'Ninguna'}`,
        source: 'Video Interactivo Funnel',
        submittedAt: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
      });

      triggerPixelEvent('Schedule', {
        content_name: `Cita Video Funnel: ${slotText}`,
        user_name: videoFunnel.bookingForm.name.trim()
      });

      videoFunnel.bookingSubmitted = true;

      // Abrir Google Calendar en nueva pestaña
      try {
        window.open(calUrl, '_blank');
      } catch (e) {
        console.warn('Popup blocker calendar:', e);
      }
    };

    // Estado del selector principal en Hero ("Quiero Comprar" vs "Hablar con Especialista")
    const heroActiveSection = ref(null);

    const showHeroSection = (section) => {
      heroActiveSection.value = section;

      if (section === 'especialista') {
        setTimeout(() => {
          const el = document.getElementById('videoFunnelContainer');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          playFunnelStep(videoFunnel.currentStep || 1);
        }, 150);
      } else if (section === 'comprar') {
        const vid = document.getElementById('funnelVideoPlayer');
        if (vid) {
          vid.pause();
        }
      }
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

    // Construcción del enlace personalizado de WhatsApp (Normalizado y con fallback)
    const buildWhatsAppUrl = (customText = null) => {
      const activeAdvisor = selectedAdvisor.value;
      const rawPhone = activeAdvisor?.whatsappNumber || config.advisor.whatsappNumber || '5212227708716';
      const phone = normalizeMexicanWhatsApp(rawPhone);
      const advisorName = activeAdvisor?.name || config.advisor.name;
      let message = customText;

      if (!message) {
        if (form.name.trim()) {
          message = `¡Hola ${advisorName}! 👋\n\n` +
                    `Mi nombre es *${form.name.trim()}*.\n` +
                    (form.phone.trim() ? `📱 Mi WhatsApp: *${form.phone.trim()}*\n` : '') +
                    (form.email.trim() ? `📧 Correo: ${form.email.trim()}\n` : '') +
                    `🎯 Mi meta principal: *${form.goal}*\n` +
                    (form.message.trim() ? `💬 Mis dudas u objetivos: "${form.message.trim()}"\n` : '') +
                    (utmParams.source ? `📍 Origen: Redes Sociales (${utmParams.source})\n` : '') +
                    `\nQuisiera recibir orientación personalizada sobre los productos Immunotec.`;
        } else {
          message = activeAdvisor?.customMessage || config.advisor.whatsappDefaultMessage || "¡Hola! Vi tu página de Equilibrio y Bienestar y quiero información sobre los productos Immunotec.";
        }
      }

      return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    };

    // Apertura directa de WhatsApp con protección anti-bloqueo de ventanas emergentes
    const openWhatsApp = (customText = null) => {
      triggerPixelEvent('Contact', {
        content_name: 'WhatsApp Click',
        status: 'Advisor Chat Initiated'
      });
      const url = buildWhatsAppUrl(customText);
      try {
        const win = window.open(url, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = url;
        }
      } catch (e) {
        window.location.href = url;
      }
    };

    // Registro asíncrono en Google Sheets (Google Apps Script Web App)
    const sendToGoogleSheets = async (data) => {
      const endpoint = config.googleSheetsUrl || (config.leadCaptureMethod === 'webhook' ? config.webhookUrl : '');
      if (!endpoint) return;

      try {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(data)
        });
        console.log('[Google Sheets] Solicitud registrada exitosamente en la hoja de cálculo.');
      } catch (sheetsErr) {
        console.warn('[Google Sheets] Advertencia al registrar en Google Sheets:', sheetsErr);
      }
    };

    // Redirección obligatoria al formulario de contacto para capturar Nombre y Teléfono
    const goToForm = (contextMessage = '', contextGoal = null) => {
      // Si el usuario ya completó el formulario en esta sesión, abrir WhatsApp directamente
      if (submitted.value) {
        openWhatsApp(contextMessage || null);
        return;
      }

      if (contextGoal) {
        form.goal = contextGoal;
      }
      if (contextMessage && !form.message) {
        form.message = contextMessage;
      }

      const formElement = document.getElementById('formulario');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const nameInput = document.getElementById('nombre');
          if (nameInput) {
            nameInput.focus();
            nameInput.classList.add('ring-4', 'ring-emerald-400/50');
            setTimeout(() => {
              nameInput.classList.remove('ring-4', 'ring-emerald-400/50');
            }, 1800);
          }
        }, 500);
      }
    };

    // Enviar WhatsApp con datos de la Calculadora pasando obligatoriamente por el formulario
    const consultCalculatedRoutineOnWhatsApp = () => {
      const rec = calculatedRecommendation.value;
      const customMessage = `Hola, utilicé la calculadora en tu página. Me interesa el plan recomendado "${rec.comboName}" (${rec.product} + ${rec.booster}) para mi meta de ${calc.goal.toUpperCase()}. Quisiera recibir orientación de precios y cómo adquirirlo en mi país.`;

      // Si ya llenó el formulario previamente, abrir WhatsApp directamente
      if (submitted.value) {
        openWhatsApp(customMessage);
        return;
      }

      // Pre-cargar la meta y mensaje calculado en el formulario y llevarlo a completar Nombre y Teléfono
      form.message = customMessage;
      if (calc.goal) {
        const foundGoal = wellnessGoals.find(g => g.id.toLowerCase() === calc.goal.toLowerCase());
        if (foundGoal) {
          form.goal = foundGoal.label;
        }
      }

      goToForm(customMessage);
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
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        goal: form.goal,
        message: form.message.trim(),
        contactPreference: 'whatsapp',
        submittedAt: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
        source: utmParams.source || 'Directo',
        campaign: utmParams.campaign || '',
        utm: { ...utmParams }
      };

      try {
        // 1. Envío automático a Google Sheets (sin bloquear apertura de WhatsApp)
        await sendToGoogleSheets(payload);

        // 2. Envío a Formspree si está configurado
        if (config.leadCaptureMethod === 'formspree' && config.formspreeId) {
          try {
            await fetch(`https://formspree.io/f/${config.formspreeId}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(payload)
            });
          } catch (formspreeErr) {
            console.warn('[Formspree] Error:', formspreeErr);
          }
        }

        // 3. Respaldo de lead en localStorage del navegador
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
      advisors,
      selectedAdvisor,
      selectAdvisor,
      contactAdvisor,
      getAdvisorWhatsAppUrl,
      normalizeMexicanWhatsApp,
      heroActiveSection,
      showHeroSection,
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
      goToForm,
      openWhatsApp,
      buildWhatsAppUrl,
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
      testimonials,
      // Embudo de Video Interactivo (M1 a M5)
      funnelSteps,
      videoFunnel,
      currentFunnelStepData,
      playFunnelStep,
      answerFunnelQuestion,
      restartFunnel,
      replayCurrentFunnelVideo,
      onFunnelVideoEnded,
      onFunnelVideoPlay,
      onFunnelVideoPause,
      selectOptionA_ProximaHora,
      selectOptionB_HoyDia,
      selectOptionC_ElegirFecha,
      submitBookingFunnel
    };
  }
});

app.mount('#app');
