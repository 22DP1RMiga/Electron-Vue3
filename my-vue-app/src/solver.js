const { createApp, ref, computed, watch, onMounted, nextTick } = Vue;

const app = createApp({
  template: `
    <div class="calculator-container">
      <div class="inputs">
        <label>L (m): <input v-model.number="L" type="number" /></label>
        <label>B (m): <input v-model.number="B" type="number" /></label>
        <label>H (m): <input v-model.number="H" type="number" /></label>
        <label>f (KPa): <input v-model.number="f" type="number" /></label>
        <p>Izkliedētā slodze q: {{ q.toFixed(2) }} KN/m</p>
      </div>
      <div ref="sceneContainer" class="scene"></div>
    </div>
  `,
  setup() {
    const L = ref(6);
    const B = ref(0.1);
    const H = ref(0.3);
    const f = ref(20000);
    const solverText = ref("Initializing solver...");
    const sceneContainer = ref(null);
    let scene, camera, renderer, beam;

    const W = computed(() => (B.value * H.value) ** 2 / 6);
    const q = computed(() => 8 * W.value * (f.value / L.value ** 2));

    const initThree = async () => {
      await nextTick(); // Ensure sceneContainer is available
      if (!sceneContainer.value) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 1.5, 0.1, 1000);
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(300, 200);
      sceneContainer.value.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(L.value, H.value, B.value);
      const material = new THREE.MeshBasicMaterial({ color: 0x8b5a2b });
      beam = new THREE.Mesh(geometry, material);
      scene.add(beam);

      camera.position.z = 3;
      renderer.render(scene, camera);
      
      // Update solver text after initialization
      solverText.value = "Solver Ready!";
    };

    const updateBeam = () => {
      if (beam) {
        beam.scale.set(L.value / 6, H.value / 0.3, B.value / 0.1);
        renderer.render(scene, camera);
      }
    };

    watch([L, B, H], updateBeam);
    onMounted(initThree);

    return { L, B, H, f, q, sceneContainer, solverText };
  }
});

app.mount("#app");
