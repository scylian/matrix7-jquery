import SystemStartup from '../System.mjs';
import AlarmAdmin from './AlmAdmin.mjs';

$(document).ready(() => {
  $('.sidenav').sidenav();
  SystemStartup();
  AlarmAdmin();
});