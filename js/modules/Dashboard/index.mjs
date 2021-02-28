import SystemStartup from '../System.mjs';
import Residents from './Residents.mjs';
import ClickHandlers from './Handlers.mjs';

$(document).ready(async () => {
  $('.sidenav').sidenav();
  await SystemStartup();
  Residents();
  ClickHandlers();
  $('.modal').modal();
});
