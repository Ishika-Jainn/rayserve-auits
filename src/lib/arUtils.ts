
// AR utilities using Three.js

import * as THREE from 'three';

export const createARScene = (containerId: string) => {
  // Get the container element
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Create scene
  const scene = new THREE.Scene();
  
  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Handle window resize
  const handleResize = () => {
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Create solar panel model
  const createSolarPanel = () => {
    const group = new THREE.Group();
    
    // Create panel frame
    const frameGeometry = new THREE.BoxGeometry(2, 1, 0.05);
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    group.add(frame);
    
    // Create panel surface
    const panelGeometry = new THREE.BoxGeometry(1.9, 0.9, 0.02);
    const panelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0055ff,
      shininess: 100,
      specular: 0x111111
    });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.z = 0.035;
    group.add(panel);
    
    // Create grid lines on panel
    const createGridLines = () => {
      const gridGroup = new THREE.Group();
      const gridMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      
      // Vertical lines
      for (let i = -0.85; i <= 0.85; i += 0.2) {
        const geometry = new THREE.BoxGeometry(0.01, 0.9, 0.03);
        const line = new THREE.Mesh(geometry, gridMaterial);
        line.position.set(i, 0, 0.035);
        gridGroup.add(line);
      }
      
      // Horizontal lines
      for (let i = -0.4; i <= 0.4; i += 0.2) {
        const geometry = new THREE.BoxGeometry(1.9, 0.01, 0.03);
        const line = new THREE.Mesh(geometry, gridMaterial);
        line.position.set(0, i, 0.035);
        gridGroup.add(line);
      }
      
      return gridGroup;
    };
    
    group.add(createGridLines());
    
    return group;
  };
  
  const solarPanel = createSolarPanel();
  scene.add(solarPanel);
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    solarPanel.rotation.y += 0.005;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Clean up function
  const cleanup = () => {
    if (container && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    window.removeEventListener('resize', handleResize);
    
    // Dispose of geometries and materials
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        } else if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        }
      }
    });
  };
  
  return {
    scene,
    camera,
    renderer,
    cleanup,
    solarPanel
  };
};

export const placeARObject = (
  latitude: number,
  longitude: number,
  address: string,
  panelCount: number = 10
) => {
  // In a real app, this would use device's geolocation and AR capabilities
  // For now, we'll just return mock data
  
  return {
    success: true,
    message: `Successfully placed ${panelCount} solar panels at ${address}`,
    previewUrl: '/ar-preview.jpg',
    estimatedPower: panelCount * 0.35, // kW
    estimatedProduction: panelCount * 1400, // kWh/year
    coordinates: { latitude, longitude }
  };
};
