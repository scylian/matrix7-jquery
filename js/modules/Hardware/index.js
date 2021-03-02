import SystemStartup from '../System.js';
import Hardware from './Hardware.js';
import ClickHandlers from './Handlers.js';

$(document).ready(async () => {
  $('.sidenav').sidenav();
  await SystemStartup();
  Hardware();
  ClickHandlers();
  $('.modal').modal();
});