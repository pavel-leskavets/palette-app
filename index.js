let state = false;
let color = 'pink';
let difColor = 'black';
let prevColorIcon;
const curColorIcon = document.querySelector('.current-color');
const buttons = document.querySelectorAll('.button');
const buttonPaintBucketElem = document.querySelector('.button-paint-bucket');
const buttonTrans = document.querySelector('.button-transform');
const buttonPipetteElem = document.querySelector('.button-pipette');
const blueColor = document.querySelector('.blue-color-button');
const redColor = document.querySelector('.red-color-button');
const prevColorElem = document.querySelector('.prev-color-button');
const buttonMoveElem = document.querySelector('.button-move');
const buttonSwapElem = document.querySelector('.button-swap');
const items = document.querySelectorAll('.canvas-item');
const customPalette = document.querySelector('.custom-colors');
const canvas = document.querySelector('.canvas');

buttonPaintBucketElem.addEventListener('click', buttonPaintBucketEvent);
document.body.addEventListener('keydown', buttonPaintBucketEvent);

buttonTrans.addEventListener('click', buttonTransformEvent);
document.body.addEventListener('keydown', buttonTransformEvent);

buttonPipetteElem.addEventListener('click', buttonPipetteEvent);
document.body.addEventListener('keydown', buttonPipetteEvent);

blueColor.addEventListener('click', toBlueColor);
document.body.addEventListener('keydown', toBlueColor);

redColor.addEventListener('click', toRedColor);
document.body.addEventListener('keydown', toRedColor);

prevColorElem.addEventListener('click', setPrevColor);
document.body.addEventListener('keydown', setPrevColor);

buttonMoveElem.addEventListener('click', buttonMoveEvent);
document.body.addEventListener('keydown', buttonMoveEvent);

buttonSwapElem.addEventListener('click', buttonSwapEvent);
document.body.addEventListener('keydown', buttonSwapEvent);

curColorIcon.style.color = 'pink';
canvas.addEventListener('click', transformfigure);
canvas.addEventListener('click', goColor);
canvas.addEventListener('mouseover', moveFigures);
customPalette.addEventListener('click', setCurrentColor);
canvas.addEventListener('click', setCurrentColor);

function buttonPaintBucketEvent(e) {
    if (e.type === 'click' || e.keyCode === 80) {
        state = 'bucket';
        document.body.style.cursor = "url('./cursors/paint-bucket.cur'), auto";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'false');
        }
        buttonPaintBucketElem.classList.add('button-active');
    }
}
function buttonTransformEvent(e) {
    if (e.type == 'click' || e.keyCode == 84) {
        state = 'transform';
        document.body.style.cursor = "url('./cursors/transform.cur'), auto";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'false');
        }
        buttonTrans.classList.add('button-active');
    }
}
function buttonPipetteEvent(e) {
    if (e.type == 'click' || e.keyCode == 75) {
        state = 'pipette';
        document.body.style.cursor = "url('./cursors/pipette.cur'), auto";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'false');
        }
        buttonPipetteElem.classList.add('button-active');
    }
}
function buttonMoveEvent(e) {
    if (e.type == 'click' || e.keyCode == 77) {
        state = 'move';
        document.body.style.cursor = "url('./cursors/move.cur'), auto";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'false');
        }
        buttonMoveElem.classList.add('button-active');
    }
}
function buttonSwapEvent(e) {
    if (e.type == 'click' || e.keyCode == 83) {
        state = 'swap';
        document.body.style.cursor = "url('./cursors/swap.cur'), auto";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        buttonSwapElem.classList.add('button-active');
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'true');
        }
    }
}
function transformfigure(e) {
    const { target } = e;
    if (target.className != 'canvas') {
        if (state == 'transform') {
            target.classList.toggle('item-circle');
        }
    }
}
function toBlueColor(e) {
    if (e.type == 'click' || e.keyCode == 66) {
        color = '#4248f4';
        curColorIcon.style.color = color;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'false');
        }
        blueColor.classList.add('button-active');
    }
}
function toRedColor(e) {
    if (e.type == 'click' || e.keyCode == 82) {
        color = '#ce160c';
        curColorIcon.style.color = color;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'false');
        }
        redColor.classList.add('button-active');
    }
}
function setCurrentColor(e) {
    const { target } = e;
    if (state == 'pipette') {
        difColor = color;
        prevColorIcon = document.querySelector('.prev-color');
        prevColorIcon.style.color = difColor;
        color = window.getComputedStyle(target).backgroundColor;
    }
    curColorIcon.style.color = color;
}
function goColor(e) {
    const { target } = e;
    if (target.className != 'canvas') {
        if (state == 'bucket') {
            target.style.backgroundColor = color;
        }
    }
}
function setPrevColor(e) {
    if (e.type == 'click' || e.keyCode == 9) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button-active');
        }
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('draggable', 'false');
        }
        prevColorElem.classList.add('button-active');
        const temporaryColor = difColor;
        difColor = color;
        color = temporaryColor;
        curColorIcon.style.color = color;
        prevColorIcon.style.color = difColor;
    }
}
function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
function moveFigures(e) {
    const figure = e.target;
    if (figure.className != 'canvas') {
        if (state == 'move') {
            figure.onmousedown = function(e) {
                const coords = getCoords(figure);
                const shiftX = e.pageX - coords.left;
                const shiftY = e.pageY - coords.top;

                figure.style.position = 'absolute';
                moveAt(e);

                figure.style.zIndex = 999;
                function moveAt(e) {
                    figure.style.left = `${e.pageX - shiftX}px`;
                    figure.style.top = `${e.pageY - shiftY}px`;
                }

                document.onmousemove = function(e) {
                    moveAt(e);
                };

                figure.onmouseup = function() {
                    document.onmousemove = null;
                    figure.onmouseup = null;
                    figure.onmousedown = null;
                };
                return false;
            };
            figure.ondragstart = function() {};
        }
    }
}

let cols = document.querySelectorAll('.canvas .canvas-item');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
});

function handleDragOver(e) {
    if (state == 'swap') {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
}

function handleDragEnter() {
    if (state == 'swap') {
        this.classList.add('over');
    }
}
function handleDragLeave() {
    if (state == 'swap') {
        this.classList.remove('over');
    }
}

cols = document.querySelectorAll('.canvas .canvas-item');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
});

function handleDragEnd() {
    if (state == 'swap') {
        [].forEach.call(cols, function(col) {
            col.classList.remove('over');
        });
    }
}

cols = document.querySelectorAll('.canvas .canvas-item');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});
let dragSrcEl = null;

function handleDragStart(e) {
    if (state == 'swap') {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', window.getComputedStyle(this).gridArea);
    }
}
function handleDrop(e) {
    if (state == 'swap') {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (dragSrcEl != this) {
            dragSrcEl.style.gridArea = window.getComputedStyle(this).gridArea;
            this.style.gridArea = e.dataTransfer.getData('text/plain');
        }
        return false;
    }
}
