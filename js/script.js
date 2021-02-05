// System Info
const fetchSystemInfo = () => {
  fetch(`${BASE_URL}/ctxGetSystemInfo.php`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data[0];
        $('#location').text(data.location);
        $('#sw-version').text(data.sw_version);
        $('#model').text(data.model);
        generateResidentTabs(data.size);
      }
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
  fetch(`${BASE_URL}/ctxGetPortsInfoCard_A.php?card=${card}`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data;
        generateResidentCards(data);
      }
    })
}

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
      <div class="col m4 l3 xl2">
        <a class="modal-trigger black-text" href="#modal">
          <div class="resident-card card ${color}">
          <div class="card-content">
          <span class="card-title">${resident.rname}</span>
          <p>Status: ${resident.rstat}</p>
          <p>${resident.pname}</p>
          <p>${resident.pname !== 'NO SERVICE' ? resident.svc : '-'}</p>
          </div>
          </div>
        </a>
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
  fetch(`${BASE_URL}/ctxGetSystemStatus.php`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data[0];
        updateSystemStatus(data);
      }
    });
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

const generateAlmBtn = (alm) => {
  let almColor = 'green';

  switch(alm.toLowerCase()) {
    case 'critical':
      almColor = 'red';
      break;
    case 'major':
      almColor = 'amber darken-1';
      break;
    case 'minor':
      almColor = 'yellow darken-2';
      break;
    default:
  }
  
  return `
    <li>
      ALARM:
      <a id="alm-btn" class="${almColor} white-text btn-flat btn-small status-btn">
        ${alm}
      </a>
    </li>
  `;
}

const generateStatusBtn = (stat) => {
  return `
    <li>
      STATUS:
      <a id="stat-btn" class="green white-text btn-flat btn-small status-btn">
        ${stat}
      </a>
    </li>
  `;
}

const residentCardClickHandler = () => {
  $('#resident-cards').on('click', '.resident-card', function() {
    console.log('click');
  });
}

const stepperInitialize = () => {
  $('.stepper .step').first().addClass('active');
  const stepper = document.querySelector('.stepper');
  const stepperInstance = new MStepper(stepper, {
    firstActive: 0
  });
}

$(document).ready(() => {
  $('.sidenav').sidenav();
  fetchSystemInfo();
  fetchSystemStatus();
  setInterval(fetchSystemStatus, 60000);
  residentTabClickHandler();
  residentCardClickHandler();
  $('.modal').modal();
  stepperInitialize();
});
