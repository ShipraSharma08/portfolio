import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AccentColor } from '../../types';

interface ThreeCanvasProps {
  accentColor: AccentColor;
}

const COLOR_MAP: Record<AccentColor, { primary: number; secondary: number; line: number }> = {
  emerald: {
    primary: 0x10b981,
    secondary: 0x34d399,
    line: 0x065f46,
  },
  cyan: {
    primary: 0x06b6d4,
    secondary: 0x38bdf8,
    line: 0x164e63,
  },
  violet: {
    primary: 0x8b5cf6,
    secondary: 0xa78bfa,
    line: 0x4c1d95,
  },
};

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ accentColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const accentColorRef = useRef<AccentColor>(accentColor);

  useEffect(() => {
    accentColorRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect low-power or mobile
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 65 : 130;
    const maxConnectionDist = isMobile ? 55 : 75;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080c, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Node data structures for anti-gravity & cursor physics
    interface NodeData {
      basePos: THREE.Vector3;
      currPos: THREE.Vector3;
      velocity: THREE.Vector3;
      size: number;
      orbitSpeed: number;
      orbitRadius: number;
      orbitAngle: number;
      elevation: number;
    }

    const nodes: NodeData[] = [];
    const sphereRadius = isMobile ? 90 : 130;

    for (let i = 0; i < nodeCount; i++) {
      // Golden ratio spherical distribution
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = sphereRadius * (0.6 + Math.random() * 0.5);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);

      nodes.push({
        basePos: pos.clone(),
        currPos: pos.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        size: Math.random() * 2.5 + 1.2,
        orbitSpeed: (Math.random() - 0.5) * 0.004,
        orbitRadius: Math.hypot(x, y),
        orbitAngle: Math.atan2(y, x),
        elevation: z,
      });
    }

    // 3. Node Geometry & Material
    const nodeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);

    nodes.forEach((n, idx) => {
      positions[idx * 3] = n.currPos.x;
      positions[idx * 3 + 1] = n.currPos.y;
      positions[idx * 3 + 2] = n.currPos.z;
      sizes[idx] = n.size;
    });

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle sprite using procedural canvas texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(16, 185, 129, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    const currentColors = COLOR_MAP[accentColorRef.current];
    const nodeMaterial = new THREE.PointsMaterial({
      color: currentColors.primary,
      size: 4.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(pointCloud);

    // 4. Geometric floating satellites (Icosahedrons & Octahedrons)
    const geometricGroup = new THREE.Group();
    const geomCount = isMobile ? 6 : 12;
    const geomMeshes: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; initialPos: THREE.Vector3 }[] = [];

    const icosaGeom = new THREE.IcosahedronGeometry(3.5, 0);
    const octaGeom = new THREE.OctahedronGeometry(4, 0);

    const geomWireMaterial = new THREE.MeshBasicMaterial({
      color: currentColors.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    for (let i = 0; i < geomCount; i++) {
      const isIcosa = i % 2 === 0;
      const mesh = new THREE.Mesh(isIcosa ? icosaGeom : octaGeom, geomWireMaterial);

      const angle = (i / geomCount) * Math.PI * 2;
      const radius = (sphereRadius * 0.8) + (Math.random() - 0.5) * 40;
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 90,
        Math.sin(angle) * radius * 0.6
      );

      mesh.position.copy(pos);
      geometricGroup.add(mesh);

      geomMeshes.push({
        mesh,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        initialPos: pos.clone(),
      });
    }

    scene.add(geometricGroup);

    // 5. Dynamic Network Lines & Packet Traces
    const maxLines = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    // 6. Packet Pulses traveling between nodes
    interface PacketPulse {
      sourceIdx: number;
      targetIdx: number;
      progress: number;
      speed: number;
      pos: THREE.Vector3;
    }

    const packetPulses: PacketPulse[] = [];
    const maxPackets = isMobile ? 8 : 18;

    for (let i = 0; i < maxPackets; i++) {
      packetPulses.push({
        sourceIdx: Math.floor(Math.random() * nodeCount),
        targetIdx: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.009,
        pos: new THREE.Vector3(),
      });
    }

    const packetGeometry = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(maxPackets * 3);
    packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));

    const packetMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const packetPoints = new THREE.Points(packetGeometry, packetMaterial);
    scene.add(packetPoints);

    // 7. Mouse interaction & Gravity Repulsion
    const mouse3D = new THREE.Vector3(0, 0, 0);
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotation.y = normX * 0.4;
      targetRotation.x = -normY * 0.3;

      // Unproject mouse coordinates into 3D world space
      const vector = new THREE.Vector3(normX, normY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouse3D.copy(camera.position).add(dir.multiplyScalar(distance));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Intersection Observer for pausing offscreen to maintain 60 FPS & power efficiency
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 10. Main Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render if not in view
      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/scene rotation tracking cursor
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.04;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.04;

      scene.rotation.y = currentRotation.y + elapsedTime * 0.04;
      scene.rotation.x = currentRotation.x + Math.sin(elapsedTime * 0.2) * 0.05;

      // Update accent colors dynamically if changed
      const currentActiveColors = COLOR_MAP[accentColorRef.current];
      nodeMaterial.color.setHex(currentActiveColors.primary);
      geomWireMaterial.color.setHex(currentActiveColors.secondary);

      // Physics: anti-gravity floating + cursor repulsion
      const positionsAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      nodes.forEach((node, i) => {
        // Orbit motion
        node.orbitAngle += node.orbitSpeed;
        const targetX = Math.cos(node.orbitAngle) * node.orbitRadius;
        const targetY = Math.sin(node.orbitAngle) * node.orbitRadius;
        const targetZ = node.elevation + Math.sin(elapsedTime * 1.5 + i) * 3;

        // Spring force towards orbit position
        const springForce = 0.025;
        const damping = 0.92;

        const fx = (targetX - node.currPos.x) * springForce;
        const fy = (targetY - node.currPos.y) * springForce;
        const fz = (targetZ - node.currPos.z) * springForce;

        node.velocity.x = (node.velocity.x + fx) * damping;
        node.velocity.y = (node.velocity.y + fy) * damping;
        node.velocity.z = (node.velocity.z + fz) * damping;

        // Cursor Repulsion in world space
        const dx = node.currPos.x - mouse3D.x * 0.5;
        const dy = node.currPos.y - mouse3D.y * 0.5;
        const dist = Math.hypot(dx, dy);
        const repulsionRadius = 55;

        if (dist < repulsionRadius && dist > 0.1) {
          const force = ((repulsionRadius - dist) / repulsionRadius) * 2.2;
          node.velocity.x += (dx / dist) * force;
          node.velocity.y += (dy / dist) * force;
        }

        // Apply velocity
        node.currPos.add(node.velocity);

        posArray[i * 3] = node.currPos.x;
        posArray[i * 3 + 1] = node.currPos.y;
        posArray[i * 3 + 2] = node.currPos.z;
      });

      positionsAttr.needsUpdate = true;

      // Update geometric satellites
      geomMeshes.forEach(({ mesh, rotSpeed }) => {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
      });

      // Update dynamic lines between nodes
      let lineIndex = 0;
      let colorIndex = 0;
      const lineColorObj = new THREE.Color(currentActiveColors.line);

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].currPos.x - nodes[j].currPos.x;
          const dy = nodes[i].currPos.y - nodes[j].currPos.y;
          const dz = nodes[i].currPos.z - nodes[j].currPos.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxConnectionDist) {
            const alpha = 1.0 - dist / maxConnectionDist;

            linePositions[lineIndex++] = nodes[i].currPos.x;
            linePositions[lineIndex++] = nodes[i].currPos.y;
            linePositions[lineIndex++] = nodes[i].currPos.z;

            linePositions[lineIndex++] = nodes[j].currPos.x;
            linePositions[lineIndex++] = nodes[j].currPos.y;
            linePositions[lineIndex++] = nodes[j].currPos.z;

            lineColors[colorIndex++] = lineColorObj.r * alpha;
            lineColors[colorIndex++] = lineColorObj.g * alpha;
            lineColors[colorIndex++] = lineColorObj.b * alpha;

            lineColors[colorIndex++] = lineColorObj.r * alpha;
            lineColors[colorIndex++] = lineColorObj.g * alpha;
            lineColors[colorIndex++] = lineColorObj.b * alpha;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineIndex / 3);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      // Update Packet Pulses
      const packetPosAttr = packetGeometry.attributes.position as THREE.BufferAttribute;
      const packetArray = packetPosAttr.array as Float32Array;

      packetPulses.forEach((packet, pIdx) => {
        packet.progress += packet.speed;
        if (packet.progress >= 1.0) {
          packet.progress = 0;
          packet.sourceIdx = Math.floor(Math.random() * nodeCount);
          packet.targetIdx = Math.floor(Math.random() * nodeCount);
        }

        const p1 = nodes[packet.sourceIdx].currPos;
        const p2 = nodes[packet.targetIdx].currPos;

        const px = p1.x + (p2.x - p1.x) * packet.progress;
        const py = p1.y + (p2.y - p1.y) * packet.progress;
        const pz = p1.z + (p2.z - p1.z) * packet.progress;

        packetArray[pIdx * 3] = px;
        packetArray[pIdx * 3 + 1] = py;
        packetArray[pIdx * 3 + 2] = pz;
      });

      packetPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose memory
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
      icosaGeom.dispose();
      octaGeom.dispose();
      geomWireMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
