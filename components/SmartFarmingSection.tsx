"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Eye, Plane, Radio, Sun, Thermometer, CloudRain, Wind, Activity } from "lucide-react";

export default function SmartFarmingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [activeTab, setActiveTab] = useState<"drones" | "weather" | "satellite">("drones");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Initialize Three.js Boilerplate
    const scene = new THREE.Scene();
    scene.background = null; // Transparent backdrop so it blends with CSS styling

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(20, 20, 20);

    // WebGL Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1; // Prevent going underground
    controls.minDistance = 8;
    controls.maxDistance = 50;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // 2. Lighting Setup (Soft Sunlight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 0.4);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(15, 30, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    const d = 25;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // 3. GLTF Farmland Model Loader
    const loader = new GLTFLoader();
    let farmlandModel: THREE.Group | null = null;

    loader.load(
      "/images/foot_bridge_farmland_and_irrigation_canal.glb",
      (gltf) => {
        farmlandModel = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(farmlandModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 15 / maxDim; // Fit inside standard dimensions
        farmlandModel.scale.set(scale, scale, scale);
        farmlandModel.position.sub(center.multiplyScalar(scale));
        farmlandModel.position.y = -1; // Place slightly lower

        // Enable shadows for mesh elements
        farmlandModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = 0.8;
              child.material.metalness = 0.1;
            }
          }
        });

        scene.add(farmlandModel);
        setModelLoading(false);

        // GSAP ScrollTrigger model animation (camera panning and zoom)
        const container = containerRef.current;
        if (container) {
          gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.0,
            },
          })
          .to(camera.position, { x: 5, y: 15, z: 25, ease: "none" })
          .to(farmlandModel.rotation, { y: Math.PI * 2, ease: "none" }, 0);
        }
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadPercentage(percent);
        }
      },
      (error) => {
        console.error("ThreeJS load error: ", error);
        setModelLoading(false); // Remove screen so dashboard displays anyway
      }
    );

    // 4. Responsive window resized logic
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // 5. Animating WebGL context loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="smart-farming"
      className="relative min-h-screen bg-ink py-24 text-white overflow-hidden"
    >
      {/* Background ambient gold/green glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16">
          <SectionLabel number="04" text="Smart Agriculture System" light />
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            AI-Driven Crop Oversight &{" "}
            <span className="font-editorial italic text-accent font-medium">
              Precision Telemetry.
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-muted mt-4 max-w-xl leading-relaxed">
            Take manual control of the 3D biome viewport below. Rotate and pan to inspect the sensor vectors.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Biome Viewer */}
          <div className="lg:col-span-8 bg-black/40 border border-white/5 rounded-3xl relative overflow-hidden flex flex-col justify-end min-h-[480px] md:min-h-[580px] shadow-2xl">
            {/* Interactive ThreeJS Mount */}
            <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing canvas-interactive" />
            
            {/* Overlay instruction */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none flex items-center space-x-3 bg-ink/75 border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
              <Activity className="h-4 w-4 text-accent animate-pulse" />
              <span className="font-display text-[9px] uppercase tracking-widest font-semibold text-white/90">
                Live 3D Farmland Vector Telemetry
              </span>
            </div>

            {/* Orbit control helper */}
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none bg-black/60 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm text-white/50 text-[9px] font-bold uppercase tracking-widest">
              Drag to Orbit // Scroll to Zoom
            </div>

            {/* Model Loading Display */}
            {modelLoading && (
              <div className="absolute inset-0 bg-ink z-30 flex flex-col items-center justify-center text-center p-6">
                <div className="h-12 w-12 rounded-full border border-white/10 border-t-accent animate-spin mb-4" />
                <span className="font-display text-xs tracking-widest text-muted uppercase font-semibold mb-2">
                  Materializing 3D Biome Mesh
                </span>
                <span className="font-display text-2xl font-bold text-accent">
                  {loadPercentage}%
                </span>
              </div>
            )}
          </div>

          {/* Right Column: AI Farming Dashboard UI */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Tab controls */}
            <div className="grid grid-cols-3 gap-2 bg-black/30 border border-white/5 p-1 rounded-xl">
              {(["drones", "weather", "satellite"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 text-[9px] uppercase tracking-widest font-bold rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dashboard active widget */}
            <div className="flex-1 bg-black/40 border border-white/5 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between shadow-xl min-h-[360px]">
              {activeTab === "drones" && (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <Plane className="h-5 w-5 text-accent" />
                        <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                          Drone Delivery Telemetry
                        </span>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                    </div>
                    <p className="font-sans text-[11px] text-muted leading-relaxed mb-6">
                      Autonomous flight systems patrolling field quadrant Alpha-4. Sensors scan chlorophyll density index in real time, auto-dispensing customized SAVAXA doses.
                    </p>
                  </div>
                  <div className="space-y-3.5 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted uppercase font-bold tracking-wider">Active Drone Units</span>
                      <span className="font-display font-semibold text-white">4 / 4 Patrolling</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted uppercase font-bold tracking-wider">Solution Payload</span>
                      <span className="font-display font-semibold text-accent">SAVAXA Solis // 85%</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted uppercase font-bold tracking-wider">Telemetry Connection</span>
                      <span className="font-display font-semibold text-green-400">99.8% (Excellent)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "weather" && (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <Sun className="h-5 w-5 text-accent" />
                      <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                        Smart Micro-Climate Metrics
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-muted leading-relaxed mb-6">
                      In-field IoT weather sensors measure localized ambient moisture, soil chemistry dynamics, and evapotranspiration coefficients.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <Thermometer className="h-4 w-4 text-accent mx-auto mb-1.5" />
                      <span className="text-[9px] text-muted block mb-0.5">Temp</span>
                      <span className="text-xs font-bold font-display text-white">28.4°C</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <CloudRain className="h-4 w-4 text-accent mx-auto mb-1.5" />
                      <span className="text-[9px] text-muted block mb-0.5">Moisture</span>
                      <span className="text-xs font-bold font-display text-white">62.8%</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <Wind className="h-4 w-4 text-accent mx-auto mb-1.5" />
                      <span className="text-[9px] text-muted block mb-0.5">Wind</span>
                      <span className="text-xs font-bold font-display text-white">8.5 km/h</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "satellite" && (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <Radio className="h-5 w-5 text-accent" />
                      <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                        NDVI Crop Index Analyzer
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-muted leading-relaxed mb-6">
                      Satellite multispectral analysis filters red and near-infrared reflectance to evaluate absolute canopy thickness and cell health structure.
                    </p>
                  </div>
                  <div className="space-y-3.5 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted uppercase font-bold tracking-wider">Average NDVI Index</span>
                      <span className="font-display font-semibold text-green-400">0.78 (Optimal Health)</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted uppercase font-bold tracking-wider">Disease Vector Risk</span>
                      <span className="font-display font-semibold text-accent">0.05% (Extremely Low)</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted uppercase font-bold tracking-wider">Next Satellite Pass</span>
                      <span className="font-display font-semibold text-white">2.5 Hours</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Precision Agriculture Storytelling Widget */}
            <div className="bg-[#2E7D32]/20 border border-primary/20 p-5 rounded-2xl flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary-light">
                <Sun className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display text-xs font-bold text-white uppercase tracking-wide">Cognitive Farming</h4>
                <p className="font-sans text-[10px] text-white/70 leading-relaxed mt-1">
                  Merging AI calculations with biochemical targeting increases crop yield by up to 25% while halving chemical footprints.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
