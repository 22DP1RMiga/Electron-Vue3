<script setup>
    import { onMounted, watch, ref } from 'vue'
    import * as THREE from 'three'
    
    const props = defineProps(['L', 'B', 'H'])
    const canvasContainer = ref(null)
    let scene, camera, renderer, beamMesh
    
    onMounted(() => {
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(75, canvasContainer.value.clientWidth / 400, 0.1, 1000)
        camera.position.z = 2
    
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(canvasContainer.value.clientWidth, 400)
        canvasContainer.value.appendChild(renderer.domElement)
    
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(5, 5, 5).normalize()
        scene.add(light)
    
        addBeam()
        animate()
    })
    
    function addBeam() {
        if (beamMesh) scene.remove(beamMesh)
    
        const geometry = new THREE.BoxGeometry(props.L, props.H, props.B)
        const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 })
        beamMesh = new THREE.Mesh(geometry, material)
        scene.add(beamMesh)
    }
    
    function animate() {
        requestAnimationFrame(animate)
        beamMesh.rotation.y += 0.005
        renderer.render(scene, camera)
    }
    
    // Kad mainās parametri, atjauno siju
    watch(() => [props.L, props.B, props.H], addBeam)
</script>

<template>
    <h2 class="text-xl font-bold">Sijas vizualizācija</h2>
    <div ref="canvasContainer" style="width: 100%; height: 400px;"></div>
</template>