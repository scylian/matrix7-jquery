export const generateResidentCards = (data) => {
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

export const generateAlmBtn = (alm) => {
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

export const generateStatusBtn = (stat) => {
  return `
    <li>
      STATUS:
      <a id="stat-btn" class="green white-text btn-flat btn-small status-btn">
        ${stat}
      </a>
    </li>
  `;
}