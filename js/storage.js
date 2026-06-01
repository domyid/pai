// Penyimpanan poin & riwayat menggunakan localStorage (per nama anak / tema).

const KEY = "pai-bp-simulasi-v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getPoin(themeKey) {
  const data = load();
  return data[themeKey]?.poin || 0;
}

export function tambahPoin(themeKey, jumlah) {
  const data = load();
  if (!data[themeKey]) data[themeKey] = { poin: 0, riwayat: [] };
  data[themeKey].poin += jumlah;
  save(data);
  return data[themeKey].poin;
}

export function kurangiPoin(themeKey, jumlah) {
  const data = load();
  if (!data[themeKey]) data[themeKey] = { poin: 0, riwayat: [] };
  data[themeKey].poin = Math.max(0, data[themeKey].poin - jumlah);
  save(data);
  return data[themeKey].poin;
}

export function catatRiwayat(themeKey, entri) {
  const data = load();
  if (!data[themeKey]) data[themeKey] = { poin: 0, riwayat: [] };
  data[themeKey].riwayat.unshift({ ...entri });
  data[themeKey].riwayat = data[themeKey].riwayat.slice(0, 20);
  save(data);
}

export function getRiwayat(themeKey) {
  const data = load();
  return data[themeKey]?.riwayat || [];
}
