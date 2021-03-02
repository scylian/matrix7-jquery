import { ctxAPI } from "../../utils/api.js";

export const hardwareTempVoltAction = async (type, data) => {
  let suffix = '';
  if (type === "Temperature") {
    suffix = "F";
  } else if (type === "Voltage") {
    suffix = "V";
  }
  const queryObj = { action: "set", value: data+suffix };
  const res = await ctxAPI(`ctxHw${type}`, queryObj);

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    displayTempVoltActionSuccessful(res.data[0]);
  }
}

export const hardwareSlotAction = async (slot, action) => {
  const queryObj = { slot, action: action.toLowerCase() }
  const res = await ctxAPI("ctxHwSlot", queryObj);

  if (res.rslt === 'fail') {
    alert(res.reason);
  } else {
    displayCardActionSuccessful(res.data[0]);
  }
}

const displayTempVoltActionSuccessful = (data) => {
  const [key, value] = Object.entries(data)[0];
  const html = `
    <p>
      <b>${key}</b> was successfully changed to <b>${value}</b>.
    </p>
  `;

  $('#modal-body').html(html);
  $('#modal-submit').html('').text('Submit');
  getHardwareStatus();
}

const displayCardActionSuccessful = (data) => {
  const [key, value] = Object.entries(data)[0];
  const html = `
    <p>
      Slot <b>${key}</b> was successfully changed to <b>${value}</b>.
    </p>
  `;

  $('#modal-body').html(html);
  $('#modal-submit').html('').text('Submit');
  getHardwareStatus();
}

const getHardwareStatus = async () => {
  const res = await ctxAPI("ctxGetHwStatus");

  if (res.rslt === "fail") {
    alert(res.reason);
  } else {
    generateHardwareTable(res.data[0]);
  }
};

const generateHardwareTable = (data) => {
  const frontBody = $('#front-table-body');
  const rearBody = $('#rear-table-body');
  const tempBody = $('#temp-table-body');
  const voltBody = $('#volt-table-body');

  let frontHtml = '';
  let rearHtml = '';
  let tempHtml = '';
  let voltHtml = '';

  for (let [key, value] of Object.entries(data)) {
    if (value === '') value = '--';

    if (key !== "TEMPERATURE" && key !== "VOLTAGE") {
      if (key.charAt(0) === 'F') {
        frontHtml += `
          <tr class="card-row" name="front">
            <td name="slot">${key}</td>
            <td name="stat">${value}</td>
          </tr>
        `;
      } else if (key.charAt(0) === 'R') {
        rearHtml += `
          <tr class="card-row" name="rear">
            <td name="slot">${key}</td>
            <td name="stat">${value}</td>
          </tr>
        `;
      }
    } else if (key === 'TEMPERATURE') {
      tempHtml += `
        <tr class="card-row" name="Temperature">
          <td>${value}</td>
        </tr>
      `;
    } else if (key === 'VOLTAGE') {
      voltHtml += `
        <tr class="card-row" name="Voltage">
          <td>${value}</td>
        </tr>
      `;
    }
  }

  frontBody.html(frontHtml);
  rearBody.html(rearHtml);
  tempBody.html(tempHtml);
  voltBody.html(voltHtml);
}

export default () => {
  getHardwareStatus();
}