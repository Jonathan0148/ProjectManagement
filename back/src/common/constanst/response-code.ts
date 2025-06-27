export const ResponseCodes = {
  // Success Codes: Códigos de respuesta que indican que la solicitud se completó correctamente.
  SUCCESS: {
    // 200 OK: La solicitud ha sido exitosa.
    OK: 200,

    // 201 Created: La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado.
    CREATED: 201,

    // 202 Accepted: La solicitud ha sido aceptada para procesamiento, pero aún no se ha completado.
    ACCEPTED: 202,

    // 204 No Content: La solicitud ha tenido éxito, pero no hay contenido que devolver en la respuesta.
    NO_CONTENT: 204,
  },

  // Client Error Codes: Códigos de error que indican que hubo un problema con la solicitud enviada por el cliente.
  CLIENT_ERROR: {
    // 400 Bad Request: La solicitud no puede ser procesada debido a un error del cliente (p. ej., parámetros inválidos).
    BAD_REQUEST: 400,

    // 401 Unauthorized: La autenticación es necesaria y ha fallado o aún no ha sido proporcionada.
    UNAUTHORIZED: 401,

    // 403 Forbidden: El servidor entendió la solicitud, pero se niega a autorizarla.
    FORBIDDEN: 403,

    // 404 Not Found: El servidor no puede encontrar el recurso solicitado.
    NOT_FOUND: 404,

    // 409 Conflict: La solicitud no pudo completarse debido a un conflicto con el estado actual del recurso (p. ej., registro duplicado).
    CONFLICT: 409,

    // 422 Unprocessable Entity: El servidor entiende la solicitud, pero no puede procesarla debido a errores semánticos.
    UNPROCESSABLE_ENTITY: 422,
  },

  // Server Error Codes: Códigos de error que indican que el servidor encontró un problema mientras procesaba la solicitud.
  SERVER_ERROR: {
    // 500 Internal Server Error: El servidor encontró una condición inesperada que le impidió completar la solicitud.
    INTERNAL_SERVER_ERROR: 500,

    // 501 Not Implemented: El servidor no reconoce el método de la solicitud o carece de la capacidad para completarlo.
    NOT_IMPLEMENTED: 501,

    // 502 Bad Gateway: El servidor, al actuar como puerta de enlace o proxy, recibió una respuesta inválida del servidor upstream.
    BAD_GATEWAY: 502,

    // 503 Service Unavailable: El servidor no está disponible para manejar la solicitud, generalmente debido a sobrecarga o mantenimiento.
    SERVICE_UNAVAILABLE: 503,

    // 504 Gateway Timeout: El servidor, actuando como puerta de enlace o proxy, no recibió una respuesta oportuna del servidor upstream.
    GATEWAY_TIMEOUT: 504,
  },
};