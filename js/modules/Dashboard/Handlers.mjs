import { fetchResidentData, fetchResidentInfo } from './Residents.mjs';
import { generateModalHtml, generateDisconnectModalHtml } from './Modals.mjs';
import { disconnectProvider, connectProviderB, connectProviderC, fetchAvailableProviders } from './Providers.mjs';

const modalNextClickHandler = () => {
  $('#modal-submit').on('click', function() {
    const modalOption = $('input[name="modal-radio"]:checked').val();
    const rport = $('#modal-rport').val();

    if (modalOption === 'view') {
      fetchResidentInfo(rport);
    } else if (modalOption === 'none') {
      $('.modal').modal('close');
    } else if (modalOption === 'disconnect') {
      generateDisconnectModalHtml();
    } else if (modalOption === 'dc-provider') {
      disconnectProvider(rport);
    } else if (modalOption === 'connect') {
      fetchAvailableProviders(rport);
    } else if (modalOption === 'Verizon') {
      connectProviderB(modalOption, rport);
    } else {
      connectProviderC(modalOption, rport);
    }
  });
}

// Click Event for Resident Tabs
const residentTabClickHandler = () => {
  $(document).on('click', '.resident-tab', function() {
    const card = $(this).attr('card');
    
    fetchResidentData(card);
  });
}

const residentCardClickHandler = () => {
  $('#resident-cards').on('click', '.resident-card', function() {
    const residentName = $(this).find('.card-title').text();
    const residentRport = $(this).find('.resident-rport').val();
    const residentStatus = $(this).find('.resident-rstat').text();
    generateModalHtml(residentStatus);

    $('#modal-header').text(residentName);
    $('#modal-rport').val(residentRport);
    $('#modal-submit').html('').text('Submit').removeClass('disabled');
    $('.modal').modal('open');
  });
}

export default () => {
  residentTabClickHandler();
  residentCardClickHandler();
  modalNextClickHandler();
}