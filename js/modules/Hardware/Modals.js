export const generateTempVoltActionModalHtml = (name, data) => {
  $('#modal-body').html(`
    <p>Choose a value and click <b>Submit</b> to change ${name}.</p>
    <div class="container" style="margin-top: 80px">
      <div class="row">
        <div class="col s12">
          <div id="slider"></div>
        </div>
      </div>
    </div>
  `);

  const slider = document.getElementById("slider");
  const dataNum = Number(data.slice(0, data.length-1));
  const dataSuffix = data.charAt(data.length-1);

  noUiSlider.create(slider, {
    start: [dataNum],
    step: 0.1,
    tooltips: [wNumb({
      decimals: 1,
      postfix: dataSuffix
    })],
    range: {
      'min': [0],
      'max': [100]
    },
  });

  $('#modal-submit').attr("action", "temp-volt");
}

export const generateCardActionModalHtml = (stat) => {
  let actionText  = '';
  if (stat === 'IN') {
    actionText = 'REMOVE';
  } else if (stat === 'OUT') {
    actionText = 'INSERT';
  }
  
  const html = `
    <form action="#">
      <p>
        Click <b>SUBMIT</b> if you would like to <b>${actionText}</b> this card.
      </p>
    </form>
  `;

  $('#modal-submit').attr("action", actionText);
  $('#modal-body').html(html);
}