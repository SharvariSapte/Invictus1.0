let battleAudio = new Audio("/missile-boom.mp3");
battleAudio.preload = "auto";
battleAudio.load();

export function preloadBattleSound() {
  // The audio begins loading when the module is imported, so the first click
  // is ready as soon as the page mounts.
  if (!battleAudio) {
    battleAudio = new Audio("/missile-boom.mp3");
    battleAudio.preload = "auto";
    battleAudio.load();
  }
}

export function playLaunchSound() {
  if (!battleAudio) {
    preloadBattleSound();
  }

  battleAudio.pause();
  battleAudio.currentTime = 0;
  battleAudio.volume = 1.0;

  battleAudio.play().catch((error) => {
    console.warn("Battle sound could not play:", error);
  });
}

export function playExplosionSound() {
  // Don't play another sound.
  // The explosion is already included in missile-boom.mp3.
}

export function stopBattleSound() {
  if (battleAudio) {
    battleAudio.pause();
    battleAudio.currentTime = 0;
  }
}