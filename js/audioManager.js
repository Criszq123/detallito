/**
 * =========================================================================
 * 🎵 ADMINISTRADOR DE AUDIO (Música de fondo y Efectos de sonido)
 * =========================================================================
 */

export class AudioManager {
  constructor() {
    this.bgm = null;
    this.isMuted = false;
    this.hasStarted = false;
    this.audioCtx = null;
    this.targetVolume = 0.5;

    // Ruta de la canción detectada en la carpeta sounds/
    this.bgmSource = "sounds/Lamore dice ciao (From La matriarca - The Libertine).mp3";
    this.initBgm();
  }

  initBgm() {
    this.bgm = new Audio(encodeURI(this.bgmSource));
    this.bgm.loop = true;
    this.bgm.volume = 0;
  }

  // Desbloquea el AudioContext tras la primera interacción del usuario
  startAudio() {
    if (this.hasStarted) return;
    this.hasStarted = true;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
      }
    } catch (e) {
      console.warn("Web Audio API no soportado:", e);
    }

    // Reproduce la música de fondo con entrada suave (fade-in)
    this.playBgmWithFade();
  }

  playBgmWithFade() {
    if (!this.bgm) return;
    this.bgm.play().then(() => {
      let currentVol = 0;
      const interval = setInterval(() => {
        if (this.isMuted) {
          clearInterval(interval);
          return;
        }
        currentVol = Math.min(this.targetVolume, currentVol + 0.05);
        this.bgm.volume = currentVol;
        if (currentVol >= this.targetVolume) clearInterval(interval);
      }, 100);
    }).catch(err => {
      console.warn("Autoplay bloqueado por el navegador:", err);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgm) {
      this.bgm.muted = this.isMuted;
    }
    return this.isMuted;
  }

  /**
   * Generador de efectos de sonido sintetizados y tiernos (cero latencia)
   */
  playSfx(type = 'pop') {
    if (this.isMuted) return;

    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) this.audioCtx = new AudioContextClass();
    }

    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;

    switch (type) {
      case 'pop':
        this.synthPop(now);
        break;
      case 'boing':
        this.synthBoing(now);
        break;
      case 'meow':
        this.synthMeow(now);
        break;
      case 'sparkle':
        this.synthSparkle(now);
        break;
      default:
        this.synthPop(now);
        break;
    }
  }

  synthPop(t) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.09);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  synthBoing(t) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.linearRampToValueAtTime(480, t + 0.12);
    osc.frequency.linearRampToValueAtTime(320, t + 0.25);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  synthMeow(t) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    // Curva de frecuencia de un maullido sutil
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(680, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(510, t + 0.35);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.22, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  synthSparkle(t) {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
    notes.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const start = t + (index * 0.07);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
  }
}
