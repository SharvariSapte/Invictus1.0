let audioContext;

function getContext() {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  return audioContext;
}

export function playLaunchSound() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(720, now + 0.8);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(700, now);
  filter.frequency.exponentialRampToValueAtTime(2600, now + 0.8);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.24, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.95);
}

export function playExplosionSound() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.9, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    const decay = Math.pow(1 - i / data.length, 2.4);
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(900, now);
  filter.frequency.exponentialRampToValueAtTime(120, now + 0.8);

  gain.gain.setValueAtTime(0.65, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
}
