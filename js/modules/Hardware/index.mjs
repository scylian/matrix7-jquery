import SystemStartup from '../System.mjs';
import Hardware from './Hardware.mjs';
import ClickHandlers from './Handlers.mjs';

$(document).ready(async () => {
  $('.sidenav').sidenav();
  await SystemStartup();
  Hardware();
  ClickHandlers();
  $('.modal').modal();
});