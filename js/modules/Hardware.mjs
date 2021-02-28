import { ctxAPI } from '../utils/api.mjs';

export const getHardwareStatus = async () => {
  const res = await ctxAPI("ctxGetHwStatus");
  
  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    console.log(res.data[0]);
    generateHardwareTable(res.data[0]);
  }
}

const generateHardwareTable = (data) => {
  const frontBody = $('#front-table-body');
  const rearBody = $('#rear-table-body');
  const extraBody = $('#extra-table-body');

  let frontHtml = '';
  let rearHtml = '';
  let extraHtml = '';

  for (let [key, value] of Object.entries(data)) {
    if (value === '') value = '--';

    if (key !== "TEMPERATURE" && key !== "VOLTAGE") {
      if (key.charAt(0) === 'F') {
        frontHtml += `
          <tr>
            <td>${key}</td>
            <td>${value}</td>
          </tr>
        `;
      } else if (key.charAt(0) === 'R') {
        rearHtml += `
          <tr>
            <td>${key}</td>
            <td>${value}</td>
          </tr>
        `;
      }
    } else {
      extraHtml += `
        <td>${value}</td>
      `;
    }
  }

  frontBody.html(frontHtml);
  rearBody.html(rearHtml);
  extraBody.html(`<tr>${extraHtml}</tr>`);
}