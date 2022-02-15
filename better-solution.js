const colorInput = document.querySelector("#color-input");
colorInput.addEventListener("change", getColor);

function getColor() {
  const colorHex = colorInput.value;
  colorBox(colorHex);
  showHex(colorHex);
  showRgb(colorHex);
}

function colorBox(boxColor) {
  document.querySelector("#color-box").style.backgroundColor = boxColor;
}

function showHex(hexCode) {
  document.querySelector("#hex").innerText = `Hex code: ${hexCode}`;
}

function showRgb(hexCode) {
  const r = parseInt(hexCode.substring(1, 3), 16);
  const g = parseInt(hexCode.substring(3, 5), 16);
  const b = parseInt(hexCode.substring(5, 7), 16);

  const rgbResult = { r, g, b };
  showHsl(r, g, b);
  document.querySelector(
    "#rgb"
  ).innerText = `r: ${rgbResult.r} g: ${rgbResult.g} b: ${rgbResult.b}`;
}

function showHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  document.querySelector("#hsl").innerText = `H: ${h.toFixed(
    1
  )}% S: ${s.toFixed(1)}% L: ${l.toFixed(1)}%`;
}
