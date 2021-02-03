const CORS_URL = 'https://cors-anywhere.herokuapp.com';

// System Info
const fetchSystemInfo = () => {
  fetch(`${CORS_URL}/http://70.122.27.220:8170/ctx/api/ctxGetSystemInfo.php`)
    .then(res => res.json())
    .then(json => {
      const data = json.data[0];
      $('#location').text(data.location);
      $('#sw-version').text(data.sw_version);
      $('#model').text(data.model);
      generateResidentTabs(data.size);
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

// Residents
const fetchResidentData = (card) => {
  fetch(`${CORS_URL}/http://70.122.27.220:8170/ctx/api/ctxGetPortsInfoCard_A.php?card=${card}`)
    .then(res => res.json())
    .then(json => {
      const data = json.data;
      generateResidentCards(data);
    })
}

const generateResidentCards = (data) => {
  let html = '';

  data.forEach(resident => {
    html += `
      <div class="col m4 l3 xl2">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">${resident.rname}</span>
            <p>Status: ${resident.rstat}</p>
            <p>${resident.pname}</p>
            <p>${resident.pname !== 'NO SERVICE' ? resident.svc : '-'}</p>
          </div>
        </div>
      </div>
    `

    $('#resident-cards').html(html);
  });


}

// Click Event for Resident Tabs
const residentTabClickHandler = () => {
  $(document).on('click', '.resident-tab', function() {
    const card = $(this).attr('card');
    
    fetchResidentData(card);
  });
}

// System Status
const fetchSystemStatus = () => {
  fetch(`${CORS_URL}/http://70.122.27.220:8170/ctx/api/ctxGetSystemStatus.php`)
    .then(res => res.json())
    .then(json => {
      const data = json.data[0];
      $('#alm-btn').text(data.alm);
      $('#stat-btn').text(data.stat);
      $('#curr-time').text(data.time);
    });
}


$(document).ready(() => {
  $('.sidenav').sidenav();
  fetchSystemInfo();
  fetchSystemStatus();
  setInterval(fetchSystemStatus, 15000);
  residentTabClickHandler();
});