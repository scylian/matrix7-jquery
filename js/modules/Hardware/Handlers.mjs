const tableRowClickHandler = () => {
  $(document).on('click', '.card-row', function() {
    console.log('click');
  });
}

export default () => {
  tableRowClickHandler();
}