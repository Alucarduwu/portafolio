import * as THREE from "three";

export function createAstronaut() {
  const astronaut = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: "#e3e8ec", roughness: .65, metalness: .08 });
  const dark = new THREE.MeshStandardMaterial({ color: "#273447", roughness: .8 });
  const gold = new THREE.MeshStandardMaterial({ color: "#ad7340", metalness: .85, roughness: .16, emissive: "#281607" });
  const blue = new THREE.MeshStandardMaterial({ color: "#449adc", emissive: "#16406f", roughness: .35 });
  const part = (geometry: THREE.BufferGeometry, material: THREE.Material, position: number[], scale?: number[]) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(position[0],position[1],position[2]);
    if(scale)mesh.scale.set(scale[0],scale[1],scale[2]);astronaut.add(mesh);return mesh;
  };
  part(new THREE.CapsuleGeometry(.27,.36,6,16),white,[0,0,0]);
  part(new THREE.SphereGeometry(.32,32,24),white,[0,.64,0]);
  part(new THREE.SphereGeometry(.26,32,20),gold,[0,.65,.16],[1,.8,.65]);
  part(new THREE.BoxGeometry(.38,.42,.16),dark,[0,.04,-.29]);
  part(new THREE.BoxGeometry(.29,.21,.08),white,[0,.05,.28]);
  part(new THREE.BoxGeometry(.17,.08,.02),blue,[0,.1,.33]);
  for(const side of [-1,1]) {
    const arm=part(new THREE.CapsuleGeometry(.115,.36,5,12),white,[side*.4,.09,0]);arm.rotation.z=side*.65;
    part(new THREE.SphereGeometry(.12,12,12),dark,[side*.56,-.14,.02]);
    const leg=part(new THREE.CapsuleGeometry(.13,.4,5,12),white,[side*.17,-.56,0]);leg.rotation.z=side*.15;
    part(new THREE.BoxGeometry(.24,.17,.3),dark,[side*.22,-.89,.06]);
    part(new THREE.TorusGeometry(.12,.024,6,16),dark,[side*.17,-.4,0]).rotation.x=Math.PI/2;
  }
  const cable=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,-.4),new THREE.Vector3(-.6,-.3,-.5),new THREE.Vector3(-1,-.05,-.4),new THREE.Vector3(-1.3,-.5,-.1)]);
  part(new THREE.TubeGeometry(cable,32,.016,6,false),white,[0,0,0]);
  astronaut.rotation.z=-.3;astronaut.rotation.y=.25;
  return astronaut;
}

export function createUfo() {
  const ufo=new THREE.Group();
  const silver=new THREE.MeshStandardMaterial({color:"#8599b1",metalness:.85,roughness:.3});
  const body=new THREE.Mesh(new THREE.SphereGeometry(1,48,24),silver);body.scale.set(1,.16,1);ufo.add(body);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(.43,32,20),new THREE.MeshPhysicalMaterial({color:"#73d9e8",metalness:.25,roughness:.12,transparent:true,opacity:.75,emissive:"#143640"}));
  dome.position.y=.21;dome.scale.y=.8;ufo.add(dome);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.86,.035,8,64),new THREE.MeshBasicMaterial({color:"#9efbe7"}));ring.rotation.x=Math.PI/2;ufo.add(ring);
  const lightMaterial=new THREE.MeshBasicMaterial({color:"#7bfbe2"});
  for(let i=0;i<10;i++){const light=new THREE.Mesh(new THREE.SphereGeometry(.045,8,8),lightMaterial);const a=i/10*Math.PI*2;light.position.set(Math.cos(a)*.89,-.05,Math.sin(a)*.89);ufo.add(light);}
  const beam=new THREE.Mesh(new THREE.ConeGeometry(.7,2.1,32,1,true),new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader:`varying vec2 vUv;void main(){gl_FragColor=vec4(.3,.9,.8,pow(vUv.y,2.0)*.13);}`,
  }));beam.position.y=-1.1;ufo.add(beam);ufo.rotation.z=.1;
  return ufo;
}
