import SystemStartup from '../System.js';
import Residents from './Residents.js';
import ClickHandlers from './Handlers.js';

$(document).ready(async () => {
  $('.sidenav').sidenav();
  await SystemStartup();
  Residents();
  ClickHandlers();
  $('.modal').modal();
});
