export const solicitudes = {
  fetch: "/admin/fetchSolicitudes",
  aceptar: "/admin/aceptarSolicitud/:id",
  rechazar: "/admin/rechazarSolicitud/:id",
  finalizar: "/admin/finalizarSolicitud/:id",
};

export const usuarios = {
  fetch: "/admin/fetchUsuarios",
  crear: "/admin/crearUsuario",
  editar: "/admin/editarUsuario/:id",
  banear: "/admin/banearUsuario/:id",
};

export const servicios = {
  fetch: "/admin/fetchServices",
  crear: "/admin/createService",
  editar: "/admin/editService/:id",
  bloquear: "/admin/blockService/:id",
};
