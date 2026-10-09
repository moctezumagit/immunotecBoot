# 🚀 Guía Oficial: Cómo Activar tu WhatsApp Cloud API en Meta for Developers

Esta guía te explica paso a paso cómo obtener tus credenciales de **WhatsApp Cloud API** para que tu agente con **Gemini 3.8 Flash** responda automáticamente tus mensajes de WhatsApp Business.

---

## 📌 Paso 1: Ingresa a Meta for Developers
1. Abre tu navegador e ingresa a: **[https://developers.facebook.com/](https://developers.facebook.com/)**
2. Haz clic en **"Iniciar sesión"** (arriba a la derecha) con la misma cuenta de Facebook que administra tu Fan Page y cuenta Business.
3. Si es tu primera vez, haz clic en **"Empezar" (Get Started)**, acepta las condiciones y verifica tu cuenta con tu número celular o correo si te lo solicita.

---

## 📌 Paso 2: Crear una Aplicación (App)
1. En la parte superior derecha, haz clic en **"Mis apps"** y luego en el botón verde **"Crear app"** (Create App).
2. En la pantalla de selección de caso de uso:
   * Selecciona **"Otro"** (Other) y haz clic en **Siguiente**.
3. En tipo de app:
   * Selecciona **"Negocios"** (Business) y haz clic en **Siguiente**.
4. En detalles de la aplicación:
   * **Nombre de la app:** Escribe por ejemplo: `Bot Immunotec Ventas`
   * **Correo electrónico de contacto:** Tu correo habitual.
   * **Cuenta de Meta Business:** Selecciona la cuenta comercial asociada a tu Fan Page de Facebook.
5. Haz clic en el botón azul **"Crear app"**.

---

## 📌 Paso 3: Agregar el producto WhatsApp
1. Al crear la app, verás el panel con muchos productos disponibles.
2. Busca la tarjeta que dice **"WhatsApp"** y haz clic en el botón **"Configurar"** (Set up).
3. Selecciona tu cuenta de WhatsApp Business o dale continuar para iniciar la configuración de la API.

---

## 📌 Paso 4: Obtener tus Credenciales (Inicio Rápido / API Setup)
En el menú lateral izquierdo de tu app:
1. Ve a **WhatsApp** -> **Inicio rápido** (o **Configuración de la API**).
2. En esta pantalla verás los **3 datos clave** que tu backend necesita:

| Dato en Meta | Variable en tu archivo `.env` | Para qué sirve |
| :--- | :--- | :--- |
| **Identificador del número de teléfono** | `META_PHONE_NUMBER_ID` | El ID con el que tu bot envía los mensajes. |
| **Identificador de la cuenta de WhatsApp Business** | `META_WABA_ID` | Tu ID de cuenta comercial. |
| **Token de acceso temporal** | `META_ACCESS_TOKEN` | Permiso de autorización para enviar mensajes. |

3. En el campo *"Para"*, Meta te permite enviar un mensaje de prueba a tu propio número personal para verificar que la conexión funciona de inmediato.

---

## 📌 Paso 5: Configurar el Webhook (Recepción de mensajes entrantes)
1. En el menú lateral izquierdo, ve a **WhatsApp** -> **Configuración** (Configuration).
2. En la sección **Webhook**, haz clic en **Editar**.
3. Te pedirá 2 datos:
   * **URL de devolución de llamada:** La URL de tu servidor en internet (ejemplo: `https://tu-servidor.onrender.com/webhook`).
   * **Identificador de verificación:** Escribe tu clave secreta inventada, por ejemplo: `mi_token_secreto_immunotec_2026` (la misma que pondrás en `META_VERIFY_TOKEN`).
4. Haz clic en **Verificar y guardar**.
5. En los campos de suscripción del Webhook, busca el campo **`messages`** y haz clic en **"Suscribirse"**.

¡Listo! A partir de ese momento, cada vez que un cliente te envíe un mensaje a WhatsApp, Meta se lo enviará a tu servidor y tu agente con Gemini le responderá en automático.
