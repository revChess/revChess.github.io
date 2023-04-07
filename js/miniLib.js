/*
 * miniLib.js
 * (c) 2023 rheild
 * 
 * Licensing: revchess.github.io/licensing.html
 * 
 * mainly just helpful functions
 */

function $(sel) {
    // if it is an id, return a single element
    const selected = document.querySelectorAll(sel);
    if (selected === null) return null;
    if (sel.startsWith('#')) return selected[0];
    return selected;
};

$.removeChildren = function (el) {
    // this wrapper function makes code cleaner
    el.innerHTML = '';
}

$.createElement = function (tag='div', attributeObj={}, innerHtml='') {
    // a much more streamlined way of creating an element
    const el = document.createElement(tag);
    el.innerHTML = innerHtml;
    for (let i in attributeObj) {
        el.setAttribute(i, attributeObj[i]);
    }
    return el;
}

$.hideElement = function (el) {
    el.setAttribute('aria-hidden', 'true');
    el.style.display = 'none';
}

$.showElement = function (el) {
    el.setAttribute('aria-hidden', 'false');
    el.style.display = 'block';
}
