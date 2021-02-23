const ModalSpinnerBlueSm = `
  <div id="modal-preloader" class="preloader-wrapper active small">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`

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
    const residentName = $(this).find('.card-title').text();
    const residentRport = $(this).find('.resident-rport').val();
    const residentStatus = $(this).find('.resident-rstat').text();
    generateModalHtml(residentStatus);

    $('#modal-header').text(residentName);
    $('#modal-rport').val(residentRport);
    $('#modal-next').html('').text('Next').removeClass('disabled');
    $('.modal').modal('open');
  });
}

const generateModalHtml = (rstat) => {
  let connectText = '';
  let radio2Value = '';
  if (rstat === 'SF') {
    connectText = 'connect';
    radio2Value = 'connect';
  } else if (rstat === 'CONN') {
    connectText = 'disconnect';
    radio2Value = 'disconnect';
  }
  
  const html = `
    <form action="#">
      <p>
        <label>
          <input name="modal-radio" type="radio" value="view" checked />
          <span>view the details of resident-port</span>
        </label>
      </p>
      <p>
        <label>
          <input name="modal-radio" type="radio" value="${radio2Value}" />
          <span>${connectText} the resident to a service-provider</span>
        </label>
      </p>
    </form>
  `
  $('#modal-body').html(html);
}

const generateDisconnectModalHtml = () => {
  const html = `
    <form action="#">
      <p>
        <label>
          <input name="modal-radio" type="radio" value="dc-provider" checked />
          <span>disconnect from current provider</span>
        </label>
      </p>
      <p>
        <label>
          <input name="modal-radio" type="radio" value="none" />
          <span>none</span>
        </label>
      </p>
    </form>
  `
  $('#modal-body').html(html);
}

const providerCOptions = (providers) => {
  let html = '';

  providers.map(provider => {
    console.log(provider);
    html += `
      <p>
        <label>
          <input name="modal-radio" type="radio" value="${provider}" />
          <span>Connect to ${provider.toUpperCase()}</span>
        </label>
      </p>
    `;
  });

  return html;
}

const generateConnectModalHtml = (data) => {
  const providerB = data.provider_B;
  const providerC = data.provider_C;
  
  const html = `
    <form action="#">
      <p>
        <label>
          <input name="modal-radio" type="radio" value="${providerB}" checked />
          <span>Connect to ${providerB.toUpperCase()}</span>
        </label>
      </p>
      ${providerCOptions(providerC)}
    </form>
  `
  $('#modal-body').html(html);
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

  $('#modal-next').html('').text('Next');
  $('#modal-body').html(html);
}

const fetchResidentInfo = (rport) => {
  $('#modal-next').html(ModalSpinnerBlueSm).addClass('disabled');
  fetch(`${BASE_URL}/ctxGetPortDetail.php?port=${rport}`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data[0];
        showResidentInfo(data);
      }
    });
}

const fetchAvailableProviders = (rport) => {
  fetch(`${BASE_URL}/ctxGetAvailProviders.php?port=${rport}`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data[0];
        generateConnectModalHtml(data);
      }
    });
}

const displayConnectSuccessful = (data) => {
  const currentActiveCard = $('.resident-tab.active').attr('card');
  const html = `
    <p>
      Port ${data.rport} successfully connected to ${data.pname}!
    </p>
  `;

  $('#modal-body').html(html);
  $('#modal-next').html('').text('Next');
  fetchResidentData(currentActiveCard);
}

const displayDisconnectSuccessful = (data) => {
  const currentActiveCard = $('.resident-tab.active').attr('card');
  const html = `
    <p>
      Port ${data.rport} successfully disconnected!
    </p>
  `;

  $('#modal-body').html(html);
  $('#modal-next').html('').text('Next');
  fetchResidentData(currentActiveCard);
}

const disconnectProvider = (rport) => {
  $('#modal-next').html(ModalSpinnerBlueSm).addClass('disabled');
  fetch(`${BASE_URL}/ctxDisconnectProvider.php?port=${rport}`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data[0];
        displayDisconnectSuccessful(data);
      }
    });
}

const connectProviderB = (provider, rport) => {
  $('#modal-next').html(ModalSpinnerBlueSm).addClass('disabled');
  fetch(`${BASE_URL}/ctxConnectProvider_B.php?port=${rport}&provider=${encodeURIComponent(provider)}`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data[0];
        displayConnectSuccessful(data);
      }
    });
}

const connectProviderC = (provider, rport) => {
  $('#modal-next').html(ModalSpinnerBlueSm).addClass('disabled');
  fetch(`${BASE_URL}/ctxConnectProvider_C.php?port=${rport}&provider=${encodeURIComponent(provider)}`)
    .then(res => res.json())
    .then(json => {
      if (json.rslt === 'fail') {
        alert(json.reason);
      } else {
        const data = json.data[0];
        displayConnectSuccessful(data);
      }
    });
}

const modalNextClickHandler = () => {
  $('#modal-next').on('click', function() {
    const modalOption = $('input[name="modal-radio"]:checked').val();
    const rport = $('#modal-rport').val();

    if (modalOption === 'view') {
      fetchResidentInfo(rport);
    } else if (modalOption === 'disconnect') {
      generateDisconnectModalHtml();
    } else if (modalOption === 'dc-provider') {
      disconnectProvider(rport);
    } else if (modalOption === 'connect') {
      fetchAvailableProviders(rport);
    } else if (modalOption === 'Verizon') {
      connectProviderB(modalOption, rport);
    } else {
      connectProviderC(modalOption, rport);
    }
  });
}

$(document).ready(() => {
  $('.sidenav').sidenav();
  fetchSystemInfo();
  fetchSystemStatus();
  setInterval(fetchSystemStatus, 60000);
  residentTabClickHandler();
  residentCardClickHandler();
  modalNextClickHandler();
  $('.modal').modal();
});
