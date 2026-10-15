import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { destinations } from "./spaceDestinations";
import { createAstronaut, createUfo } from "./spaceObjects";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const vertex = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vPosition = position;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const noise = `
  float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
  float cosmicNoise(vec3 p) {
    vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
    mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
  }
  float fbm(vec3 p) { float v=0.0; float a=0.5; for(int i=0;i<5;i++){v+=a*cosmicNoise(p);p=p*2.03+vec3(7.1);a*=0.5;}return v; }
`;
export default function SpaceScene({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const visitors = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(active);
  const selectRef = useRef(onSelect);
  const [available, setAvailable] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(zoom);
  const [warp, setWarp] = useState(0);
  const warpRef = useRef(warp);
  const [signal, setSignal] = useState("Selecciona un planeta. Hay dos visitantes escondidos en la escena.");
  const [found, setFound] = useState<string[]>([]);
  const discover=(kind:string)=>{setFound(prev=>prev.includes(kind)?prev:[...prev,kind]);setSignal(kind==="astronaut"?"¡Encontraste a la astronauta! Ingeniera explorando nuevos mundos desde 2016.":"¡Contacto extraterrestre! La nave recibió tu señal. Bienvenid@ al universo de Anahí.");};
  useEffect(() => { selectRef.current=onSelect; },[onSelect]);
  useEffect(() => { zoomRef.current=zoom; },[zoom]);
  useEffect(() => { warpRef.current=warp; },[warp]);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" }); }
    catch { return; }
    setAvailable(true);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x03050d, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 180);
    const composer=new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene,camera));
    const bloom=new UnrealBloomPass(new THREE.Vector2(1,1),.32,.5,1.1);composer.addPass(bloom);
    const output=new OutputPass();composer.addPass(output);
    const system = new THREE.Group(); scene.add(system);
    let seed = 42;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const particles = new THREE.BufferGeometry();
    const positions = [], colors = [];
    for (let i = 0; i < 2600; i++) {
      positions.push((random()-.5)*110, (random()-.5)*85, -10-random()*75);
      const c = new THREE.Color().setHSL(.56+random()*.12, .12+random()*.22, .48+random()*.45);
      colors.push(c.r,c.g,c.b);
    }
    particles.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
    particles.setAttribute("color",new THREE.Float32BufferAttribute(colors,3));
    const starMaterial = new THREE.ShaderMaterial({
      vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `varying vec3 vColor; void main(){vColor=color;vec4 p=modelViewMatrix*vec4(position,1.0);gl_PointSize=clamp(55.0/-p.z,1.0,3.0);gl_Position=projectionMatrix*p;}`,
      fragmentShader: `varying vec3 vColor; void main(){float d=length(gl_PointCoord-0.5);float a=1.0-smoothstep(0.0,0.5,d);gl_FragColor=vec4(vColor,a*.8);}`,
    });
    const stars = new THREE.Points(particles,starMaterial); scene.add(stars);

    // Distant volumetric-looking dust, behind the individual star layers.
    const nebula = new THREE.Mesh(new THREE.PlaneGeometry(210,140),new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,
      vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader:`varying vec2 vUv;${noise}
        void main(){
          vec2 p=vUv;
          float dust=fbm(vec3(p*8.0,1.3));
          float wisps=fbm(vec3(p*18.0+vec2(dust*2.0),4.7));
          float band=exp(-pow((p.y-.4-sin(p.x*5.0)*.12)*4.3,2.0));
          float density=smoothstep(.35,.72,dust)*wisps*band;
          vec3 color=mix(vec3(.10,.22,.39),vec3(.34,.17,.43),smoothstep(.3,.8,p.x));
          gl_FragColor=vec4(color,density*.55);
        }`,
    }));nebula.position.set(0,0,-95);scene.add(nebula);

    const sphere = new THREE.SphereGeometry(1, 80, 48);
    const textureLoader=new THREE.TextureLoader();
    const textures:THREE.Texture[]=[];
    const loadTexture=(name:string)=>{const texture=textureLoader.load(`/space/${name}.jpg`);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());textures.push(texture);return texture;};
    const backdrop=textureLoader.load("/space/nebula-cinematic.webp");backdrop.colorSpace=THREE.SRGBColorSpace;textures.push(backdrop);scene.background=backdrop;
    const specs = [
      { position: [1.6,.1,.5], radius: 1.8, atmosphere: "#e7c79f", texture:"saturn" },
      { position: [-3.3,.1,-.7], radius: 1.02, atmosphere: "#5fbeef", texture:"earth_daymap" },
      { position: [.1,-2.5,1], radius: .63, atmosphere: "#ca7756", texture:"mars" },
    ];
    const planets = specs.map((s,i) => {
      const group = new THREE.Group(); group.position.set(s.position[0],s.position[1],s.position[2]);
      const material = new THREE.MeshStandardMaterial({map:loadTexture(s.texture),roughness:.9,metalness:.04});
      const mesh = new THREE.Mesh(sphere, material); mesh.scale.setScalar(s.radius); mesh.rotation.z = i === 0 ? -.28 : .15; group.add(mesh);
      const atmosphere = new THREE.Mesh(sphere,new THREE.ShaderMaterial({
        vertexShader: vertex, transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color(s.atmosphere) } },
        fragmentShader: `varying vec3 vNormal;varying vec3 vWorld;uniform vec3 uColor;void main(){vec3 view=normalize(cameraPosition-vWorld);float glow=pow(max(0.0,0.7+dot(normalize(vNormal),view)),3.5);gl_FragColor=vec4(uColor,glow*.35);}`,
      })); atmosphere.scale.setScalar(s.radius*1.055); group.add(atmosphere);
      mesh.userData.destination=i;
      system.add(group);
      return { group, mesh, radius:s.radius };
    });
    const ringGeometry = new THREE.RingGeometry(2.15, 3.6, 192, 8);
    const ringMaterial = new THREE.ShaderMaterial({
      transparent: true, side: THREE.DoubleSide, depthWrite: false,
      vertexShader: `varying vec3 vRing;void main(){vRing=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vRing;void main(){float r=length(vRing.xy);float gap=1.0-smoothstep(.0,.045,abs(r-2.85));float lines=.55+.45*sin(r*240.0);float edge=smoothstep(2.15,2.23,r)*(1.0-smoothstep(3.5,3.6,r));vec3 c=mix(vec3(.28,.25,.24),vec3(.88,.76,.6),lines);gl_FragColor=vec4(c,edge*(.44+lines*.3)*(1.0-gap*.9));}`,
    });
    const rings = new THREE.Mesh(ringGeometry,ringMaterial);
    rings.rotation.x = 1.18; rings.rotation.y = -.2; rings.rotation.z = -.36;
    planets[0].group.add(rings);
    const moon = new THREE.Mesh(sphere, new THREE.MeshStandardMaterial({ map:loadTexture("moon"), roughness: 1 }));
    moon.scale.setScalar(.15); moon.position.set(-1.3,-1.7,.4); planets[1].group.add(moon);
    const sunlight = new THREE.DirectionalLight("#f8e5d4",3.2); sunlight.position.set(-6,5,6); scene.add(sunlight);
    scene.add(new THREE.AmbientLight("#8197c7",.6));
    const rimLight=new THREE.DirectionalLight("#948aff",1.5);rimLight.position.set(5,-1,-3);scene.add(rimLight);
    const astronaut=createAstronaut();astronaut.position.set(-4,-1.9,2);astronaut.scale.setScalar(.72);system.add(astronaut);
    const ufo=createUfo();ufo.position.set(4,2.15,1);ufo.scale.setScalar(.6);system.add(ufo);
    const scout=ufo.clone();scout.position.set(-2.8,3,-7);scout.scale.setScalar(.25);system.add(scout);
    astronaut.traverse(o=>{if(o instanceof THREE.Mesh)o.userData.discovery="astronaut";});
    ufo.traverse(o=>{if(o instanceof THREE.Mesh)o.userData.discovery="ufo";});
    const asteroidGeometry=new THREE.IcosahedronGeometry(.06,0);
    const belt=new THREE.InstancedMesh(asteroidGeometry,new THREE.MeshStandardMaterial({color:"#858c9b",roughness:1}),160);
    const dummy=new THREE.Object3D();
    for(let i=0;i<160;i++){const a=random()*Math.PI*2;const r=5.6+random()*1.3;dummy.position.set(Math.cos(a)*r,(random()-.5)*.45-1.2,Math.sin(a)*r-2);dummy.rotation.set(random()*6,random()*6,0);dummy.scale.setScalar(.3+random()*1.6);dummy.updateMatrix();belt.setMatrixAt(i,dummy.matrix);}
    system.add(belt);
    [4.8,7.2,9.4].forEach((radius,i)=>{
      const points=new THREE.EllipseCurve(0,0,radius,radius*.78,0,Math.PI*2,false,0).getPoints(180).map(p=>new THREE.Vector3(p.x,-2.2,p.y-1));
      const orbitLine=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:i===0?"#749ed5":"#6684b9",transparent:true,opacity:.14,depthWrite:false}));system.add(orbitLine);
    });
    const sun=new THREE.Mesh(new THREE.SphereGeometry(.7,32,24),new THREE.MeshBasicMaterial({map:loadTexture("sun"),color:"#ffb978"}));sun.position.set(-6,3.3,-8);system.add(sun);
    const halo=new THREE.Mesh(new THREE.PlaneGeometry(5,5),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader:`varying vec2 vUv;void main(){float d=length(vUv-.5);gl_FragColor=vec4(1.0,.5,.16,pow(max(0.0,1.0-d*2.0),4.0)*.6);}`,
    }));halo.position.copy(sun.position);system.add(halo);
    const cometHead=new THREE.Mesh(new THREE.SphereGeometry(.055,8,8),new THREE.MeshBasicMaterial({color:"#bcf4ff"}));
    const comet=new THREE.Group();comet.add(cometHead);
    const tail=new THREE.Mesh(new THREE.ConeGeometry(.05,2.8,8,1,true),new THREE.MeshBasicMaterial({color:"#579ce8",transparent:true,opacity:.35,depthWrite:false,blending:THREE.AdditiveBlending}));tail.rotation.z=-Math.PI/2;tail.position.x=-1.4;comet.add(tail);comet.rotation.z=-.35;scene.add(comet);
    const warpGeometry=new THREE.BufferGeometry();const warpPositions=new Float32Array(100*6);
    for(let i=0;i<100;i++){const a=random()*Math.PI*2;const r=1+random()*10;const x=Math.cos(a)*r,y=Math.sin(a)*r,z=-random()*35;warpPositions.set([x,y,z,x,y,z-8],i*6);}
    warpGeometry.setAttribute("position",new THREE.BufferAttribute(warpPositions,3));
    const warpLines=new THREE.LineSegments(warpGeometry,new THREE.LineBasicMaterial({color:"#97cbff",transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));scene.add(warpLines);
    const pointer = new THREE.Vector2();
    const raycaster=new THREE.Raycaster();
    const orbit={x:0,y:0};let dragging=false,moved=false,startX=0,startY=0,lastX=0,lastY=0;
    const lookTarget=new THREE.Vector3();const focusTarget=new THREE.Vector3();
    let warpSeen=0,warpStart=-10000;
    let width = 1, height = 1, scroll = window.scrollY, frame = 0, time = 0, previous = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      width = container.clientWidth; height = container.clientHeight;
      renderer.setSize(width,height); camera.aspect=width/height; camera.updateProjectionMatrix();
      composer.setSize(width,height);bloom.enabled=width>=600;
      const mobile = width < 760;
      system.scale.setScalar(mobile ? .8 : 1);
      system.position.set(0,mobile ? -.5 : 0,0);
    };
    const move = (e: PointerEvent) => {
      pointer.set((e.clientX/width-.5)*2,(e.clientY/height-.5)*2);
      if(dragging){orbit.x+=(e.clientX-lastX)*.004;orbit.y=THREE.MathUtils.clamp(orbit.y+(e.clientY-lastY)*.003,-.55,.55);moved=moved||Math.hypot(e.clientX-startX,e.clientY-startY)>5;lastX=e.clientX;lastY=e.clientY;}
    };
    const down=(e:PointerEvent)=>{if(e.button!==0)return;dragging=true;moved=false;startX=lastX=e.clientX;startY=lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);};
    const up=(e:PointerEvent)=>{
      if(!dragging)return;dragging=false;
      if(renderer.domElement.hasPointerCapture(e.pointerId))renderer.domElement.releasePointerCapture(e.pointerId);
      if(moved)return;
      raycaster.setFromCamera(new THREE.Vector2(e.clientX/width*2-1,-e.clientY/height*2+1),camera);
      const objects=[...planets.map(p=>p.mesh),astronaut,ufo];const hit=raycaster.intersectObjects(objects,true)[0];
      if(!hit)return;
      if(typeof hit.object.userData.destination==="number"){selectRef.current(hit.object.userData.destination);setSignal("Destino seleccionado. Abre su misión para explorar el proyecto.");}
      const discovery=hit.object.userData.discovery as string|undefined;
      if(discovery){setFound(prev=>prev.includes(discovery)?prev:[...prev,discovery]);setSignal(discovery==="astronaut"?"¡Encontraste a la astronauta! Ingeniera explorando nuevos mundos desde 2016.":"¡Contacto extraterrestre! La nave recibió tu señal. Bienvenid@ al universo de Anahí.");}
    };
    const cancel=()=>{dragging=false;};
    const onScroll = () => { scroll = window.scrollY; };
    const contextLost = (e: Event) => { e.preventDefault(); setAvailable(false); renderer.setAnimationLoop(null); };
    renderer.domElement.addEventListener("webglcontextlost",contextLost);
    const animate = (now: number) => {
      const delta = previous ? Math.min((now-previous)/1000,.05) : 0; previous=now;
      if(document.hidden) return;
      if(!document.hidden && !pausedRef.current && !reduced.matches) time+=delta;
      const travel = Math.min(scroll/height,4);
      const focused=activeRef.current>=0&&activeRef.current<planets.length&&travel<.8;
      if(focused)planets[activeRef.current].group.getWorldPosition(focusTarget);else focusTarget.set(0,0,0);
      lookTarget.lerp(focusTarget,.035);
      const distance=(focused?7:(width<760?22:13)+travel*2)/zoomRef.current;
      const yaw=orbit.x+(reduced.matches?0:pointer.x*.025),pitch=orbit.y;
      camera.position.lerp(new THREE.Vector3(lookTarget.x+Math.sin(yaw)*distance,lookTarget.y+Math.sin(pitch)*distance,lookTarget.z+Math.cos(yaw)*Math.cos(pitch)*distance),.045);
      camera.lookAt(lookTarget);
      stars.rotation.y=time*.0015;
      planets.forEach((p,i) => {
        p.mesh.rotation.y=time*(i===0?.045:.08);
        p.group.position.y=specs[i].position[1]+Math.sin(time*.18+i)*.045;
        const targetScale=activeRef.current===i?1.035:1;
        p.group.scale.lerp(new THREE.Vector3(targetScale,targetScale,targetScale),.04);
      });
      astronaut.position.y=-1.9+Math.sin(time*.5)*.22;astronaut.rotation.z=-.3+Math.sin(time*.25)*.1;
      ufo.position.x=4+Math.sin(time*.35)*.4;ufo.position.y=2.15+Math.sin(time*.8)*.15;ufo.rotation.y=time*.2;
      scout.position.x=-2.8+Math.sin(time*.18)*1.2;scout.rotation.y=-time*.3;
      moon.position.set(Math.cos(time*.13)*1.3,-.3,Math.sin(time*.13)*1.3);
      belt.rotation.y=time*.008;
      const cometProgress=(time%22)/22;comet.visible=cometProgress<.2;comet.position.set(-13+cometProgress*140,5-cometProgress*28,-8);
      if(warpSeen!==warpRef.current){warpSeen=warpRef.current;warpStart=now;orbit.x=0;orbit.y=0;}
      const warpProgress=(now-warpStart)/1800;
      const warpIntensity=reduced.matches?0:Math.max(0,Math.sin(Math.min(1,warpProgress)*Math.PI));
      warpLines.material.opacity=warpIntensity*.85;
      const nextFov=44+warpIntensity*24;
      if(Math.abs(camera.fov-nextFov)>.01){camera.fov=nextFov;camera.updateProjectionMatrix();}
      warpLines.position.copy(camera.position);warpLines.quaternion.copy(camera.quaternion);warpLines.position.z-=((now-warpStart)/100)%8;
      composer.render(delta);
      if(++frame%2===0) {
        planets.forEach((p,i) => {
          const label=labels.current[i];if(!label)return;
          const projected=p.group.getWorldPosition(new THREE.Vector3());
          projected.y-=p.radius*system.scale.y+.15;
          projected.project(camera);
          label.style.transform=`translate(${(projected.x*.5+.5)*width}px,${(-projected.y*.5+.5)*height}px) translate(-50%,0)`;
          const visible=scroll<height*.65 && projected.z<1&&projected.z>-1&&Math.abs(projected.x)<.94;
          label.style.opacity=visible?"1":"0";
          label.style.visibility=visible?"visible":"hidden";
        });
        [astronaut,ufo].forEach((object,i)=>{
          const label=visitors.current[i];if(!label)return;
          const position=object.getWorldPosition(new THREE.Vector3());position.y+=i===0?.7:.4;position.project(camera);
          label.style.transform=`translate(${(position.x*.5+.5)*width}px,${(-position.y*.5+.5)*height}px) translate(-50%,-100%)`;
          label.style.visibility=scroll<height*.65&&Math.abs(position.x)<.96&&Math.abs(position.y)<.94&&position.z<1?"visible":"hidden";
        });
      }
    };
    resize();
    camera.position.set(0,0,width<760?22:13);
    camera.lookAt(0,0,0);
    window.addEventListener("resize",resize);window.addEventListener("pointermove",move,{passive:true});window.addEventListener("scroll",onScroll,{passive:true});
    renderer.domElement.addEventListener("pointerdown",down);renderer.domElement.addEventListener("pointerup",up);renderer.domElement.addEventListener("pointercancel",cancel);
    renderer.setAnimationLoop(animate);
    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize",resize);window.removeEventListener("pointermove",move);window.removeEventListener("scroll",onScroll);
      renderer.domElement.removeEventListener("webglcontextlost",contextLost);
      renderer.domElement.removeEventListener("pointerdown",down);renderer.domElement.removeEventListener("pointerup",up);renderer.domElement.removeEventListener("pointercancel",cancel);
      const geometries=new Set<THREE.BufferGeometry>();const materials=new Set<THREE.Material>();
      scene.traverse(o=>{if(o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Line){geometries.add(o.geometry);const m=Array.isArray(o.material)?o.material:[o.material];m.forEach(v=>materials.add(v));}});
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());bloom.dispose();output.dispose();composer.dispose();renderer.dispose();renderer.domElement.remove();
    };
  }, []);

  return <><div ref={host} className={`cosmos-scene ${available ? "cosmos-scene-ready" : ""}`} aria-label="Universo de proyectos">
    {destinations.map((p,i)=><button key={p.name} ref={el=>{labels.current[i]=el;}} className="cosmos-planet-label" onClick={()=>onSelect(i)} aria-pressed={active===i} aria-label={`Explorar el planeta ${p.name}`} style={{color:p.color}}><span>0{i+1} / {p.name.toUpperCase()}</span><small>{p.type}</small><i>↗</i></button>)}
    {[{kind:"astronaut",name:"EVA-01 / ASTRONAUTA"},{kind:"ufo",name:"SEÑAL DESCONOCIDA / OVNI"}].map((v,i)=><button key={v.kind} ref={el=>{visitors.current[i]=el;}} className="cosmos-visitor-label" onClick={()=>discover(v.kind)} aria-label={`Enviar señal: ${v.name}`}><span>⌁</span>{v.name}</button>)}
  </div>{available && <div className="cosmos-flight-console"><div className="cosmos-flight-controls"><button onClick={()=>{onSelect(-1);setZoom(1);setWarp(w=>w+1);}}>⌖ Vista del sistema</button><label>Zoom<input aria-label="Acercamiento del universo" type="range" min="0.7" max="1.6" step="0.05" value={zoom} onChange={e=>setZoom(Number(e.target.value))} /></label><button onClick={()=>{setWarp(w=>w+1);setSignal("Salto completado. Sigue explorando el sistema.");}}>✦ Salto hiperespacial</button><button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?"▶ Continuar":"Ⅱ Pausar"}</button></div><div className="cosmos-signal" role="status"><span>{signal}</span><b>DESCUBRIMIENTOS {found.length}/2</b></div></div>}</>;
}
