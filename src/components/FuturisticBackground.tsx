
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
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Advanced particle systems with glowing effect
    const createGlowingParticleSystem = (count: number, size: number, color: string, spread: number, speed: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const opacities = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

        velocities[i * 3] = (Math.random() - 0.5) * speed;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * speed;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * speed;

        scales[i] = Math.random() * 0.5 + 0.5;
        opacities[i] = Math.random() * 0.5 + 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
      geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

      // Create a custom shader material for glowing particles
      const material = new THREE.PointsMaterial({
        size,
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        map: createParticleTexture(),
        depthWrite: false,
      });

      return {
        points: new THREE.Points(geometry, material),
        update: () => {
          const positions = geometry.attributes.position.array as Float32Array;
          const velocities = geometry.attributes.velocity.array as Float32Array;
          const scales = geometry.attributes.scale.array as Float32Array;
          const opacities = geometry.attributes.opacity.array as Float32Array;

          for (let i = 0; i < count; i++) {
            positions[i * 3] += velocities[i * 3];
            positions[i * 3 + 1] += velocities[i * 3 + 1];
            positions[i * 3 + 2] += velocities[i * 3 + 2];

            // Boundary check and reverse direction
            if (Math.abs(positions[i * 3]) > spread / 2) velocities[i * 3] *= -1;
            if (Math.abs(positions[i * 3 + 1]) > spread / 2) velocities[i * 3 + 1] *= -1;
            if (Math.abs(positions[i * 3 + 2]) > spread / 2) velocities[i * 3 + 2] *= -1;

            // Pulse effect for scale and opacity
            scales[i] = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 + i);
            opacities[i] = 0.5 + 0.5 * Math.cos(Date.now() * 0.0005 + i);
          }

          geometry.attributes.position.needsUpdate = true;
          material.size = size * (1 + 0.1 * Math.sin(Date.now() * 0.001));
        }
      };
    };

    // Create particle texture for better-looking particles
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      
      const context = canvas.getContext('2d')!;
      
      // Create gradient
      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Create enhanced particle systems
    const particleSystems = [
      createGlowingParticleSystem(2500, 0.025, '#8B5CF6', 6, 0.01), // Violet particles
      createGlowingParticleSystem(1800, 0.02, '#D946EF', 5, 0.015), // Magenta particles 
      createGlowingParticleSystem(1200, 0.03, '#F97316', 4, 0.02),  // Orange particles
      createGlowingParticleSystem(1000, 0.015, '#06B6D4', 4.5, 0.018), // Cyan particles
    ];

    particleSystems.forEach(system => scene.add(system.points));

    // Create more advanced geometric shapes
    const createGeometricShapes = () => {
      const shapes = [];
      
      // Torus with custom shader material
      const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 32, 64);
      const torusMaterial = new THREE.MeshPhongMaterial({ 
        color: '#8B5CF6', 
        wireframe: true,
        emissive: '#5B21B6',
        shininess: 100
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(1.5, 0.5, -1);
      shapes.push(torus);
      
      // Icosahedron with custom shader material
      const icosaGeometry = new THREE.IcosahedronGeometry(0.4, 1);
      const icosaMaterial = new THREE.MeshPhongMaterial({ 
        color: '#D946EF', 
        wireframe: true,
        emissive: '#9D174D',
        shininess: 100
      });
      const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial);
      icosahedron.position.set(-1, -1, 0);
      shapes.push(icosahedron);
      
      // Dodecahedron with custom shader material
      const dodecGeometry = new THREE.DodecahedronGeometry(0.35, 0);
      const dodecMaterial = new THREE.MeshPhongMaterial({ 
        color: '#F97316', 
        wireframe: true,
        emissive: '#9A3412',
        shininess: 100
      });
      const dodecahedron = new THREE.Mesh(dodecGeometry, dodecMaterial);
      dodecahedron.position.set(-1.5, 1, -2);
      shapes.push(dodecahedron);

      // Octahedron with custom shader material
      const octaGeometry = new THREE.OctahedronGeometry(0.3, 0);
      const octaMaterial = new THREE.MeshPhongMaterial({ 
        color: '#06B6D4', 
        wireframe: true,
        emissive: '#0E7490',
        shininess: 100
      });
      const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
      octahedron.position.set(0, -1.5, -1);
      shapes.push(octahedron);
      
      return shapes;
    };

    // Create energy connections between shapes - Fix the error by ensuring proper initialization
    const createEnergyConnections = (shapes: THREE.Mesh[]) => {
      const connections: THREE.Line[] = [];
      
      // Only create connections if we have at least 2 shapes
      if (shapes.length < 2) return connections;
      
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          if (!shapes[i] || !shapes[j]) continue; // Skip if shape doesn't exist
          
          const geometry = new THREE.BufferGeometry();
          const material = new THREE.LineBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
          });
          
          // Initialize with valid positions
          const points = [
            shapes[i].position.clone(),
            shapes[j].position.clone()
          ];
          
          geometry.setFromPoints(points);
          const line = new THREE.Line(geometry, material);
          connections.push(line);
        }
      }
      
      return connections;
    };

    const geometricShapes = createGeometricShapes();
    geometricShapes.forEach(shape => scene.add(shape));
    
    const energyConnections = createEnergyConnections(geometricShapes);
    energyConnections.forEach(line => scene.add(line));

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x202020);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add a point light that moves
    const pointLight = new THREE.PointLight(0xffffff, 1, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 4;

    // Mouse movement effect with improved smoothing
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Smoothly interpolate mouse position
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Update point light position in a circular motion
      pointLight.position.x = Math.sin(elapsedTime * 0.5) * 2;
      pointLight.position.y = Math.cos(elapsedTime * 0.3) * 2;
      pointLight.position.z = Math.sin(elapsedTime * 0.2) * 2 + 3;
      
      // Change point light color
      const r = Math.sin(elapsedTime * 0.3) * 0.5 + 0.5;
      const g = Math.sin(elapsedTime * 0.5) * 0.5 + 0.5;
      const b = Math.sin(elapsedTime * 0.7) * 0.5 + 0.5;
      pointLight.color.setRGB(r, g, b);

      // Update particle systems
      particleSystems.forEach(system => system.update());

      // Animation safety - Only proceed if all arrays are properly initialized
      if (geometricShapes && geometricShapes.length > 0) {
        // Animate geometric shapes with more complex patterns
        geometricShapes.forEach((shape, index) => {
          if (!shape) return; // Skip if the shape is undefined
          
          shape.rotation.x += 0.002 * (index + 1);
          shape.rotation.y += 0.003 * (index + 1);
          
          // More complex orbit patterns
          const radius = 0.5 + index * 0.2;
          const speed = 0.2 - index * 0.03;
          shape.position.x += Math.sin(elapsedTime * speed + index) * 0.01;
          shape.position.y += Math.cos(elapsedTime * speed + index * 2) * 0.01;
          shape.position.z = Math.sin(elapsedTime * speed * 0.5 + index) * 0.5;
          
          // Pulse the shape scale
          const scalePulse = 1 + 0.1 * Math.sin(elapsedTime * 2 + index);
          shape.scale.set(scalePulse, scalePulse, scalePulse);
        });
      }
      
      // Safely update energy connections with proper error checking
      if (energyConnections && energyConnections.length > 0 && geometricShapes && geometricShapes.length > 1) {
        energyConnections.forEach((line, index) => {
          // Calculate the indices safely
          const i = Math.floor(index / Math.max(1, geometricShapes.length - 1));
          let j = (index % Math.max(1, geometricShapes.length - 1)) + i + 1;
          
          // Ensure we're not exceeding array bounds
          if (i >= geometricShapes.length || j >= geometricShapes.length || !geometricShapes[i] || !geometricShapes[j]) {
            return; // Skip this iteration if the indices are invalid
          }
          
          // Update the line geometry only if both shapes exist
          const points = [
            geometricShapes[i].position.clone(),
            geometricShapes[j].position.clone()
          ];
          
          line.geometry.setFromPoints(points);
          
          // Animate line opacity based on distance
          const dist = geometricShapes[i].position.distanceTo(geometricShapes[j].position);
          const material = line.material as THREE.LineBasicMaterial;
          material.opacity = 0.8 * (1 - Math.min(dist / 5, 0.8)) * (0.5 + 0.5 * Math.sin(elapsedTime * 3 + i + j));
        });
      }

      // Interactive camera movement with smoother transitions
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.03;
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
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      
      // Additional cleanup to prevent memory leaks
      particleSystems.forEach(system => {
        scene.remove(system.points);
        system.points.geometry.dispose();
        (system.points.material as THREE.Material).dispose();
      });
      
      geometricShapes.forEach(shape => {
        scene.remove(shape);
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      
      energyConnections.forEach(line => {
        scene.remove(line);
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.8 }} // Slightly increased opacity for more impact
    />
  );
};

export default FuturisticBackground;
