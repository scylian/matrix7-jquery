import { ctxAPI } from '../../utils/api.js';

const getAlmAdminStatus = async () => {
  const res = await ctxAPI("ctxGetAlarms");

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    generateAlarmTable(res.data);
  }
}

const generateAlarmTable = (data) => {
  const tableBody = $('#alarm-body');

  let alarmHtml = '';
  
  data.forEach(alarm => {
    alarmHtml += `
      <tr class="alarm-row">
        <td style="display:none" name="almid">${alarm.almid}</td>
        <td>${alarm.time}</td>
        <td>${alarm.stat}</td>
        <td>${alarm.sev}</td>
        <td>${alarm.ack}</td>
        <td>${alarm.sa}</td>
        <td>${alarm.source}</td>
        <td>${alarm.cond}</td>
        <td>${alarm.remark}</td>
      </tr>
    `;
  });

  tableBody.html(alarmHtml);
}

export default() => {
  getAlmAdminStatus();
}