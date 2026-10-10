import { useEffect, useRef } from "react";
import * as THREE from "three";

function sphere(color: number, scale: [number, number, number], position: [number, number, number]) {
  const geometry = new THREE.SphereGeometry(1, 32, 24);
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.72 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(...scale);
  mesh.position.set(...position);
  mesh.castShadow = true;
  return mesh;
}

export default function ThreeLoveScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.2, 9);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const fur = 0x8b5b45;
    const muzzle = 0xc99b77;
    group.add(sphere(fur, [1.55, 1.75, 1.2], [0, -0.35, 0]));
    group.add(sphere(fur, [1.22, 1.1, 1], [0, 1.5, 0]));
    group.add(sphere(fur, [.48, .48, .35], [-.9, 2.15, 0]));
    group.add(sphere(fur, [.48, .48, .35], [.9, 2.15, 0]));
    group.add(sphere(muzzle, [.62, .48, .28], [0, 1.25, .88]));
    group.add(sphere(0x180d12, [.12, .1, .08], [-.38, 1.7, .95]));
    group.add(sphere(0x180d12, [.12, .1, .08], [.38, 1.7, .95]));
    group.add(sphere(0x2a151b, [.18, .13, .1], [0, 1.45, 1.14]));
    group.add(sphere(fur, [.45, 1.05, .42], [-1.45, -.15, 0]));
    group.add(sphere(fur, [.45, 1.05, .42], [1.45, -.15, 0]));
    group.add(sphere(fur, [.72, .72, .8], [-.88, -1.65, .15]));
    group.add(sphere(fur, [.72, .72, .8], [.88, -1.65, .15]));

    const letter = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.15, .08),
      new THREE.MeshStandardMaterial({ color: 0xe8d7bf, roughness: .9 }),
    );
    letter.position.set(0, -.38, 1.22);
    letter.rotation.x = -.12;
    group.add(letter);
    const seal = sphere(0x7d1835, [.2, .2, .08], [0, -.36, 1.31]);
    group.add(seal);

    const frog = new THREE.Group();
    frog.add(sphere(0x65785a, [.52, .4, .42], [0, 0, 0]));
    frog.add(sphere(0x65785a, [.2, .2, .18], [-.3, .31, .03]));
    frog.add(sphere(0x65785a, [.2, .2, .18], [.3, .31, .03]));
    frog.add(sphere(0x140f13, [.07, .07, .05], [-.3, .34, .2]));
    frog.add(sphere(0x140f13, [.07, .07, .05], [.3, .34, .2]));
    frog.position.set(1.65, 1.22, .4);
    frog.rotation.z = -.25;
    group.add(frog);

    scene.add(new THREE.HemisphereLight(0xe9d6d0, 0x25111c, 2.8));
    const keyLight = new THREE.DirectionalLight(0xb64b6b, 4);
    keyLight.position.set(3, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - .5) * .5;
      pointerY = ((event.clientY - rect.top) / rect.height - .5) * .18;
    };
    mount.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (time: number) => {
      group.rotation.y += (pointerX - group.rotation.y) * .04;
      group.rotation.x += (-pointerY - group.rotation.x) * .04;
      if (!reducedMotion) group.position.y = Math.sin(time * .001) * .08;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) object.material.dispose();
        }
      });
    };
  }, []);

  return <div className="three-scene" ref={mountRef} aria-label="Osito y ranita tridimensionales con una carta de amor" />;
}
