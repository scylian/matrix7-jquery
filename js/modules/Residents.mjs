import { ctxAPI } from '../utils/api.mjs';
import { generateResidentCards } from './Templates.mjs';
import { ModalSpinnerBlueSm } from './Modals.mjs';

// Generate Resident Tabs
export const generateResidentTabs = (size) => {
  const count = size / 24;
  let html = '';

  for (let i = 0; i < count; i++) {
    let start = 24 * i + 1;
    let end = 24 * i + 24;
    html += `
      <li class="tab"><a class="resident-tab" card="${i+1}">Residents: ${start} - ${end}</a></li>
    `;
  }

  $('#resident-tabs').html(html).tabs();
  fetchResidentData(1);
}

const showResidentInfo = (data) => {
  let html = '';

  for (const [key, value] of Object.entries(data)) {
    html += `
      <p>
        ${key} : ${value}
      </p>
    `;
  }

  $('#modal-submit').html('').text('Submit');
  $('#modal-body').html(html);
}

// Residents
export const fetchResidentData = async (card) => {
  const queryObj = { card }
  const res = await ctxAPI("ctxGetPortsInfoCard_A", queryObj)

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    generateResidentCards(res.data);
  }
}

export const fetchResidentInfo = async (rport) => {
  $('#modal-submit').html(ModalSpinnerBlueSm).addClass('disabled');

  const queryObj = { port: rport };
  const res = await ctxAPI("ctxGetPortDetail", queryObj)

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    showResidentInfo(res.data[0]);
  }
}