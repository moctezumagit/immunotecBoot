/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: CONEXIÓN DE LANDING PAGE A GOOGLE SHEETS
 * Marca: EQUILIBRIO Y BIENESTAR - IMMUNOTEC
 * =========================================================================
 * 
 * Este script permite que todas las solicitudes de contacto y mensajes 
 * enviados desde tu página web se guarden automáticamente en tu hoja de Google Sheets, 
 * al mismo tiempo que se canalizan a WhatsApp.
 * 
 * -------------------------------------------------------------------------
 * PASO A PASO PARA ACTIVARLO (Toma menos de 2 minutos):
 * -------------------------------------------------------------------------
 * 1. Ve a Google Drive (https://drive.google.com) o Google Sheets (https://docs.google.com/spreadsheets).
 * 2. Crea una nueva Hoja de cálculo (Spreadsheet) en blanco.
 * 3. Nómbrala como quieras, por ejemplo: "Registro de Leads - Immunotec".
 * 
 * 4. En el menú superior de la hoja de cálculo, haz clic en:
 *       Extensiones  ->  Apps Script
 * 
 * 5. Se abrirá una pestaña con un editor de código. Borra todo lo que esté allí 
 *    y pega TODO este archivo de código (desde function doPost hasta el final).
 * 
 * 6. Haz clic en el botón azul de arriba a la derecha:
 *       "Implementar"  ->  "Nueva implementación"
 * 
 * 7. En la ventana emergente, haz clic en el icono de engranaje (⚙️) al lado de
 *    "Seleccionar tipo" y elige:
 *       "Aplicación web"
 * 
 * 8. Llena los campos así:
 *       - Descripción: Registro Landing Page Immunotec
 *       - Ejecutar como: Yo (tu correo@gmail.com)
 *       - Quién tiene acceso: Cualquier persona  <--- ¡MUY IMPORTANTE!
 * 
 * 9. Haz clic en el botón azul "Implementar".
 *    (Si Google te pide conceder permisos, haz clic en "Revisar permisos",
 *     selecciona tu cuenta de Google, luego en "Avanzado" / "Configuración avanzada" 
 *     y haz clic en "Ir a Proyecto (no seguro)" y finalmente "Permitir").
 * 
 * 10. Copia la "URL de la aplicación web" (es un enlace largo que termina en /exec).
 *     Ejemplo: https://script.google.com/macros/s/AKfycbxxxxxxxxxxx/exec
 * 
 * 11. Abre tu archivo local "assets/js/config.js" y pega esa URL en el campo:
 *     googleSheetsUrl: "https://script.google.com/macros/s/TU_CODIGO_AQUI/exec"
 * 
 * ¡Y LISTO! A partir de ese momento, cada vez que alguien envíe el formulario 
 * en tu página web, se agregará una nueva fila a tu hoja de cálculo y se abrirá WhatsApp.
 * =========================================================================
 */

function doPost(e) {
  // LockService evita que dos solicitudes enviadas al mismo segundo se sobreescriban
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    // Obtener los datos enviados en formato JSON o URL-encoded
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Si la hoja está nueva o vacía, crear encabezados automáticos con estilo
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha y Hora",
        "Nombre",
        "Teléfono / WhatsApp",
        "Correo Electrónico",
        "Meta de Salud",
        "Mensaje / Consulta",
        "Origen (Red Social)",
        "Campaña",
        "Chatear con Cliente"
      ]);

      // Estilizar la fila de encabezados: Negrita y fondo verde
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#D1E7DD"); // Verde pastel suave
      headerRange.setFontColor("#0F5132");
      sheet.setFrozenRows(1); // Congelar fila de encabezados
    }

    // Extraer campos del formulario
    var fecha = data.submittedAt || Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss");
    var nombre = data.name || "Sin nombre";
    var telefono = data.phone || "";
    var correo = data.email || "";
    var meta = data.goal || "No especificada";
    var mensaje = data.message || "";
    var origen = data.source || (data.utm && data.utm.source) || "Directo";
    var campana = data.campaign || (data.utm && data.utm.campaign) || "";

    // Generar enlace directo de WhatsApp con fórmula para chatear con el cliente desde la hoja
    var cleanPhone = telefono.toString().replace(/[^0-9]/g, "");
    var formulaWhatsApp = "";
    if (cleanPhone) {
      formulaWhatsApp = '=HYPERLINK("https://wa.me/' + cleanPhone + '", "💬 Abrir Chat")';
    }

    // Agregar la nueva fila con los datos de la solicitud
    sheet.appendRow([
      fecha,
      nombre,
      telefono,
      correo,
      meta,
      mensaje,
      origen,
      campana,
      formulaWhatsApp
    ]);

    // Responder con éxito en formato JSON
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead registrado exitosamente en Google Sheets."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Función doGet para verificar desde el navegador que la aplicación web responde
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "El Webhook de Google Sheets para Equilibrio y Bienestar está activo y listo para recibir leads."
  })).setMimeType(ContentService.MimeType.JSON);
}
