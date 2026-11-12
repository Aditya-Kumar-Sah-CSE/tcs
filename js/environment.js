/**
 * Living Nature Environment Engine
 * Immersive, lightweight, high-performance canvas & procedural nature backdrop.
 * Renders sky transitions, moving clouds, flying birds, butterflies, falling leaves,
 * gentle snowfall, monsoon rain with ripples, mountain horizons, rivers, waterfalls,
 * and twinkling night starfields with glowing fireflies.
 * Automatically throttles on hidden tabs and respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  var canvas = null;
  var ctx = null;
  var animFrameId = null;
  var lastTimestamp = 0;
  var isRunning = false;
  var isTabActive = true;

  // Configuration state
  var config = {
    season: 'auto',       // auto | spring | summer | monsoon | autumn | winter | mountain | jungle | night
    intensity: 'medium',  // low | medium | high
    animation: true,
    reducedMotion: false
  };

  // Cached screen dimensions
  var width = 0;
  var height = 0;
  var dpr = 1;

  // Simulation actors
  var clouds = [];
  var birds = [];
  var particles = []; // Leaves, snow, rain, fireflies, butterflies
  var stars = [];
  var airplane = null;
  var lightning = { active: false, opacity: 0, nextTime: 0 };

  // Curated Nature & Car Photographic Wallpapers (10s random transition)
  var BG_WALLPAPERS = [
    'assets/1825308.webp',
    'assets/5818236-1920x1440-desktop-hd-cool-car-background-image.jpg',
    'assets/DAJQu6.webp',
    'assets/OIP (1).jpeg',
    'assets/OIP.jpeg',
    'assets/thumb-1920-683733.png'
  ];

  var currentWallpaperIndex = 0;
  var wallpaperTimer = null;
  var activeSlideKey = 'A'; // 'A' or 'B'

  function initWallpaperSlideshow() {
    var slideA = document.getElementById('bgSlideA');
    var slideB = document.getElementById('bgSlideB');
    if (!slideA || !slideB) return;

    // Pick random initial wallpaper
    currentWallpaperIndex = Math.floor(Math.random() * BG_WALLPAPERS.length);
    slideA.style.backgroundImage = 'url("' + BG_WALLPAPERS[currentWallpaperIndex] + '")';
    slideA.classList.add('active');
    slideB.classList.remove('active');

    if (wallpaperTimer) {
      clearInterval(wallpaperTimer);
    }
    // Change wallpaper randomly every 10 seconds (10000ms)
    wallpaperTimer = setInterval(rotateWallpaper, 10000);
  }

  function rotateWallpaper() {
    if (!config.animation || !isTabActive) return;
    var slideA = document.getElementById('bgSlideA');
    var slideB = document.getElementById('bgSlideB');
    if (!slideA || !slideB) return;

    var nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * BG_WALLPAPERS.length);
    } while (nextIdx === currentWallpaperIndex && BG_WALLPAPERS.length > 1);

    currentWallpaperIndex = nextIdx;
    var nextImg = BG_WALLPAPERS[currentWallpaperIndex];

    if (activeSlideKey === 'A') {
      slideB.style.backgroundImage = 'url("' + nextImg + '")';
      slideB.classList.add('active');
      slideA.classList.remove('active');
      activeSlideKey = 'B';
    } else {
      slideA.style.backgroundImage = 'url("' + nextImg + '")';
      slideA.classList.add('active');
      slideB.classList.remove('active');
      activeSlideKey = 'A';
    }
  }

  // Helper for random in range
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  /**
   * Determine effective time of day: 'morning' | 'afternoon' | 'evening' | 'night'
   */
  function getTimeOfDay() {
    if (config.season === 'night') return 'night';
    if (config.season === 'summer') return 'afternoon';
    if (config.season === 'autumn') return 'evening';
    if (config.season === 'spring') return 'morning';

    var hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return 'morning';
    if (hour >= 9 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }

  /**
   * Resolve active season preset (handles 'auto' mapping to time-of-day)
   */
  function getEffectiveSeason() {
    if (config.season !== 'auto') {
      return config.season;
    }
    var time = getTimeOfDay();
    if (time === 'night') return 'night';
    if (time === 'morning') return 'spring';
    if (time === 'evening') return 'autumn';
    return 'summer';
  }

  // Particle multipliers based on intensity
  function getParticleLimit(baseCount) {
    var mult = 1.0;
    if (config.intensity === 'low') mult = 0.5;
    if (config.intensity === 'high') mult = 1.5;
    return Math.max(6, Math.round(baseCount * mult));
  }

  // --- Initializers ---

  function initStars() {
    stars = [];
    var count = 90;
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.50,
        radius: rand(0.5, 1.6),
        alpha: rand(0.25, 0.85),
        twinkleSpeed: rand(0.8, 2.2),
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function initClouds() {
    clouds = [];
    var count = 4;
    // Keep clouds in upper sky zone so they drift above main content cards
    for (var i = 0; i < count; i++) {
      clouds.push({
        x: rand(0, width),
        y: rand(15, Math.min(140, height * 0.18)),
        speed: rand(5, 14),
        width: rand(180, 320),
        height: rand(45, 75),
        alpha: rand(0.06, 0.14)
      });
    }
  }

  function initBirds() {
    birds = [];
    var count = 3;
    var startX = rand(-80, width * 0.3);
    var startY = rand(40, Math.min(180, height * 0.22));
    for (var i = 0; i < count; i++) {
      birds.push({
        x: startX - i * 26 + rand(-6, 6),
        y: startY + i * 12 + rand(-4, 4),
        speed: rand(28, 42),
        wingSpan: rand(9, 14),
        flapSpeed: rand(3.2, 4.6),
        flapOffset: i * 0.4
      });
    }
  }

  function spawnAirplane() {
    if (Math.random() < 0.5) {
      airplane = {
        x: -40,
        y: rand(25, Math.min(120, height * 0.16)),
        speed: rand(14, 20),
        direction: 1
      };
    } else {
      airplane = {
        x: width + 40,
        y: rand(25, Math.min(120, height * 0.16)),
        speed: rand(14, 20),
        direction: -1
      };
    }
  }

  function initWeatherParticles() {
    particles = [];
    var season = getEffectiveSeason();
    var count = 35;

    if (season === 'monsoon' || season === 'rain') {
      count = getParticleLimit(70);
      for (var i = 0; i < count; i++) {
        particles.push({
          type: 'rain',
          x: Math.random() * width,
          y: Math.random() * height,
          speed: rand(450, 700),
          len: rand(16, 30),
          thickness: rand(1, 1.8),
          alpha: rand(0.2, 0.45)
        });
      }
    } else if (season === 'winter') {
      count = getParticleLimit(45);
      for (var j = 0; j < count; j++) {
        particles.push({
          type: 'snow',
          x: Math.random() * width,
          y: Math.random() * height,
          speed: rand(20, 48),
          radius: rand(1.2, 3.0),
          wobbleSpeed: rand(1, 2.2),
          alpha: rand(0.3, 0.75),
          seed: Math.random() * 100
        });
      }
    } else if (season === 'autumn') {
      count = getParticleLimit(28);
      var leafColors = ['#e67e22', '#d35400', '#f39c12', '#c0392b'];
      for (var k = 0; k < count; k++) {
        particles.push({
          type: 'leaf',
          x: Math.random() * width,
          y: Math.random() * height,
          speed: rand(18, 42),
          size: rand(5, 10),
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
          angle: Math.random() * Math.PI * 2,
          rotSpeed: rand(-1.8, 1.8),
          wobbleSpeed: rand(1, 1.8),
          alpha: rand(0.4, 0.75)
        });
      }
    } else if (season === 'night') {
      count = getParticleLimit(24);
      for (var f = 0; f < count; f++) {
        particles.push({
          type: 'firefly',
          x: Math.random() * width,
          y: height * 0.45 + Math.random() * (height * 0.5),
          vx: rand(-10, 10),
          vy: rand(-6, 6),
          radius: rand(1.4, 2.6),
          pulseSpeed: rand(1.5, 3.0),
          phase: Math.random() * Math.PI * 2,
          alpha: rand(0.25, 0.8)
        });
      }
    } else if (season === 'spring' || season === 'jungle') {
      count = getParticleLimit(18);
      var bflyColors = ['#f39c12', '#3498db', '#e74c3c', '#9b59b6'];
      for (var b = 0; b < count; b++) {
        if (b < 5) {
          particles.push({
            type: 'butterfly',
            x: Math.random() * width,
            y: height * 0.4 + Math.random() * (height * 0.5),
            color: bflyColors[Math.floor(Math.random() * bflyColors.length)],
            speedX: rand(14, 28) * (Math.random() > 0.5 ? 1 : -1),
            speedY: rand(-8, 8),
            wingAngle: 0,
            wingSpeed: rand(8, 12),
            size: rand(4, 7),
            alpha: rand(0.65, 0.9)
          });
        } else {
          particles.push({
            type: 'petal',
            x: Math.random() * width,
            y: Math.random() * height,
            color: '#f8bbd0',
            speed: rand(14, 28),
            size: rand(3, 5),
            alpha: rand(0.4, 0.7)
          });
        }
      }
    }
  }

  // --- Resize Handler ---

  function resize() {
    if (!canvas) return;
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    if (ctx) {
      if (typeof ctx.setTransform === 'function') {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      if (typeof ctx.scale === 'function') {
        ctx.scale(dpr, dpr);
      }
    }

    initClouds();
    initBirds();
    initWeatherParticles();
    initStars();
  }

  // --- Rendering Layers ---

  // 1. Sky Gradient / Background Overlay
  function drawSky(time, season) {
    // Canvas background is kept transparent to let the high-definition nature & car photographic
    // wallpapers shine through smoothly. Only subtle atmospheric lightning is drawn here.
    if (lightning.active && lightning.opacity > 0) {
      ctx.fillStyle = 'rgba(210, 230, 255, ' + (lightning.opacity * 0.35) + ')';
      ctx.fillRect(0, 0, width, height);
    }
  }

  // 2. Celestial (Moon & Sun)
  function drawCelestial(time, season, nowSec) {
    if (time === 'night') {
      // Twinkling stars
      ctx.save();
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = 0.5 + 0.5 * Math.sin(nowSec * s.twinkleSpeed + s.phase);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (s.alpha * twinkle) + ')';
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Realistic Soft Glowing Crescent Moon in top-right
      var moonX = width * 0.88;
      var moonY = Math.min(100, height * 0.12);
      var moonR = 20;

      // Outer soft aura
      var aura = ctx.createRadialGradient(moonX, moonY, moonR * 0.6, moonX, moonY, moonR * 2.8);
      aura.addColorStop(0, 'rgba(255, 250, 230, 0.22)');
      aura.addColorStop(0.6, 'rgba(255, 250, 230, 0.05)');
      aura.addColorStop(1, 'rgba(255, 250, 230, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Crescent Moon Body (smooth curved path without black block)
      ctx.save();
      ctx.fillStyle = '#fefae0';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0.3 * Math.PI, 1.7 * Math.PI, false);
      ctx.bezierCurveTo(moonX - 2, moonY - moonR * 0.6, moonX - 2, moonY + moonR * 0.6, moonX + moonR * 0.58, moonY + moonR * 0.81);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

    } else if (season !== 'monsoon') {
      // Sun in Daytime
      var sunX = time === 'morning' ? width * 0.18 : (time === 'evening' ? width * 0.82 : width * 0.72);
      var sunY = time === 'morning' ? height * 0.18 : (time === 'evening' ? height * 0.24 : height * 0.11);
      var sunR = 26;

      var sunColor = time === 'evening' ? '#ff7675' : '#fff3cd';
      var glowColor = time === 'evening' ? 'rgba(231, 76, 60, 0.18)' : 'rgba(254, 202, 87, 0.16)';

      var sunGlow = ctx.createRadialGradient(sunX, sunY, sunR * 0.5, sunX, sunY, sunR * 3.5);
      sunGlow.addColorStop(0, glowColor);
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR * 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = sunColor;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Subtle Atmospheric Mist / Soft Sky Clouds
  function drawClouds(dt, time, season) {
    if (!config.animation || config.reducedMotion) return;
    ctx.save();

    // Very soft translucent mist high in the sky so cards & headings are never obscured
    var cloudColor = 'rgba(255, 255, 255, 0.04)';
    if (time === 'night') {
      cloudColor = 'rgba(25, 40, 65, 0.08)';
    }

    for (var i = 0; i < clouds.length; i++) {
      var c = clouds[i];
      if (config.animation && !config.reducedMotion) {
        c.x += c.speed * dt;
        if (c.x - c.width > width) {
          c.x = -c.width;
          c.y = rand(10, Math.min(80, height * 0.12));
        }
      }

      ctx.fillStyle = cloudColor;
      ctx.beginPath();
      var cx = c.x;
      var cy = c.y;
      var r = c.height * 0.45;

      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.arc(cx + r * 1.1, cy - r * 0.25, r * 0.8, 0, Math.PI * 2);
      ctx.arc(cx + r * 2.2, cy, r * 0.85, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // 4. Distant Mountains (Replaced by photographic wallpaper slideshow per user preference)
  function drawMountains(season, time) {
    // Disabled so high-definition car and nature wallpapers remain fully visible
    return;
  }

  // 5. Birds in Flight
  function drawBirds(dt, nowSec) {
    if (!config.animation || config.reducedMotion) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(30, 39, 46, 0.55)';
    ctx.lineWidth = 1.4;

    for (var i = 0; i < birds.length; i++) {
      var b = birds[i];
      b.x += b.speed * dt;
      if (b.x > width + 40) {
        b.x = -50;
        b.y = rand(35, Math.min(160, height * 0.20));
      }

      var wingFlap = Math.sin(nowSec * b.flapSpeed + b.flapOffset);
      var wingY = b.y - wingFlap * (b.wingSpan * 0.4);

      ctx.beginPath();
      ctx.moveTo(b.x - b.wingSpan, wingY);
      ctx.quadraticCurveTo(b.x - b.wingSpan * 0.4, b.y, b.x, b.y + 1);
      ctx.quadraticCurveTo(b.x + b.wingSpan * 0.4, b.y, b.x + b.wingSpan, wingY);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 6. Airplane
  function drawAirplane(dt) {
    if (!airplane || !config.animation || config.reducedMotion) return;
    airplane.x += airplane.speed * airplane.direction * dt;

    if (airplane.x < -60 || airplane.x > width + 60) {
      airplane = null;
      return;
    }

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(airplane.x, airplane.y, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Red beacon
    if (Math.floor(Date.now() / 450) % 2 === 0) {
      ctx.fillStyle = '#ff4757';
      ctx.beginPath();
      ctx.arc(airplane.x - 2 * airplane.direction, airplane.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 7. Dynamic Weather Particles
  function drawParticles(dt, nowSec) {
    ctx.save();

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      if (p.type === 'rain') {
        if (config.animation && !config.reducedMotion) {
          p.y += p.speed * dt;
          p.x += (p.speed * 0.1) * dt;
          if (p.y > height) {
            p.y = -p.len;
            p.x = Math.random() * width;
          }
        }
        ctx.strokeStyle = 'rgba(170, 200, 230, ' + p.alpha + ')';
        ctx.lineWidth = p.thickness;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.len * 0.1, p.y + p.len);
        ctx.stroke();

      } else if (p.type === 'snow') {
        if (config.animation && !config.reducedMotion) {
          p.y += p.speed * dt;
          p.x += Math.sin(nowSec * p.wobbleSpeed + p.seed) * 0.5;
          if (p.y > height) {
            p.y = -p.radius * 2;
            p.x = Math.random() * width;
          }
        }
        ctx.fillStyle = 'rgba(255, 255, 255, ' + p.alpha + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

      } else if (p.type === 'leaf') {
        if (config.animation && !config.reducedMotion) {
          p.y += p.speed * dt;
          p.x += Math.sin(nowSec * p.wobbleSpeed + p.size) * 0.7;
          p.angle += p.rotSpeed * dt;
          if (p.y > height) {
            p.y = -p.size * 2;
            p.x = Math.random() * width;
          }
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (p.type === 'firefly') {
        if (config.animation && !config.reducedMotion) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < height * 0.35) p.vy = Math.abs(p.vy);
          if (p.y > height) p.vy = -Math.abs(p.vy);
        }
        var glow = 0.3 + 0.7 * Math.sin(nowSec * p.pulseSpeed + p.phase);
        ctx.fillStyle = 'rgba(241, 196, 15, ' + (p.alpha * glow) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

      } else if (p.type === 'butterfly') {
        if (config.animation && !config.reducedMotion) {
          p.x += p.speedX * dt;
          p.y += (p.speedY + Math.sin(nowSec * 2.8) * 10) * dt;
          p.wingAngle = Math.sin(nowSec * p.wingSpeed);

          if (p.x > width + 25) p.x = -25;
          if (p.x < -25) p.x = width + 25;
          if (p.y > height * 0.85) p.speedY = -Math.abs(p.speedY);
          if (p.y < height * 0.3) p.speedY = Math.abs(p.speedY);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(-p.size * 0.6, 0, p.size * Math.abs(p.wingAngle), p.size * 0.65, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(p.size * 0.6, 0, p.size * Math.abs(p.wingAngle), p.size * 0.65, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (p.type === 'petal') {
        if (config.animation && !config.reducedMotion) {
          p.y += p.speed * dt;
          p.x += Math.sin(nowSec * 1.4) * 0.6;
          if (p.y > height) {
            p.y = -p.size;
            p.x = Math.random() * width;
          }
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // Update Lightning logic
  function updateLightning(dt, nowSec) {
    var season = getEffectiveSeason();
    if (season !== 'monsoon' && season !== 'rain') {
      lightning.active = false;
      lightning.opacity = 0;
      return;
    }

    if (nowSec > lightning.nextTime) {
      lightning.active = true;
      lightning.opacity = 0.35;
      lightning.nextTime = nowSec + rand(14, 30);
    }

    if (lightning.active) {
      lightning.opacity -= dt * 2.2;
      if (lightning.opacity <= 0) {
        lightning.active = false;
        lightning.opacity = 0;
      }
    }
  }

  function getNow() {
    return (typeof performance !== 'undefined' && typeof performance.now === 'function') ? performance.now() : Date.now();
  }

  // --- Animation Loop ---

  function loop(timestamp) {
    if (!isRunning) return;

    if (!lastTimestamp) lastTimestamp = timestamp;
    var dt = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (dt > 0.1) dt = 0.1;

    var nowSec = timestamp / 1000;
    var time = getTimeOfDay();
    var season = getEffectiveSeason();

    if (!airplane && Math.random() < 0.0006) {
      spawnAirplane();
    }

    updateLightning(dt, nowSec);

    ctx.clearRect(0, 0, width, height);
    drawSky(time, season);
    drawCelestial(time, season, nowSec);
    drawClouds(dt, time, season);
    drawMountains(season, time);
    drawBirds(dt, nowSec);
    drawAirplane(dt);
    drawParticles(dt, nowSec);

    if (config.animation && isTabActive) {
      animFrameId = requestAnimationFrame(loop);
    }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      isTabActive = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      isTabActive = true;
      lastTimestamp = getNow();
      if (config.animation && isRunning) {
        animFrameId = requestAnimationFrame(loop);
      }
    }
  });

  window.addEventListener('resize', resize);

  var EnvironmentEngine = {
    init: function (savedConfig) {
      if (savedConfig && typeof savedConfig === 'object') {
        config = Object.assign(config, savedConfig);
      }

      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        config.reducedMotion = true;
      }

      canvas = document.getElementById('natureCanvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'natureCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        document.body.insertBefore(canvas, document.body.firstChild);
      }

      ctx = canvas.getContext('2d');
      resize();
      initWallpaperSlideshow();
      this.start();
    },

    start: function () {
      if (isRunning) return;
      isRunning = true;
      lastTimestamp = getNow();
      animFrameId = requestAnimationFrame(loop);
    },

    stop: function () {
      isRunning = false;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    },

    renderFrame: function () {
      var time = getTimeOfDay();
      var season = getEffectiveSeason();
      ctx.clearRect(0, 0, width, height);
      drawSky(time, season);
      drawCelestial(time, season, 0);
      drawClouds(0, time, season);
      drawMountains(season, time);
      drawParticles(0, 0);
    },

    setSeason: function (newSeason) {
      config.season = newSeason || 'auto';
      initWeatherParticles();
      if (!config.animation) {
        this.renderFrame();
      }
    },

    setIntensity: function (newIntensity) {
      config.intensity = newIntensity || 'medium';
      initWeatherParticles();
    },

    setAnimation: function (enable) {
      config.animation = !!enable;
      if (config.animation) {
        if (!isRunning) this.start();
      } else {
        this.stop();
        this.renderFrame();
      }
    },

    setReducedMotion: function (enable) {
      config.reducedMotion = !!enable;
      if (config.reducedMotion) {
        config.intensity = 'low';
        initWeatherParticles();
      }
    },

    getStatus: function () {
      return {
        season: config.season,
        effectiveSeason: getEffectiveSeason(),
        timeOfDay: getTimeOfDay(),
        intensity: config.intensity,
        animation: config.animation,
        reducedMotion: config.reducedMotion
      };
    },

    rotateWallpaper: function () {
      rotateWallpaper();
    }
  };

  window.Environment = EnvironmentEngine;
})();
