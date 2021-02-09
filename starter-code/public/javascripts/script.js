document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

selects = document.getElementsByTagName('select');
selectsArr = [... selects];

selectsArr.forEach(item => {
  item.addEventListener('mousedown', e => {
    e.preventDefault();

    let select = this;
    let scroll = select.scrollTop;

    e.target.selected = !e.target.selected;

    if(scroll > 0) {
      select.scrollTop = scroll;
    }
  });

  item.addEventListener('mousemove', e => {
    e.preventDefault();
  });

});