# 🚀 Landing Page / Link-in-Bio Immunotec (Estilo Hotmart & Alta Conversión CRO)

Landing Page y Link-in-Bio corporativa inspirada en la arquitectura visual, módulos y optimización de conversión de **[Hotmart](https://hotmart.com/es)**, adaptada 100% a la orientación y comercialización de productos de nutrición celular y glutatión de **Immunotec** (Immunocal®, Platinum, Booster, Omega Gen V, etc.).

---

## 🎨 Características Estilo Hotmart Implementadas

1. **Top Bar & Navbar Flotante**:
   - Barra superior con aviso de disponibilidad inmediata en más de 30 países.
   - Navegación moderna tipo glassmorphism con enlaces de salto suave (`Para quién es`, `Ecosistema`, `Calculadora`, `Productos`, `Testimonios`, `FAQ`).
   - Botón dual: **WhatsApp Directo** y **Recibir Orientación**.
2. **Cinta de Métricas y Certificaciones (Stats Ribbon)**:
   - +45 Años de investigación médica.
   - +85 Ensayos clínicos en PubMed.
   - 30+ Países con distribución oficial.
   - PDR (EE.UU.) y CPS (Canadá).
   - Certificación Clean Sport (Informed-Sport Anti-doping).
3. **Selector Interactivo de Audiencia ("Para quién es")**:
   - Pestañas dinámicas estilo Hotmart para cambiar de segmento:
     - 🛡️ *Para Defensas & Salud Familiar*
     - 🏃 *Para Deportistas & Fitness*
     - 🌿 *Para Adultos & Vitalidad / Longevidad*
     - 💼 *Para Emprendedores & Negocio Independiente*
   - Tarjetas Bento con estadísticas, puntos clave, producto sugerido y CTA directo.
4. **Ecosistema Immunotec (Bento Grid)**:
   - Cuadrícula moderna que explica la ciencia del Glutatión (GSH), el aval médico, la certificación deportiva, la asesoría humana 1:1 y la logística de fábrica.
5. **Calculadora / Evaluador de Rutina Interactivo (Herramienta de Diagnóstico)**:
   - Permite al visitante seleccionar su meta, nivel de actividad y rango de edad.
   - Calcula al instante su combinación ideal (ej: *Combo Atleta Pro & Rendimiento*), beneficios estimados y le permite enviar esa configuración exacta por WhatsApp con un solo clic.
6. **Catálogo Detallado con Fichas de Producto**:
   - Immunocal Regular, Immunocal Platinum, Booster Nrf2, Booster Energy Performance, Omega Gen V y Paquetes de Ahorro Mayorista.
7. **Historias Reales / Testimonios Verificados**:
   - Tarjetas de reseñas con 5 estrellas, avatares, roles, ciudades y resultados reales.
8. **Acordeón Interactivo de Preguntas Frecuentes (FAQ)**:
   - Respuestas claras sobre qué es el glutatión, cómo se prepara, diferencias entre fórmulas, contraindicaciones, envíos y descuentos.
9. **Banner de Cierre de Alta Conversión**:
   - Cierre visual en azul profundo con botón contrastante y acceso directo a WhatsApp.
10. **Mega Footer Corporativo**:
    - Columnas temáticas, redes sociales y descargo de responsabilidad legal oficial de Asesor Independiente.

---

## 📁 Estructura del Proyecto

```text
fanpage/
│
├── index.html               # Landing Page completa con Vue 3, Tailwind CSS y Hotmart UI
├── README.md                # Documentación del proyecto
│
└── assets/
    ├── css/
    │   └── styles.css       # Estilos Bento Grid, Glassmorphism, animaciones y tokens
    ├── js/
    │   ├── config.js        # ⚙️ Tu WhatsApp, Redes Sociales y Píxeles de Publicidad
    │   └── app.js           # Lógica reactiva Vue 3, calculadora, acordeón, UTMs y tracking
    └── img/
        ├── logo.jpg               # Logotipo oficial: Equilibrio y Bienestar
        ├── hero-wellness.jpg      # Fotografía principal: salud celular y vitalidad
        ├── consultation.jpg       # Fotografía: asesoría personalizada 1:1
        └── science-lifestyle.jpg  # Fotografía: deporte, ciencia y glutatión (GSH)
```

---

## ⚙️ Configuración del Asesor y WhatsApp

Tu archivo [assets/js/config.js](file:///c:/Users/User/Documents/Nestor/Desarrollo/fanpage/assets/js/config.js) ya está configurado con tus datos oficiales:

```javascript
window.APP_CONFIG = {
  advisor: {
    name: "Equilibrio y Bienestar",
    role: "Consultor de Bienestar y Salud Celular Immunotec",
    city: "México / Internacional",
    email: "equilibrionutricion8@gmail.com", // Tu correo electrónico oficial
    whatsappNumber: "522441235715", // Tu número de WhatsApp oficial configurado
    whatsappDefaultMessage: "¡Hola! Vi tu página de Equilibrio y Bienestar y quiero información sobre los productos Immunotec."
  },

  socialLinks: {
    facebook: "https://www.facebook.com/share/1DWUMNvaXq/",
    instagram: "https://www.instagram.com/equilibrionutricion8?stkn=NHp1MjhkYWFuenJ1",
    tiktok: "https://www.tiktok.com/@equilibriobienestarnut",
    youtube: "https://www.youtube.com/channel/UCixehQX5txYGv-WPZ8OeeeA",
    whatsappDirect: "https://wa.me/522441235715"
  },

  leadCaptureMethod: 'whatsapp', // 'whatsapp', 'formspree', 'webhook' o 'simulation'
  formspreeId: "",
  webhookUrl: "",

  pixels: {
    metaPixelId: "",   // Pega tu ID de Meta Pixel (Facebook/Instagram Ads)
    tiktokPixelId: "", // Pega tu ID de TikTok Pixel
    ga4Id: ""          // Google Analytics 4 (opcional)
  }
};
```

---

## 🌐 ¿Cómo ver y probar la página?
Solo haz doble clic en [index.html](file:///c:/Users/User/Documents/Nestor/Desarrollo/fanpage/index.html) en tu explorador de archivos. Se abrirá en cualquier navegador moderno sin necesidad de instalar programas adicionales.
