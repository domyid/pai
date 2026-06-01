// Efek konfeti & bintang sederhana (canvas) untuk merayakan jawaban benar / kemenangan.

export function confetti({ jumlah = 80, durasi = 1500 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.className = "fx-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const warna = ["#ff6fae", "#b06cff", "#5cc4f0", "#8bd24f", "#ffd166", "#ff7b95"];
  const partikel = [];
  for (let i = 0; i < jumlah; i++) {
    partikel.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.3,
      r: 4 + Math.random() * 6,
      c: warna[Math.floor(Math.random() * warna.length)],
      vx: -2 + Math.random() * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vr: -0.2 + Math.random() * 0.4,
      bentuk: Math.random() > 0.5 ? "rect" : "circ",
    });
  }

  const mulai = performance.now();
  function frame(now) {
    const t = now - mulai;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of partikel) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      if (p.bentuk === "rect") {
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    if (t < durasi) {
      requestAnimationFrame(frame);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(frame);
}

// "Hujan bintang" kecil dari sebuah elemen (saat jawaban benar)
export function pop(el) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("span");
    s.className = "fx-star";
    s.textContent = ["⭐", "✨", "💫", "🌟"][i % 4];
    s.style.left = rect.left + rect.width / 2 + "px";
    s.style.top = rect.top + rect.height / 2 + "px";
    const ang = (Math.PI * 2 * i) / 8;
    s.style.setProperty("--dx", Math.cos(ang) * 60 + "px");
    s.style.setProperty("--dy", Math.sin(ang) * 60 + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
}
