import SystemStartup from './modules/System.mjs';
import { getHardwareStatus } from './modules/Hardware.mjs';

$(document).ready(() => {
  $('.sidenav').sidenav();
  SystemStartup();
  getHardwareStatus();
});