<!-- SCRIPT -->
<script setup>
    import { ref, computed } from 'vue'
    import Sijai_Visualizer from './Sijai_Visualizer.vue'
    
    const L = ref(6)
    const B = ref(0.1)
    const H = ref(0.3)
    const f = ref(20000)
    
    const W = computed(() => Math.pow(B.value * H.value, 2) / 6)
    const q = computed(() => 8 * W.value * (f.value / Math.pow(L.value, 2)))
</script>

<!-- TEMPLATE -->
<template>
    <div class="p-4 max-w-xl mx-auto space-y-4">
        <h2 class="text-xl font-bold">Sijas parametri</h2>
        
        <div class="grid grid-cols-2 gap-4">
            <label>Sijas garums, L (m) </label>
            <input v-model.number="L" type="number" class="border p-2 rounded" />
    
            <label> Sijas platums, B (m) </label>
            <input v-model.number="B" type="number" class="border p-2 rounded" />
    
            <label> Sijas augstums, H (m) </label>
            <input v-model.number="H" type="number" class="border p-2 rounded" />
    
            <label> Stiprība, f (KPa) </label>
            <input v-model.number="f" type="number" class="border p-2 rounded" />
        </div>
  
        <div class="mt-4">
            <p><strong>Aprēķinātā slodze q:</strong> {{ q.toFixed(2) }} kN/m</p>
        </div>
  
        <Sijai_Visualizer :L="L" :B="B" :H="H" />
    </div>
</template>