/**
 * =========================================================================
 * 📖 MOTOR DE LA HISTORIA (STORY ENGINE)
 * =========================================================================
 */

export class StoryEngine {
  constructor(scenes, audioManager) {
    this.scenes = scenes;
    this.audio = audioManager;
    this.currentIndex = 0;

    // Elementos del DOM
    this.catImage = document.getElementById('cat-image');
    this.catContainer = document.getElementById('cat-container');
    this.catShadow = document.getElementById('cat-shadow');
    this.storyText = document.getElementById('story-text');
    this.storySubtext = document.getElementById('story-subtext');
    this.btnNext = document.getElementById('btn-next');
    this.btnPrev = document.getElementById('btn-prev');
    this.progressBar = document.getElementById('progress-bar');
    this.particlesContainer = document.getElementById('particles-container');

    this.initProgressDots();
    this.bindInteractions();
  }

  initProgressDots() {
    this.progressBar.innerHTML = '';
    this.scenes.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `progress-dot ${index === 0 ? 'active' : ''}`;
      this.progressBar.appendChild(dot);
    });
  }

  updateProgressDots() {
    const dots = this.progressBar.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
      dot.className = 'progress-dot';
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else if (index < this.currentIndex) {
        dot.classList.add('passed');
      }
    });
  }

  renderCurrentScene() {
    const scene = this.scenes[this.currentIndex];
    if (!scene) return;

    // 1. Efecto de sonido de la escena
    if (scene.sfx) {
      this.audio.playSfx(scene.sfx);
    }

    // 2. Animación Squash & Stretch en la imagen del gatito
    this.catImage.classList.remove('squash-in');
    void this.catImage.offsetWidth; // Forzar reflujo de animación en el DOM
    this.catImage.src = scene.image;
    this.catImage.classList.add('squash-in');

    // 3. Filtro Yoshi's Island (Line Boil)
    if (scene.yoshiWobble !== false) {
      this.catImage.classList.add('yoshi-stroke', 'pencil-shake');
    } else {
      this.catImage.classList.remove('yoshi-stroke', 'pencil-shake');
    }

    // 4. Actualizar textos con animación suave
    this.storyText.classList.remove('text-appear');
    void this.storyText.offsetWidth;
    this.storyText.textContent = scene.text;
    this.storyText.classList.add('text-appear');

    if (scene.subtext) {
      this.storySubtext.style.display = 'block';
      this.storySubtext.textContent = scene.subtext;
    } else {
      this.storySubtext.style.display = 'none';
      this.storySubtext.textContent = '';
    }

    // 5. Botones
    this.btnNext.textContent = scene.buttonText || "Continuar 🐾";

    // Mostrar botón de retroceso solo si no estamos en la primera escena
    if (this.currentIndex > 0) {
      this.btnPrev.style.display = 'inline-flex';
    } else {
      this.btnPrev.style.display = 'none';
    }

    // 6. Actualizar barra de progreso
    this.updateProgressDots();

    // 7. Si es escena de celebración, desatar lluvia de corazones
    if (scene.celebration) {
      this.launchCelebration();
    }
  }

  next() {
    if (this.currentIndex < this.scenes.length - 1) {
      this.currentIndex++;
      this.renderCurrentScene();
    } else {
      // Si estamos en la última y toca el botón, reiniciar
      this.currentIndex = 0;
      this.renderCurrentScene();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCurrentScene();
    }
  }

  bindInteractions() {
    // Al hacer clic sobre el gatito: rebote elástico + maullido o pop + corazoncitos
    this.catContainer.addEventListener('click', (e) => {
      this.catImage.classList.remove('squash-bounce');
      void this.catImage.offsetWidth;
      this.catImage.classList.add('squash-bounce');

      this.audio.playSfx('meow');
      this.spawnHeartAt(e.clientX, e.clientY);
    });
  }

  spawnHeartAt(x, y) {
    const emojis = ['💕', '✨', '🐾', '💖', '🌸'];
    const heart = document.createElement('div');
    heart.className = 'floating-particle';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = `${x - 12}px`;
    heart.style.top = `${y - 20}px`;

    this.particlesContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
  }

  launchCelebration() {
    const emojis = ['💖', '💕', '✨', '🐾', '🌸', '🧁', '⭐'];
    for (let i = 0; i < 28; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 20;
        const heart = document.createElement('div');
        heart.className = 'floating-particle';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.animationDuration = `${2.5 + Math.random() * 2}s`;
        this.particlesContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 4500);
      }, i * 90);
    }
  }
}
