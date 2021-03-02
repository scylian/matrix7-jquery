import { ctxAPI } from '../../utils/api.js';
import { fetchResidentData } from './Residents.js';
import { generateConnectModalHtml } from './Modals.js';

export const disconnectProvider = async (rport) => {
  const queryObj = { port: rport };
  const res = await ctxAPI("ctxDisconnectProvider", queryObj);

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    displayDisconnectSuccessful(res.data[0]);
  }
}

export const connectProviderB = async (provider, rport) => {
  const queryObj = { port: rport, provider: encodeURIComponent(provider) };
  const res = await ctxAPI("ctxConnectProvider_B", queryObj);
  
  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    displayConnectSuccessful(res.data[0]);
  }
}

export const connectProviderC = async (provider, rport) => {
  const queryObj = { port: rport, provider: encodeURIComponent(provider) };
  const res = await ctxAPI("ctxConnectProvider_C", queryObj);

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    displayConnectSuccessful(res.data[0]);
  }
}

export const fetchAvailableProviders = async (rport) => {
  const queryObj = { port: rport };
  const res = await ctxAPI("ctxGetAvailProviders", queryObj);

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    generateConnectModalHtml(res.data[0]);
  }
}

const displayConnectSuccessful = (data) => {
  const currentActiveCard = $('.resident-tab.active').attr('card');
  const html = `
    <p>
      Port ${data.rport} successfully connected to ${data.pname}!
    </p>
  `;

  $('#modal-body').html(html);
  $('#modal-submit').html('').text('Submit');
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
  $('#modal-submit').html('').text('Submit');
  fetchResidentData(currentActiveCard);
}

export const providerCOptions = (providers) => {
  let html = '';

  providers.map(provider => {
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