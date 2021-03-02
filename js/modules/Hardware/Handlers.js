import { hardwareSlotAction, hardwareTempVoltAction } from "./Hardware.js";
import {
  generateCardActionModalHtml,
  generateTempVoltActionModalHtml,
} from "./Modals.js";
import { ModalSpinnerBlueSm } from "../../constants/Spinners.js";

const tableRowClickHandler = () => {
  $(document).on("click", ".card-row", function () {
    const rowName = $(this).attr("name");

    if (rowName === "Temperature" || rowName === "Voltage") {
      const data = $(this).find("td").text();
      generateTempVoltActionModalHtml(rowName, data);
      $("#modal-header").text(rowName);
    } else {
      const cardSlot = $(this).find('[name="slot"]').text();
      const cardStat = $(this).find('[name="stat"]').text();
      generateCardActionModalHtml(cardStat);
      $("#modal-header").text(`Slot ${cardSlot}`);
      $("#modal-slot").val(cardSlot);
    }

    $("#modal-submit").html("").text("Submit").removeClass("disabled");
    $(".modal").modal("open");
  });
};

const modalSubmitClickHandler = () => {
  $("#modal-submit").on("click", function () {
    const action = $(this).attr("action");

    $("#modal-submit").html(ModalSpinnerBlueSm).addClass("disabled");
    
    if (action && action !== "") {
      if (action === "temp-volt") {
        const type = $('#modal-header').text();
        const sliderData = document.getElementById('slider').noUiSlider.get();
        hardwareTempVoltAction(type, sliderData);
      } else {
        const slot = $("#modal-slot").val();
        hardwareSlotAction(slot, action);
      }
    }
  });
};

export default () => {
  tableRowClickHandler();
  modalSubmitClickHandler();
};
