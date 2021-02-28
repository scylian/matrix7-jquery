import SystemStartup from './modules/System.mjs';
import ClickHandlers from './modules/Handlers.mjs';

$(document).ready(() => {
  $('.sidenav').sidenav();
  SystemStartup();
  ClickHandlers();
  $('.modal').modal();
});
