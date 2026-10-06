/**
 * CONFIGURACIÓN DE TU LANDING PAGE / LINK-IN-BIO IMMUNOTEC
 * Marca: EQUILIBRIO Y BIENESTAR
 * 
 * Modifica estos valores con tus datos personales, redes sociales y píxeles de seguimiento.
 */

window.APP_CONFIG = {
  // --- DATOS DEL ASESOR / MARCA ---
  advisor: {
    name: "Equilibrio y Bienestar", // Tu marca oficial
    role: "Consultor de Bienestar y Salud Celular Immunotec",
    city: "México / Internacional",
    email: "equilibrionutricion8@gmail.com", // Tu correo electrónico oficial
    // Número de WhatsApp con código de país 52 (México) + 2227708716 = 522227708716
    whatsappNumber: "522227708716",
    // Mensaje predeterminado al hacer clic en el botón flotante
    whatsappDefaultMessage: "¡Hola! Vi tu página de Equilibrio y Bienestar y quiero información personalizada sobre los productos Immunotec."
  },

  // --- ENLACES A TUS REDES SOCIALES OFICIALES ---
  socialLinks: {
    facebook: "https://www.facebook.com/share/1DWUMNvaXq/",
    instagram: "https://www.instagram.com/equilibrionutricion8?stkn=NHp1MjhkYWFuenJ1",
    tiktok: "https://www.tiktok.com/@equilibriobienestarnut",
    youtube: "https://www.youtube.com/channel/UCixehQX5txYGv-WPZ8OeeeA",
    whatsappDirect: "https://wa.me/522227708716"
  },

  // --- CONEXIÓN AUTOMÁTICA A GOOGLE SHEETS ---
  // Pega aquí la URL de tu aplicación web creada en Google Apps Script
  // Cada vez que un usuario envíe el formulario o solicite su rutina, se guardará
  // automáticamente una nueva fila en tu hoja de Google Sheets Y se abrirá WhatsApp.
  // (Ver instrucciones en el archivo 'google-apps-script.js')
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycbx9eZqg145tH7e0u0n1n4UnOOcNN42YDEqu7_PXp9Kay2F1YPcCLKGCcch4PFuVDRvD/exec", // Ej: "https://script.google.com/macros/s/AKfycb.../exec"

  // --- DESTINO ADICIONAL DEL FORMULARIO DE LEADS ---
  // Opciones disponibles:
  // 'whatsapp': Redirige a WhatsApp con los datos completos del lead (predeterminado).
  // 'formspree': Envía también a Formspree (crea uno gratis en https://formspree.io).
  // 'webhook': Envía un POST JSON a otro webhook (Make, Zapier, etc.).
  leadCaptureMethod: 'whatsapp',

  // Si usas Formspree, pega aquí tu ID de formulario (ej: "mdoqzkpq")
  formspreeId: "",

  // Webhook alternativo (Zapier/Make/n8n)
  webhookUrl: "",

  // --- CÓDIGOS DE PÍXELES DE PUBLICIDAD (TRAFFIC TRACKING) ---
  pixels: {
    // Meta Pixel (Facebook / Instagram Ads) - Ej: "123456789012345"
    metaPixelId: "", // Pega tu ID de Meta Pixel aquí

    // TikTok Pixel - Ej: "C9ABCDEF0123456789G"
    tiktokPixelId: "", // Pega tu ID de TikTok Pixel aquí

    // Google Analytics 4 (Measurement ID) - Ej: "G-XXXXXXXXXX"
    ga4Id: "" // Pega tu ID de GA4 aquí
  }
};
