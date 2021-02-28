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