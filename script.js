// 显示当前网址
document.addEventListener('DOMContentLoaded', function() {
    const urlDisplay = document.getElementById('current-url');
    urlDisplay.textContent = window.location.href;
    urlDisplay.style.color = '#666';
    urlDisplay.style.fontSize = '0.9em';
    urlDisplay.style.marginTop = '10px';
});

// 动态更新导航栏活动状态
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.nav-link.active').classList.remove('active');
    this.classList.add('active');
  });
});

// 实现图片懒加载
const lazyImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
lazyImages.forEach(img => observer.observe(img));


// 添加动态粒子背景（在现有代码前插入）
class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // 初始化粒子
    for(let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // 边界反弹
      if(particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if(particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // 绘制粒子
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      
      // 绘制连接线
      this.particles.forEach(other => {
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(0, 247, 255, ${1 - dist/100})`;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// 初始化背景
const canvas = document.getElementById('techBg');
new ParticleBackground(canvas);