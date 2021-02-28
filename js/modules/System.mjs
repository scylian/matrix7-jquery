import { ctxAPI } from "../utils/api.mjs";
import { generateResidentTabs } from "./Residents.mjs";
import { generateAlmBtn, generateStatusBtn } from './Templates.mjs';

// System Info
const fetchSystemInfo = async () => {
  const res = await ctxAPI("ctxGetSystemInfo");

  if (res.rslt === "fail") {
    alert(res.reason);
  } else {
    const data = res.data[0];
    $("#location").text(data.location);
    $("#sw-version").text(data.sw_version);
    $("#model").text(data.model);
    generateResidentTabs(data.size);
  }
};

// System Status
const fetchSystemStatus = async () => {
  const res = await ctxAPI("ctxGetSystemStatus");

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    updateSystemStatus(res.data[0]);
  }
}

const updateSystemStatus = (data) => {
  const almHtml = generateAlmBtn(data.alm);
  const statHtml = generateStatusBtn(data.stat);
  const timeHtml = `
    <li>
      TIME: <span id="curr-time">${data.time}</span>
    </li>
  `;
  
  $('#header-status').html(almHtml+statHtml+timeHtml);
}

export default () => {
  fetchSystemInfo();
  fetchSystemStatus();
  setInterval(fetchSystemStatus, 60000);
}