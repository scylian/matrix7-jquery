import { providerCOptions } from './Providers.js';

export const generateModalHtml = (rstat) => {
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

export const generateDisconnectModalHtml = () => {
  const html = `
    <form action="#">
      <p>
        <label>
          <input name="modal-radio" type="radio" value="none" checked/>
          <span>none</span>
        </label>
      </p>
      <p>
        <label>
          <input name="modal-radio" type="radio" value="dc-provider" />
          <span>disconnect from current provider</span>
        </label>
      </p>
    </form>
  `
  $('#modal-body').html(html);
}

export const generateConnectModalHtml = (data) => {
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