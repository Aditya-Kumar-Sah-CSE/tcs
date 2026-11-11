/**
 * Procedural Web Audio API Nature Soundscape Engine
 * 100% Client-side synthesized natural ambient sounds:
 * Rain, Gentle Breeze, Babbling Stream, Bird Chirps, and Night Crickets.
 * Zero external audio files, zero CDN dependencies, zero bandwidth overhead.
 * STRICTLY OFF by default. Requires explicit user action to start.
 */

(function () {
  'use strict';

  var audioCtx = null;
  var masterGain = null;
  var isPlaying = false;
  var currentType = 'auto';
  var volume = 0.35;
  var activeGenerators = [];
  var birdTimer = null;

  function initAudioContext() {
    if (!audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(volume, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Helper to create a noise buffer (white noise)
  function createWhiteNoiseBuffer(durationSec) {
    if (!audioCtx) return null;
    var bufferSize = audioCtx.sampleRate * (durationSec || 4);
    var buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // Pink noise approximation
  function createPinkNoiseBuffer(durationSec) {
    if (!audioCtx) return null;
    var bufferSize = audioCtx.sampleRate * (durationSec || 5);
    var buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    var data = buffer.getChannelData(0);
    var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  // --- Rain Generator ---
  function startRain() {
    if (!audioCtx) return;
    var pink = createPinkNoiseBuffer(5);
    if (!pink) return;

    var noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = pink;
    noiseNode.loop = true;

    // Filter 1: Low-pass for rainfall rumble
    var lp = audioCtx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(800, audioCtx.currentTime);

    // Filter 2: High shelf for gentle patter
    var hs = audioCtx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.setValueAtTime(3000, audioCtx.currentTime);
    hs.gain.setValueAtTime(-6, audioCtx.currentTime);

    var rainGain = audioCtx.createGain();
    rainGain.gain.setValueAtTime(0.5, audioCtx.currentTime);

    noiseNode.connect(lp);
    lp.connect(hs);
    hs.connect(rainGain);
    rainGain.connect(masterGain);

    noiseNode.start();
    activeGenerators.push(noiseNode, rainGain);
  }

  // --- Breeze / Wind Generator ---
  function startBreeze() {
    if (!audioCtx) return;
    var pink = createPinkNoiseBuffer(6);
    if (!pink) return;

    var noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = pink;
    noiseNode.loop = true;

    var bp = audioCtx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(380, audioCtx.currentTime);
    bp.Q.setValueAtTime(1.8, audioCtx.currentTime);

    // LFO for swaying breeze frequency
    var lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime);

    var lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(140, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(bp.frequency);

    var breezeGain = audioCtx.createGain();
    breezeGain.gain.setValueAtTime(0.4, audioCtx.currentTime);

    noiseNode.connect(bp);
    bp.connect(breezeGain);
    breezeGain.connect(masterGain);

    noiseNode.start();
    lfo.start();
    activeGenerators.push(noiseNode, lfo, breezeGain);
  }

  // --- Flowing River / Stream Generator ---
  function startStream() {
    if (!audioCtx) return;
    var white = createWhiteNoiseBuffer(4);
    if (!white) return;

    var noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = white;
    noiseNode.loop = true;

    var bp1 = audioCtx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.setValueAtTime(650, audioCtx.currentTime);
    bp1.Q.setValueAtTime(1.2, audioCtx.currentTime);

    var lp = audioCtx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1200, audioCtx.currentTime);

    var streamGain = audioCtx.createGain();
    streamGain.gain.setValueAtTime(0.35, audioCtx.currentTime);

    noiseNode.connect(bp1);
    bp1.connect(lp);
    lp.connect(streamGain);
    streamGain.connect(masterGain);

    noiseNode.start();
    activeGenerators.push(noiseNode, streamGain);
  }

  // --- Night Crickets Generator ---
  function startCrickets() {
    if (!audioCtx) return;

    // High carrier osc
    var carrier = audioCtx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(4600, audioCtx.currentTime);

    // Modulator for cricket chirping rhythm
    var mod = audioCtx.createOscillator();
    mod.type = 'square';
    mod.frequency.setValueAtTime(16, audioCtx.currentTime);

    var modGain = audioCtx.createGain();
    modGain.gain.setValueAtTime(0.5, audioCtx.currentTime);

    // Master pulse (chirp group)
    var pulse = audioCtx.createOscillator();
    pulse.type = 'sawtooth';
    pulse.frequency.setValueAtTime(2.2, audioCtx.currentTime);

    var pulseGain = audioCtx.createGain();
    pulseGain.gain.setValueAtTime(0.3, audioCtx.currentTime);

    var cricketGain = audioCtx.createGain();
    cricketGain.gain.setValueAtTime(0.12, audioCtx.currentTime);

    mod.connect(modGain.gain);
    carrier.connect(cricketGain);
    cricketGain.connect(masterGain);

    carrier.start();
    mod.start();
    pulse.start();
    activeGenerators.push(carrier, mod, pulse, cricketGain);
  }

  // --- Bird Chirp Generator (triggered intermittently) ---
  function triggerSingleChirp() {
    if (!audioCtx || !isPlaying) return;
    try {
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      var baseFreq = 2200 + Math.random() * 800;

      osc.type = 'sine';
      var now = audioCtx.currentTime;

      // Pitch envelope: quick upward sweep then downward
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.22);

      // Amplitude envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.26);

      // Sometimes chirp again quickly
      if (Math.random() > 0.4) {
        setTimeout(function () {
          if (!isPlaying || !audioCtx) return;
          var osc2 = audioCtx.createOscillator();
          var gain2 = audioCtx.createGain();
          var now2 = audioCtx.currentTime;
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(baseFreq * 1.2, now2);
          osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now2 + 0.06);
          osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.0, now2 + 0.18);
          gain2.gain.setValueAtTime(0.001, now2);
          gain2.gain.linearRampToValueAtTime(0.07, now2 + 0.03);
          gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.20);
          osc2.connect(gain2);
          gain2.connect(masterGain);
          osc2.start(now2);
          osc2.stop(now2 + 0.22);
        }, 120);
      }
    } catch (e) {
      // Audio context might be suspended
    }
  }

  function startBirds() {
    function scheduleNextBird() {
      if (!isPlaying) return;
      var delay = 3500 + Math.random() * 5500;
      birdTimer = setTimeout(function () {
        triggerSingleChirp();
        scheduleNextBird();
      }, delay);
    }
    scheduleNextBird();
  }

  function stopAllGenerators() {
    if (birdTimer) {
      clearTimeout(birdTimer);
      birdTimer = null;
    }
    for (var i = 0; i < activeGenerators.length; i++) {
      try {
        if (typeof activeGenerators[i].stop === 'function') {
          activeGenerators[i].stop();
        }
        if (typeof activeGenerators[i].disconnect === 'function') {
          activeGenerators[i].disconnect();
        }
      } catch (e) {
        // ignore
      }
    }
    activeGenerators = [];
  }

  var SoundscapeEngine = {
    /**
     * Start soundscape playback based on given sound type or environment season
     */
    start: function (type, season) {
      initAudioContext();
      if (!audioCtx) return;

      this.stop();
      isPlaying = true;
      currentType = type || currentType || 'auto';

      // Smooth volume fade in
      if (masterGain) {
        masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        masterGain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.8);
      }

      var resolved = currentType;
      if (resolved === 'auto') {
        season = (season || 'spring').toLowerCase();
        if (season === 'monsoon' || season === 'rain') {
          resolved = 'rain';
        } else if (season === 'night') {
          resolved = 'crickets';
        } else if (season === 'winter' || season === 'autumn') {
          resolved = 'breeze';
        } else if (season === 'mountain') {
          resolved = 'stream';
        } else if (season === 'jungle') {
          resolved = 'birds';
        } else {
          resolved = 'birds';
        }
      }

      if (resolved === 'rain') {
        startRain();
      } else if (resolved === 'breeze') {
        startBreeze();
      } else if (resolved === 'stream') {
        startStream();
        startBreeze();
      } else if (resolved === 'crickets') {
        startCrickets();
      } else if (resolved === 'birds') {
        startBreeze();
        startBirds();
      } else {
        startBreeze();
        startBirds();
      }
    },

    /**
     * Stop all ambient sounds with a smooth fade-out
     */
    stop: function () {
      if (!isPlaying) return;
      isPlaying = false;
      if (masterGain && audioCtx) {
        try {
          masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
          masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
          setTimeout(stopAllGenerators, 450);
        } catch (e) {
          stopAllGenerators();
        }
      } else {
        stopAllGenerators();
      }
    },

    /**
     * Toggle sound on/off
     */
    toggle: function (season) {
      if (isPlaying) {
        this.stop();
        return false;
      } else {
        this.start(currentType, season);
        return true;
      }
    },

    /**
     * Set master volume (0.0 to 1.0)
     */
    setVolume: function (vol) {
      volume = Math.max(0, Math.min(1, Number(vol) || 0.35));
      if (masterGain && audioCtx && isPlaying) {
        masterGain.gain.setValueAtTime(volume, audioCtx.currentTime);
      }
    },

    /**
     * Check if sound is actively playing
     */
    isPlaying: function () {
      return isPlaying;
    },

    /**
     * Get current active sound type
     */
    getType: function () {
      return currentType;
    }
  };

  window.Soundscape = SoundscapeEngine;
})();
