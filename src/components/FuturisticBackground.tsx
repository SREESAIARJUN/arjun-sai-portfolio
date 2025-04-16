
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FuturisticBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create multiple particle systems
    const createParticleSystem = (count: number, size: number, color: string, spread: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * spread;
        positions[i + 1] = (Math.random() - 0.5) * spread;
        positions[i + 2] = (Math.random() - 0.5) * spread;

        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

      const material = new THREE.PointsMaterial({
        size,
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    };

    // Create different particle systems
    const particleSystems = [
      createParticleSystem(1500, 0.005, '#8B5CF6', 5), // Purple particles
      createParticleSystem(1000, 0.003, '#D946EF', 4), // Magenta particles
      createParticleSystem(800, 0.004, '#F97316', 3),  // Orange particles
    ];

    particleSystems.forEach(system => scene.add(system));

    // Create floating geometric shapes
    const createGeometricShape = () => {
      const geometries = [
        new THREE.TorusGeometry(0.3, 0.1, 16, 32),
        new THREE.OctahedronGeometry(0.2),
        new THREE.TetrahedronGeometry(0.2),
      ];

      const materials = [
        new THREE.MeshPhongMaterial({ color: '#8B5CF6', wireframe: true }),
        new THREE.MeshPhongMaterial({ color: '#D946EF', wireframe: true }),
        new THREE.MeshPhongMaterial({ color: '#F97316', wireframe: true }),
      ];

      const shapes = [];
      for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(geometries[i], materials[i]);
        mesh.position.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        );
        shapes.push(mesh);
      }
      return shapes;
    };

    const geometricShapes = createGeometricShape();
    geometricShapes.forEach(shape => scene.add(shape));

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 3;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update particle positions
      particleSystems.forEach(system => {
        const positions = system.geometry.attributes.position.array as Float32Array;
        const velocities = system.geometry.attributes.velocity.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Reset particles that go too far
          if (Math.abs(positions[i]) > 5) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1;
        }

        system.geometry.attributes.position.needsUpdate = true;
        system.rotation.x += 0.0005;
        system.rotation.y += 0.0005;
      });

      // Animate geometric shapes
      geometricShapes.forEach((shape, index) => {
        shape.rotation.x += 0.002 * (index + 1);
        shape.rotation.y += 0.003 * (index + 1);
        shape.position.x += Math.sin(Date.now() * 0.001 + index) * 0.002;
        shape.position.y += Math.cos(Date.now() * 0.001 + index) * 0.002;
      });

      // Interactive camera movement
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default FuturisticBackground;
