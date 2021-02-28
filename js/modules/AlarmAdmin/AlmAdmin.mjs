import { ctxAPI } from '../../utils/api.mjs';

const getAlmAdminStatus = async () => {
  const res = await ctxAPI("ctxGetAlarms");

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    let html = '';
    for (const [key, value] of Object.entries(res.data[0])) {
      html += `<p>${key} : ${value}</p>`;
    }

    $('#content').html(html);
  }
}

export default() => {
  getAlmAdminStatus();
}