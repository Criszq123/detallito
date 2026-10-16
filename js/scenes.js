/**
 * =========================================================================
 * 🐾 ARCHIVO DE CONFIGURACIÓN DE LA HISTORIA (SCENES.JS) 🐾
 * =========================================================================
 * 
 * ¡AQUÍ ES DONDE PERSONALIZAS TODO! 
 * Solo tienes que cambiar el texto, el orden de las escenas y las imágenes.
 * 
 * Propiedades de cada escena:
 * - image: Ruta de la imagen en la carpeta img/ (ej: 'img/cat-glasses.png', 'img/cat-02.png')
 * - text: El texto o diálogo principal que dirá el gatito.
 * - subtext: Texto secundario o aclaratorio (puedes dejarlo en "" o null si no quieres).
 * - buttonText: El texto del botón para avanzar a la siguiente escena.
 * - sfx: Efecto sonoro interactivo ('pop', 'boing', 'meow', 'sparkle', 'purr').
 * - celebration: Si es true (en la última escena), suelta una lluvia de corazones.
 * - yoshiWobble: true para activar la vibración de trazo estilo dibujo animado.
 */

export const storyScenes = [
  {
    id: 1,
    image: "img/cat-glasses.png",
    text: "Un momento... identifícate.",
    subtext: "Zona de máxima ternura restringida 🕶️",
    buttonText: "Soy yo... 🐾",
    sfx: "pop",
    yoshiWobble: true
  },
  {
    id: 2,
    image: "img/cat-10.png",
    text: "¿De verdad eres tú? Déjame mirarte bien...",
    subtext: "(analizando nivel de lindura... 100% verificado)",
    buttonText: "¿Y bien? 👀",
    sfx: "boing",
    yoshiWobble: true
  },
  {
    id: 3,
    image: "img/cat-07.png",
    text: "¡Siiii! ¡Sabía que vendrías!",
    subtext: "Llevaba todo el día esperando por ti.",
    buttonText: "Awww, ¿en serio? ✨",
    sfx: "meow",
    yoshiWobble: true
  },
  {
    id: 4,
    image: "img/cat-cookie.png",
    text: "Te traje una galletita con todo mi cariño...",
    subtext: "(Bueno... le di una mordidita pero te guardé la mayor parte)",
    buttonText: "¡Qué rico! 🍪",
    sfx: "pop",
    yoshiWobble: true
  },
  {
    id: 5,
    image: "img/cat-00.png",
    text: "Solo quería recordarte lo mucho que te quiero...",
    subtext: "Y lo feliz que me hace tenerte en mi vida.",
    buttonText: "Un abrazo gigante 💕",
    sfx: "sparkle",
    yoshiWobble: true
  },
  {
    id: 6,
    image: "img/cat-11.png",
    text: "¡Misión cumplida! Te mando muchos besitos y mimos.",
    subtext: "Siempre puedes volver a verme cuando quieras un abrazo.",
    buttonText: "Volver a empezar 🔁",
    sfx: "meow",
    celebration: true,
    yoshiWobble: true
  }
];

/**
 * Mensaje o título de la pantalla de bienvenida
 */
export const welcomeConfig = {
  title: "Tengo un detallito para ti...",
  hint: "Sube el volumen y toca la pantalla para empezar 🐾",
  buttonText: "Abrir mensaje 💌",
  welcomeImage: "img/cat-glasses.png"
};
