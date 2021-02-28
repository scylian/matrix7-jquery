import SystemStartup from '../System.mjs';
import { getHardwareStatus } from './Hardware.mjs';

$(document).ready(() => {
  $('.sidenav').sidenav();
  SystemStartup();
  getHardwareStatus();
  $('.modal').modal();
});