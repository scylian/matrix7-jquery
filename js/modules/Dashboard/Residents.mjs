import { ctxAPI } from '../../utils/api.mjs';
import { ModalSpinnerBlueSm } from '../../constants/Spinners.mjs';

const generateResidentCards = (data) => {
  let html = '';

  data.forEach(resident => {
    let color = 'blue-grey darken-1';

    switch(resident.rstat) {
      case "CONN":
        color = 'blue lighten-4';
        break;
      case "SF":
        color = 'grey lighten-5';
        break;
      case "MAINT":
        color = 'orange lighten-1';
        break;
      default:
    }
    
    html += `
      <div class="col m4 l3 xl2 black-text">
        <div class="resident-card card ${color}">
          <div class="card-content">
            <span class="card-title">${resident.rname}</span>
            <input class="resident-rport" value="${resident.rport}" style="display:none;" />
            <p>Status: <span class="resident-rstat">${resident.rstat}</span></p>
            <p>${resident.pname}</p>
            <p>${resident.pname !== 'NO SERVICE' ? resident.svc : '-'}</p>
          </div>
        </div>
      </div>
    `

    $('#resident-cards').html(html);
  });
}

// Generate Resident Tabs
const generateResidentTabs = (size) => {
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
  let html = `
    <div class="container">
      <p>Resident:</p>
      <div class="row">
        <div class="col">
          <p>Status: ${data.rstat}</p>
          <p>Port: ${data.rport}</p>
          <p>Facility: ${data.rfac}</p>
        </div>
      </div>
      <p>Current Service:</p>
      <div class="row">
        <div class="col">
          <p>Provider: ${data.pname}</p>
          <p>Port: ${data.pport}</p>
          <p>Facility: ${data.pfac}</p>
        </div>
      </div>
    </div>
  `;

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

export default () => {
  const size = $('#ctx-size').val();
  generateResidentTabs(size);
}