// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800, // duración de la animación en ms
        easing: 'ease-in-out', // tipo de easing
        once: true, // si se debe animar solo una vez
    });

    // Inicializa la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Habilita fondo transparente
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Carga el modelo 3D
    const loader = new THREE.GLTFLoader();
    loader.load('ruta/a/tu/modelo.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Posiciona la cámara
        camera.position.z = 5;

        // Variable para determinar si se está moviendo
        let isMoving = false;

        // Detecta movimiento del mouse
        document.addEventListener('mousemove', () => {
            isMoving = true; // Cambia el estado a "moviendo"
        });

        // Función de animación
        const animate = function () {
            requestAnimationFrame(animate);

            if (!isMoving) {
                // Rota el modelo solo si no se está moviendo
                model.rotation.y += 0.01; // Cambia este valor para ajustar la velocidad de rotación
            } else {
                isMoving = false; // Reinicia el estado de movimiento
            }

            // Renderiza la escena
            renderer.render(scene, camera);
        };

        animate();
    }, undefined, function (error) {
        console.error(error);
    });
});
