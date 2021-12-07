const q_s = (e) => {
  return document.querySelector(e);
};

const qa_s = (e) => {
  return document.querySelectorAll(e);
};

const _css = (e, e1, e2) => {
  if (typeof e1 === "object") {
    Object.assign(e.style, e1);
  } else if (typeof e1 === "string") {
    e.style[e1] = e2;
  }
};

const a_class = (e, e1) => {
  e.classList.add(e1);
};

const r_class = (e, e1) => {
  e.classList.remove(e1);
};

const get_css = (e, e1) => {
  if (Object.keys(window.getComputedStyle(e)).includes(e1)) {
    return window.getComputedStyle(e).getPropertyValue(e1);
  } else {
    return Error(`invalid property: "${e1}"`);
  }
};

const on_ = (e, e1, e2) => {
  e.addEventListener(e1, e2);
};

const r_listener = (e, e1, e2) => {
  e.removeEventListener(e1, e2);
};

const create_ = (e) => {
  return document.createElement(e);
};

const append_ = (e, e1) => {
  return e.appendChild(e1);
};

const s_attr = (e, e1, e2) => {
  e.setAttribute(e1, e2);
};

const r_attr = (e, e1) => {
  e.removeAttribute(e1);
};

const _val = (e) => {
  return e.value;
};
