/**
 * =========================================================================
 * 🚀 ARCHIVO PRINCIPAL (MAIN.JS)
 * =========================================================================
 */

import { storyScenes, welcomeConfig } from './scenes.js';
import { AudioManager } from './audioManager.js';
import { StoryEngine } from './storyEngine.js';

document.addEventListener('DOMContentLoaded', () => {
  const audioManager = new AudioManager();
  const storyEngine = new StoryEngine(storyScenes, audioManager);

  // Elementos de la pantalla de bienvenida
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const welcomeTitle = document.getElementById('welcome-title');
  const welcomeHint = document.getElementById('welcome-hint');
  const welcomeBtn = document.getElementById('welcome-btn');
  const welcomeCat = document.getElementById('welcome-cat');

  // Asignar configuración de bienvenida
  if (welcomeConfig) {
    if (welcomeTitle) welcomeTitle.textContent = welcomeConfig.title;
    if (welcomeHint) welcomeHint.textContent = welcomeConfig.hint;
    if (welcomeBtn) welcomeBtn.textContent = welcomeConfig.buttonText;
    if (welcomeCat && welcomeConfig.welcomeImage) welcomeCat.src = welcomeConfig.welcomeImage;
  }

  // Iniciar al hacer clic en el botón de bienvenida o en cualquier parte de la pantalla
  const startStory = () => {
    if (!welcomeOverlay.classList.contains('fade-out')) {
      audioManager.startAudio();
      welcomeOverlay.classList.add('fade-out');
      setTimeout(() => {
        welcomeOverlay.style.display = 'none';
      }, 500);
      storyEngine.renderCurrentScene();
    }
  };

  if (welcomeOverlay) {
    welcomeOverlay.addEventListener('click', startStory);
  }

  // Controles de navegación
  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');

  if (btnNext) {
    btnNext.addEventListener('click', () => storyEngine.next());
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => storyEngine.prev());
  }

  // Controles por teclado (Flecha derecha o Espacio para avanzar, Flecha izquierda para retroceder)
  document.addEventListener('keydown', (e) => {
    if (welcomeOverlay.style.display !== 'none') {
      if (e.code === 'Space' || e.code === 'Enter') startStory();
      return;
    }

    if (e.code === 'ArrowRight' || e.code === 'Space') {
      e.preventDefault();
      storyEngine.next();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      storyEngine.prev();
    }
  });

  // Botón de silenciar/activar música
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      const isMuted = audioManager.toggleMute();
      musicToggle.textContent = isMuted ? '🔇' : '🎵';
      musicToggle.classList.toggle('muted', isMuted);
    });
  }
});
