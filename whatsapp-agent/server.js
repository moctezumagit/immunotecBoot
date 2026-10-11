/**
 * SERVIDOR DEL AGENTE DE WHATSAPP AUTÓNOMO CON GOOGLE GEMINI
 * Marca: Equilibrio y Bienestar - Asesores Oficiales de Immunotec
 * Integración: WhatsApp Cloud API Oficial de Meta & Google Gemini 3.8 Flash
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || Buffer.from('RUFBWEI5M3hGTmxjQlNyTGdraEZXT3I1NXlnVWxiRnl2eG5GUThjc1pBVXFkZnR5czFEM2ZvWE5tdzF3M2xIUzJyTzBtN1YzRVhMSlNwbHlxTlVpS2FJQ29IM2tWNkZFTWVYdThaQm50SzN3R2xqSXdaQVVBQmMxQnNoRWgxYk02TVJ0QlhJblpDa3B1OXdMVDlWUTQzQTl0UWpRUXlidUZ6c3puTkZJWVJIWkJ5emV4d3NCUUZoQ053VzU4Mjk5Q1gwR3ZzNmRLZ1lwM2luTzQ5MG9LRko4a0ZVVlR3UHZTRDFxMldWMnZrbmlLT1BISTdreVdIU2tRdklRWkJvdms1a1VYZDdobDRMT3BhbnJ0TlU3YXBJME96ag==', 'base64').toString('utf-8');
const META_PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID || '1308346849037125';
const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'immunotec_meta_webhook_2026';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || Buffer.from('QVEuQWI4Uk42STdWWXZhZVFuUm81RXM1RDJJbE1najNFbEJyTEUzR3MxNTJaT0xLbklRTXc=', 'base64').toString('utf-8');
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';

// Memoria de conversación por número de teléfono del cliente
const conversations = new Map();

// Base de Conocimiento Resumida para el Agente de WhatsApp
const IMMUNOTEC_KNOWLEDGE = `
ERES "SOFÍA", ASESORA VIRTUAL OFICIAL DE EQUILIBRIO Y BIENESTAR (CONSULTORES INDEPENDIENTES CERTIFICADOS DE IMMUNOTEC).
Estás respondiendo directamente por WhatsApp a clientes que llegan desde nuestra landing page o publicidad de Facebook.

PRODUCTOS Y BENEFICIOS CLAVE:
1. Immunocal Regular (Caja Azul): Precursor bioactivo de glutatión con cisteína enlazada. Refuerza sistema inmune, desintoxica células y eleva defensas. Para toda la familia y prevención.
2. Immunocal Platinum (Caja Plata): Contiene cisteína + CMP (reduce inflamación) + RMF (equilibra pH y salud ósea). Recomendado para adultos de 35+, personas con dolor en articulaciones, retos crónicos o atletas.
3. Immunocal Sport: Con óxido nítrico, cereza ácida y magnesio. Resistencia física y rápida recuperación muscular (Certificación Informed-Sport libre de dopaje).
4. Booster Optimizer (Verdes): Activa gen Nrf2 con sulforafano. Hace que el glutatión trabaje hasta 3 veces más tiempo en la célula.
5. Booster Energy (Rojos): Con 3 fuentes naturales de cafeína (té verde, guaraná, café verde). Energía limpia por 6 horas sin taquicardias.
6. Omega Gen V: 5 en 1 con Omega 3 ultra puro, CoQ10, Cúrcuma, Vitamina E y Piperina para corazón, cerebro y visión.
7. K-21+: Tónico adaptógeno con hierbas y minerales para digestión y control del estrés.

CIENCIA Y SEGURIDAD:
- ¿Por qué no pastillas de glutatión? El estómago las destruye en la digestión. Immunocal da la cisteína bioactiva para que la propia célula fabrique su glutatión.
- Avales: En el PDR (EE.UU.), CPS (Canadá) y +85 estudios en PubMed.
- Preparación: NUNCA calentar ni usar licuadora eléctrica (desnaturaliza la proteína). Preparar en vaso mezclador con agua o jugo frío.
- Contraindicación única: Personas con trasplante reciente de órganos vivos con inmunosupresores. Apto para intolerantes a lactosa (<1%).

ESTRATEGIA DE VENTAS EN WHATSAPP:
- Sé muy amable, empática y respetuosa. Usa emojis de forma profesional (🛡️, 🌿, ⚡, 📦).
- Respuestas breves y fáciles de leer en WhatsApp (máximo 2 a 3 párrafos cortos).
- Si el cliente desea comprar o cotizar, ofrécele los descuentos oficiales de fábrica: Cliente Preferente (hasta 25% descuento) o Paquete de Inicio/Mayorista (hasta 45% descuento).
- Si el cliente solicita hablar con una persona o hacer una llamada, indícale amablemente que un asesor humano de nuestro equipo se pondrá en contacto por este mismo chat en breve.
`;

/**
 * 1. VERIFICACIÓN DEL WEBHOOK DE META (MÉTODO GET)
 * Meta envía este reto cuando registras la URL en el panel de desarrolladores.
 */
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
      console.log('[Webhook] Verificado exitosamente por Meta.');
      res.status(200).send(challenge);
    } else {
      console.warn('[Webhook] Token de verificación no coincide.');
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

/**
 * 2. RECEPCIÓN DE MENSAJES DE WHATSAPP (MÉTODO POST)
 * Meta envía aquí cada mensaje que un cliente escribe a tu WhatsApp Business.
 */
app.post('/webhook', async (req, res) => {
  // Confirmar recepción inmediata a Meta (requisito para evitar reenvíos)
  res.status(200).send('EVENT_RECEIVED');

  try {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry && body.entry[0];
      const change = entry && entry.changes && entry.changes[0];
      const value = change && change.value;

      // Verificar si hay mensajes entrantes (ignorar notificaciones de entrega/leído)
      if (value && value.messages && value.messages.length > 0) {
        // Normalizar número telefónico (en México Meta añade un '1' a móviles: 521XXXXXXXXXX -> 52XXXXXXXXXX)
        let from = message.from;
        if (from && from.startsWith('521') && from.length === 13) {
          from = '52' + from.substring(3);
        }

        const messageType = message.type;

        if (messageType === 'text') {
          const userText = message.text.body;
          console.log(`[WhatsApp Inbound] De: ${from} (original: ${message.from}) | Mensaje: "${userText}"`);

          // Marcar como leído
          await markMessageAsRead(message.id);

          // Generar respuesta con Gemini y responder al cliente
          await handleIncomingClientMessage(from, userText);
        } else {
          // Mensajes que no son texto (audios, imágenes, stickers)
          await sendWhatsAppTextMessage(
            from,
            '¡Hola! He recibido tu archivo/audio. Por el momento puedo responderte con mayor rapidez en texto. ¿Tienes dudas sobre algún producto Immunotec o deseas cotizar tu paquete?'
          );
        }
      }
    }
  } catch (error) {
    console.error('[Webhook Error]:', error.message);
  }
});

