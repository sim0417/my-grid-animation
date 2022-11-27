const wrapper = document.querySelector('.wrapper');
let columns = 0;
let rows = 0;
let isToggled = false;

const showGridAnimation = ({ targetSelector, startAt, columns, rows, attr, interval = 50 }) => {
  const gridMatrix = new Array(rows);
  for (let row = 0; row < gridMatrix.length; row++) {
    gridMatrix[row] = new Array(columns);
  }

  let row = 0;
  let column = 0;

  const targetElements = document.querySelectorAll(targetSelector);
  if (!targetElements) return;

  targetElements.forEach((element) => {
    element.style.transition = `${attr.name} 0.2s linear`;
    gridMatrix[row][column] = element;
    column++;
    if (column >= columns) {
      column = 0;
      row++;
    }
  });

  let topRow = startAt.row;
  let bottomRow = startAt.row;

  const makeRowAnimation = (startRow) => {
    if (startRow < 0 || startRow >= rows) return;

    let left = startAt.column;
    let right = startAt.column;
    let count = 0;

    const timeoutAnimation = (left, right) => {
      if (left >= 0) {
        gridMatrix[startRow][left].style[attr.name] = attr.value;
      }
      if (right < columns) {
        gridMatrix[startRow][right].style[attr.name] = attr.value;
      }
    };

    const intervalId = setInterval(() => {
      setTimeout(timeoutAnimation, interval, left, right);

      left--;
      right++;
      count++;
      if (count > columns) {
        clearInterval(intervalId);
      }
    }, interval);
  };

  const intervalTopRow = () => {
    makeRowAnimation(topRow);
    topRow--;
    if (topRow < 0) {
      clearInterval(topRowIntervalId);
    }
  };
  const topRowIntervalId = setInterval(intervalTopRow, interval);

  const intervalBottomRow = () => {
    makeRowAnimation(bottomRow);
    bottomRow++;
    if (bottomRow >= rows) {
      clearInterval(bottomRowIntervalId);
    }
  };
  const bottomRowIntervalId = setInterval(intervalBottomRow, interval);
};

const onClickGridItem = (x, y) => {
  // console.log(`x : ${x}, y : ${y}`);
  isToggled = !isToggled;

  showGridAnimation({
    targetSelector: '.wrapper > .item',
    startAt: { column: x, row: y },
    columns,
    rows,
    attr: { name: 'opacity', value: isToggled ? 0 : 1 },
    interval: 40,
  });
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
  const itemSize = clientWidth <= 650 ? 40 : 80;

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
