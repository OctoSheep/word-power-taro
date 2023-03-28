/*
 * Copyright (c) 2023. OctoSheep
 *
 * This file is part of Word Power.
 *
 * Word Power is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * Word Power is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with Word Power. If not, see <https://www.gnu.org/licenses/>.
 *
 */

function hexToHsl(hex) {
  let r = parseInt(
    hex.slice(
      1,
      3,
    ),
    16,
  );
  let g = parseInt(
    hex.slice(
      3,
      5,
    ),
    16,
  );
  let b = parseInt(
    hex.slice(
      5,
      7,
    ),
    16,
  );

  r /= 255;
  g /= 255;
  b /= 255;

  let cMin  = Math.min(
    r,
    g,
    b,
  );
  let cMax  = Math.max(
    r,
    g,
    b,
  );
  let delta = cMax - cMin;
  let h;
  let s;
  let l;

  if (delta === 0) {
    h = 0;
  } else if (cMax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cMax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cMax + cMin) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

function hslToHex([h, s, l]) {
  h /= 360;

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h * 6) % 2 - 1));
  let m = l - c / 2;
  let r;
  let g;
  let b;

  if (h < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255).toString(16).padStart(
    2,
    '0',
  );
  g = Math.round((g + m) * 255).toString(16).padStart(
    2,
    '0',
  );
  b = Math.round((b + m) * 255).toString(16).padStart(
    2,
    '0',
  );

  return '#' + r + g + b;
}

function randomHex() {
  let hexColor = '#';

  for (let i = 0; i < 6; i++) {
    let randomInt = Math.floor(Math.random() * 16);
    let hexString = randomInt.toString(16);
    hexColor += hexString;
  }

  return hexColor;
}

module.exports = {
  hexToHsl,
  hslToHex,
  randomHex,
};