/**
 * 3. PROCESAMIENTO CON GOOGLE GEMINI 3.8 FLASH
 */
async function handleIncomingClientMessage(from, userText) {
  try {
    // Obtener o inicializar historial de conversación del cliente
    let clientHistory = conversations.get(from) || [];

    clientHistory.push({
      role: 'user',
      parts: [{ text: userText }]
    });

    // Mantener sólo los últimos 10 mensajes para contexto óptimo
    if (clientHistory.length > 10) {
      clientHistory = clientHistory.slice(-10);
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      system_instruction: {
        parts: [{ text: IMMUNOTEC_KNOWLEDGE }]
      },
      contents: clientHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    const response = await axios.post(geminiUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    let botReply = '';
    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates[0] &&
      response.data.candidates[0].content
    ) {
      botReply = response.data.candidates[0].content.parts.map(p => p.text).join('\n');
    }

    if (!botReply) {
      botReply = '¡Hola! Con gusto te apoyo. Cuéntame cuál es tu objetivo de bienestar o si deseas información de Immunocal Regular o Platinum.';
    }

    // Guardar respuesta del bot en historial
    clientHistory.push({
      role: 'model',
      parts: [{ text: botReply }]
    });
    conversations.set(from, clientHistory);

    // Enviar mensaje de respuesta al WhatsApp del cliente
    await sendWhatsAppTextMessage(from, botReply);
  } catch (error) {
    console.error('[Gemini Processing Error]:', error.response ? error.response.data : error.message);
    await sendWhatsAppTextMessage(
      from,
      '¡Hola! Recibí tu mensaje. En este momento estoy validando tu consulta con el sistema. ¿Te gustaría que un asesor humano te llame o prefieres conocer precios con descuento?'
    );
  }
}

/**
 * 4. ENVÍO DE MENSAJE VÍA WHATSAPP CLOUD API
 */
async function sendWhatsAppTextMessage(toPhone, messageBody) {
  if (!META_ACCESS_TOKEN || !META_PHONE_NUMBER_ID) {
    console.warn('[Meta API] Faltan META_ACCESS_TOKEN o META_PHONE_NUMBER_ID en .env.');
    return;
  }

  const url = `https://graph.facebook.com/v21.0/${META_PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: toPhone,
    type: 'text',
    text: {
      preview_url: false,
      body: messageBody
    }
  };

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`[WhatsApp Outbound] Enviado a ${toPhone} con éxito (ID: ${res.data.messages[0].id})`);
  } catch (error) {
    console.error('[Meta API Error al enviar]:', error.response ? error.response.data : error.message);
  }
}

/**
 * 5. MARCAR MENSAJE COMO LEÍDO (BUENA PRÁCTICA DE WHATSAPP)
 */
async function markMessageAsRead(messageId) {
  if (!META_ACCESS_TOKEN || !META_PHONE_NUMBER_ID) return;

  const url = `https://graph.facebook.com/v21.0/${META_PHONE_NUMBER_ID}/messages`;
  try {
    await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId
      },
      {
        headers: {
          Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (e) {
    // Ignorar si falla el status
  }
}

/**
 * ENDPOINT DE SALUD
 */
app.get('/', (req, res) => {
  res.send('🤖 Agente de WhatsApp de Immunotec & Gemini 3.8 Flash está activo y funcionando.');
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Agente WhatsApp Immunotec iniciado en puerto ${PORT}`);
  console.log(`📡 Endpoint de Webhook para Meta: http://localhost:${PORT}/webhook`);
  console.log(`====================================================`);
});
