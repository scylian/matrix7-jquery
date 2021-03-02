import { generateAlarmModalHtml } from './Modals.js';

const tableRowClickHandler = () => {
  $(document).on('click', '.alarm-row', function() {
    const almid = $(this).find('[name="almid"]').text();
    
    $("#modal-header").text(`Alarm Id ${almid}`);
    $("#modal-almid").val(almid);

    generateAlarmModalHtml();
    
    $("#modal-submit").html("").text("Submit").removeClass("disabled");
    $(".modal").modal("open");
  });
}

export default () => {
  tableRowClickHandler();
}