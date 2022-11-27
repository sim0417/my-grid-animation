let wrapper = document.querySelector('.wrapper');
let columns = 0;
let rows = 0;

const onClickGridItem = (x, y) => {
  console.log(`x : ${x}, y : ${y}`);
  // TODO : 아이템을 클릭했을 때 애니메이션 실행
};

const makeGridItemElement = (x, y) => {
  const girdItem = document.createElement('div');
  girdItem.className = 'item';
  girdItem.addEventListener('click', () => {
    onClickGridItem(x, y);
  });

  return girdItem;
};

const makeGridItems = (quantity) => {
  if (!wrapper || quantity < 1) return;

  let x = 0;
  let y = 0;

  for (let index = 0; index < quantity; index++) {
    const girdItem = makeGridItemElement(x, y);
    wrapper.appendChild(girdItem);

    x++;
    if (x >= columns) {
      x = 0;
      y++;
    }
  }
};

const renderGrid = () => {
  if (!wrapper) return;

  wrapper.innerHTML = '';

  const { clientWidth, clientHeight, style } = wrapper;
  const itemSize = clientWidth <= 650 ? 30 : 60;

  columns = Math.floor(clientWidth / itemSize);
  rows = Math.floor(clientHeight / itemSize);

  style.setProperty('--columns', columns);
  style.setProperty('--rows', rows);

  makeGridItems(columns * rows);
};

window.onload = () => {
  renderGrid();
};

window.onresize = () => {
  renderGrid();
};
