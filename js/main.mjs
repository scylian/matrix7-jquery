import { BASE_URL } from './utils/config.mjs';
import { fetchSystemInfo, fetchSystemStatus } from './modules/System.mjs';
import ClickHandlers from './modules/Handlers.mjs';

$(document).ready(() => {
  $('.sidenav').sidenav();
  fetchSystemInfo();
  fetchSystemStatus();
  setInterval(fetchSystemStatus, 60000);
  ClickHandlers();
  $('.modal').modal();
});
