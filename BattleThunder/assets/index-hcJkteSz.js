import*as e from"https://unpkg.com/three@0.160.0/build/three.module.js";import*as t from"https://unpkg.com/three@0.160.0/examples/jsm/utils/BufferGeometryUtils.js";import{SimplexNoise as n}from"https://unpkg.com/three@0.160.0/examples/jsm/math/SimplexNoise.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var r={socket:null,isHost:!1,myRoomCode:``,myUsername:`PILOT`,myPlayerIndex:-1,gameActive:!1,lastGameStateTime:0,hasConnectedOnce:!1,isGeneratingWorld:!1,isQuitting:!1,pendingJoinCode:null,scene:null,renderer:null,csm:null,pooledRoot:null,shoreTexture:null,shoreRangeUnits:60,shoreDistRangeUnits:320,cloudInstancedMesh:null,cloudRaycastMesh:null,cloudBaseRadiusSq:0,cloudMaxOriginRadiusSq:0,treeGridDim:0,sharedMuzzleLight:null,sharedMuzzleLightOwner:null,localPlayer:null,boxParticlePool:null,sphereParticlePool:null,introCinematicActive:!1,introCinematicTime:0,introWireframeMesh:null,initialWireframeQuat:new e.Quaternion},i=new e.Quaternion(0,0,0,1),a=[],o=[],s=[],c=[],l=[],u=[],d={width:14e3,segments:350,waterLevel:55,treeCount:15e3,shadowRes:1024,fogDensity:8e-5};d.width;var f=`https://quicklash-server.onrender.com`,p=new e.Vector3(800,500,-800).normalize(),m=.7,h=.01,g=.012,_=3.5,v=.35,y,b=function(e,t=3e3){let n=document.getElementById(`ui-alert`);document.getElementById(`ui-alert-text`).innerText=e,n.style.display=`block`,n.style.animation=`none`,n.offsetWidth,n.style.animation=`dropDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`,y&&clearTimeout(y),y=setTimeout(()=>{n.style.display=`none`},t)};function x(){let e=document.getElementById(`fps-counter`),t=0,n=performance.now();function r(){t++;let i=performance.now(),a=i-n;a>=500&&(e.textContent=Math.round(t*1e3/a),t=0,n=i),requestAnimationFrame(r)}requestAnimationFrame(r)}var S,C,w,T,E=!0,D=new e.Vector3(14,5,-14),O=new e.Vector3(0,0,0),k=new e.Vector3(0,0,0),A;function j(t){let n=t;t.index&&(n=t.toNonIndexed());let r=n.attributes.position,i=r.count/3,a=new Float32Array(i*18),o=new Float32Array(i*18),s=0;for(let e=0;e<i;e++){let t=e*3,n=r.getX(t),i=r.getY(t),c=r.getZ(t),l=r.getX(t+1),u=r.getY(t+1),d=r.getZ(t+1),f=r.getX(t+2),p=r.getY(t+2),m=r.getZ(t+2);a[s]=n,a[s+1]=i,a[s+2]=c,a[s+3]=l,a[s+4]=u,a[s+5]=d;let h=(n+l)/2,g=(i+u)/2,_=(c+d)/2;o[s]=h,o[s+1]=g,o[s+2]=_,o[s+3]=h,o[s+4]=g,o[s+5]=_,s+=6,a[s]=l,a[s+1]=u,a[s+2]=d,a[s+3]=f,a[s+4]=p,a[s+5]=m,h=(l+f)/2,g=(u+p)/2,_=(d+m)/2,o[s]=h,o[s+1]=g,o[s+2]=_,o[s+3]=h,o[s+4]=g,o[s+5]=_,s+=6,a[s]=f,a[s+1]=p,a[s+2]=m,a[s+3]=n,a[s+4]=i,a[s+5]=c,h=(f+n)/2,g=(p+i)/2,_=(m+c)/2,o[s]=h,o[s+1]=g,o[s+2]=_,o[s+3]=h,o[s+4]=g,o[s+5]=_,s+=6}let c=new e.BufferGeometry;c.setAttribute(`position`,new e.BufferAttribute(a,3)),c.setAttribute(`lineCenter`,new e.BufferAttribute(o,3));let l=new e.LineSegments(c,A);return l.renderOrder=999,l}function M(){let t=document.getElementById(`ui-3d-container`);S=new e.Scene,C=new e.PerspectiveCamera(45,1,.1,1e3),C.position.copy(D),w=new e.WebGLRenderer({alpha:!0,antialias:!0}),w.setPixelRatio(window.devicePixelRatio),t.appendChild(w.domElement),N(),A=new e.ShaderMaterial({uniforms:{color:{value:new e.Color(11184810)},opacity:{value:.35},shrinkFactor:{value:0}},vertexShader:`
            attribute vec3 lineCenter;
            uniform float shrinkFactor;
            void main() {
                vec3 pos = mix(position, lineCenter, shrinkFactor);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,fragmentShader:`
            uniform vec3 color;
            uniform float opacity;
            void main() {
                gl_FragColor = vec4(color, opacity);
            }
        `,transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending}),T=new e.Group;let n=new e.CylinderGeometry(1.1,.9,7,10);n.rotateX(Math.PI/2),T.add(j(n));let r=new e.CylinderGeometry(.9,.8,3.5,10);r.rotateX(Math.PI/2),r.translate(0,0,-5.25),T.add(j(r));let i=new e.CylinderGeometry(.8,.1,2,10);i.rotateX(Math.PI/2),i.translate(0,0,-8),T.add(j(i));let a=new e.CylinderGeometry(.4,1.1,6,10);a.rotateX(Math.PI/2),a.translate(0,0,6.5),T.add(j(a));let o=new e.SphereGeometry(1.1,8,8);o.scale(1,.8,2.5),o.translate(0,.8,-.5),T.add(j(o));let s=new e.BoxGeometry(7,.2,3);s.translate(3.5,0,.5);let c=j(s);c.position.set(.8,-.2,-1),c.rotation.x=-.05,c.rotation.y=-.2,T.add(c);let l=new e.BoxGeometry(.5,.21,3);l.translate(7.25,0,.5);let u=j(l);u.position.set(.8,-.2,-1),u.rotation.x=-.05,u.rotation.y=-.2,T.add(u);let d=j(s);d.position.set(-.8,-.2,-1),d.rotation.x=-.05,d.rotation.y=.2,d.scale.x=-1,T.add(d);let f=j(l);f.position.set(-.8,-.2,-1),f.rotation.x=-.05,f.rotation.y=.2,f.scale.x=-1,T.add(f);let p=new e.BoxGeometry(5,.15,2);p.translate(0,0,1);let m=j(p);m.position.set(0,.28,8.5),T.add(m);let h=new e.BoxGeometry(.2,3,2.5),g=h.attributes.position;for(let e=0;e<g.count;e++)g.getY(e)>0&&g.setZ(e,g.getZ(e)+1.5);h.computeVertexNormals();let _=j(h);_.position.set(0,2,8.5),T.add(_);let v=new e.BoxGeometry(1.2,.6,3);v.translate(0,-.3,0);let y=j(v);y.position.set(0,-.9,1),T.add(y);let b=new e.Group,x=new e.BoxGeometry(.18,3.6,.2);x.translate(0,1.8,0);for(let e=0;e<3;e++){let t=j(x);t.rotation.z=e/3*Math.PI*2,b.add(t)}b.position.set(0,0,-9.1),T.add(b),T.propeller=b,T.scale.set(.75,.75,.75),S.add(T),ee()}function N(){if(!w||!C)return;let e=document.getElementById(`ui-3d-container`),t=e&&e.clientWidth?e.clientWidth:window.innerWidth*.7,n=e&&e.clientHeight?e.clientHeight:window.innerHeight;C.aspect=t/n,C.updateProjectionMatrix(),w.setSize(t,n,!1)}function P(e){switch(e){case`login`:D.set(14,5,-14),O.set(0,0,0);break;case`connecting`:D.set(0,-3,-18),O.set(0,0,0);break;case`menu`:D.set(12,14,12),O.set(0,0,0);break;case`waiting`:D.set(0,3,20),O.set(0,0,0);break;case`loading`:D.set(-10,7,-8),O.set(0,0,0)}}function ee(){if(!E)return;requestAnimationFrame(ee);let e=Date.now()*.001;T.rotation.y+=.005,T.rotation.z=Math.sin(e*1.5)*.1,T.rotation.x=Math.cos(e*1.2)*.05,T.propeller&&(T.propeller.rotation.z+=.3),C.position.lerp(D,.05),k.lerp(O,.05),C.lookAt(k),C.translateX(-2.4),w.render(S,C),C.translateX(2.4)}function te(){return T}function ne(){return A}function re(){E=!1}var F=new(window.AudioContext||window.webkitAudioContext),I=F.createDynamicsCompressor();I.threshold.setValueAtTime(-24,F.currentTime),I.knee.setValueAtTime(30,F.currentTime),I.ratio.setValueAtTime(12,F.currentTime),I.attack.setValueAtTime(.003,F.currentTime),I.release.setValueAtTime(.25,F.currentTime);var ie=F.createGain();ie.gain.setValueAtTime(0,F.currentTime),I.connect(ie),ie.connect(F.destination);var ae=F.createBuffer(2,F.sampleRate*2,F.sampleRate);for(let e=0;e<ae.length;e++){let t=(1-e/ae.length)**3;ae.getChannelData(0)[e]=(Math.random()*2-1)*t,ae.getChannelData(1)[e]=(Math.random()*2-1)*t}var oe=F.createConvolver();oe.buffer=ae;var se=F.createGain();se.gain.value=.35,oe.connect(se),se.connect(I);var ce=`bt-volume`;function le(){let e=localStorage.getItem(ce),t=parseFloat(e);return e!==null&&!isNaN(t)&&t>=0&&t<=1?t:0}function ue(e){try{localStorage.setItem(ce,String(e))}catch{}}document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`volume-slider`),t=document.getElementById(`volume-icon`),n=le(),r=n===0,i=n||1;e.value=n,ie.gain.setValueAtTime(n,F.currentTime);function a(e){e===0?t.innerHTML=`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`:e<.5?t.innerHTML=`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>`:t.innerHTML=`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`}a(n),e.addEventListener(`input`,e=>{he();let t=parseFloat(e.target.value);ie.gain.setValueAtTime(t,F.currentTime),r=t===0,a(t),ue(t)}),t.addEventListener(`click`,()=>{he(),r?(ie.gain.setValueAtTime(i,F.currentTime),e.value=i,r=!1,a(i),ue(i)):(i=parseFloat(e.value)||1,ie.gain.setValueAtTime(0,F.currentTime),e.value=0,r=!0,a(0),ue(0))})});function de(e=1){let t=F.sampleRate*e,n=F.createBuffer(1,t,F.sampleRate),r=n.getChannelData(0);for(let e=0;e<t;e++)r[e]=Math.random()*2-1;return n}var fe=de(1),pe=de(5);function me(e){let t=typeof e==`number`?e:50,n=44100,r=new Float32Array(n),i=0,a;for(;i<n;++i)a=i*2/n-1,r[i]=(3+t)*a*20*(Math.PI/180)/(Math.PI+t*Math.abs(a));return r}function he(){F.state===`suspended`&&F.resume()}window.addEventListener(`keydown`,he),window.addEventListener(`click`,he);var L={playShoot:e=>{let t=F.currentTime,n=F.createPanner();n.panningModel=`HRTF`,n.distanceModel=`inverse`,n.refDistance=150,n.maxDistance=15e3,n.rolloffFactor=.8,e&&(n.positionX.value=e.x,n.positionY.value=e.y,n.positionZ.value=e.z),n.connect(I);let r=F.createOscillator(),i=F.createGain();r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(40,t+.08),i.gain.setValueAtTime(.6,t),i.gain.exponentialRampToValueAtTime(.01,t+.1),r.connect(i),i.connect(n),r.start(t),r.stop(t+.1);let a=F.createOscillator();a.type=`triangle`;let o=F.createGain();a.frequency.setValueAtTime(1200,t),a.frequency.exponentialRampToValueAtTime(400,t+.04),o.gain.setValueAtTime(.3,t),o.gain.exponentialRampToValueAtTime(.01,t+.05),a.connect(o),o.connect(n),a.start(t),a.stop(t+.05);let s=F.createBufferSource();s.buffer=fe;let c=F.createBiquadFilter();c.type=`lowpass`,c.frequency.setValueAtTime(4e3,t),c.frequency.exponentialRampToValueAtTime(800,t+.15);let l=F.createGain();l.gain.setValueAtTime(1,t),l.gain.exponentialRampToValueAtTime(.01,t+.25),s.connect(c),c.connect(l),l.connect(n),n.connect(oe),s.start(t),s.stop(t+.25)},playExplosion:e=>{let t=F.currentTime,n=F.createPanner();n.panningModel=`HRTF`,n.distanceModel=`inverse`,n.refDistance=600,n.maxDistance=25e3,n.rolloffFactor=.5,e&&(n.positionX.value=e.x,n.positionY.value=e.y,n.positionZ.value=e.z),n.connect(I);let r=F.createOscillator(),i=F.createGain();r.frequency.setValueAtTime(80,t),r.frequency.exponentialRampToValueAtTime(10,t+1.5),i.gain.setValueAtTime(2,t),i.gain.exponentialRampToValueAtTime(.01,t+2),r.connect(i),i.connect(n),r.start(t),r.stop(t+2);let a=F.createBufferSource();a.buffer=pe;let o=F.createBiquadFilter();o.type=`lowpass`,o.frequency.setValueAtTime(1200,t),o.frequency.linearRampToValueAtTime(50,t+2.5);let s=F.createGain();s.gain.setValueAtTime(2,t),s.gain.exponentialRampToValueAtTime(.01,t+3),a.connect(o),o.connect(s),s.connect(n),n.connect(oe),a.start(t),a.stop(t+3)},playBulletWaterHit:e=>{let t=F.currentTime,n=F.createPanner();n.panningModel=`HRTF`,n.distanceModel=`inverse`,n.refDistance=50,n.maxDistance=5e3,n.rolloffFactor=1,e&&(n.positionX.value=e.x,n.positionY.value=e.y,n.positionZ.value=e.z),n.connect(I);let r=F.createBufferSource();r.buffer=fe;let i=F.createBiquadFilter();i.type=`bandpass`,i.frequency.setValueAtTime(1200,t),i.Q.setValueAtTime(1,t);let a=F.createGain();a.gain.setValueAtTime(.4,t),a.gain.exponentialRampToValueAtTime(.01,t+.15),r.connect(i),i.connect(a),a.connect(n),r.start(t),r.stop(t+.15)},playBulletDirtHit:e=>{let t=F.currentTime,n=F.createPanner();n.panningModel=`HRTF`,n.distanceModel=`inverse`,n.refDistance=50,n.maxDistance=5e3,n.rolloffFactor=1,e&&(n.positionX.value=e.x,n.positionY.value=e.y,n.positionZ.value=e.z),n.connect(I);let r=F.createBufferSource();r.buffer=fe;let i=F.createBiquadFilter();i.type=`lowpass`,i.frequency.setValueAtTime(400,t);let a=F.createGain();a.gain.setValueAtTime(.5,t),a.gain.exponentialRampToValueAtTime(.01,t+.1),r.connect(i),i.connect(a),a.connect(n),r.start(t),r.stop(t+.1)}};function ge(){if(F.state!==`running`)return;let e=F.currentTime,t=e+.02,n=({refDistance:n,maxDistance:r,rolloffFactor:i,reverb:a,oscillators:o,filters:s})=>{let c=[],l=[],u=F.createPanner();u.panningModel=`HRTF`,u.distanceModel=`inverse`,u.refDistance=n,u.maxDistance=r,u.rolloffFactor=i,u.connect(I),a&&u.connect(oe),c.push(u);for(let t=0;t<o.length;t++){let n=F.createOscillator();n.type=o[t];let r=F.createGain();r.gain.setValueAtTime(0,e),n.connect(r),r.connect(u),c.push(n,r),l.push(n)}for(let t=0;t<s.length;t++){let n=F.createBufferSource();n.buffer=pe;let r=F.createBiquadFilter();r.type=s[t];let i=F.createGain();i.gain.setValueAtTime(0,e),n.connect(r),r.connect(i),i.connect(u),c.push(n,r,i),l.push(n)}let d=0,f=()=>{if(d++,d===l.length)for(let e=0;e<c.length;e++)c[e].disconnect()};for(let n=0;n<l.length;n++)l[n].onended=f,l[n].start(e),l[n].stop(t)};n({refDistance:150,maxDistance:15e3,rolloffFactor:.8,reverb:!0,oscillators:[`sine`,`triangle`],filters:[`lowpass`]}),n({refDistance:600,maxDistance:25e3,rolloffFactor:.5,reverb:!0,oscillators:[`sine`],filters:[`lowpass`]}),n({refDistance:50,maxDistance:5e3,rolloffFactor:1,reverb:!1,oscillators:[],filters:[`bandpass`]}),n({refDistance:50,maxDistance:5e3,rolloffFactor:1,reverb:!1,oscillators:[],filters:[`lowpass`]})}var _e=class{constructor(e){this.isLocal=e,F.currentTime,this.gain=F.createGain(),this.gain.gain.value=1,e?this.gain.connect(I):(this.panner=F.createPanner(),this.panner.panningModel=`HRTF`,this.panner.distanceModel=`inverse`,this.panner.refDistance=150,this.panner.maxDistance=15e3,this.panner.rolloffFactor=.8,this.gain.connect(this.panner),this.panner.connect(I)),this.rumbleOsc=F.createOscillator(),this.rumbleOsc.type=`triangle`,this.rumbleGain=F.createGain(),this.rumbleOsc.connect(this.rumbleGain),this.rumbleGain.connect(this.gain),this.growlOsc=F.createOscillator(),this.growlOsc.type=`sawtooth`,this.growlDistortion=F.createWaveShaper(),this.growlDistortion.curve=me(150),this.growlFilter=F.createBiquadFilter(),this.growlFilter.type=`lowpass`,this.growlFilter.Q.value=1,this.growlGain=F.createGain(),this.growlOsc.connect(this.growlDistortion),this.growlDistortion.connect(this.growlFilter),this.growlFilter.connect(this.growlGain),this.growlGain.connect(this.gain),this.propNoise=F.createBufferSource(),this.propNoise.buffer=pe,this.propNoise.loop=!0,this.propFilter=F.createBiquadFilter(),this.propFilter.type=`lowpass`,this.propGate=F.createGain(),this.propGain=F.createGain(),this.propLFO=F.createOscillator(),this.propLFO.type=`sine`,this.propNoise.connect(this.propFilter),this.propFilter.connect(this.propGate),this.propGate.connect(this.propGain),this.propGain.connect(this.gain),this.propLFO.connect(this.propGate.gain),this.whineOsc=F.createOscillator(),this.whineOsc.type=`sine`,this.whineGain=F.createGain(),this.whineOsc.connect(this.whineGain),this.whineGain.connect(this.gain),this.windNode=F.createBufferSource(),this.windNode.buffer=pe,this.windNode.loop=!0,this.windFilter=F.createBiquadFilter(),this.windFilter.type=`highpass`,this.windGain=F.createGain(),this.windNode.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.gain);let t=F.currentTime;this.rumbleOsc.start(t),this.growlOsc.start(t),this.propNoise.start(t),this.propLFO.start(t),this.whineOsc.start(t),this.windNode.start(t),this.rumbleGain.gain.value=0,this.growlGain.gain.value=0,this.propGain.gain.value=0,this.whineGain.gain.value=0,this.windGain.gain.value=0,this.isStopped=!1,this._nextParamTime=performance.now()+Math.random()*33}update(e,t,n){this.isStopped&&this.restart();let r=performance.now();if(r<this._nextParamTime)return;this._nextParamTime=r+33;let i=F.currentTime,a=.1,o=(800+t*2e3+e*100)/60;this.rumbleOsc.frequency.setTargetAtTime(o*3,i,a),this.rumbleGain.gain.setTargetAtTime(.2+t*.2,i,a),this.growlOsc.frequency.setTargetAtTime(o*6,i,a),this.growlFilter.frequency.setTargetAtTime(300+t*1200,i,a),this.growlGain.gain.setTargetAtTime(.08+t*.12,i,a),this.propLFO.frequency.setTargetAtTime(o*3,i,a),this.propFilter.frequency.setTargetAtTime(600+t*400,i,a),this.propGain.gain.setTargetAtTime(.15+t*.2,i,a),this.whineOsc.frequency.setTargetAtTime(o*16,i,a),this.whineGain.gain.setTargetAtTime(.01*t,i,a);let s=1200+e*800;this.windFilter.frequency.setTargetAtTime(s,i,a);let c=Math.max(0,(e-1.2)*.01);this.windGain.gain.setTargetAtTime(c,i,a),!this.isLocal&&this.panner&&n&&(this.panner.positionX.setTargetAtTime(n.x,i,.1),this.panner.positionY.setTargetAtTime(n.y,i,.1),this.panner.positionZ.setTargetAtTime(n.z,i,.1))}stop(){this.isStopped||(this.isStopped=!0,this.gain.gain.setTargetAtTime(0,F.currentTime,.3))}restart(){this.isStopped=!1,this._nextParamTime=0,this.gain.gain.setTargetAtTime(1,F.currentTime,.1)}},R={pitchDown:!1,pitchUp:!1,rollLeft:!1,rollRight:!1,yawLeft:!1,yawRight:!1,throttleUp:!1,throttleDown:!1,shoot:!1,lookBack:!1};function ve(e,t){e.key.toLowerCase();let n=e.code;(n===`KeyW`||n===`ArrowUp`)&&(R.pitchDown=t),(n===`KeyS`||n===`ArrowDown`)&&(R.pitchUp=t),(n===`KeyA`||n===`ArrowLeft`)&&(R.rollLeft=t),(n===`KeyD`||n===`ArrowRight`)&&(R.rollRight=t),n===`KeyQ`&&(R.yawLeft=t),n===`KeyE`&&(R.yawRight=t),(n===`ShiftLeft`||n===`ShiftRight`)&&(R.throttleUp=t),n===`Space`&&(R.throttleDown=t),(n===`KeyF`||n===`Enter`)&&(R.shoot=t),n===`KeyB`&&(R.lookBack=t);let i=r.localPlayer;i&&(i.inputs={pitch:(R.pitchDown?-1:0)+ +!!R.pitchUp,roll:+!!R.rollLeft+(R.rollRight?-1:0),yaw:+!!R.yawLeft+(R.yawRight?-1:0),throttle:+!!R.throttleUp+(R.throttleDown?-1:0),shoot:R.shoot,reset:!1})}function ye(){R.pitchDown=!1,R.pitchUp=!1,R.rollLeft=!1,R.rollRight=!1,R.yawLeft=!1,R.yawRight=!1,R.throttleUp=!1,R.throttleDown=!1,R.shoot=!1,R.lookBack=!1;let e=r.localPlayer;e&&(e.inputs.pitch=0,e.inputs.roll=0,e.inputs.yaw=0,e.inputs.throttle=0,e.inputs.shoot=!1)}var z=new e.Vector3,B=new e.Vector3,be=new e.Quaternion,xe=new e.Raycaster,Se=new e.Matrix4,Ce=new e.Matrix3,we=new e.Vector3(0,1,0),Te=[],Ee=new e.Vector3,De=new e.Vector3,Oe=new e.Vector3,ke=new e.Vector3,Ae=new e.Vector3,je=new e.Vector3,Me=new e.Vector3,Ne=new e.Object3D,V=new e.PerspectiveCamera(45,1,.1,1e3),Pe=new e.Vector3,Fe=new e.Vector3,Ie=new e.Vector3,Le=new e.Vector3,Re=new e.Vector3,H={};function ze(){H.speedVal=document.getElementById(`speedVal`),H.throtVal=document.getElementById(`throtVal`),H.hpVal=document.getElementById(`hpVal`),H.altVal=document.getElementById(`altVal`),H.altValContainerStyle=document.getElementById(`altValContainer`).style,H.headingVal=document.getElementById(`headingVal`),H.ammoText=document.getElementById(`ammoText`),H.ammoTextStyle=H.ammoText.style,H.ammoBarStyle=document.getElementById(`ammoBar`).style,H.reloadWarnStyle=document.getElementById(`reloadWarn`).style,H.stallWarnStyle=document.getElementById(`stallWarn`).style,H.cloudWhiteoutStyle=document.getElementById(`cloud-whiteout`).style}var U={speed:-1,throt:-1,alt:-1,hdg:-1,hp:-1,stall:null,ammo:-1,reloading:null,cloudWhiteout:!1};function Be(){let e=[];for(let t=0;t<a.length;t++)a[t].disconnected||e.push(a[t]);e.sort((e,t)=>t.kills===e.kills?e.deaths-t.deaths:t.kills-e.kills);let t=document.getElementById(`leaderboard-body`);t.innerHTML=``;for(let n=0;n<e.length;n++){let i=e[n],a=document.createElement(`tr`);i.index===r.myPlayerIndex&&a.classList.add(`current-player-row`);let o=document.createElement(`td`);o.innerText=i.isAI?`${i.name} (AI)`:i.name;let s=document.createElement(`td`),c=document.createElement(`div`);c.className=`color-indicator`,c.style.backgroundColor=`#`+i.color.getHexString(),s.appendChild(c);let l=document.createElement(`td`);l.innerText=i.kills;let u=document.createElement(`td`);u.innerText=i.deaths,a.appendChild(o),a.appendChild(s),a.appendChild(l),a.appendChild(u),t.appendChild(a)}}function Ve(e){let t=Math.round(e.speed*160);t!==U.speed&&(H.speedVal.innerText=t,U.speed=t);let n=Math.round(e.throttle*100);n!==U.throt&&(H.throtVal.innerText=n,U.throt=n),e.hp!==U.hp&&(H.hpVal.innerText=e.hp,U.hp=e.hp);let i=Math.round(e.mesh.position.y-d.waterLevel);i!==U.alt&&(H.altVal.innerText=i,H.altValContainerStyle.color=i<20?`#ff4444`:`#ffffff`,U.alt=i),z.set(0,0,-1).applyQuaternion(e.mesh.quaternion);let o=Math.atan2(z.x,z.z),s=Math.round(180/Math.PI*o);if(s<0&&(s+=360),s!==U.hdg&&(H.headingVal.innerText=s,U.hdg=s),e.isReloading){let t=(Date.now()-e.reloadTimerStart)/e.reloadTime;t>1&&(t=1),H.ammoBarStyle.width=t*100+`%`,U.reloading!==!0&&(H.ammoText.innerText=`0`,H.ammoTextStyle.color=`#ffaa00`,H.ammoBarStyle.background=`#ffaa00`,H.reloadWarnStyle.display=`block`,U.reloading=!0)}else(U.ammo!==e.currentAmmo||U.reloading===!0)&&(H.ammoText.innerText=e.currentAmmo,H.ammoTextStyle.color=`#ffffff`,H.ammoBarStyle.width=e.currentAmmo/e.maxAmmo*100+`%`,H.ammoBarStyle.background=`#ffffff`,H.reloadWarnStyle.display=`none`,U.ammo=e.currentAmmo,U.reloading=!1);let c=e.isStalled&&!e.isCrashed;c!==U.stall&&(H.stallWarnStyle.display=c?`block`:`none`,U.stall=c);for(let t=0;t<a.length;t++){let n=a[t];if(n.index===r.myPlayerIndex||n.disconnected)continue;let i=n.radarBlipStyle;if(!n.isCrashed&&n.mesh.visible&&n.isSpawned&&i){B.subVectors(n.mesh.position,e.mesh.position);let t=o-Math.atan2(B.x,B.z),r=Math.sqrt(B.x*B.x+B.z*B.z),a=Math.sin(t)*r*.3,s=-Math.cos(t)*r*.3,c=Math.sqrt(a*a+s*s);if(c>65){let e=65/c;a*=e,s*=e}i.transform=`translate(-50%, -50%) translate(${70+a}px, ${70+s}px)`,n._blipVisible!==!0&&(i.display=`block`,n._blipVisible=!0)}else i&&n._blipVisible!==!1&&(i.display=`none`,n._blipVisible=!1)}}var W=new e.Object3D;function G(e,t,n,r,i,a,o,s,c,l){let u=e.clone();if(W.position.set(t,n,r),W.rotation.set(i,a,o),W.scale.set(s,c,l),W.updateMatrix(),u.applyMatrix4(W.matrix),W.matrix.determinant()<0){let e=u.index;if(e){let t=e.array;for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.needsUpdate=!0}else for(let e in u.attributes){let t=u.attributes[e],n=t.array,r=t.itemSize;for(let e=0;e<t.count;e+=3)for(let t=0;t<r;t++){let i=(e+1)*r+t,a=(e+2)*r+t,o=n[i];n[i]=n[a],n[a]=o}t.needsUpdate=!0}}return u}function He(e,t,n,r,i,a,o,s,c,l,u,d,f){W.position.set(i,a,o),W.rotation.set(s,c,l),W.scale.set(u,d,f),W.updateMatrix(),e.position.set(t,n,r).applyMatrix4(W.matrix)}function Ue(e){e.traverse(e=>{e.updateMatrix(),e.matrixAutoUpdate=!1})}function We(t,n,i,a){let o=d.width/8,s=d.width/2,c=t.length/9|0,l=new Uint32Array(64),u=new Uint16Array(c);for(let e=0;e<c;e++){let n=e*9,r=(t[n]+t[n+3]+t[n+6])/3,i=(t[n+2]+t[n+5]+t[n+8])/3,a=Math.floor((r+s)/o),c=Math.floor((i+s)/o);a<0?a=0:a>=8&&(a=7),c<0?c=0:c>=8&&(c=7);let d=c*8+a;u[e]=d,l[d]++}let f=Array(64),p=Array(64),m=Array(64);for(let e=0;e<64;e++)l[e]!==0&&(f[e]=new Float32Array(l[e]*9),p[e]=new Float32Array(l[e]*9),m[e]=new Float32Array(l[e]*9));let h=new Uint32Array(64);for(let e=0;e<c;e++){let r=u[e],a=e*9,o=h[r];h[r]=o+9;let s=f[r],c=p[r],l=m[r];for(let e=0;e<9;e++)s[o+e]=t[a+e],c[o+e]=n[a+e],l[o+e]=i[a+e]}let g=[];for(let t=0;t<64;t++){if(l[t]===0)continue;let n=new e.BufferGeometry;n.setAttribute(`position`,new e.BufferAttribute(f[t],3)),n.setAttribute(`normal`,new e.BufferAttribute(p[t],3)),n.setAttribute(`color`,new e.BufferAttribute(m[t],3)),n.computeBoundingSphere();let i=new e.Mesh(n,a);i.receiveShadow=!0,i.castShadow=!0,Ue(i),r.scene.add(i),g.push(i)}return g}function Ge(e){if(e.parent===r.pooledRoot)return;let t=r.pooledRoot.children;e.parent=r.pooledRoot,e.userData.childIdx=t.length,t.push(e)}function Ke(e){if(e.parent!==r.pooledRoot)return;let t=r.pooledRoot.children,n=e.userData.childIdx;if(n<0||t[n]!==e){e.parent=null;return}let i=t[t.length-1];t[n]=i,i.userData.childIdx=n,t.pop(),e.parent=null,e.userData.childIdx=-1}function qe(e){let t=e%233280;return{random:function(){return t=(t*9301+49297)%233280,t/233280}}}function Je(e){let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t=(t<<5)-t+r,t|=0}return Math.abs(t)}var Ye=42,K=new n(qe(Ye));function Xe(e){Ye=e,K=new n(qe(Ye))}function Ze(){return Ye}function q(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function Qe(t,n){let r=t/6e3,i=n/6e3,a=K.noise(r*.5+Ye,i*.5+Ye)*.5+.5,o=q(.1,.6,a),s=q(.4,.9,a),c=0,l=1,u=1,f=1;for(let e=0;e<4;e++){let e=1-Math.abs(K.noise(r*l*1.2+10,i*l*1.2+10));e*=e,c+=e*u*f,f=Math.max(.15,e*1.5),l*=2,u*=.4}c/=1+c*.3;let p=K.noise(r*8,i*8)*.04,m=(c+p)*10,h=Math.floor(m),g=m-h,_=g*.35,v=q(.5,1,g)*.65,y=(h+_+v)/10;c=e.MathUtils.lerp(c,y,.7)*900;let b=K.noise(r*2+50,i*2+50)*.5+.5,x=(b+K.noise(r*6+20,i*6+20)*.05)*6,S=Math.floor(x),C=x-S,w=C*.25,T=q(.6,1,C)*.75,E=(S+w+T)/6,D=e.MathUtils.lerp(b,E,.8)*350,O=(K.noise(r*3+100,i*3+100)*.5+.5)*200,k=O+(K.noise(r*1.5+400,i*1.5+400)*.5+.5)*350,A=K.noise(r*.8+200,i*.8+200),j=0;if(A>.05){let t=q(.05,.35,A),n=q(.25,.6,A),r=e.MathUtils.lerp(O,k,t),i=n**1.8;j=e.MathUtils.lerp(r,c,i)}else if(A<-.15){let t=q(-.15,-.45,A);j=e.MathUtils.lerp(O,D,t)}else j=O;j=e.MathUtils.lerp(O,j,s);let M=Math.abs(K.noise(r*1.5+300,i*1.5+300)),N=q(.02,e.MathUtils.lerp(.15,.45,q(200,600,j)),M),P=q(300,650,j);N=e.MathUtils.lerp(N,1,P);let ee=e.MathUtils.lerp(d.waterLevel-20,300,q(200,800,j));j=e.MathUtils.lerp(ee,j,N);let te=e.MathUtils.lerp(d.waterLevel-80,j,o),ne=K.noise(r*10,i*10)*6;return te+=ne*N,Math.max(d.waterLevel-60,te)}var $e=null,et=null,tt=null,nt=null,J=0;function rt(e){nt=e,window.terrainPositions=e,J=Math.ceil(d.width/50);let t=J*J,n=d.width/2,r=J,i=new Int32Array(t);tt=new Float32Array(t),tt.fill(-1/0);for(let t=0;t<e.length;t+=9){let a=e[t],o=e[t+2],s=e[t+3],c=e[t+5],l=e[t+6],u=e[t+8],d=Math.min(a,s,l)+n,f=Math.max(a,s,l)+n,p=Math.min(o,c,u)+n,m=Math.max(o,c,u)+n,h=Math.max(0,Math.floor(d/50)),g=Math.min(r-1,Math.floor(f/50)),_=Math.max(0,Math.floor(p/50)),v=Math.min(r-1,Math.floor(m/50)),y=Math.max(e[t+1],e[t+4],e[t+7]);for(let e=_;e<=v;e++){let t=e*r;for(let e=h;e<=g;e++){let n=t+e;i[n]++,y>tt[n]&&(tt[n]=y)}}}et=new Int32Array(t+1);let a=0;for(let e=0;e<t;e++)et[e]=a,a+=i[e];et[t]=a,$e=new Int32Array(a);let o=new Int32Array(t);for(let t=0;t<e.length;t+=9){let i=e[t],a=e[t+2],s=e[t+3],c=e[t+5],l=e[t+6],u=e[t+8],d=Math.min(i,s,l)+n,f=Math.max(i,s,l)+n,p=Math.min(a,c,u)+n,m=Math.max(a,c,u)+n,h=Math.max(0,Math.floor(d/50)),g=Math.min(r-1,Math.floor(f/50)),_=Math.max(0,Math.floor(p/50)),v=Math.min(r-1,Math.floor(m/50));for(let e=_;e<=v;e++){let n=e*r;for(let e=h;e<=g;e++){let r=n+e;$e[et[r]+o[r]]=t,o[r]++}}}}var it=150;function at(e,t){if(!tt)return 1/0;let n=d.width/2,r=Math.floor((e+n)/50),i=Math.floor((t+n)/50);if(r<0||r>=J||i<0||i>=J)return 1/0;let a=tt[i*J+r];return a===-1/0?1/0:a+it}function ot(e,t,n,r,i,a,o,s,c,l,u){let d=(s-u)*(n-c)+(c-a)*(i-u);if(d===0)return null;let f=((s-u)*(e-c)+(c-a)*(t-u))/d,p=((u-i)*(e-c)+(n-c)*(t-u))/d,m=1-f-p;return f>=-.01&&p>=-.01&&m>=-.01?f*r+p*o+m*l:null}function st(e,t){let n=nt;if(!$e||!n)return Qe(e,t);let r=d.width/2,i=Math.floor((e+r)/50),a=Math.floor((t+r)/50);if(i>=0&&i<J&&a>=0&&a<J){let r=a*J+i,o=et[r+1],s=-9999,c=!1;for(let i=et[r];i<o;i++){let r=$e[i],a=n[r],o=n[r+1],l=n[r+2],u=n[r+3],d=n[r+4],f=n[r+5],p=n[r+6],m=n[r+7],h=n[r+8],g=ot(e,t,a,o,l,u,d,f,p,m,h);g!==null&&(g>s&&(s=g),c=!0)}if(c)return s}return Qe(e,t)}window.getSafeSpawn=function(t=1e3,n=3e3){let r=0,i=0,a=800,o=!1,s=0;for(;!o&&s<50;){let c=Math.random()*Math.PI*2,l=t+Math.random()*(n-t);r=Math.sin(c)*l,i=Math.cos(c)*l;let u=Qe(r,i);a=Math.max(800,u+300);let d=!0,f=new e.Vector3(-r,0,-i).normalize();for(let e=100;e<=800;e+=100)if(Qe(r+f.x*e,i+f.z*e)>=a-100){d=!1;break}d&&(o=!0),s++}return o||(a=1500),{x:r,y:a,z:i}};function Y(e,t){if(e.muzzleFlashIntensity=t,t>0){let t=r.sharedMuzzleLightOwner;(!t||t===e||t.muzzleFlashIntensity<=0||e.isLocal&&!t.isLocal)&&(r.sharedMuzzleLightOwner=e)}else r.sharedMuzzleLightOwner===e&&(r.sharedMuzzleLightOwner=null)}function ct(){if(!r.sharedMuzzleLight)return;let e=r.sharedMuzzleLightOwner;!e||e.muzzleFlashIntensity<=0||e.disconnected||!e.mesh.visible?r.sharedMuzzleLight.intensity=0:(r.sharedMuzzleLight.intensity=e.muzzleFlashIntensity,e.mesh.updateMatrixWorld(),z.set(0,0,-10.5).applyMatrix4(e.mesh.matrixWorld),r.sharedMuzzleLight.position.copy(z))}var lt=new e.BoxGeometry(.4,.4,.4),ut=new e.Matrix4,dt=new e.Vector3,ft=new e.Quaternion,pt=new e.Matrix4,mt=(e,t)=>t._z-e._z,ht=class{constructor(){this.position=new e.Vector3,this.rotation=new e.Euler,this.scale=new e.Vector3(1,1,1),this.material={color:new e.Color(16777215),opacity:1},this.visible=!1,this._z=0,this.userData={velocity:new e.Vector3,rotSpeed:0,life:0,baseOpacity:1,isFlame:!1,isWater:!1,bloom:0,poolItem:null}}},gt=class{constructor(t,n){this.items=[],this.freeItems=[],this.activeList=[],this.maxSize=n,this._order=[],this.material=new e.MeshBasicMaterial({transparent:!0}),this.material.customProgramCacheKey=()=>`instancedParticleAlpha`,this.material.onBeforeCompile=e=>{e.vertexShader=`attribute float instanceAlpha;
varying float vInstanceAlpha;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
	vInstanceAlpha = instanceAlpha;`),e.fragmentShader=`varying float vInstanceAlpha;
`+e.fragmentShader.replace(`vec4 diffuseColor = vec4( diffuse, opacity );`,`vec4 diffuseColor = vec4( diffuse, opacity * vInstanceAlpha );`)},this.mesh=new e.InstancedMesh(t,this.material,n),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.matrixAutoUpdate=!1,this.mesh.updateMatrix(),this.mesh.renderOrder=10,this.mesh.instanceColor=new e.InstancedBufferAttribute(new Float32Array(n*3),3),this.alphaAttr=new e.InstancedBufferAttribute(new Float32Array(n),1),t.setAttribute(`instanceAlpha`,this.alphaAttr),this.bloomAttr=new e.InstancedBufferAttribute(new Float32Array(n),1),t.setAttribute(`instanceBloom`,this.bloomAttr),this.bloomMaterial=new e.MeshBasicMaterial({fog:!1,toneMapped:!1,depthWrite:!1,depthTest:!1,transparent:!0,blending:e.CustomBlending,blendSrc:e.OneFactor,blendDst:e.OneFactor}),this.bloomMaterial.customProgramCacheKey=()=>`instancedParticleBloom`,this.bloomMaterial.onBeforeCompile=e=>{e.vertexShader=`attribute float instanceAlpha;
attribute float instanceBloom;
varying float vBloomWeight;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
	vBloomWeight = instanceAlpha * instanceBloom;`),e.fragmentShader=`varying float vBloomWeight;
`+e.fragmentShader.replace(`vec4 diffuseColor = vec4( diffuse, opacity );`,`vec4 diffuseColor = vec4( diffuse * vBloomWeight * 1.9, 1.0 );`)},this.bloomMesh=new e.InstancedMesh(t,this.bloomMaterial,n),this.bloomMesh.instanceMatrix=this.mesh.instanceMatrix,this.bloomMesh.instanceColor=this.mesh.instanceColor,this.bloomMesh.count=0,this.bloomMesh.frustumCulled=!1,this.bloomMesh.matrixAutoUpdate=!1,this.bloomMesh.updateMatrix(),this.bloomMesh.layers.set(1);for(let e=0;e<n;e++){let t=new ht,n={mesh:t,active:!1,poolIndex:e,activeIdx:-1};t.userData.poolItem=n,this.items.push(n),this.freeItems.push(n)}}get(){let e=this.freeItems;if(e.length===0)return null;let t=e[0],n=e.pop();if(e.length>0){let t=0;for(;;){let r=t*2+1;if(r>=e.length)break;let i=r+1,a=i<e.length&&e[i].poolIndex<e[r].poolIndex?i:r;if(n.poolIndex<=e[a].poolIndex)break;e[t]=e[a],t=a}e[t]=n}return t.active=!0,t.activeIdx=this.activeList.length,this.activeList.push(t),t.mesh}release(e){e.visible=!1;let t=e.userData.poolItem;if(!t||!t.active)return;t.active=!1;let n=this.activeList,r=t.activeIdx,i=n[n.length-1];n[r]=i,i.activeIdx=r,n.pop(),t.activeIdx=-1;let a=this.freeItems,o=a.length;for(a.push(t);o>0;){let e=o-1>>1;if(a[e].poolIndex<=t.poolIndex)break;a[o]=a[e],o=e}a[o]=t}commit(e){let t=this.activeList,n=this._order;if(n.length=0,t.length>0){ut.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse);for(let e=0;e<t.length;e++){let r=t[e].mesh;r.visible&&(dt.copy(r.position).applyMatrix4(ut),r._z=dt.z,n.push(r))}n.sort(mt)}let r=n.length;if(this.mesh.count=r,this.bloomMesh.count=r,r===0)return;let i=this.mesh.instanceMatrix.array,a=this.mesh.instanceColor.array,o=this.alphaAttr.array,s=this.bloomAttr.array;for(let e=0;e<r;e++){let t=n[e];ft.setFromEuler(t.rotation),pt.compose(t.position,ft,t.scale),pt.toArray(i,e*16);let r=t.material.color,c=e*3;a[c]=r.r,a[c+1]=r.g,a[c+2]=r.b,o[e]=t.material.opacity,s[e]=t.userData.bloom}this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceMatrix.updateRange.count=r*16,this.mesh.instanceColor.needsUpdate=!0,this.mesh.instanceColor.updateRange.count=r*3,this.alphaAttr.needsUpdate=!0,this.alphaAttr.updateRange.count=r,this.bloomAttr.needsUpdate=!0,this.bloomAttr.updateRange.count=r}primeWarmUp(e){let t=Math.min(4,this.maxSize),n=this.mesh.instanceMatrix.array,r=this.mesh.instanceColor.array;for(let i=0;i<t;i++)pt.makeTranslation(e.x,e.y,e.z),pt.toArray(n,i*16),r[i*3]=1,r[i*3+1]=1,r[i*3+2]=1,this.alphaAttr.array[i]=.01,this.bloomAttr.array[i]=.01;this.mesh.count=t,this.bloomMesh.count=t,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor.needsUpdate=!0,this.alphaAttr.needsUpdate=!0,this.bloomAttr.needsUpdate=!0}endWarmUp(){this.mesh.count=0,this.bloomMesh.count=0}},_t=class{constructor(e,t){this.particles=[];for(let n=0;n<12;n++){let n=r.boxParticlePool.get();n&&(n.material.color.setHex(t),n.material.opacity=1,n.position.copy(e),n.userData.velocity.set((Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2),n.userData.life=1,n.userData.rotSpeed=(Math.random()-.5)*.2,n.userData.bloom=1,n.visible=!0,this.particles.push(n))}}update(e){let t=!1;for(let n=0;n<this.particles.length;n++){let i=this.particles[n];i.userData.life>0?(i.position.addScaledVector(i.userData.velocity,e),i.rotation.x+=i.userData.rotSpeed*e,i.userData.life-=.03*e,i.scale.setScalar(i.userData.life*3),i.material.opacity=Math.min(1,i.userData.life*1.6),t=!0):i.visible&&r.boxParticlePool.release(i)}return t}dispose(){for(let e=0;e<this.particles.length;e++){let t=this.particles[e];t.visible&&r.boxParticlePool.release(t)}}},vt=class{constructor(e){this.particles=[];for(let t=0;t<8;t++){let t=r.boxParticlePool.get();t&&(t.material.color.setHex(14548991),t.material.opacity=.8,t.position.copy(e),t.position.y=d.waterLevel,t.userData.velocity.set((Math.random()-.5)*2,1+Math.random()*2,(Math.random()-.5)*2),t.userData.life=1,t.userData.rotSpeed=(Math.random()-.5)*.4,t.userData.bloom=0,t.visible=!0,this.particles.push(t))}}update(e){let t=!1;for(let n=0;n<this.particles.length;n++){let i=this.particles[n];i.userData.life>0?(i.userData.velocity.y-=.15*e,i.position.addScaledVector(i.userData.velocity,e),i.rotation.x+=i.userData.rotSpeed*e,i.userData.life-=.04*e,i.scale.setScalar(i.userData.life*1.5),i.material.opacity=i.userData.life*.8,t=!0):i.visible&&r.boxParticlePool.release(i)}return t}dispose(){for(let e=0;e<this.particles.length;e++){let t=this.particles[e];t.visible&&r.boxParticlePool.release(t)}}},yt=class{constructor(e){this.particles=[];for(let t=0;t<6;t++){let t=r.boxParticlePool.get();t&&(t.material.color.setHex(4863269),t.material.opacity=1,t.position.copy(e),t.userData.velocity.set((Math.random()-.5)*1.5,.5+Math.random()*1.5,(Math.random()-.5)*1.5),t.userData.life=1,t.userData.rotSpeed=(Math.random()-.5)*.4,t.userData.bloom=0,t.visible=!0,this.particles.push(t))}}update(e){let t=!1;for(let n=0;n<this.particles.length;n++){let i=this.particles[n];i.userData.life>0?(i.userData.velocity.y-=.08*e,i.position.addScaledVector(i.userData.velocity,e),i.rotation.x+=i.userData.rotSpeed*e,i.userData.life-=.05*e,i.scale.setScalar(i.userData.life*2),i.material.opacity=i.userData.life,t=!0):i.visible&&r.boxParticlePool.release(i)}return t}dispose(){for(let e=0;e<this.particles.length;e++){let t=this.particles[e];t.visible&&r.boxParticlePool.release(t)}}},bt=.032,xt=.0035,St=4.5,Ct=9,wt=null,Tt=new e.Quaternion,Et=new e.Vector3,Dt=new e.Vector3;function Ot(){if(wt)return wt;let t=new e.CylinderGeometry(.9,.8,3.5,8);t.rotateX(Math.PI/2);let n=new e.CylinderGeometry(1.1,.9,7,8);n.rotateX(Math.PI/2);let r=new e.CylinderGeometry(.4,1.1,6,8);r.rotateX(Math.PI/2);let i=new e.BoxGeometry(7,.2,3),a=new e.BoxGeometry(5,.15,2),o=new e.SphereGeometry(1.1,6,6);o.scale(1,.8,2.5);let s=new e.CylinderGeometry(.8,.1,2,8);s.rotateX(Math.PI/2);let c=new e.BoxGeometry(.2,3,2.5);return wt=[{geo:n,mat:`body`,origin:new e.Vector3(0,0,0),big:!0},{geo:t,mat:`body`,origin:new e.Vector3(0,0,-5.25),big:!0},{geo:r,mat:`body`,origin:new e.Vector3(0,0,6.5),big:!0},{geo:i,mat:`body`,origin:new e.Vector3(4.3,-.2,-.5),big:!0},{geo:i,mat:`body`,origin:new e.Vector3(-4.3,-.2,-.5),big:!0},{geo:a,mat:`body`,origin:new e.Vector3(0,.28,9.5),big:!1},{geo:c,mat:`highlight`,origin:new e.Vector3(0,2,8.5),big:!1},{geo:s,mat:`highlight`,origin:new e.Vector3(0,0,-8),big:!1},{geo:o,mat:`glass`,origin:new e.Vector3(0,.8,-.5),big:!1}],wt}var kt=class{constructor(t,n,i){this.chunks=[],this.particles=[],this.age=0,this.smokeAccumulator=0,this.impacted=!1,Dt.set(0,0,-1).applyQuaternion(t.quaternion);let a=Ot();for(let o=0;o<a.length;o++){let s=a[o],c=s.mat===`highlight`?i.highlight:s.mat===`glass`?i.glass:i.body,l=new e.Mesh(s.geo,c);l.castShadow=s.big,l.receiveShadow=!1,l.position.copy(s.origin).applyMatrix4(t.matrixWorld),l.quaternion.copy(t.quaternion);let u=Dt.clone().multiplyScalar(n*.88);Et.copy(s.origin).normalize().applyQuaternion(t.quaternion),u.addScaledVector(Et,.22+Math.random()*.3),u.x+=(Math.random()-.5)*.36,u.y+=(Math.random()-.5)*.36+.18,u.z+=(Math.random()-.5)*.36,r.scene.add(l),this.chunks.push({mesh:l,velocity:u,spinAxis:new e.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),spinRate:(.03+Math.random()*.09)*(Math.random()<.5?-1:1),big:s.big,landed:!1,hasImpacted:!1,bounces:0})}}spawnParticle(e,t){let n=r.sphereParticlePool.get();n&&(t?(n.material.color.setHex(Math.random()<.5?16742178:16763955),n.material.opacity=.9,n.scale.setScalar(1.4+Math.random()*1.6),n.userData.bloom=1,n.userData.life=.55+Math.random()*.3):(n.material.color.setHex(3815994),n.material.opacity=.55,n.scale.setScalar(2+Math.random()*2),n.userData.bloom=0,n.userData.life=1),n.position.copy(e),n.userData.velocity.set((Math.random()-.5)*.5,.25+Math.random()*.35,(Math.random()-.5)*.5),n.userData.baseOpacity=n.material.opacity,n.visible=!0,this.particles.push(n))}update(e){this.age+=.016*e;let t=0,n=1-xt*e;for(let r=0;r<this.chunks.length;r++){let i=this.chunks[r];if(i.landed)continue;i.velocity.y-=bt*e,i.velocity.multiplyScalar(n),i.mesh.position.addScaledVector(i.velocity,e),Tt.setFromAxisAngle(i.spinAxis,i.spinRate*e),i.mesh.quaternion.multiply(Tt);let a=i.mesh.position,o=st(a.x,a.z),c=o<d.waterLevel,l=c?d.waterLevel:o;a.y<=l?(a.y=l,i.hasImpacted||(i.hasImpacted=!0,c?s.push(new vt(a)):s.push(new yt(a)),this.impacted||(this.impacted=!0,s.push(new _t(a,16746496)),L.playExplosion(a))),i.bounces<2&&Math.abs(i.velocity.y)>.25?(i.bounces++,i.velocity.y=Math.abs(i.velocity.y)*.32,i.velocity.x*=.55,i.velocity.z*=.55,i.spinRate*=.45,t++):(i.landed=!0,i.velocity.set(0,0,0))):t++}if(this.smokeAccumulator+=e,this.smokeAccumulator>=2&&this.age<6){this.smokeAccumulator=0;for(let e=0;e<this.chunks.length;e++){let t=this.chunks[e];t.big&&!t.landed&&this.spawnParticle(t.mesh.position,Math.random()<.45)}}for(let t=this.particles.length-1;t>=0;t--){let n=this.particles[t];n.userData.life-=.022*e,n.position.addScaledVector(n.userData.velocity,e),n.scale.multiplyScalar(1+.035*e),n.material.opacity=Math.max(0,n.userData.life)*n.userData.baseOpacity,n.userData.life<=0&&(r.sphereParticlePool.release(n),this.particles[t]=this.particles[this.particles.length-1],this.particles.pop())}return this.age>Ct?!1:this.age<St||t>0||this.particles.length>0}dispose(){for(let e=0;e<this.chunks.length;e++)r.scene.remove(this.chunks[e].mesh);this.chunks.length=0;for(let e=0;e<this.particles.length;e++)r.sphereParticlePool.release(this.particles[e]);this.particles.length=0}},X=[],At=0,jt=new e.BoxGeometry(.3,.3,4),Mt=new e.MeshBasicMaterial({color:16777130,fog:!1,toneMapped:!1}),Nt=class{constructor(){this.isActive=!1,this.ownerIdx=-1,this.speed=0,this.life=0,this.hitType=null,this.isLocalOrHostAI=!1,this.mesh=new e.Mesh(jt,Mt),this.mesh.layers.enable(1),this.mesh.visible=!1,this.mesh.matrixAutoUpdate=!1,this.mesh.matrixWorldAutoUpdate=!1,this.mesh.userData.childIdx=-1}deactivate(){this.isActive=!1,this.mesh.visible=!1,Ke(this.mesh)}activate(e,t,n,r,i){this.ownerIdx=e,this.speed=r+15,this.life=100,this.hitType=null,this.mesh.position.copy(t),this.mesh.quaternion.copy(n),this.mesh.updateMatrix(),this.mesh.matrixWorld.copy(this.mesh.matrix),this.mesh.visible=!0,Ge(this.mesh),this.isActive=!0,this.isLocalOrHostAI=i}update(e){if(!this.isActive)return!1;this.mesh.translateZ(-this.speed*e),this.mesh.updateMatrix(),this.mesh.matrixWorld.copy(this.mesh.matrix),this.life-=1*e;let t=this.mesh.position.x,n=this.mesh.position.y,r=this.mesh.position.z;if(n>=d.waterLevel&&n>=at(t,r))return this.life<=0?(this.hitType=`timeout`,!1):!0;let i=st(t,r);return n<d.waterLevel&&i<=d.waterLevel?(this.hitType=`water`,!1):n<i?(this.hitType=`dirt`,!1):this.life<=0?(this.hitType=`timeout`,!1):!0}};function Pt(){for(let e=0;e<250;e++)if(At=(At+1)%250,!X[At].isActive)return X[At];return null}var Ft=class{constructor(t,n){this.index=t.index,this.socketId=t.id,this.name=t.name,this.isLocal=n,this.isAI=!!t.isAI,this.isSpawned=!!this.isAI,this.disconnected=!1;let i=[16711680,65280,16776960,16711935,16747520,16777215,8190976,14423100,16716947,16729344];if(this.color=new e.Color(i[this.index%i.length]),this.speed=1.0875,this.throttle=.5,this.hp=100,this.isCrashed=!1,this.trailParticles=[],this.lastShot=0,this.maxAmmo=67,this.currentAmmo=this.maxAmmo,this.reloadTime=15e3,this.isReloading=!1,this.reloadTimerStart=0,this.isStalled=!1,this.flashTimer=0,this.isShooting=!1,this.isFiring=!1,this.hasInitialSnap=!1,this.kills=0,this.deaths=0,this.lastAttackerName=null,this.diedByCollision=!1,this.lastRespawnTime=0,this.positionBuffer=[],this.respawnTimer=0,this.smoothedPitch=0,this.smoothedRoll=0,this.smoothedYaw=0,this.yawVelocity=0,this.virtualChasePos=null,this.inputs={pitch:0,roll:0,yaw:0,throttle:0,shoot:!1,reset:!1},this.engineSound=new _e(n),this.camera=new e.PerspectiveCamera(60,window.innerWidth/window.innerHeight,5,15e4),this.mesh=this.createPlaneMesh(this.color),this.isLocal||this.isAI){let e=window.getSafeSpawn(1e3,3e3);this.mesh.position.set(e.x,e.y,e.z),this.mesh.lookAt(0,e.y,0)}else this.mesh.position.set(0,1500,0);r.scene.add(this.mesh),this.radarBlip=document.createElement(`div`),this.radarBlip.className=`radar-blip`,this.radarBlipStyle=this.radarBlip.style,this._blipVisible=null;let a=`#`+this.color.getHexString();this.radarBlipStyle.backgroundColor=a,this.radarBlipStyle.boxShadow=`0 0 5px ${a}`,this.index!==r.myPlayerIndex&&document.getElementById(`radar`).appendChild(this.radarBlip)}dispose(){this.disconnected=!0,this.mesh.visible=!1,Y(this,0),this.radarBlip&&this.radarBlip.parentNode&&this.radarBlip.parentNode.removeChild(this.radarBlip),this.engineSound&&this.engineSound.stop()}createPlaneMesh(n){let r=new e.Group,i=new e.MeshStandardMaterial({color:8952234,roughness:.4,metalness:.6,flatShading:!0}),a=new e.MeshStandardMaterial({color:n,roughness:.5,metalness:.2,flatShading:!0}),o=new e.MeshStandardMaterial({color:526345,metalness:.9,roughness:.05,transparent:!0,opacity:.55,flatShading:!0});this.bodyMat=i,this.highlightMat=a,this.glassMat=o;let s=new e.CylinderGeometry(1.1,.9,7,10);s.rotateX(Math.PI/2);let c=new e.CylinderGeometry(.9,.8,3.5,10);c.rotateX(Math.PI/2),c.translate(0,0,-5.25);let l=new e.CylinderGeometry(.8,.1,2,10);l.rotateX(Math.PI/2),l.translate(0,0,-8);let u=new e.CylinderGeometry(.4,1.1,6,10);u.rotateX(Math.PI/2),u.translate(0,0,6.5);let d=new e.SphereGeometry(1.1,8,8);d.scale(1,.8,2.5),d.translate(0,.8,-.5);let f=new e.BoxGeometry(7,.2,3);f.translate(3.5,0,.5);let p=new e.BoxGeometry(.5,.21,3);p.translate(7.25,0,.5);let m=new e.BoxGeometry(5,.15,2);m.translate(0,0,1);let h=new e.BoxGeometry(.2,3,2.5),g=h.attributes.position;for(let e=0;e<g.count;e++)g.getY(e)>0&&g.setZ(e,g.getZ(e)+1.5);h.computeVertexNormals();let _=new e.BoxGeometry(1.2,.6,3);_.translate(0,-.3,0);let v=new e.Mesh(t.mergeGeometries([G(s,0,0,0,0,0,0,1,1,1),G(c,0,0,0,0,0,0,1,1,1),G(u,0,0,0,0,0,0,1,1,1),G(f,.8,-.2,-1,-.05,-.2,0,1,1,1),G(f,-.8,-.2,-1,-.05,.2,0,-1,1,1),G(m,0,.28,8.5,0,0,0,1,1,1),G(_,0,-.9,1,0,0,0,1,1,1)]),i);r.add(v);let y=new e.Mesh(t.mergeGeometries([G(l,0,0,0,0,0,0,1,1,1),G(p,.8,-.2,-1,-.05,-.2,0,1,1,1),G(p,-.8,-.2,-1,-.05,.2,0,-1,1,1),G(h,0,2,8.5,0,0,0,1,1,1)]),a);r.add(y);let b=new e.Mesh(d,o);r.add(b),this.leftAnchor=new e.Object3D,He(this.leftAnchor,7.5,0,.5,.8,-.2,-1,-.05,-.2,0,1,1,1),r.add(this.leftAnchor),this.rightAnchor=new e.Object3D,He(this.rightAnchor,7.5,0,.5,-.8,-.2,-1,-.05,.2,0,-1,1,1),r.add(this.rightAnchor),this.propeller=new e.Group;let x=new e.BoxGeometry(.18,3.6,.2);x.translate(0,1.8,0);let S=new e.MeshStandardMaterial({color:1118481,roughness:.5,flatShading:!0}),C=[];for(let e=0;e<3;e++)C.push(G(x,0,0,0,0,0,e/3*Math.PI*2,1,1,1));this.propeller.add(new e.Mesh(t.mergeGeometries(C),S));let w=new e.ConeGeometry(.3,.5,8);w.rotateX(Math.PI/2),w.translate(0,0,.25);let T=new e.Mesh(w,a);this.propeller.add(T),this.propeller.position.set(0,0,-9.1),r.add(this.propeller);let E=new e.DodecahedronGeometry(.8,0),D=new e.MeshBasicMaterial({color:16776960,transparent:!0,opacity:0,depthWrite:!1,fog:!1,toneMapped:!1});return this.muzzleFlash=new e.Mesh(E,D),this.muzzleFlash.layers.enable(1),this.muzzleFlash.position.set(0,0,-10.5),this.muzzleFlashIntensity=0,this.muzzleFlash.visible=!0,r.add(this.muzzleFlash),r.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),r}createTrail(t=14540253,n=.5,i=.4,a=new e.Vector3(0,0,6.5),o=!1){let s=r.sphereParticlePool.get();s&&(s.material.color.setHex(t),s.material.opacity=i,s.scale.setScalar(n),z.copy(a).applyMatrix4(this.mesh.matrixWorld),s.position.copy(z),o?s.userData.velocity.set((Math.random()-.5)*1.5,(Math.random()-.5)*1.5,(Math.random()-.5)*1.5).multiplyScalar(.5):s.userData.velocity.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).multiplyScalar(.2),s.userData.life=1,s.userData.baseOpacity=i,s.userData.isFlame=o,s.userData.isWater=!1,s.userData.bloom=o?.9:0,s.visible=!0,this.trailParticles.push(s))}createVortex(e=.3){if(!this.leftAnchor||!this.rightAnchor)return;let t=r.sphereParticlePool.get();t&&(t.material.color.setHex(16777215),t.material.opacity=e,t.scale.setScalar(.35),z.setFromMatrixPosition(this.leftAnchor.matrixWorld),t.position.copy(z),t.userData.velocity.set((Math.random()-.5)*.1,(Math.random()-.5)*.1,(Math.random()-.5)*.1),t.userData.life=1,t.userData.baseOpacity=e,t.userData.isFlame=!1,t.userData.isWater=!1,t.userData.bloom=0,t.visible=!0,this.trailParticles.push(t));let n=r.sphereParticlePool.get();n&&(n.material.color.setHex(16777215),n.material.opacity=e,n.scale.setScalar(.35),z.setFromMatrixPosition(this.rightAnchor.matrixWorld),n.position.copy(z),n.userData.velocity.set((Math.random()-.5)*.1,(Math.random()-.5)*.1,(Math.random()-.5)*.1),n.userData.life=1,n.userData.baseOpacity=e,n.userData.isFlame=!1,n.userData.isWater=!1,n.userData.bloom=0,n.visible=!0,this.trailParticles.push(n))}createWaterSpray(e=.5){let t=r.sphereParticlePool.get();if(!t)return;let n=.8+Math.random()*1.2;t.material.color.setHex(14548991),t.material.opacity=e,t.scale.setScalar(n),z.set(0,0,4).applyQuaternion(this.mesh.quaternion),t.position.copy(this.mesh.position).add(z),t.position.y=d.waterLevel,z.set(0,0,-1).applyQuaternion(this.mesh.quaternion),t.userData.velocity.set((Math.random()-.5)*1.5,1.5+Math.random()*2.5,(Math.random()-.5)*1.5),t.userData.velocity.addScaledVector(z,this.speed*.2),t.userData.life=1,t.userData.baseOpacity=e,t.userData.isFlame=!1,t.userData.isWater=!0,t.userData.bloom=0,t.visible=!0,this.trailParticles.push(t)}explode(){if(this.isCrashed)return;this.isCrashed=!0;let e=this.speed;if(this.mesh.updateMatrixWorld(!0),s.push(new kt(this.mesh,e,{body:this.bodyMat,highlight:this.highlightMat,glass:this.glassMat})),this.speed=0,this.mesh.visible=!1,this.radarBlipStyle&&(this.radarBlipStyle.display=`none`),this.engineSound.stop(),L.playExplosion(this.mesh.position),s.push(new _t(this.mesh.position,16711680)),s.push(new _t(this.mesh.position,16755200)),this.index===r.myPlayerIndex){let e=document.getElementById(`death-reason`);e.innerText=this.diedByCollision?`MID-AIR COLLISION`:this.lastAttackerName?`SHOT DOWN BY ${this.lastAttackerName}`:`YOU CRASHED`,document.getElementById(`crash-msg`).style.display=`block`}}takeDamage(e,t){this.isCrashed||(this.index===r.myPlayerIndex||this.isAI)&&(this.hp-=e,this.hp<=0&&(this.hp=0,this.die(t)))}die(e){if(this.isCrashed)return;this.deaths++;let t=null;if(e!==null&&e!==-1){let n=null;for(let t=0;t<a.length;t++)if(a[t].index===e){n=a[t];break}n&&(t=n.name)}this.lastAttackerName=t,this.explode();let n={type:`PLAYER_DIED`,idx:this.index,attackerIdx:e};if(r.isHost){if(e!==null&&e!==-1){let t=null;for(let n=0;n<a.length;n++)if(a[n].index===e){t=a[n];break}t&&t.index!==this.index&&t.kills++}r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:n})}else r.socket.emit(`client_send`,{roomCode:r.myRoomCode,data:n})}reset(){if(this.isLocal||this.isAI){let e=window.getSafeSpawn(1e3,3e3);this.mesh.position.set(e.x,e.y,e.z),this.mesh.lookAt(0,e.y,0),this.virtualChasePos=null}this.speed=1.0875,this.throttle=.5,this.smoothedPitch=0,this.smoothedRoll=0,this.smoothedYaw=0,this.yawVelocity=0,this.hp=100,this.currentAmmo=this.maxAmmo,this.isReloading=!1,this.reloadTimerStart=0,this.isCrashed=!1,this.lastAttackerName=null,this.diedByCollision=!1,this.mesh.visible=!0,this.radarBlipStyle&&(this.radarBlipStyle.display=`block`),this.engineSound.restart(),this.positionBuffer=[],this.hasInitialSnap=!1,this.lastRespawnTime=Date.now(),this.respawnTimer=0,this.flashTimer=0,this.muzzleFlash&&(this.muzzleFlash.material.opacity=0,Y(this,0)),this.index===r.myPlayerIndex&&(document.getElementById(`crash-msg`).style.display=`none`)}updatePhysics(t){if(this.isCrashed){this.respawnTimer+=.016*t,this.respawnTimer>3&&this.reset();return}let n=this.inputs.pitch,i=this.inputs.roll,a=this.inputs.yaw,o=this.inputs.throttle,s=this.inputs.shoot;this.isLocal&&r.introCinematicActive&&(n=0,i=0,a=0,o=0,s=!1),o===1&&(this.throttle+=.01*t),o===-1&&(this.throttle-=.01*t),this.throttle=Math.max(0,Math.min(1,this.throttle));let c=this.throttle*h*1.45*t;this.speed+=c,z.set(0,0,-1).applyQuaternion(this.mesh.quaternion);let l=z.y;this.speed-=l*.01*t;let f=this.speed*this.speed*.0028*t;this.speed-=f;let p=(Math.abs(this.smoothedPitch)*.005+Math.abs(this.smoothedRoll)*.002+Math.abs(this.smoothedYaw)*.002)*t;if(this.speed-=p,this.speed=Math.max(.1,this.speed),this.speed<.7){this.isStalled=!0;let e=1-this.speed/m;this.mesh.position.y-=.6*e*t,this.mesh.rotateX(-.01*e*t)}else this.isStalled=!1;let _=1-.88**t;this.smoothedPitch=e.MathUtils.lerp(this.smoothedPitch,n,_),this.smoothedRoll=e.MathUtils.lerp(this.smoothedRoll,i,_),this.yawVelocity+=((a-this.smoothedYaw)*.06-this.yawVelocity*.25)*t,this.smoothedYaw+=this.yawVelocity*t;let v=(this.isStalled?g*.4:g)*t;Math.abs(this.smoothedPitch)>.001&&this.mesh.rotateX(this.smoothedPitch*v),Math.abs(this.smoothedRoll)>.001&&this.mesh.rotateZ(this.smoothedRoll*v*6),(Math.abs(this.smoothedYaw)>.001||Math.abs(this.yawVelocity)>5e-4)&&(this.mesh.rotateY(this.smoothedYaw*v*.15),this.mesh.translateX((this.smoothedYaw*.06+this.yawVelocity*1.2)*t)),this.mesh.translateZ(-this.speed*t);let y=Date.now();if(this.isReloading&&y-this.reloadTimerStart>=this.reloadTime&&(this.isReloading=!1,this.currentAmmo=this.maxAmmo),this.isFiring=!this.isReloading&&s,this.isFiring&&y-this.lastShot>80){this.lastShot=y,this.currentAmmo--,this.currentAmmo<=0&&(this.isReloading=!0,this.reloadTimerStart=y),z.set(0,0,-4).applyMatrix4(this.mesh.matrixWorld);let e=Pt();e&&(e.activate(this.index,z,this.mesh.quaternion,this.speed,this.isLocal||r.isHost&&this.isAI),this.flashTimer=.1,this.muzzleFlash&&(this.muzzleFlash.material.opacity=.8,Y(this,150),this.muzzleFlash.rotation.z=Math.random()*Math.PI),L.playShoot(this.mesh.position))}let b=!1;if(this.mesh.position.y<d.waterLevel-5)b=!0;else if(this.mesh.position.y<at(this.mesh.position.x,this.mesh.position.z)){let e=st(this.mesh.position.x,this.mesh.position.z);this.mesh.position.y<e+2&&(b=!0)}if(!b&&r.treeGridDim>0){let e=Math.floor((this.mesh.position.x+d.width/2)/400),t=Math.floor((this.mesh.position.z+d.width/2)/400);for(let n=-1;n<=1;n++){for(let i=-1;i<=1;i++){let a=e+n,o=t+i;if(a>=0&&a<r.treeGridDim&&o>=0&&o<r.treeGridDim){let e=u[o*r.treeGridDim+a];for(let t=0;t<e.length;t++){let n=e[t];if(this.mesh.position.y<n.y+n.h&&this.mesh.position.y>n.y){let e=this.mesh.position.x-n.x,t=this.mesh.position.z-n.z;if(e*e+t*t<n.rSq){b=!0;break}}}}if(b)break}if(b)break}}b&&this.takeDamage(100,-1)}syncData(t){if(r.isHost||(this.kills=t.k||0,this.deaths=t.d||0),t.spawned!==void 0&&(this.isSpawned=t.spawned),this.index!==r.myPlayerIndex&&(t.crashed&&!this.isCrashed&&(this.lastAttackerName=t.killer,this.explode()),!t.crashed&&this.isCrashed&&this.reset(),this.hp=t.hp,t.pos&&t.quat)){let n=Date.now();if(this.positionBuffer.length>0){let e=this.positionBuffer[this.positionBuffer.length-1].timestamp;n<=e&&(n=e+1)}let r;this.positionBuffer.length>=20?(r=this.positionBuffer.shift(),r.timestamp=n,r.pos.set(t.pos.x,t.pos.y,t.pos.z),r.quat.set(t.quat.x===void 0?t.quat._x:t.quat.x,t.quat.y===void 0?t.quat._y:t.quat.y,t.quat.z===void 0?t.quat._z:t.quat.z,t.quat.w===void 0?t.quat._w:t.quat.w),r.spd=t.spd,r.throt=t.throt,r.shoot=t.shoot):r={timestamp:n,pos:new e.Vector3(t.pos.x,t.pos.y,t.pos.z),quat:new e.Quaternion(t.quat.x===void 0?t.quat._x:t.quat.x,t.quat.y===void 0?t.quat._y:t.quat.y,t.quat.z===void 0?t.quat._z:t.quat.z,t.quat.w===void 0?t.quat._w:t.quat.w),spd:t.spd,throt:t.throt,shoot:t.shoot},this.positionBuffer.push(r)}}interpolatePosition(){if(this.isCrashed)return;let t=Date.now()-75;if(this.positionBuffer.length===0)this.isShooting=!1;else{for(;this.positionBuffer.length>=2&&this.positionBuffer[1].timestamp<=t;)this.positionBuffer.shift();if(this.positionBuffer.length>=2){if(this.positionBuffer[0].timestamp<=t&&this.positionBuffer[1].timestamp>=t){let n=this.positionBuffer[0],r=this.positionBuffer[1],i=r.timestamp-n.timestamp,a=t-n.timestamp,o=0;o=i>0?a/i:1,this.mesh.position.lerpVectors(n.pos,r.pos,o),this.mesh.quaternion.slerpQuaternions(n.quat,r.quat,o),this.speed=e.MathUtils.lerp(n.spd,r.spd,o),this.throttle=e.MathUtils.lerp(n.throt,r.throt,o),this.isShooting=r.shoot,this.hasInitialSnap=!0}}else if(this.positionBuffer.length===1){let e=this.positionBuffer[0];this.hasInitialSnap?(this.isShooting=e.shoot,t-e.timestamp>150&&(this.isShooting=!1)):(this.mesh.position.copy(e.pos),this.mesh.quaternion.copy(e.quat),this.isShooting=e.shoot,this.hasInitialSnap=!0)}}}updateVisuals(e){if(!this.isLocal){if(this.isSpawned)this.mesh.visible=!this.isCrashed;else{this.mesh.visible=!1,this.engineSound.stop();return}if(this.isShooting&&!this.isCrashed){let e=Date.now();if(e-this.lastShot>80){this.lastShot=e,L.playShoot(this.mesh.position),this.flashTimer=.1,this.muzzleFlash&&(this.muzzleFlash.material.opacity=.8,Y(this,150),this.muzzleFlash.rotation.z=Math.random()*Math.PI),z.set(0,0,-4).applyMatrix4(this.mesh.matrixWorld);let t=Pt();t&&t.activate(this.index,z,this.mesh.quaternion,this.speed,!1)}}}if(this.flashTimer>0&&(this.flashTimer-=.016*e,this.flashTimer<=0?(this.flashTimer=0,this.muzzleFlash&&(this.muzzleFlash.material.opacity=0,Y(this,0))):this.muzzleFlash&&(this.muzzleFlash.material.opacity=.8,Y(this,150))),this.propeller&&!this.isCrashed&&(this.propeller.rotation.z+=(.3+this.speed*.5)*e),this.isCrashed?this.engineSound.stop():this.engineSound.update(this.speed,this.throttle,this.mesh.position),!this.isCrashed&&this.speed>.5&&(this.hp<=75&&Math.random()>.4&&(z.set(3.5,0,.5),this.createTrail(13421772,.4,.5,z),this.createTrail(15658734,.3,.3,z)),this.hp<=50&&this.hp>25?Math.random()>.2&&(z.set(0,0,6.5),this.createTrail(4473924,.8,.7,z)):this.hp<=25&&(z.set(0,0,6.5),Math.random()>.1&&this.createTrail(1118481,1,.9,z),Math.random()>.6&&this.createTrail(16737792,.5,.8,z,!0))),!this.isCrashed&&this.speed>.8){let e=Math.abs(this.smoothedPitch)*1.5+Math.abs(this.smoothedRoll)*1;if(e>.6){let t=Math.min(.6,(e-.6)*.4);this.createVortex(t)}}if(!this.isCrashed&&this.speed>.6){let e=this.mesh.position.y-d.waterLevel;if(e<12&&e>-5&&st(this.mesh.position.x,this.mesh.position.z)<=d.waterLevel+1){let t=Math.max(0,1-e/12),n=Math.floor(t*3)+1;for(let e=0;e<n;e++)this.createWaterSpray(t*.6)}}for(let t=this.trailParticles.length-1;t>=0;t--){let n=this.trailParticles[t];n.userData.isFlame?(n.userData.life-=.06*e,n.scale.multiplyScalar(1-.05*e)):(n.userData.life-=.02*e,n.userData.isWater?(n.userData.velocity.y-=.15*e,n.scale.multiplyScalar(1+.015*e)):n.scale.multiplyScalar(1+.05*e)),n.position.addScaledVector(n.userData.velocity,e),n.material.opacity=n.userData.life*n.userData.baseOpacity,n.userData.life<=0&&(r.sphereParticlePool.release(n),this.trailParticles[t]=this.trailParticles[this.trailParticles.length-1],this.trailParticles.pop())}}},It=()=>new Promise(e=>setTimeout(e,5)),Lt=e.ShaderChunk.lights_fragment_begin,Rt=e.ShaderChunk.lights_pars_begin,zt=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && defined( USE_CSM ) && defined( CSM_CASCADES )

	// Every directional light in a USE_CSM material is a cascade of the same sun, so
	// exactly one RE_Direct call is made and directionalLights[ 0 ] carries the colour.
	DirectionalLight directionalLight;

	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0

		DirectionalLightShadow directionalLightShadow;

		// Radial, not planar: csmSplits[ i ].y is the radius out to which cascade i was
		// fitted, and length( vViewPosition ) is the fragment's radius. Because the
		// cascades are nested, "radius < limit" is by itself proof the fragment is
		// inside cascade i's shadow map, for any camera orientation.
		float csmRadius = length( vViewPosition );

		// csmRemain is the share of this fragment no nearer cascade has claimed yet, so
		// the nearest (sharpest) cascade that covers the fragment always wins and the
		// weights sum to exactly 1 without a second pass.
		float csmRemain = 1.0;
		float csmShadow = 0.0;

		// Declared out here on purpose: three unrolls the loop below by pasting the body
		// N times into this same scope, so anything declared inside would redeclare.
		float csmAvail;
		float csmWeight;

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			csmAvail = 1.0 - smoothstep( csmSplits[ i ].x, csmSplits[ i ].y, csmRadius );
			csmWeight = csmAvail * csmRemain;

			if ( csmWeight > 0.0 ) {

				directionalLightShadow = directionalLightShadows[ i ];
				csmShadow += csmWeight * getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] );

			}

			csmRemain *= ( 1.0 - csmAvail );

		}
		#pragma unroll_loop_end

		// Past the last cascade nothing is claimed, so csmRemain rises to 1 and the
		// fragment ends up fully lit - the far edge of the shadowed region dissolves
		// over the last cascade's fade band instead of ending on a line.
		csmShadow += csmRemain;

		directionalLight = directionalLights[ 0 ];
		getDirectionalLightInfo( directionalLight, directLight );
		directLight.color *= ( directLight.visible && receiveShadow ) ? csmShadow : 1.0;
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	#else

		directionalLight = directionalLights[ 0 ];
		getDirectionalLightInfo( directionalLight, directLight );
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	#endif

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && !defined( USE_CSM ) && !defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,Bt=`
#if defined( USE_CSM ) && defined( CSM_CASCADES )
uniform vec2 csmSplits[ CSM_CASCADES ];
#endif
`+Rt,Vt=new e.Matrix4,Ht=new e.Matrix4,Z=new e.Vector3,Ut=new e.Vector3,Wt=new e.Vector3,Gt=new e.Vector3,Kt=class{constructor(t){this.camera=t.camera,this.parent=t.parent,this.cascades=t.cascades||3,this.maxFar=t.maxFar||2e4,this.shadowMapSize=t.shadowMapSize||1024,this.lightDirection=new e.Vector3().copy(t.lightDirection).normalize(),this.lightIntensity=t.lightIntensity===void 0?3:t.lightIntensity,this.lightColor=t.lightColor===void 0?new e.Color(16777215):t.lightColor,this.casterHeadroom=t.casterHeadroom===void 0?8e3:t.casterHeadroom,this.blendFraction=t.blendFraction===void 0?.12:t.blendFraction,this.biasTexels=t.biasTexels===void 0?1.5:t.biasTexels,this.normalBiasTexels=t.normalBiasTexels===void 0?1:t.normalBiasTexels,this.limits=[],this.radii=[],this.centerDist=[],this.standoff=[],this.splitUniform=[],this.lights=[],this.shaders=new Map,this.up=Math.abs(this.lightDirection.y)>.999?new e.Vector3(0,0,1):new e.Vector3(0,1,0),this.createLights(),this.updateFrustums(),this.injectInclude()}createLights(){for(let t=0;t<this.cascades;t++){let t=new e.DirectionalLight(this.lightColor,this.lightIntensity);t.castShadow=!0,t.shadow.mapSize.width=this.shadowMapSize,t.shadow.mapSize.height=this.shadowMapSize,t.shadow.camera.up.copy(this.up),t.up.copy(this.up),this.parent.add(t),this.parent.add(t.target),this.lights.push(t),this.splitUniform.push(new e.Vector2)}}computeSplits(){let t=this.camera,n=t.near,r=Math.min(t.far,this.maxFar);this.limits.length=0;for(let t=1;t<=this.cascades;t++){let i=t/this.cascades,a=n+(r-n)*i,o=n*(r/n)**+i;this.limits.push(e.MathUtils.lerp(a,o,.5))}this.limits[this.cascades-1]=r}updateShadowBounds(){let t=this.camera,n=t.near,r=Math.tan(e.MathUtils.degToRad(t.fov*.5)),i=r*t.aspect,a=i*i+r*r;this.radii.length=0,this.centerDist.length=0,this.standoff.length=0;for(let e=0;e<this.cascades;e++){let t=this.limits[e],r=(t*t*(a+1)-n*n)/(2*(t-n)),i=r-n;this.radii.push(i),this.centerDist.push(r),this.standoff.push(i+this.casterHeadroom);let o=this.lights[e],s=o.shadow.camera;s.left=-i,s.right=i,s.top=i,s.bottom=-i,s.near=1,s.far=this.standoff[e]+i,s.updateProjectionMatrix();let c=2*i/this.shadowMapSize,l=s.far-s.near;o.shadow.bias=-(this.biasTexels*c)/l,o.shadow.normalBias=this.normalBiasTexels*c,this.splitUniform[e].set(t*(1-this.blendFraction),t)}}validateSplits(){for(let e=0;e<this.cascades-1;e++){let t=this.limits[e]*(1-this.blendFraction),n=this.limits[e+1]*(1-this.blendFraction);t>=n&&console.warn(`SunShadow: cascade ${e} fades out at ${t.toFixed(0)} but cascade ${e+1} is only at full strength below ${n.toFixed(0)}. Lower blendFraction or add a cascade.`)}}update(){let e=this.camera;Vt.lookAt(Gt,this.lightDirection,this.up),Ht.copy(Vt).transpose();let t=e.matrixWorld.elements;Wt.set(t[12],t[13],t[14]),Ut.set(-t[8],-t[9],-t[10]).normalize();for(let e=0;e<this.cascades;e++){let t=this.lights[e],n=2*this.radii[e]/this.shadowMapSize;Z.copy(Ut).multiplyScalar(this.centerDist[e]).add(Wt),Z.applyMatrix4(Ht),Z.x=Math.floor(Z.x/n)*n,Z.y=Math.floor(Z.y/n)*n,Z.applyMatrix4(Vt),t.target.position.copy(Z),t.position.copy(this.lightDirection).multiplyScalar(-this.standoff[e]).add(Z)}}injectInclude(){e.ShaderChunk.lights_fragment_begin=zt,e.ShaderChunk.lights_pars_begin=Bt}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades;let t=this.shaders,n=this.splitUniform;e.onBeforeCompile=function(r){r.uniforms.csmSplits={value:n},t.set(e,r)},t.set(e,null)}updateUniforms(){let e=this.splitUniform;this.shaders.forEach(function(t){t!==null&&(t.uniforms.csmSplits.value=e)})}updateFrustums(){this.camera.updateProjectionMatrix(),this.computeSplits(),this.updateShadowBounds(),this.validateSplits(),this.updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){this.shaders.forEach(function(e,t){delete t.onBeforeCompile,delete t.defines.USE_CSM,delete t.defines.CSM_CASCADES,e!==null&&delete e.uniforms.csmSplits,t.needsUpdate=!0}),this.shaders.clear(),e.ShaderChunk.lights_fragment_begin=Lt,e.ShaderChunk.lights_pars_begin=Rt}};function qt(){let n=new e.CylinderGeometry(1.5,2.5,12,5);n.translate(0,6,0);let r=[];for(let e=0;e<n.attributes.position.count;e++)r.push(.45,.3,.18);n.setAttribute(`color`,new e.Float32BufferAttribute(r,3));let i=new e.ConeGeometry(9,30,5);i.translate(0,20,0);let a=[];for(let e=0;e<i.attributes.position.count;e++)a.push(.22,.52,.28);return i.setAttribute(`color`,new e.Float32BufferAttribute(a,3)),t.mergeGeometries([n,i])}function Jt(){let n=new e.CylinderGeometry(1.5,2,8,5);n.translate(0,4,0),n=n.toNonIndexed();let r=[];for(let e=0;e<n.attributes.position.count;e++)r.push(.4,.28,.2);n.setAttribute(`color`,new e.Float32BufferAttribute(r,3));let i=new e.IcosahedronGeometry(7,1);i.translate(0,10,0);let a=[];for(let e=0;e<i.attributes.position.count;e++)a.push(.35,.65,.2);return i.setAttribute(`color`,new e.Float32BufferAttribute(a,3)),t.mergeGeometries([n,i])}function Yt(){let t=new e.IcosahedronGeometry(4,0);t.scale(1,.6,1);let n=[];for(let e=0;e<t.attributes.position.count;e++)n.push(.5,.48,.45);return t.setAttribute(`color`,new e.Float32BufferAttribute(n,3)),t}function Xt(){let n=[],r=10+Math.floor(Math.random()*6),i=40+Math.random()*20;for(let t=0;t<r;t++){let t=new e.IcosahedronGeometry(i*(.5+Math.random()*.7),1),r=(Math.random()-.5)*i*4,a=Math.random()*i*.35,o=(Math.random()-.5)*i*4;t.translate(r,a,o);let s=t.attributes.position;for(let e=0;e<s.count;e++)s.getY(e)<-i*.15&&s.setY(e,-i*.15);n.push(t)}return t.mergeGeometries(n)}function Zt(e){if(!r.cloudBaseRadiusSq||l.length===0)return!1;for(let t=0;t<l.length;t++){let n=l[t],i=e.x-n.x,a=e.y-n.y,o=e.z-n.z,s=r.cloudBaseRadiusSq*n.scale*n.scale*.65;if(i*i+a*a+o*o<s)return!0}return!1}function Qt(){let t=new e.WebGLRenderer({antialias:!0,powerPreference:`high-performance`,stencil:!1});return t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.shadowMap.enabled=!0,t.shadowMap.type=e.PCFSoftShadowMap,t.toneMapping=e.ACESFilmicToneMapping,t.toneMappingExposure=1.3,t}var $t=4,Q=null,en=null,tn=null,nn=null,rn=null,an=null,on=null,sn=new e.Color(0),cn=new e.Color;function ln(){let t=new e.Vector2;r.renderer.getDrawingBufferSize(t);let n=Math.max(1,Math.floor(t.x/$t)),i=Math.max(1,Math.floor(t.y/$t)),a={minFilter:e.LinearFilter,magFilter:e.LinearFilter,format:e.RGBAFormat,depthBuffer:!1,stencilBuffer:!1};Q=new e.WebGLRenderTarget(n,i,a),en=new e.WebGLRenderTarget(n,i,a),tn=new e.ShaderMaterial({uniforms:{tDiffuse:{value:null},direction:{value:new e.Vector2(1,0)}},vertexShader:`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position.xy, 0.0, 1.0);
            }
        `,fragmentShader:`
            uniform sampler2D tDiffuse;
            uniform vec2 direction;
            varying vec2 vUv;
            void main() {
                vec3 sum = texture2D(tDiffuse, vUv).rgb * 0.2270270270;
                vec2 o1 = direction * 1.3846153846;
                vec2 o2 = direction * 3.2307692308;
                sum += texture2D(tDiffuse, vUv + o1).rgb * 0.3162162162;
                sum += texture2D(tDiffuse, vUv - o1).rgb * 0.3162162162;
                sum += texture2D(tDiffuse, vUv + o2).rgb * 0.0702702703;
                sum += texture2D(tDiffuse, vUv - o2).rgb * 0.0702702703;
                gl_FragColor = vec4(sum, 1.0);
            }
        `,depthTest:!1,depthWrite:!1}),nn=new e.ShaderMaterial({uniforms:{tDiffuse:{value:Q.texture},strength:{value:.85}},vertexShader:`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position.xy, 0.0, 1.0);
            }
        `,fragmentShader:`
            uniform sampler2D tDiffuse;
            uniform float strength;
            varying vec2 vUv;
            void main() {
                gl_FragColor = vec4(texture2D(tDiffuse, vUv).rgb * strength, 1.0);
            }
        `,blending:e.AdditiveBlending,transparent:!0,depthTest:!1,depthWrite:!1}),an=new e.OrthographicCamera(-1,1,1,-1,0,1),on=new e.Mesh(new e.PlaneGeometry(2,2),tn),on.frustumCulled=!1,rn=new e.Scene,rn.add(on)}function un(){if(!Q)return;let t=new e.Vector2;r.renderer.getDrawingBufferSize(t);let n=Math.max(1,Math.floor(t.x/$t)),i=Math.max(1,Math.floor(t.y/$t));Q.setSize(n,i),en.setSize(n,i)}function dn(e){if(!Q)return;let t=e.layers.mask,n=r.scene.background,i=r.renderer.autoClear;r.renderer.getClearColor(cn);let a=r.renderer.getClearAlpha();r.scene.background=null,e.layers.set(1),r.renderer.setClearColor(sn,0),r.renderer.setRenderTarget(Q),r.renderer.clear(!0,!1,!1),r.renderer.render(r.scene,e),e.layers.mask=t,r.scene.background=n;let o=tn.uniforms.direction.value;on.material=tn,r.renderer.autoClear=!0,tn.uniforms.tDiffuse.value=Q.texture,o.set(1/Q.width,0),r.renderer.setRenderTarget(en),r.renderer.render(rn,an),tn.uniforms.tDiffuse.value=en.texture,o.set(0,1/Q.height),r.renderer.setRenderTarget(Q),r.renderer.render(rn,an),r.renderer.setRenderTarget(null),r.renderer.autoClear=!1,on.material=nn,r.renderer.render(rn,an),on.material=tn,r.renderer.autoClear=i,r.renderer.setClearColor(cn,a)}function fn(e,t){if(e.isCrashed)return;let n=null,i=1/0;for(let t=0;t<a.length;t++){let o=a[t];if(o.index===e.index||o.isCrashed||!(o.isLocal?!r.introCinematicActive:o.isSpawned)||o.disconnected)continue;let s=e.mesh.position.distanceTo(o.mesh.position);s<i&&(i=s,n=o)}let o=1/0,s=null;if(n){let t=e.speed+15;o=i;let r=o/t,a=Zt(e.mesh.position)?v:1;Ee.set(0,0,-1).applyQuaternion(n.mesh.quaternion),De.copy(Ee).multiplyScalar(n.speed),Oe.copy(n.mesh.position).addScaledVector(De,r*a),B.subVectors(Oe,e.mesh.position),ke.copy(B).normalize(),be.copy(e.mesh.quaternion).invert(),s=ke.applyQuaternion(be);let c=0;Math.abs(s.x)>.01&&(c=-s.x*4),e.inputs.roll=Math.max(-1,Math.min(1,c));let l=s.y*3;s.z>0&&(l=1,Math.abs(s.x)<.2&&(e.inputs.roll=1)),e.inputs.pitch=Math.max(-1,Math.min(1,l)),e.inputs.shoot=s.z<0&&s.x*s.x+s.y*s.y<.08*a&&o<800+700*a}else e.inputs.pitch=0,e.inputs.roll=.1,e.inputs.shoot=!1;je.set(0,0,-1).applyQuaternion(e.mesh.quaternion),Me.copy(e.mesh.position).addScaledVector(je,450);let c=Qe(Me.x,Me.z),l=Qe(e.mesh.position.x,e.mesh.position.z),u=Math.max(c,l)+150;e.mesh.position.y<u?(e.inputs.pitch=1,be.copy(e.mesh.quaternion).invert(),Ae.set(0,1,0).applyQuaternion(be),e.inputs.roll=-Ae.x*4,e.inputs.throttle=1,e.inputs.shoot=!1):e.speed<1.1?e.inputs.throttle=1:e.speed>2?e.inputs.throttle=-1:n&&s&&s.z<0?o>800?e.inputs.throttle=1:o<300?e.inputs.throttle=-1:e.inputs.throttle=0:e.inputs.throttle=0}var pn=new e.Clock,mn=0,hn=225,gn=[];function _n(e){return e.isCrashed||e.disconnected?!1:e.isLocal?!r.introCinematicActive:e.isSpawned}function vn(e){return e.isLocal||r.isHost&&e.isAI}function yn(){if(requestAnimationFrame(yn),!r.gameActive)return;let e=pn.getDelta(),t=Math.min(e,.1)*60,n=pn.getElapsedTime();if(c.length>0&&c[0].material.userData.shader&&(c[0].material.userData.shader.uniforms.time.value=n),r.cloudInstancedMesh){let t=Math.min(e,.1);for(let e=0;e<l.length;e++){let n=l[e];n.x-=n.speed*t,n.x<-d.width/2&&(n.x=d.width/2),Ne.position.set(n.x,n.y,n.z),Ne.scale.setScalar(n.scale),Ne.rotation.set(0,0,0),Ne.updateMatrix(),r.cloudInstancedMesh.setMatrixAt(e,Ne.matrix)}r.cloudInstancedMesh.instanceMatrix.needsUpdate=!0}let o=r.localPlayer;for(let e=0;e<a.length;e++){let n=a[e];n.disconnected||(n.index===r.myPlayerIndex?n.updatePhysics(t):n.isAI&&r.isHost?(fn(n,t),n.updatePhysics(t)):n.interpolatePosition(),n.updateVisuals(t))}gn.length=0;for(let e=0;e<a.length;e++){let t=a[e];if(_n(t))for(let n=e+1;n<a.length;n++){let e=a[n];_n(e)&&(t.mesh.position.distanceToSquared(e.mesh.position)>=hn||(vn(t)&&gn.indexOf(t)===-1&&gn.push(t),vn(e)&&gn.indexOf(e)===-1&&gn.push(e)))}}for(let e=0;e<gn.length;e++){let t=gn[e];t.diedByCollision=!0,t.die(-1)}for(let e=0;e<X.length;e++){let n=X[e];if(n.isActive){if(!n.update(t))n.hitType===`water`?(s.push(new vt(n.mesh.position)),L.playBulletWaterHit(n.mesh.position)):n.hitType===`dirt`?(s.push(new yt(n.mesh.position)),L.playBulletDirtHit(n.mesh.position)):n.life>0&&n.hitType!==`timeout`&&(s.push(new _t(n.mesh.position,16776960)),L.playExplosion(n.mesh.position)),n.deactivate();else if(n.ownerIdx===r.myPlayerIndex||n.isLocalOrHostAI)for(let e=0;e<a.length;e++){let t=a[e],i=t.isLocal?!r.introCinematicActive:t.isSpawned;if(t.index!==n.ownerIdx&&!t.isCrashed&&i&&!t.disconnected&&n.mesh.position.distanceTo(t.mesh.position)<12){s.push(new _t(n.mesh.position,16755200)),L.playExplosion(n.mesh.position),n.deactivate();let e={type:`HIT_EVENT`,targetIdx:t.index,attackerIdx:n.ownerIdx,dmg:15};if(r.isHost){r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:e});let i=null;for(let e=0;e<a.length;e++)if(a[e].index===t.index){i=a[e];break}i&&(i.index===r.myPlayerIndex||i.isAI)&&i.takeDamage(e.dmg,n.ownerIdx)}else r.socket.emit(`client_send`,{roomCode:r.myRoomCode,data:e});break}}}}for(let e=s.length-1;e>=0;e--)s[e].update(t)||(s[e].dispose(),s[e]=s[s.length-1],s.pop());if(o&&o.mesh){o.mesh.updateMatrixWorld(),R.lookBack?z.set(0,6,-25).applyMatrix4(o.mesh.matrixWorld):z.set(0,6,18).applyMatrix4(o.mesh.matrixWorld);let n=1-.8**t;if(o.virtualChasePos?o.virtualChasePos.lerp(z,n):o.virtualChasePos=z.clone(),r.introCinematicActive){r.introCinematicTime+=e;let n=r.introCinematicTime/_;n>=1&&(n=1,r.introCinematicActive=!1,r.introWireframeMesh.visible=!1,o.camera.clearViewOffset(),o.camera.fov=60,o.camera.updateProjectionMatrix(),o.mesh.children.forEach(e=>{e!==r.introWireframeMesh&&e!==o.muzzleFlash&&e.traverse(e=>{if(e.isMesh&&e.material){let t=e.material.userData.introBase;e.material.opacity=t?t.opacity:1,e.material.transparent=t?t.transparent:!1,e.material.depthWrite=!t||t.depthWrite}})}));let a=Math.min(Math.max(n/.6,0),1),s=Math.min(Math.max((n-.6)/.2,0),1),c=Math.min(Math.max((n-.8)/.2,0),1),l=a<.5?4*a*a*a:1-(-2*a+2)**3/2;r.introWireframeMesh.quaternion.slerpQuaternions(r.initialWireframeQuat,i,l),r.introWireframeMesh.propeller&&(r.introWireframeMesh.propeller.rotation.z+=(.3+o.speed*.5)*t),ne().uniforms.shrinkFactor.value=c,ne().uniforms.opacity.value=.35,o.mesh.children.forEach(e=>{e!==r.introWireframeMesh&&e!==o.muzzleFlash&&e.traverse(e=>{if(e.isMesh&&e.material){let t=e.material.userData.introBase;e.material.opacity=s*(t?t.opacity:1)}})}),V.position.set(-10,7,-8),V.lookAt(0,0,0),V.translateX(-2.4),Pe.copy(V.position).applyMatrix4(o.mesh.matrixWorld);let u=Pe.lerp(o.virtualChasePos,l);o.camera.position.copy(u),z.set(0,0,-10).applyQuaternion(V.quaternion),Fe.copy(V.position).add(z),Fe.applyMatrix4(o.mesh.matrixWorld),Ie.set(0,0,-30).applyMatrix4(o.mesh.matrixWorld),Fe.lerp(Ie,l),o.camera.lookAt(Fe);let d=.75+.25*l;r.introWireframeMesh.scale.set(d,d,d),o.camera.fov=45+15*l,o.camera.updateProjectionMatrix(),r.csm&&r.csm.updateFrustums();let f=window.innerWidth,p=window.innerHeight,m=-.15*f*(1-l);Math.abs(m)<.5?o.camera.clearViewOffset():o.camera.setViewOffset(f,p,m,0,f,p)}else o.camera.position.copy(o.virtualChasePos),R.lookBack?B.set(0,0,30).applyMatrix4(o.mesh.matrixWorld):B.set(0,0,-30).applyMatrix4(o.mesh.matrixWorld),o.camera.lookAt(B);let a=performance.now();if(F.listener.positionX&&a>=mn){mn=a+33;let e=o.camera.position,t=o.camera.quaternion;Le.set(0,0,-1).applyQuaternion(t),Re.set(0,1,0).applyQuaternion(t);let n=F.currentTime;F.listener.positionX.setTargetAtTime(e.x,n,.1),F.listener.positionY.setTargetAtTime(e.y,n,.1),F.listener.positionZ.setTargetAtTime(e.z,n,.1),F.listener.forwardX.setTargetAtTime(Le.x,n,.1),F.listener.forwardY.setTargetAtTime(Le.y,n,.1),F.listener.forwardZ.setTargetAtTime(Le.z,n,.1),F.listener.upX.setTargetAtTime(Re.x,n,.1),F.listener.upY.setTargetAtTime(Re.y,n,.1),F.listener.upZ.setTargetAtTime(Re.z,n,.1)}let s=!1,c=o.camera.position;xe.set(c,we);let u=0,d=xe.ray.direction;for(let e=0;e<l.length;e++){let t=l[e],n=c.x-t.x,i=c.y-t.y,a=c.z-t.z;if(!(n*n+i*i+a*a>=r.cloudBaseRadiusSq*t.scale*t.scale*1.5)){r.cloudInstancedMesh.getMatrixAt(e,Se),r.cloudRaycastMesh.matrixWorld.copy(Se),Ce.getNormalMatrix(Se),Te.length=0,xe.intersectObject(r.cloudRaycastMesh,!1,Te);for(let e=0;e<Te.length;e++){let t=Te[e];if(!t.face)continue;z.copy(t.face.normal).applyMatrix3(Ce).normalize();let n=d.dot(z);n>1e-4?--u:n<-1e-4&&(u+=1)}}}s=u!==0,s!==U.cloudWhiteout&&(H.cloudWhiteoutStyle.display=s?`block`:`none`,U.cloudWhiteout=s),Ve(o),ct(),o.camera.updateMatrixWorld(),r.boxParticlePool.commit(o.camera),r.sphereParticlePool.commit(o.camera),r.csm&&r.csm.update(),r.renderer.render(r.scene,o.camera),dn(o.camera)}}function bn(){let e=window.innerWidth,t=window.innerHeight;r.renderer&&r.renderer.setSize(e,t),un(),N();let n=r.localPlayer;n&&(n.camera.aspect=e/t,n.camera.updateProjectionMatrix(),r.csm&&r.csm.updateFrustums())}var xn=`
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { SimplexNoise } from 'https://unpkg.com/three@0.160.0/examples/jsm/math/SimplexNoise.js';

function createSeededRNG(seed) {
    let rng = seed % 233280;
    return {
        random: function () {
            rng = (rng * 9301 + 49297) % 233280;
            return rng / 233280;
        }
    };
}

function smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
}

self.onmessage = function(e) {
    const { CONFIG, mapSeed, TREE_GRID_SIZE } = e.data;
    const simplex = new SimplexNoise(createSeededRNG(mapSeed));

    function getTerrainHeight(x, z) {
        const nx = x / 6000;
        const nz = z / 6000;

        let continentRaw = simplex.noise(nx * 0.5 + mapSeed, nz * 0.5 + mapSeed) * 0.5 + 0.5;
        let continent = smoothstep(0.1, 0.6, continentRaw);
        let inland = smoothstep(0.4, 0.9, continentRaw);

        let ridge = 0;
        let rFreq = 1.0;
        let rAmp = 1.0;
        let rWeight = 1.0;
        for (let i = 0; i < 4; i++) {
            let n = 1.0 - Math.abs(simplex.noise(nx * rFreq * 1.2 + 10, nz * rFreq * 1.2 + 10));
            n = n * n;
            ridge += n * rAmp * rWeight;
            rWeight = Math.max(0.15, n * 1.5);
            rFreq *= 2.0;
            rAmp *= 0.4;
        }
        ridge = ridge / (1.0 + ridge * 0.3);

        let mSteps = 10.0;
        let warp = simplex.noise(nx * 8.0, nz * 8.0) * 0.04;
        let wRidge = ridge + warp;
        
        let rVal = wRidge * mSteps;
        let rFloor = Math.floor(rVal);
        let rFract = rVal - rFloor;
        
        let tilt = rFract * 0.35; 
        let riser = smoothstep(0.5, 1.0, rFract) * 0.65; 
        let mTerraced = (rFloor + tilt + riser) / mSteps;
        
        ridge = THREE.MathUtils.lerp(ridge, mTerraced, 0.7) * 900;

        let plateau = simplex.noise(nx * 2.0 + 50, nz * 2.0 + 50) * 0.5 + 0.5;
        
        let pSteps = 6.0;
        let pWarp = simplex.noise(nx * 6.0 + 20, nz * 6.0 + 20) * 0.05;
        let wPlateau = plateau + pWarp;

        let pVal = wPlateau * pSteps;
        let pFloor = Math.floor(pVal);
        let pFract = pVal - pFloor;

        let pTilt = pFract * 0.25;
        let pRiser = smoothstep(0.6, 1.0, pFract) * 0.75;
        let pTerraced = (pFloor + pTilt + pRiser) / pSteps;
        
        let mesa = THREE.MathUtils.lerp(plateau, pTerraced, 0.8) * 350;

        let hills = (simplex.noise(nx * 3.0 + 100, nz * 3.0 + 100) * 0.5 + 0.5) * 200;
        let foothills = hills + (simplex.noise(nx * 1.5 + 400, nz * 1.5 + 400) * 0.5 + 0.5) * 350;

        let biomeSelector = simplex.noise(nx * 0.8 + 200, nz * 0.8 + 200);

        let landHeight = 0;
        if (biomeSelector > 0.05) {
            let foothillTransition = smoothstep(0.05, 0.35, biomeSelector);
            let mountainTransition = smoothstep(0.25, 0.6, biomeSelector);
            
            let baseTerrain = THREE.MathUtils.lerp(hills, foothills, foothillTransition);
            
            let easedMountainTransition = Math.pow(mountainTransition, 1.8);
            
            landHeight = THREE.MathUtils.lerp(baseTerrain, ridge, easedMountainTransition);
        } else if (biomeSelector < -0.15) {
            let t = smoothstep(-0.15, -0.45, biomeSelector);
            landHeight = THREE.MathUtils.lerp(hills, mesa, t);
        } else {
            landHeight = hills;
        }

        landHeight = THREE.MathUtils.lerp(hills, landHeight, inland);

        let canyonNoise = Math.abs(simplex.noise(nx * 1.5 + 300, nz * 1.5 + 300));
        let canyonEdge = THREE.MathUtils.lerp(0.15, 0.45, smoothstep(200, 600, landHeight));
        let canyonMask = smoothstep(0.02, canyonEdge, canyonNoise);

        let canyonFade = smoothstep(300, 650, landHeight);
        canyonMask = THREE.MathUtils.lerp(canyonMask, 1.0, canyonFade);

        let canyonFloor = THREE.MathUtils.lerp(CONFIG.waterLevel - 20, 300, smoothstep(200, 800, landHeight));

        landHeight = THREE.MathUtils.lerp(canyonFloor, landHeight, canyonMask);

        let finalHeight = THREE.MathUtils.lerp(CONFIG.waterLevel - 80, landHeight, continent);

        let detail = simplex.noise(nx * 10.0, nz * 10.0) * 6.0;
        finalHeight += detail * canyonMask;

        return Math.max(CONFIG.waterLevel - 60, finalHeight);
    }

    self.postMessage({ status: 'GENERATING TERRAIN (1/3)...' });
    let geometry = new THREE.PlaneGeometry(CONFIG.width, CONFIG.width, CONFIG.segments, CONFIG.segments);
    geometry.rotateX(-Math.PI / 2);

    const gPos = geometry.attributes.position;
    const segmentSize = CONFIG.width / CONFIG.segments;

    for (let i = 0; i < gPos.count; i++) {
        let vx = gPos.getX(i);
        let vz = gPos.getZ(i);
        const jitterLimit = segmentSize * 0.45;
        vx += simplex.noise(vx * 0.05, vz * 0.05) * jitterLimit;
        vz += simplex.noise(vx * 0.05 + 100, vz * 0.05 + 100) * jitterLimit;
        gPos.setX(i, vx);
        gPos.setZ(i, vz);
        gPos.setY(i, getTerrainHeight(vx, vz));
    }

    // Shore map. The water surface is only 100 segments across 14km, so a river is
    // one or two vertices wide, and anything driven off a per-vertex depth snaps to
    // that grid. The shader instead samples this map per fragment.
    //
    // Bed heights are captured here, while they are still a regular (segments+1)^2
    // lattice - before toNonIndexed() shreds the geometry into a triangle soup - so
    // this reuses heights that were just computed and evaluates no extra noise.
    //
    // R = depth below the surface over SHORE_RANGE. The generator floors the bed at
    // waterLevel - 60, so that range covers every depth that exists.
    // G = distance out from the waterline over SHORE_DIST_RANGE, which is what the
    // foam band is measured in. RGBA rather than a packed two-channel format so the
    // rows stay 4-byte aligned on upload.
    const SHORE_RANGE = 60;
    const SHORE_DIST_RANGE = 320;
    const SHORE_TEX = 1024;
    const srcDim = CONFIG.segments + 1;

    const srcHeight = new Float32Array(srcDim * srcDim);
    for (let i = 0; i < gPos.count; i++) srcHeight[i] = gPos.getY(i);

    // Resampled up from the 40-unit terrain lattice to ~13.7 units. The foam band is
    // a few dozen units wide, so at 40 units the lattice and the feature were the
    // same size and every artefact in the field showed up as shape in the band.
    // Bilinear upsampling adds no noise evaluations, and the vertex jitter it ignores
    // is itself simplex-driven - a smooth, low-frequency offset rather than
    // high-frequency error.
    const shoreDepth = new Float32Array(SHORE_TEX * SHORE_TEX);
    const srcStep = (srcDim - 1) / (SHORE_TEX - 1);
    for (let y = 0; y < SHORE_TEX; y++) {
        const gy = y * srcStep;
        const y0 = Math.min(srcDim - 2, gy | 0);
        const fy = gy - y0;
        for (let x = 0; x < SHORE_TEX; x++) {
            const gx = x * srcStep;
            const x0 = Math.min(srcDim - 2, gx | 0);
            const fx = gx - x0;
            const i00 = y0 * srcDim + x0;
            const top = srcHeight[i00] * (1 - fx) + srcHeight[i00 + 1] * fx;
            const bot = srcHeight[i00 + srcDim] * (1 - fx) + srcHeight[i00 + srcDim + 1] * fx;
            shoreDepth[y * SHORE_TEX + x] = CONFIG.waterLevel - (top * (1 - fy) + bot * fy);
        }
    }

    // Exact Euclidean distance transform (Felzenszwalb & Huttenlocher). The previous
    // chamfer approximation stepped only orthogonally and diagonally, so its contours
    // were octagons - which is what put angular white wedges on every headland and
    // river bend. This computes true Euclidean distance, so an offset from the
    // waterline is an actual offset curve.
    const EDT_INF = 1e20;
    const sqDist = new Float32Array(SHORE_TEX * SHORE_TEX);
    for (let i = 0; i < sqDist.length; i++) {
        sqDist[i] = shoreDepth[i] > 0 ? EDT_INF : 0;
    }

    const edtF = new Float32Array(SHORE_TEX);
    const edtD = new Float32Array(SHORE_TEX);
    const edtV = new Int32Array(SHORE_TEX);
    const edtZ = new Float32Array(SHORE_TEX + 1);

    function edt1d(n) {
        let k = 0;
        edtV[0] = 0;
        edtZ[0] = -EDT_INF;
        edtZ[1] = EDT_INF;
        for (let q = 1; q < n; q++) {
            let s = ((edtF[q] + q * q) - (edtF[edtV[k]] + edtV[k] * edtV[k])) / (2 * q - 2 * edtV[k]);
            while (s <= edtZ[k]) {
                k--;
                s = ((edtF[q] + q * q) - (edtF[edtV[k]] + edtV[k] * edtV[k])) / (2 * q - 2 * edtV[k]);
            }
            k++;
            edtV[k] = q;
            edtZ[k] = s;
            edtZ[k + 1] = EDT_INF;
        }
        k = 0;
        for (let q = 0; q < n; q++) {
            while (edtZ[k + 1] < q) k++;
            const dq = q - edtV[k];
            edtD[q] = dq * dq + edtF[edtV[k]];
        }
    }

    for (let x = 0; x < SHORE_TEX; x++) {
        for (let y = 0; y < SHORE_TEX; y++) edtF[y] = sqDist[y * SHORE_TEX + x];
        edt1d(SHORE_TEX);
        for (let y = 0; y < SHORE_TEX; y++) sqDist[y * SHORE_TEX + x] = edtD[y];
    }
    for (let y = 0; y < SHORE_TEX; y++) {
        const row = y * SHORE_TEX;
        for (let x = 0; x < SHORE_TEX; x++) edtF[x] = sqDist[row + x];
        edt1d(SHORE_TEX);
        for (let x = 0; x < SHORE_TEX; x++) sqDist[row + x] = edtD[x];
    }

    const shoreCell = CONFIG.width / (SHORE_TEX - 1);
    const shoreDim = SHORE_TEX;
    const shoreMap = new Uint8Array(SHORE_TEX * SHORE_TEX * 4);
    for (let i = 0; i < SHORE_TEX * SHORE_TEX; i++) {
        const dep = Math.max(0, Math.min(1, shoreDepth[i] / SHORE_RANGE));
        const dst = Math.max(0, Math.min(1, (Math.sqrt(sqDist[i]) * shoreCell) / SHORE_DIST_RANGE));
        shoreMap[i * 4] = dep * 255;
        shoreMap[i * 4 + 1] = dst * 255;
        shoreMap[i * 4 + 3] = 255;
    }

    self.postMessage({ status: 'GENERATING TERRAIN (2/3)...' });
    geometry.computeVertexNormals();
    geometry = geometry.toNonIndexed();
    geometry.computeVertexNormals();

    self.postMessage({ status: 'GENERATING TERRAIN (3/3)...' });
    const niPos = geometry.attributes.position;
    const niNorm = geometry.attributes.normal;
    const colors = new Float32Array(niPos.count * 3);
    const colorObj = new THREE.Color();

    for (let i = 0; i < niPos.count; i += 3) {
        const y0 = niPos.getY(i);
        const y1 = niPos.getY(i + 1);
        const y2 = niPos.getY(i + 2);
        const avgY = (y0 + y1 + y2) / 3;

        const ny = niNorm.getY(i);
        const slope = 1.0 - ny;
        const rv = simplex.noise(niPos.getX(i) * 0.01, niPos.getZ(i) * 0.01);

        if (avgY < CONFIG.waterLevel + 15 && slope < 0.15) {
            colorObj.setHex(0xdec98a);
            if (rv > 0.5) colorObj.setHex(0xe8d9a0);
            if (rv < -0.3) colorObj.setHex(0xd4bc74);
        } else if (avgY > 450 && slope < 0.5) {
            colorObj.setHex(0xf0eef8);
            if (rv > 0.3) colorObj.setHex(0xe8e6f0);
        } else if (slope > 0.55 || (avgY > 300 && slope > 0.4)) {
            colorObj.setHex(0x8a7e72);
            if (rv > 0) colorObj.setHex(0x7d6f63);
            if (rv < -0.3) colorObj.setHex(0x968a7e);
        } else if (slope > 0.35 && avgY < 300) {
            colorObj.setHex(0x9e8a6a);
            if (rv > 0.3) colorObj.setHex(0x8b7858);
        } else {
            if (avgY < 120) {
                colorObj.setHex(0x5da04a);
                if (rv > 0.3) colorObj.setHex(0x6db85a);
                if (rv < -0.3) colorObj.setHex(0x4e9040);
            } else if (avgY < 250) {
                colorObj.setHex(0x4a8838);
                if (rv > 0.3) colorObj.setHex(0x3d7830);
                if (rv < -0.3) colorObj.setHex(0x559845);
            } else {
                colorObj.setHex(0x7aaa55);
                if (rv > 0.3) colorObj.setHex(0x6d9a4a);
                if (rv < -0.3) colorObj.setHex(0x88b862);
            }
        }
        colors[i * 3] = colorObj.r;
        colors[i * 3 + 1] = colorObj.g;
        colors[i * 3 + 2] = colorObj.b;

        colors[(i + 1) * 3] = colorObj.r;
        colors[(i + 1) * 3 + 1] = colorObj.g;
        colors[(i + 1) * 3 + 2] = colorObj.b;

        colors[(i + 2) * 3] = colorObj.r;
        colors[(i + 2) * 3 + 1] = colorObj.g;
        colors[(i + 2) * 3 + 2] = colorObj.b;
    }

    self.postMessage({ status: 'PLANTING FORESTS...' });
    
    const MAX_PINE = CONFIG.treeCount;
    const MAX_DECID = CONFIG.treeCount;
    const MAX_ROCK = 5000;

    const pineData = new Float32Array(MAX_PINE * 6);
    const decidData = new Float32Array(MAX_DECID * 6);
    const rockData = new Float32Array(MAX_ROCK * 6);

    let pineCount = 0;
    let decidCount = 0;
    let rockCount = 0;

    let rngT = mapSeed;
    const myRandom = () => { rngT = (rngT * 9301 + 49297) % 233280; return rngT / 233280; };
    
    const totalAttempts = CONFIG.treeCount * 4;
    for (let i = 0; i < totalAttempts; i++) {
        const x = (myRandom() - 0.5) * CONFIG.width;
        const z = (myRandom() - 0.5) * CONFIG.width;
        const y = getTerrainHeight(x, z);
        const y1 = getTerrainHeight(x + 5, z);
        const y2 = getTerrainHeight(x, z + 5);
        const slope = Math.sqrt(Math.pow(y - y1, 2) + Math.pow(y - y2, 2));

        if (y > CONFIG.waterLevel + 8) {
            const clumpNoise = simplex.noise(x * 0.002, z * 0.002);
            const scale = 0.8 + myRandom() * 1.0;
            const rot = myRandom() * Math.PI * 2;

            if (slope > 0.4 && y < 500) {
                if (rockCount < MAX_ROCK && myRandom() > 0.5) {
                    rockData[rockCount*6] = x; rockData[rockCount*6+1] = y - 1; rockData[rockCount*6+2] = z;
                    rockData[rockCount*6+3] = scale * 1.5; rockData[rockCount*6+4] = scale * 1.5; rockData[rockCount*6+5] = rot;
                    rockCount++;
                }
            }
            else if (slope < 0.3 && y < 350) {
                if (clumpNoise > 0.2) {
                    if (pineCount + decidCount < CONFIG.treeCount) {
                        const scaleY = scale * (0.8 + myRandom() * 0.4);
                        if (y < 200 && myRandom() > 0.3) {
                            decidData[decidCount*6] = x; decidData[decidCount*6+1] = y - 1; decidData[decidCount*6+2] = z;
                            decidData[decidCount*6+3] = scale; decidData[decidCount*6+4] = scaleY; decidData[decidCount*6+5] = rot;
                            decidCount++;
                        } else {
                            pineData[pineCount*6] = x; pineData[pineCount*6+1] = y - 1; pineData[pineCount*6+2] = z;
                            pineData[pineCount*6+3] = scale; pineData[pineCount*6+4] = scaleY; pineData[pineCount*6+5] = rot;
                            pineCount++;
                        }
                    }
                }
            }
        }
    }

    const posArray = niPos.array;
    const normArray = niNorm.array;
    
    const pSlice = pineData.slice(0, pineCount * 6);
    const dSlice = decidData.slice(0, decidCount * 6);
    const rSlice = rockData.slice(0, rockCount * 6);

    self.postMessage({
        done: true,
        positions: posArray,
        normals: normArray,
        colors: colors,
        pineData: pSlice,
        decidData: dSlice,
        rockData: rSlice,
        shoreMap: shoreMap,
        shoreDim: shoreDim,
        shoreRange: SHORE_RANGE,
        shoreDistRange: SHORE_DIST_RANGE,
        pineCount, decidCount, rockCount
    }, [
        posArray.buffer,
        normArray.buffer,
        colors.buffer,
        pSlice.buffer,
        dSlice.buffer,
        rSlice.buffer,
        shoreMap.buffer
    ]);
};
`;async function Sn(e){e.mesh.updateMatrixWorld(),V.position.set(-10,7,-8),V.lookAt(0,0,0),V.translateX(-2.4),Pe.copy(V.position).applyMatrix4(e.mesh.matrixWorld),e.camera.position.copy(Pe),z.set(0,0,-10).applyQuaternion(V.quaternion),Fe.copy(V.position).add(z).applyMatrix4(e.mesh.matrixWorld),e.camera.lookAt(Fe),e.camera.fov=45,e.camera.updateProjectionMatrix(),e.camera.updateMatrixWorld(),r.csm&&(r.csm.updateFrustums(),r.csm.update()),r.renderer.compileAsync?await r.renderer.compileAsync(r.scene,e.camera):r.renderer.compile(r.scene,e.camera),r.renderer.render(r.scene,e.camera),dn(e.camera),await new Promise(e=>requestAnimationFrame(e)),r.csm&&r.csm.update(),r.renderer.render(r.scene,e.camera),dn(e.camera)}async function Cn(t,n){console.group(`Initializing Game`),ze();let i=document.getElementById(`bake-status-text`);n&&Xe(Je(n)),r.renderer=Qt(),document.body.appendChild(r.renderer.domElement),ln(),r.scene=new e.Scene,r.scene.background=new e.Color(15398140),r.scene.fog=new e.FogExp2(15398140,d.fogDensity),r.pooledRoot=new e.Group,r.pooledRoot.matrixAutoUpdate=!1,r.pooledRoot.updateMatrix(),r.scene.add(r.pooledRoot),r.boxParticlePool=new gt(lt,1500),r.sphereParticlePool=new gt(new e.IcosahedronGeometry(1,0),3e3),r.scene.add(r.boxParticlePool.mesh),r.scene.add(r.sphereParticlePool.mesh),r.scene.add(r.boxParticlePool.bloomMesh),r.scene.add(r.sphereParticlePool.bloomMesh);for(let e=0;e<250;e++)X.push(new Nt);let o=new e.SphereGeometry(25e3,32,32),s=new e.ShaderMaterial({uniforms:{topColor:{value:new e.Color(7257328)},bottomColor:{value:new e.Color(15398140)},offset:{value:400},exponent:{value:.6},sunPosition:{value:new e.Vector3(800,500,-800).normalize()}},vertexShader:`
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                vec3 skyColor = mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0));
                gl_FragColor = vec4(skyColor, 1.0);
            }
        `,side:e.BackSide}),f=new e.Mesh(o,s);f.renderOrder=1e3,Ue(f),r.scene.add(f);let m=new e.Vector3(-800,-500,800).normalize(),h=new e.Group;h.position.copy(m).multiplyScalar(-24e3);let g=new e.IcosahedronGeometry(600,1),_=new e.MeshBasicMaterial({color:16777215});h.add(new e.Mesh(g,_));let v=new e.IcosahedronGeometry(900,0),y=new e.MeshBasicMaterial({color:16772829,transparent:!0,opacity:.4,blending:e.AdditiveBlending,depthWrite:!1}),b=new e.Mesh(v,y);b.rotation.set(.5,.5,.5),h.add(b);let x=new e.IcosahedronGeometry(1300,0),S=new e.MeshBasicMaterial({color:16764074,transparent:!0,opacity:.15,blending:e.AdditiveBlending,depthWrite:!1}),C=new e.Mesh(x,S);C.rotation.set(-.3,.8,-.2),h.add(C),Ue(h),r.scene.add(h),r.scene.add(new e.HemisphereLight(16775408,8960989,1)),r.sharedMuzzleLight=new e.PointLight(16768358,0,40),r.sharedMuzzleLightOwner=null,r.scene.add(r.sharedMuzzleLight),a.length=0,r.localPlayer=null,t.forEach(e=>{let t=e.id===r.socket.id,n=new Ft(e,t);a.push(n),t&&(r.myPlayerIndex=e.index,r.localPlayer=n)});let w=r.localPlayer;w&&(document.getElementById(`hud-name`).innerText=w.name),r.csm=new Kt({maxFar:14e3,cascades:3,parent:r.scene,shadowMapSize:d.shadowRes,lightDirection:m,camera:w.camera,lightIntensity:3.2,lightColor:new e.Color(16776159),casterHeadroom:8e3}),a.forEach(e=>{e.mesh.traverse(e=>{e.isMesh&&e.material&&r.csm.setupMaterial(e.material)})}),i&&(i.innerText=`SPINNING UP GENERATION THREAD...`),await It(),await new Promise(t=>{let n=new Blob([xn],{type:`application/javascript`}),a=URL.createObjectURL(n),o=new Worker(a,{type:`module`});o.onmessage=async function(n){if(n.data.status)i&&(i.innerText=n.data.status);else if(n.data.done){let{positions:a,normals:s,colors:l,pineData:f,decidData:m,rockData:h,shoreMap:g,shoreDim:_,shoreRange:v,shoreDistRange:y,pineCount:b,decidCount:x,rockCount:S}=n.data;rt(a),r.shoreTexture=new e.DataTexture(g,_,_,e.RGBAFormat,e.UnsignedByteType),r.shoreTexture.minFilter=e.LinearFilter,r.shoreTexture.magFilter=e.LinearFilter,r.shoreTexture.wrapS=e.ClampToEdgeWrapping,r.shoreTexture.wrapT=e.ClampToEdgeWrapping,r.shoreTexture.needsUpdate=!0,r.shoreRangeUnits=v,r.shoreDistRangeUnits=y;let C=new e.MeshLambertMaterial({vertexColors:!0,flatShading:!0});r.csm.setupMaterial(C),We(a,s,l,C),i&&(i.innerText=`FLOODING OCEANS...`),await It(),c.length=0;let w=new e.PlaneGeometry(d.width,d.width,100,100),T=d.width/100,E=w.attributes.position;for(let e=0;e<E.count;e++){let t=E.getX(e),n=E.getY(e);t+=(Math.random()-.5)*T*.8,n+=(Math.random()-.5)*T*.8,E.setX(e,t),E.setY(e,n)}let D=new Float32Array(E.count);for(let e=0;e<E.count;e++){let t=Qe(E.getX(e),-E.getY(e));D[e]=Math.max(0,d.waterLevel-t)}w.setAttribute(`waterDepth`,new e.BufferAttribute(D,1));let O=w.toNonIndexed(),k=O.attributes.position.count,A=new Float32Array(k*3),j=new e.Color(3050398);for(let e=0;e<k;e++)A[e*3]=j.r,A[e*3+1]=j.g,A[e*3+2]=j.b;O.setAttribute(`color`,new e.BufferAttribute(A,3));let M=new e.MeshStandardMaterial({color:16777215,transparent:!0,opacity:.82,roughness:.2,metalness:.15,flatShading:!0,vertexColors:!0});r.csm.setupMaterial(M);let N=M.onBeforeCompile;M.onBeforeCompile=t=>{N(t),t.uniforms.time={value:0},t.uniforms.sunDir={value:p},t.uniforms.skyReflectColor={value:new e.Color(10474741)},t.uniforms.shallowColor={value:new e.Color(5883584)},t.uniforms.sunSpecColor={value:new e.Color(16773848)},t.uniforms.shoreMap={value:r.shoreTexture},t.uniforms.shoreRange={value:r.shoreRangeUnits},t.uniforms.shoreDistRange={value:r.shoreDistRangeUnits},t.uniforms.worldExtent={value:d.width},M.userData.shader=t,t.vertexShader=`
                        uniform float time;
                        attribute float waterDepth;
                        varying float vWaveHeight;
                        varying vec2 vSurfXZ;
                        ${t.vertexShader}
                    `.replace(`#include <begin_vertex>`,`
                        #include <begin_vertex>
                        // Swell flattens out as the bed rises, the way real
                        // water loses amplitude running into a beach.
                        float shoal = clamp(waterDepth / 70.0, 0.0, 1.0);
                        float wave = sin(position.x * 0.020 + time * 1.50) * 1.50;
                        wave += cos(position.y * 0.017 + time * 1.30) * 1.15;
                        wave += sin((position.x * 0.6 + position.y * 0.8) * 0.055 + time * 2.60) * 0.55;
                        wave += cos((position.x * 0.8 - position.y * 0.6) * 0.110 + time * 3.70) * 0.26;
                        wave *= 0.30 + 0.70 * shoal;
                        transformed.z += wave;
                        vWaveHeight = wave;
                        // Surface coordinates for the foam ripple. The plane is
                        // authored in XY, so this is world (x, -z).
                        vSurfXZ = position.xy;
                        `),t.fragmentShader=`
                        uniform float time;
                        uniform vec3 sunDir;
                        uniform vec3 skyReflectColor;
                        uniform vec3 shallowColor;
                        uniform vec3 sunSpecColor;
                        uniform sampler2D shoreMap;
                        uniform float shoreRange;
                        uniform float shoreDistRange;
                        uniform float worldExtent;
                        varying float vWaveHeight;
                        varying vec2 vSurfXZ;
                        ${t.fragmentShader}
                    `.replace(`#include <tonemapping_fragment>`,`
                        {
                            // Everything below stays in view space: vViewPosition
                            // already points from the fragment to the camera and
                            // 'normal' is the flat-shaded face normal, so no
                            // world-space round trip is needed.
                            vec3 Nv = normalize(normal);
                            vec3 Vv = normalize(vViewPosition);
                            float fresnel = pow(1.0 - clamp(dot(Nv, Vv), 0.0, 1.0), 4.0);

                            // Grazing angles hand over to the sky colour, which is
                            // what makes distant water read as a surface rather
                            // than a flat blue sheet.
                            gl_FragColor.rgb = mix(gl_FragColor.rgb, skyReflectColor, fresnel * 0.72);

                            // Sun glitter. A tight Blinn lobe on the wave normals
                            // breaks up into sparkle for free because the normals
                            // are already per-face.
                            vec3 Lv = normalize((viewMatrix * vec4(sunDir, 0.0)).xyz);
                            float spec = pow(max(dot(Nv, normalize(Lv + Vv)), 0.0), 200.0);
                            gl_FragColor.rgb += sunSpecColor * spec * 2.4;

                            // Depth is read per fragment from the baked bed map,
                            // not interpolated from the water mesh's corners. The
                            // surface is 100 quads across 14km, so a river spans
                            // one or two vertices and a per-vertex depth made the
                            // shoreline snap to whole quads - the rectangular
                            // patches this used to produce along narrow channels.
                            vec2 shoreUV = (vec2(vSurfXZ.x, -vSurfXZ.y) + worldExtent * 0.5) / worldExtent;
                            vec2 shoreSample = texture2D(shoreMap, shoreUV).rg;
                            float shoreDepth = shoreSample.r * shoreRange;
                            float shoreDist = shoreSample.g * shoreDistRange;

                            // Shallows go turquoise, and a band of foam rides the
                            // last few metres before the shoreline.
                            float shallow = 1.0 - clamp(shoreDepth / 50.0, 0.0, 1.0);
                            gl_FragColor.rgb = mix(gl_FragColor.rgb, shallowColor, shallow * shallow * 0.8);

                            // The ripple is a function of surface position, not
                            // depth. Driving it from depth meant its frequency
                            // followed the bed gradient, so anywhere the bottom
                            // shelved steeply it aliased into hard bands.
                            //
                            // Three octaves rather than one: the long wave sets
                            // where the wash reaches, the shorter two give the
                            // edge a ragged, dissolving quality. With a single
                            // low-frequency term the band was a smooth ribbon
                            // whose outline was pure distance-field contour.
                            float ripple = 0.50 * sin(vSurfXZ.x * 0.055 + time * 2.2)
                                         + 0.50 * cos(vSurfXZ.y * 0.048 - time * 1.7)
                                         + 0.28 * sin((vSurfXZ.x + vSurfXZ.y) * 0.150 - time * 3.1)
                                         + 0.16 * cos((vSurfXZ.x - vSurfXZ.y) * 0.310 + time * 4.3);

                            // Rather than modulating the foam's brightness, the
                            // ripple pushes the waterline itself in and out, so the
                            // edge reads as a moving wash rather than a contour with
                            // a pattern painted on it. Measured in world units out
                            // from the waterline, so the band is the same width on a
                            // beach and on a canyon bank.
                            float edge = 60.0 + ripple * 15.0 + vWaveHeight * 5.0;

                            // Squared falloff: dense right at the waterline, thinning
                            // quickly on the way out, instead of a slab of even white.
                            float foam = smoothstep(edge, 0.0, shoreDist);
                            foam *= foam;
                            gl_FragColor.rgb += vec3(foam * 0.38);

                            // Foam and grazing reflections both read as more solid
                            // water, so they pull the surface towards opaque.
                            gl_FragColor.a = clamp(gl_FragColor.a + fresnel * 0.22 + foam * 0.35, 0.0, 1.0);
                        }
                        #include <tonemapping_fragment>
                        `)};let P=new e.Mesh(O,M);P.rotation.x=-Math.PI/2,P.position.y=d.waterLevel,P.receiveShadow=!0,Ue(P),r.scene.add(P),c.push(P);let ee=new e.PlaneGeometry(d.width,d.width,1,1),te=new e.MeshStandardMaterial({color:999509,roughness:.5,metalness:.2,flatShading:!0}),ne=new e.Mesh(ee,te);ne.rotation.x=-Math.PI/2,ne.position.y=d.waterLevel-15,Ue(ne),r.scene.add(ne),i&&(i.innerText=`PLANTING FORESTS...`),await It(),r.treeGridDim=Math.ceil(d.width/400),u.length=0;for(let e=0;e<r.treeGridDim*r.treeGridDim;e++)u.push([]);let re=(e,t)=>{for(let n=0;n<t;n++){let t=e[n*6],i=e[n*6+1],a=e[n*6+2],o=e[n*6+3],s=Math.floor((t+d.width/2)/400),c=Math.floor((a+d.width/2)/400);s>=0&&s<r.treeGridDim&&c>=0&&c<r.treeGridDim&&u[c*r.treeGridDim+s].push({x:t,y:i,z:a,r:3.5*o,h:32*o,rSq:(3.5*o+4)**2})}};re(f,b),re(m,x);let F=new e.MeshLambertMaterial({vertexColors:!0,flatShading:!0});r.csm.setupMaterial(F);function I(t,n,i,a,o){if(i===0)return;t.computeBoundingSphere();let s=d.width/8,c=d.width/2,l=new Uint32Array(64),u=new Uint16Array(i);for(let e=0;e<i;e++){let t=Math.floor((n[e*6]+c)/s),r=Math.floor((n[e*6+2]+c)/s);t<0?t=0:t>=8&&(t=7),r<0?r=0:r>=8&&(r=7);let i=r*8+t;u[e]=i,l[i]++}let f=Array(64);for(let n=0;n<64;n++){if(l[n]===0)continue;let r=new e.InstancedMesh(t,F,l[n]);r.castShadow=o,r.receiveShadow=!0,r.matrixAutoUpdate=!1,r.updateMatrix(),f[n]=r}let p=new Uint32Array(64),m=new e.Object3D;for(let e=0;e<i;e++){let t=n[e*6],r=n[e*6+1],i=n[e*6+2],o=n[e*6+3],s=n[e*6+4],c=n[e*6+5];m.position.set(t,r,i),a?m.scale.set(o,s,o):m.scale.setScalar(o),m.rotation.y=c,m.updateMatrix();let l=u[e];f[l].setMatrixAt(p[l]++,m.matrix)}for(let e=0;e<64;e++)f[e]&&(f[e].computeBoundingSphere(),r.scene.add(f[e]))}i&&(i.innerText=`BUILDING MESHES (1/3)...`),await It(),I(qt(),f,b,!0,!0),i&&(i.innerText=`BUILDING MESHES (2/3)...`),await It(),I(Jt(),m,x,!0,!0),i&&(i.innerText=`BUILDING MESHES (3/3)...`),await It(),I(Yt(),h,S,!1,!1),t(),o.terminate()}},o.postMessage({CONFIG:d,mapSeed:Ze(),TREE_GRID_SIZE:400})}),i&&(i.innerText=`DEPLOYING CLOUDS...`),await It();let T=Xt();T.computeBoundingSphere(),r.cloudBaseRadiusSq=T.boundingSphere.radius**2;let E=T.boundingSphere.center.length()+T.boundingSphere.radius;r.cloudMaxOriginRadiusSq=E*E;let D=new e.MeshLambertMaterial({color:16777215,flatShading:!0,side:e.DoubleSide});r.cloudInstancedMesh=new e.InstancedMesh(T,D,60),r.cloudInstancedMesh.castShadow=!0,r.cloudInstancedMesh.receiveShadow=!0,r.cloudRaycastMesh=new e.Mesh(T,D),r.cloudRaycastMesh.matrixAutoUpdate=!1;let O=new e.Object3D;for(let e=0;e<60;e++){let t=(Math.random()-.5)*d.width,n=(Math.random()-.5)*d.width,i=2+Math.random()*2.5;l.push({x:t,y:900,z:n,scale:i,speed:8+Math.random()*12}),O.position.set(t,900,n),O.scale.setScalar(i),O.rotation.set(0,Math.random()*Math.PI*2,0),O.updateMatrix(),r.cloudInstancedMesh.setMatrixAt(e,O.matrix)}r.cloudInstancedMesh.matrixAutoUpdate=!1,r.cloudInstancedMesh.updateMatrix(),r.scene.add(r.cloudInstancedMesh);for(let e=0;e<a.length;e++)a[e].mesh.traverse(e=>{e.frustumCulled=!1,e.isMesh&&e.material&&r.csm.setupMaterial(e.material)});re();let k=document.getElementById(`ui-3d-container`);k&&(k.style.display=`none`),r.introCinematicActive=!0,r.introCinematicTime=0,r.introWireframeMesh=te(),r.introWireframeMesh.scale.set(.75,.75,.75),r.initialWireframeQuat.copy(r.introWireframeMesh.quaternion),r.introWireframeMesh.position.set(0,0,0),w.mesh.add(r.introWireframeMesh),r.boxParticlePool.primeWarmUp(w.mesh.position),r.sphereParticlePool.primeWarmUp(w.mesh.position);for(let e=0;e<X.length;e++)X[e].mesh.visible=!0,Ge(X[e].mesh);for(let e=0;e<a.length;e++)a[e].muzzleFlash&&(a[e].muzzleFlash.material.opacity=1,Y(a[e],150));i&&(i.innerText=`WARMING GPU PIPELINE...`),ge(),await Sn(w),r.boxParticlePool.endWarmUp(),r.sphereParticlePool.endWarmUp();for(let e=0;e<X.length;e++)X[e].mesh.visible=!1,Ke(X[e].mesh);for(let e=0;e<a.length;e++)a[e].muzzleFlash&&(a[e].muzzleFlash.material.opacity=0,Y(a[e],0));w.mesh.children.forEach(e=>{e!==r.introWireframeMesh&&e!==w.muzzleFlash&&e.traverse(e=>{if(e.isMesh){let t=e.material;t.userData.introBase||(t.userData.introBase={opacity:t.opacity,transparent:t.transparent,depthWrite:t.depthWrite}),t.transparent=!0,t.opacity=0,t.depthWrite=!1}})}),i&&(i.innerText=`FINALIZING FLIGHT SYSTEMS...`),await Sn(w);let A=document.getElementById(`bake-overlay`);A.style.opacity=`0`,setTimeout(()=>A.style.display=`none`,500);let j=document.getElementById(`hud-main`);j.style.opacity=`0`,j.style.display=`flex`,j.style.transition=`opacity 1.5s ease`;let M=document.getElementById(`controls`);M.style.display=`block`,M.style.opacity=`0`,M.style.transition=`opacity 1.5s ease`;let N=document.getElementById(`leaderboard`);N.style.display=`block`,N.style.opacity=`0`,N.style.transition=`opacity 1.5s ease`,document.getElementById(`volume-control`).classList.add(`in-game`);let P=document.getElementById(`quit-btn`);P.style.display=`block`,P.style.opacity=`0`,P.style.transition=`opacity 1.5s ease`,setTimeout(()=>{j.style.opacity=`1`,M.style.opacity=`1`,N.style.opacity=`1`,P.style.opacity=`1`},1e3),r.gameActive=!0,window.addEventListener(`keydown`,e=>ve(e,!0)),window.addEventListener(`keyup`,e=>ve(e,!1)),console.groupEnd(),yn()}window.goToMenu=function(){let e=document.getElementById(`username`).value.trim();e?(r.myUsername=e,!r.hasConnectedOnce||r.socket&&!r.socket.connected?(document.getElementById(`step-login`).style.display=`none`,document.getElementById(`step-connecting`).style.display=`block`,P(`connecting`)):(document.getElementById(`step-login`).style.display=`none`,document.getElementById(`step-menu`).style.display=`block`,P(`menu`)),r.socket?r.socket&&!r.socket.connected&&r.socket.connect():(r.socket=io(f,{reconnectionAttempts:1/0,reconnectionDelay:1e3,timeout:1e4}),setTimeout(()=>{!r.socket.connected&&!r.hasConnectedOnce&&(document.getElementById(`connection-status`).textContent=`Server is starting up, please wait...`)},2e3),r.socket.on(`connect`,()=>{console.log(`Connected to server`),document.getElementById(`step-connecting`).style.display=`none`,document.getElementById(`step-menu`).style.display=`block`,P(`menu`),r.hasConnectedOnce=!0}),r.socket.on(`disconnect`,()=>{r.gameActive&&!r.isQuitting&&(b(`LOST CONNECTION TO SERVER. RETURNING TO MENU...`,4e3),r.gameActive=!1,setTimeout(()=>{window.quitGame()},2e3))}),r.socket.on(`player_disconnected`,e=>{if(r.isHost){for(let t=o.length-1;t>=0;t--)o[t].id===e&&o.splice(t,1);if(!r.gameActive)$();else{let t=null;for(let n=0;n<a.length;n++)if(a[n].socketId===e){t=a[n];break}t&&t.dispose()}En()}}),r.socket.on(`error_msg`,e=>{console.error(`Server error:`,e),b(e);let t=document.querySelector(`button[onclick="joinGame()"]`);t&&r.pendingJoinCode&&(t.innerText=`JOIN SQUADRON`,t.disabled=!1,r.pendingJoinCode=null),document.getElementById(`step-waiting`).style.display===`block`&&o.length===0&&(document.getElementById(`step-waiting`).style.display=`none`,document.getElementById(`step-menu`).style.display=`block`,P(`menu`))}),r.socket.on(`player_joined`,e=>{if(r.isHost){let t=e.name.trim().toLowerCase();if(o.some(e=>e.name.trim().toLowerCase()===t)){r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`NAME_REJECTED`,targetId:e.id,reason:`THE PILOT NAME "${e.name.toUpperCase()}" IS ALREADY IN USE.`}});return}let n=o.length>0?Math.max(...o.map(e=>e.index)):-1,i=a.length>0?Math.max(...a.map(e=>e.index)):-1,s=Math.max(n,i)+1;if(o.push({id:e.id,name:e.name,index:s}),En(),r.gameActive){r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`START_GAME`}});let t=new Ft({id:e.id,name:e.name,index:s},!1);t.mesh.traverse(e=>{e.frustumCulled=!1,e.isMesh&&e.material&&r.csm&&r.csm.setupMaterial(e.material)}),a.push(t)}else $()}}),r.socket.on(`game_data`,e=>{if(e.type===`HOST_LEFT`){b(`HOST DISCONNECTED. RETURNING TO MENU...`,4e3);let e=r.gameActive;r.gameActive=!1,setTimeout(()=>{e?window.quitGame():window.leaveSquadron()},2e3)}else if(e.type===`NAME_REJECTED`){if(r.socket.id===e.targetId){b(e.reason,4e3),r.pendingJoinCode=null;let t=document.querySelector(`button[onclick="joinGame()"]`);t&&(t.innerText=`JOIN SQUADRON`,t.disabled=!1),r.socket.disconnect(),document.getElementById(`step-waiting`).style.display=`none`,document.getElementById(`step-menu`).style.display=`block`,P(`menu`),r.isHost=!1,r.myRoomCode=``,o.length=0,a.length=0,r.localPlayer=null,r.socket.connect()}}else if(e.type===`KICK_PLAYER`)r.socket.id===e.targetId&&(b(`YOU HAVE BEEN KICKED FROM THE SQUADRON`,4e3),window.leaveSquadron());else if(e.type===`LOBBY_UPDATE`){if(r.pendingJoinCode){r.myRoomCode=r.pendingJoinCode,r.isHost=!1,r.pendingJoinCode=null;let e=document.querySelector(`button[onclick="joinGame()"]`);e&&(e.innerText=`JOIN SQUADRON`,e.disabled=!1),document.getElementById(`step-menu`).style.display=`none`,document.getElementById(`step-waiting`).style.display=`block`,document.getElementById(`display-room-code`).innerText=r.myRoomCode,P(`waiting`)}o.length=0;for(let t=0;t<e.players.length;t++)o.push(e.players[t]);if(!r.gameActive&&!r.isGeneratingWorld)$();else{o.forEach(e=>{let t=!1;for(let n=0;n<a.length;n++)if(a[n].index===e.index){t=!0;break}if(!t){let t=new Ft(e,e.id===r.socket.id);t.mesh&&t.mesh.traverse(e=>{e.frustumCulled=!1,e.isMesh&&e.material&&r.csm&&r.csm.setupMaterial(e.material)}),a.push(t)}});for(let e=0;e<a.length;e++){let t=a[e],n=!1;for(let e=0;e<o.length;e++)if(o[e].index===t.index){n=!0;break}!t.isLocal&&!n&&t.dispose()}}if(!r.isHost){let e=null;for(let t=0;t<o.length;t++)if(o[t].id===r.socket.id){e=o[t];break}e&&(r.myPlayerIndex=e.index)}}else if(e.type===`START_GAME`){if(r.gameActive||r.isGeneratingWorld)return;r.isGeneratingWorld=!0,document.getElementById(`lobby-overlay`).style.display=`none`;let e=document.getElementById(`ui-3d-container`);e&&document.getElementById(`bake-overlay`).appendChild(e),document.getElementById(`bake-overlay`).style.display=`flex`,P(`loading`),setTimeout(()=>{Cn(o,r.myRoomCode)},100)}else if(e.type===`GAME_STATE`)r.gameActive&&Dn(e);else if(e.type===`HIT_EVENT`&&r.gameActive&&!r.isHost){let t=null;for(let n=0;n<a.length;n++)if(a[n].index===e.targetIdx){t=a[n];break}t&&t.index===r.myPlayerIndex&&t.takeDamage(e.dmg,e.attackerIdx)}}),r.socket.on(`player_data`,e=>{if(r.isHost){if(e.data.type===`PLAYER_LEFT`){for(let t=o.length-1;t>=0;t--)o[t].id===e.data.id&&o[t].index===e.data.idx&&o.splice(t,1);if(!r.gameActive)$();else{let t=null;for(let n=0;n<a.length;n++)if(a[n].index===e.data.idx){t=a[n];break}t&&t.dispose()}En();return}if(r.gameActive){let t=null;for(let n=0;n<a.length;n++)if(a[n].index===e.data.idx){t=a[n];break}if(t&&(t.lastPacketTime=Date.now()),e.data.type===`PLAYER_DIED`){let n=t;if(n&&(n.deaths++,e.data.attackerIdx!==null&&e.data.attackerIdx!==-1)){let t=null;for(let n=0;n<a.length;n++)if(a[n].index===e.data.attackerIdx){t=a[n];break}t&&t.index!==n.index&&t.kills++}return}if(e.data.type===`HIT_EVENT`){r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:e.data});let t=null;for(let n=0;n<a.length;n++)if(a[n].index===e.data.targetIdx){t=a[n];break}t&&(t.index===r.myPlayerIndex||t.isAI)&&t.takeDamage(e.data.dmg,e.data.attackerIdx);return}t&&t.syncData(e.data)}}}))):b(`NO USERNAME ENTERED!`)},window.goBackToLogin=function(){r.socket&&r.socket.disconnect(),document.getElementById(`step-menu`).style.display=`none`,document.getElementById(`step-login`).style.display=`block`,P(`login`)},window.leaveSquadron=function(){r.socket&&r.socket.connected?(r.isHost?r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`HOST_LEFT`}}):r.socket.emit(`client_send`,{roomCode:r.myRoomCode,data:{type:`PLAYER_LEFT`,idx:r.myPlayerIndex,id:r.socket.id}}),setTimeout(()=>{r.socket&&r.socket.disconnect(),wn()},100)):wn()};function wn(){document.getElementById(`step-waiting`).style.display=`none`,document.getElementById(`step-menu`).style.display=`block`,document.getElementById(`display-room-code`).innerText=`----`,P(`menu`),r.isHost=!1,r.myRoomCode=``,o.length=0,a.length=0,r.localPlayer=null,r.socket&&r.socket.connect()}window.quitGame=function(){r.isQuitting=!0,r.socket&&r.socket.connected?(r.isHost?r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`HOST_LEFT`}}):r.socket.emit(`client_send`,{roomCode:r.myRoomCode,data:{type:`PLAYER_LEFT`,idx:r.myPlayerIndex,id:r.socket.id}}),setTimeout(()=>{r.socket&&r.socket.disconnect(),Tn()},100)):Tn()};function Tn(){sessionStorage.setItem(`returnToMenu`,`true`),sessionStorage.setItem(`username`,r.myUsername),window.location.reload()}window.hostGame=function(){let e=``;for(let t=0;t<4;t++)e+=`ABCDEFGHJKMNPQRSTUVWXYZ23456789`.charAt(Math.floor(Math.random()*31));r.myRoomCode=e,r.isHost=!0,r.myPlayerIndex=0,o.length=0,o.push({id:r.socket.id,name:r.myUsername,index:0}),r.socket.emit(`create_room`,e),document.getElementById(`step-menu`).style.display=`none`,document.getElementById(`step-waiting`).style.display=`block`,document.getElementById(`display-room-code`).innerText=e,document.getElementById(`start-btn`).style.display=`block`,document.getElementById(`add-ai-btn`).style.display=`block`,document.getElementById(`waiting-msg`).style.display=`none`,$(),P(`waiting`)},window.joinGame=function(){let e=document.getElementById(`room-code-input`).value.trim().toUpperCase().replace(/[^A-HJKMNPQRSTUVWXYZ2-9]/g,``);if(!e){b(`NO ROOM CODE ENTERED!`);return}if(e.length!==4){b(`ROOM CODE MUST BE 4 CHARACTERS`);return}r.pendingJoinCode=e;let t=document.querySelector(`button[onclick="joinGame()"]`);t&&(t.innerText=`JOINING...`,t.disabled=!0),r.socket.emit(`join_room`,{roomCode:e,name:r.myUsername})},window.startGame=function(){if(!r.isHost)return;document.getElementById(`lobby-overlay`).style.display=`none`;let e=document.getElementById(`ui-3d-container`);e&&document.getElementById(`bake-overlay`).appendChild(e),document.getElementById(`bake-overlay`).style.display=`flex`,P(`loading`),r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`START_GAME`}}),setTimeout(()=>{Cn(o,r.myRoomCode)},100)},window.addAIPlane=function(){if(!r.isHost)return;let e=[`Viper`,`Maverick`,`Goose`,`Iceman`,`Jester`,`Hollywood`,`Wolfman`,`Slider`,`Cougar`,`Merlin`,`Sundown`,`Chipper`],t=`AI PILOT`;for(let n of e)if(!o.some(e=>e.name.toUpperCase()===n.toUpperCase())){t=n;break}t===`AI PILOT`&&(t=`AI PILOT `+(o.filter(e=>e.isAI).length+1));let n=o.length>0?Math.max(...o.map(e=>e.index)):-1,i=a.length>0?Math.max(...a.map(e=>e.index)):-1,s=Math.max(n,i)+1,c=`ai_`+Date.now()+`_`+Math.floor(Math.random()*1e3);if(o.push({id:c,name:t,index:s,isAI:!0}),r.gameActive){let e=new Ft({id:c,name:t,index:s,isAI:!0},!1);e.mesh.traverse(e=>{e.frustumCulled=!1,e.isMesh&&e.material&&r.csm&&r.csm.setupMaterial(e.material)}),a.push(e)}else $();En()},window.kickMember=function(e,t,n){if(r.isHost){if(n){for(let t=o.length-1;t>=0;t--)o[t].id===e&&o.splice(t,1);if(r.gameActive){let e=null;for(let n=0;n<a.length;n++)if(a[n].index===t){e=a[n];break}e&&e.dispose()}else $();En()}else{r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`KICK_PLAYER`,targetId:e}});for(let t=o.length-1;t>=0;t--)o[t].id===e&&o.splice(t,1);if(r.gameActive){let t=null;for(let n=0;n<a.length;n++)if(a[n].socketId===e){t=a[n];break}t&&t.dispose()}else $();En()}}};function $(){let e=document.getElementById(`start-btn`),t=document.getElementById(`add-ai-btn`),n=document.getElementById(`waiting-msg`);e&&n&&t&&(r.isHost?(e.style.display=`block`,t.style.display=`block`,n.style.display=`none`):(e.style.display=`none`,t.style.display=`none`,n.style.display=`block`));let i=document.getElementById(`player-list`);i.innerHTML=``;let a=[`#FF0000`,`#00FF00`,`#FFFF00`,`#FF00FF`,`#FF8C00`,`#FFFFFF`,`#7CFC00`,`#DC143C`,`#FF1493`,`#FF4500`];o.forEach(e=>{let t=document.createElement(`div`);t.className=`player-row`,t.style.display=`flex`,t.style.alignItems=`center`,t.style.justifyContent=`space-between`;let n=document.createElement(`div`);n.style.display=`flex`,n.style.alignItems=`center`;let o=a[e.index%a.length],s=document.createElement(`span`);s.className=`player-swatch`,s.style.backgroundColor=o,n.appendChild(s);let c=document.createElement(`span`);if(c.innerText=`[${e.index+1}] ${e.name}`,e.isAI&&(c.innerText+=` (AI)`),n.appendChild(c),e.index===0){let e=document.createElement(`span`);e.className=`host-indicator`,e.innerText=`★ HOST`,n.appendChild(e)}if(e.id===r.socket.id&&(n.style.color=`#00ff00`),t.appendChild(n),r.isHost&&e.id!==r.socket.id){let n=document.createElement(`button`);n.className=`kick-btn`,n.innerText=`KICK`,n.style.padding=`4px 10px`,n.style.fontSize=`0.75rem`,n.style.width=`auto`,n.style.margin=`0`,n.style.border=`1px solid #ff4444`,n.style.color=`#ff4444`,n.style.cursor=`pointer`,n.style.textDecoration=`none`,n.onmouseover=()=>{n.style.background=`#ff4444`,n.style.color=`#000`},n.onmouseout=()=>{n.style.background=`transparent`,n.style.color=`#ff4444`},n.onclick=t=>{t.stopPropagation(),kickMember(e.id,e.index,e.isAI)},t.appendChild(n)}i.appendChild(t)})}function En(){r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`LOBBY_UPDATE`,players:o}})}function Dn(e){r.lastGameStateTime=Date.now();for(let t=0;t<e.players.length;t++){let n=e.players[t],r=null;for(let e=0;e<a.length;e++)if(a[e].index===n.idx){r=a[e];break}r&&r.syncData(n)}for(let e=a.length-1;e>=0;e--)a[e].disconnected&&a.splice(e,1);let t=Date.now();(!window.lastLeaderboardUpdate||t-window.lastLeaderboardUpdate>1e3)&&(window.lastLeaderboardUpdate=t,Be())}x(),M(),P(`login`),window.addEventListener(`resize`,bn),window.onload=()=>{if(sessionStorage.getItem(`returnToMenu`)===`true`){sessionStorage.removeItem(`returnToMenu`);let e=sessionStorage.getItem(`username`);e&&(document.getElementById(`username`).value=e,window.goToMenu())}},setInterval(()=>{if(!r.gameActive)return;let e=Date.now(),t=r.localPlayer;if(!r.isHost&&r.gameActive&&r.lastGameStateTime>0&&e-r.lastGameStateTime>15e3&&(b(`HOST CONNECTION TIMED OUT. RETURNING TO MENU...`,4e3),r.gameActive=!1,setTimeout(()=>{window.quitGame()},2e3)),t){let e={idx:t.index,pos:t.mesh.position,quat:{x:t.mesh.quaternion.x,y:t.mesh.quaternion.y,z:t.mesh.quaternion.z,w:t.mesh.quaternion.w},spd:t.speed,throt:t.throttle,hp:t.hp,crashed:t.isCrashed,killer:t.lastAttackerName,shoot:t.isFiring,spawned:!r.introCinematicActive};r.isHost||r.socket.emit(`client_send`,{roomCode:r.myRoomCode,data:e})}if(r.isHost){for(let t=0;t<a.length;t++){let n=a[t];if(!n.isLocal&&!n.isAI&&!n.disconnected&&n.lastPacketTime&&e-n.lastPacketTime>1e4){n.dispose();for(let e=o.length-1;e>=0;e--)o[e].id===n.socketId&&o.splice(e,1);En()}}for(let e=a.length-1;e>=0;e--)a[e].disconnected&&a.splice(e,1);let t=[];for(let e=0;e<a.length;e++){let n=a[e],i=n.mesh.position,o=n.mesh.quaternion,s=n.index===r.myPlayerIndex||n.isAI?n.isFiring:n.isShooting;if(!n.isLocal&&!n.isAI&&n.positionBuffer&&n.positionBuffer.length>0){let e=n.positionBuffer[n.positionBuffer.length-1];i=e.pos,o=e.quat,s=e.shoot}t.push({idx:n.index,pos:i,quat:{x:o.x,y:o.y,z:o.z,w:o.w},spd:n.speed,throt:n.throttle,hp:n.hp,crashed:n.isCrashed,k:n.kills,d:n.deaths,killer:n.lastAttackerName,shoot:s,spawned:n.isLocal?!r.introCinematicActive:n.isSpawned})}r.socket.emit(`host_broadcast`,{roomCode:r.myRoomCode,data:{type:`GAME_STATE`,players:t}}),(!window.lastLeaderboardUpdate||e-window.lastLeaderboardUpdate>1e3)&&(window.lastLeaderboardUpdate=e,Be())}},50),window.addEventListener(`blur`,ye),window.addEventListener(`keydown`,he),window.addEventListener(`click`,he);