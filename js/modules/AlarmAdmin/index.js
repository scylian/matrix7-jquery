import SystemStartup from '../System.js';
import AlarmAdmin from './AlmAdmin.js';
import ClickHandlers from './Handlers.js';

$(document).ready(async () => {
  $('.sidenav').sidenav();
  await SystemStartup();
  AlarmAdmin();
  ClickHandlers();
  $('.modal').modal();
});