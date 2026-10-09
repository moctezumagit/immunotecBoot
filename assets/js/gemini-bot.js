/**
 * MOTOR DE CHATBOT AUTÓNOMO CON GOOGLE GEMINI & CIERRE DE VENTAS
 * Marca: Equilibrio y Bienestar - Asesores Oficiales de Immunotec
 * 
 * Funcionalidades:
 * - Conexión directa a Google Gemini API (gemini-2.5-flash / gemini-1.5-flash).
 * - Gestión de historial de conversación con contexto continuo y persistencia local.
 * - Integración con la Base de Conocimiento oficial de Immunotec.
 * - Detección inteligente de cierre y canalización a los 4 asesores de WhatsApp.
 */

(function () {
  const STORAGE_KEY_API_KEY = 'immunotec_gemini_api_key';
  const STORAGE_KEY_HISTORY = 'immunotec_chat_history_v2';
  const STORAGE_KEY_ADVISOR_INDEX = 'immunotec_advisor_round_robin_index';

  const DEFAULT_MODEL = 'gemini-3.8-flash';
  const CANDIDATE_MODELS = [
    'gemini-3.8-flash',
    'gemini-3-flash',
    'gemini-2.5-flash',
    'gemini-1.5-flash'
  ];

  class GeminiSalesBot {
    constructor() {
      this.apiKey = this.loadApiKey();
      this.history = [];
      this.geminiMessages = [];
      this.isGenerating = false;
      this.activeModel = (window.APP_CONFIG && window.APP_CONFIG.gemini && window.APP_CONFIG.gemini.model) || DEFAULT_MODEL;
      this.candidateModels = [this.activeModel, ...CANDIDATE_MODELS].filter((v, i, a) => a.indexOf(v) === i);
      this.advisors = (window.APP_CONFIG && window.APP_CONFIG.advisors) || [];
      this.knowledge = window.IMMUNOTEC_KNOWLEDGE_BASE || {};
    }

    loadApiKey() {
      // 1. Prioridad: LocalStorage (si el usuario la configuró en el modal)
      const localKey = localStorage.getItem(STORAGE_KEY_API_KEY);
      if (localKey && localKey.trim().length > 10) {
        return localKey.trim();
      }
      // 2. Prioridad: config.js (window.APP_CONFIG.gemini?.apiKey)
      if (window.APP_CONFIG && window.APP_CONFIG.gemini && window.APP_CONFIG.gemini.apiKey) {
        const cfgKey = window.APP_CONFIG.gemini.apiKey.trim();
        if (cfgKey && !cfgKey.includes('PEGA_AQUI')) {
          return cfgKey;
        }
      }
      return '';
    }

    setApiKey(key) {
      if (!key) {
        this.apiKey = '';
        localStorage.removeItem(STORAGE_KEY_API_KEY);
      } else {
        this.apiKey = key.trim();
        localStorage.setItem(STORAGE_KEY_API_KEY, this.apiKey);
      }
    }

    hasApiKey() {
      return !!(this.apiKey && this.apiKey.length > 10);
    }

    /**
     * Prueba rápida de validación de la API Key contra la API de Gemini
     */
    async testApiKey(keyToTest) {
      const key = keyToTest || this.apiKey;
      if (!key) throw new Error('No se proporcionó ninguna clave de API.');

      let lastError = null;
      for (const model of this.candidateModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
          const payload = {
            contents: [
              {
                role: 'user',
                parts: [{ text: 'Hola, responde exactamente la palabra: OK' }]
              }
            ]
          };

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            this.activeModel = model;
            console.log(`[Gemini Bot] Conexión validada exitosamente con modelo: ${model}`);
            return true;
          } else {
            const errJson = await response.json().catch(() => ({}));
            const errMsg = errJson.error ? errJson.error.message : `Error HTTP ${response.status}`;
            lastError = new Error(errMsg);
            console.warn(`[Gemini Bot] Modelo ${model} no disponible: ${errMsg}`);
          }
        } catch (e) {
          lastError = e;
        }
      }

      throw lastError || new Error('No se pudo validar la clave de Gemini.');
    }

    /**
     * Construye la instrucción de sistema (System Instruction) con la Base de Conocimiento
     */
    buildSystemInstruction() {
      const advisorsInfo = this.advisors.map(adv => 
        `- ID ${adv.id}: ${adv.name} (Especialidad: ${adv.specialty}, Teléfono: ${adv.phoneDisplay}, WhatsApp: ${adv.whatsappNumber})`
      ).join('\n');

      const productsSummary = (this.knowledge.products || []).map(p => `
* ${p.name} (${p.badge}):
  - Categoría: ${p.category}
  - Beneficios principales: ${p.benefits.slice(0, 3).join('; ')}
  - Indicado para: ${p.whoIsItFor}
  - Dosis: ${p.dosageRecommendation}
      `).join('\n');

      return `
Eres "Sofía", la Asistente Virtual Especialista en Bienestar Celular y Asesoría de Ventas de "Equilibrio y Bienestar" (Consultores Oficiales de Immunotec México e Internacional).

TU MISIÓN:
1. Atender a los clientes y visitantes provenientes de publicidad (Facebook, Instagram, TikTok).
2. Responder con amabilidad, calidez, profesionalismo y empatía a todas sus preguntas sobre salud celular, defensas, energía y productos Immunotec.
3. Despejar mitos sobre el glutatión (explicar que las pastillas orales de glutatión no funcionan porque los jugos gástricos las destruyen; la solución real es la cisteína bioactiva de Immunocal para que la célula fabrique su propio glutatión).
4. Recomendar el producto o combo idóneo según la necesidad del cliente (Immunocal Regular para prevención/familias, Platinum para adultos mayores/dolores articulares/inflamación, Sport para deportistas, Booster/Optimizer para multiplicar resultados, Omega Gen V para corazón/cerebro, K-21 para estrés/digestión).
5. Explicar el modo correcto de preparación: NUNCA en líquidos calientes ni en licuadora eléctrica (desnaturaliza la proteína termosensible). Solo con vaso mezclador y agua/jugo frío.
6. Aclarar la única contraindicación médica estricta: Personas con trasplantes de órganos vivos que tomen medicamentos inmunosupresores. Menos del 1% de lactosa (apto para intolerantes) y sin gluten.
7. CIERRE DE VENTAS Y DERIVACIÓN A WHATSAPP:
   - Los precios oficiales tienen descuentos especiales de fábrica: Cliente Preferente (hasta 25% de descuento) o Paquete de Mayorista/Membresía (hasta 40%-45% de descuento).
   - Siempre que el cliente exprese deseo de comprar, pedir precios, cotizar o hablar con una persona, felicítalo por su decisión y canalízalo con uno de nuestros 4 asesores oficiales de WhatsApp.

EQUIPO DE ASESORES OFICIALES DISPONIBLES:
${advisorsInfo}

REGLAS DE FORMATO Y ESTILO:
- Respuestas directas, bien estructuradas, usando negritas y viñetas para facilitar la lectura en teléfonos celulares.
- No escribas textos excesivamente largos. Mantén las respuestas entre 2 y 4 párrafos concisos.
- Si detectas que el cliente quiere comprar, cotizar o contactar a un asesor, añade AL FINAL de tu respuesta exactamente este bloque de acción especial (con los datos del asesor más idóneo o el siguiente en rotación):
[ACCION_ASESOR: {"id": ID_DEL_ASESOR, "producto": "Nombre del producto sugerido", "motivo": "Resumen breve de la necesidad del cliente"}]

BASE DE CONOCIMIENTO DE PRODUCTOS:
${productsSummary}
      `.trim();
    }

    /**
     * Obtiene el siguiente asesor por rotación equitativa (Round-Robin) o por especialidad
     */
    getAdvisorForGoal(goalOrProduct = '') {
      if (!this.advisors || this.advisors.length === 0) return null;

      const lower = (goalOrProduct || '').toLowerCase();
      // Búsqueda por coincidencia de especialidad
      if (lower.includes('deport') || lower.includes('gym') || lower.includes('sport') || lower.includes('fuerza')) {
        const adv = this.advisors.find(a => a.id === 4); // David
        if (adv) return adv;
      }
      if (lower.includes('adult') || lower.includes('articul') || lower.includes('dolor') || lower.includes('platinum')) {
        const adv = this.advisors.find(a => a.id === 2); // Roberto
        if (adv) return adv;
      }
      if (lower.includes('familia') || lower.includes('niñ') || lower.includes('regular') || lower.includes('defens')) {
        const adv = this.advisors.find(a => a.id === 1); // Claudia
        if (adv) return adv;
      }
      if (lower.includes('nutri') || lower.includes('rutina') || lower.includes('peso') || lower.includes('booster')) {
        const adv = this.advisors.find(a => a.id === 3); // Mariana
        if (adv) return adv;
      }

      // Si no hay especialidad específica, rotación equitativa (Round Robin)
      let currentIndex = parseInt(localStorage.getItem(STORAGE_KEY_ADVISOR_INDEX) || '0', 10);
      const selected = this.advisors[currentIndex % this.advisors.length];
      localStorage.setItem(STORAGE_KEY_ADVISOR_INDEX, String((currentIndex + 1) % this.advisors.length));
      return selected;
    }

    /**
     * Envía un mensaje a la API de Gemini y retorna la respuesta procesada
     */
    async sendMessage(userText) {
      if (!this.hasApiKey()) {
        throw new Error('API_KEY_REQUIRED');
      }

      const textClean = (userText || '').trim();
      if (!textClean) return null;

      // Registrar mensaje del usuario en el historial
      const userMessageObj = {
        id: Date.now(),
        role: 'user',
        text: textClean,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.history.push(userMessageObj);

      // Agregar al historial de Gemini
      this.geminiMessages.push({
        role: 'user',
        parts: [{ text: textClean }]
      });

      this.isGenerating = true;

      try {
        const systemInstructionText = this.buildSystemInstruction();

        const payload = {
          system_instruction: {
            parts: [{ text: systemInstructionText }]
          },
          contents: this.geminiMessages,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1200
          }
        };

        let rawResponse = null;
        let lastError = null;
        const modelsToTry = [this.activeModel, ...this.candidateModels].filter((v, i, a) => a.indexOf(v) === i);

        for (const model of modelsToTry) {
          try {
            rawResponse = await this.callGeminiApi(model, payload);
            if (rawResponse) {
              this.activeModel = model;
              break;
            }
          } catch (err) {
            lastError = err;
            console.warn(`[Gemini Bot] Modelo ${model} falló, intentando siguiente...`, err.message);
          }
        }

        if (!rawResponse) {
          throw lastError || new Error('No se recibió respuesta válida del modelo de Gemini.');
        }

        // Parsear la respuesta y detectar acciones de cierre a WhatsApp
        const parsed = this.parseResponseText(rawResponse, textClean);

        const botMessageObj = {
          id: Date.now() + 1,
          role: 'assistant',
          text: parsed.cleanText,
          advisorCard: parsed.advisorCard,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        this.history.push(botMessageObj);

        // Guardar respuesta del bot en historial de Gemini
        this.geminiMessages.push({
          role: 'model',
          parts: [{ text: rawResponse }]
        });

        // Limitar historial de Gemini a los últimos 14 turnos para evitar exceder tokens
        if (this.geminiMessages.length > 14) {
          this.geminiMessages = this.geminiMessages.slice(-14);
        }

        this.saveHistory();
        return botMessageObj;
      } finally {
        this.isGenerating = false;
      }
    }

    async callGeminiApi(modelName, payload) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(this.apiKey)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const errMsg = errJson.error ? errJson.error.message : `Error HTTP ${response.status}`;
        console.error(`[Gemini Bot] Error en modelo ${modelName}:`, errMsg);
        throw new Error(errMsg);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts.map(p => p.text).join('\n');
      }
      return null;
    }

    /**
     * Procesa el texto retornado, limpia etiquetas internas y arma la tarjeta de WhatsApp
     */
    parseResponseText(rawText, userQuery) {
      let cleanText = rawText;
      let advisorCard = null;

      // Buscar si Gemini inyectó la etiqueta [ACCION_ASESOR: {...}]
      const actionMatch = rawText.match(/\[ACCION_ASESOR:\s*(\{.*?\})\]/s);

      if (actionMatch && actionMatch[1]) {
        try {
          const actionData = JSON.parse(actionMatch[1]);
          let targetAdvisor = this.advisors.find(a => a.id === actionData.id);
          if (!targetAdvisor) {
            targetAdvisor = this.getAdvisorForGoal(actionData.producto || userQuery);
          }

          if (targetAdvisor) {
            advisorCard = this.buildAdvisorCard(targetAdvisor, actionData.producto, actionData.motivo);
          }
          cleanText = cleanText.replace(actionMatch[0], '').trim();
        } catch (e) {
          console.warn('[Gemini Bot] Error parseando ACCION_ASESOR:', e);
        }
      } else {
        // Detección heurística de intención de compra en caso de que Gemini no haya puesto el tag
        const lowerRaw = rawText.toLowerCase();
        const lowerQuery = (userQuery || '').toLowerCase();
        const buyKeywords = ['comprar', 'precio', 'cotizar', 'paquete', 'adquirir', 'ordenar', 'cuánto cuesta', 'cuanto cuesta', 'pedido', 'costo'];

        const hasBuyIntent = buyKeywords.some(k => lowerQuery.includes(k) || lowerRaw.includes('whatsapp') || lowerRaw.includes('asesor'));
        if (hasBuyIntent && !advisorCard) {
          const targetAdvisor = this.getAdvisorForGoal(userQuery);
          if (targetAdvisor) {
            advisorCard = this.buildAdvisorCard(targetAdvisor, 'Immunocal con descuento', 'Cotización de pedido oficial');
          }
        }
      }

      return { cleanText, advisorCard };
    }

    buildAdvisorCard(advisor, product = '', note = '') {
      const cleanPhone = (advisor.whatsappNumber || advisor.phone || '5212227708716').replace(/\D/g, '');
      const prodText = product ? ` el producto *${product}*` : ' los productos Immunotec';
      const defaultText = `¡Hola ${advisor.name}! Estuve platicando con el asistente de IA en la web de Equilibrio y Bienestar. Me interesa cotizar y adquirir${prodText} con descuento de fábrica. ¿Me apoyas con mi pedido?`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(defaultText)}`;

      return {
        id: advisor.id,
        name: advisor.name,
        role: advisor.role,
        specialty: advisor.specialty,
        phoneDisplay: advisor.phoneDisplay,
        image: advisor.image,
        product: product || 'Immunocal Oficial',
        whatsappUrl: whatsappUrl
      };
    }

    saveHistory() {
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(this.history));
      } catch (e) {
        console.warn('[Gemini Bot] No se pudo guardar historial:', e);
      }
    }

    loadStoredHistory() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.history = parsed;
            // Reconstruir contexto para Gemini
            this.geminiMessages = [];
            parsed.forEach(msg => {
              if (msg.role === 'user') {
                this.geminiMessages.push({ role: 'user', parts: [{ text: msg.text }] });
              } else if (msg.role === 'assistant') {
                this.geminiMessages.push({ role: 'model', parts: [{ text: msg.text }] });
              }
            });
            return true;
          }
        }
      } catch (e) {
        console.warn('[Gemini Bot] Error cargando historial:', e);
      }
      return false;
    }

    clearChat() {
      this.history = [];
      this.geminiMessages = [];
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    }
  }

  // Exportar instancia singleton global
  window.geminiSalesBot = new GeminiSalesBot();
})();
