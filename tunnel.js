const canvas = document.getElementById("tunnel");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const particles = [];
const depth = 500;

class Packet {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = (Math.random() - 0.5) * w;
    this.y = (Math.random() - 0.5) * h;
    this.z = Math.random() * depth;
    this.speed = 0.5 + Math.random() * 1.5; // ← vitesse plus lente
    this.size = 1 + Math.random() * 2;
    this.color = `hsl(${200 + Math.random() * 40}, 100%, ${60 + Math.random() * 20}%)`;
  }

  update() {
    this.z -= this.speed;
    if (this.z <= 1) this.reset();
  }

  draw() {
    const f = 200 / this.z;
    const x = this.x * f + w / 2;
    const y = this.y * f + h / 2;
    const radius = this.size * f;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < 300; i++) {
  particles.push(new Packet());
}

function animate() {
  ctx.fillStyle = "rgba(1, 8, 24, 0.3)";
  ctx.fillRect(0, 0, w, h);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();
