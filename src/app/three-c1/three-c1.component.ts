import { Component, OnInit } from '@angular/core';
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { gsap } from "gsap";


@Component({
  selector: 'app-three-c1',
  templateUrl: './three-c1.component.html',
  styleUrls: ['./three-c1.component.css']
})
export class ThreeC1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initThreeJs()
  }

  allvids = [
    "https://cdn.dribbble.com/users/8356452/screenshots/17366058/media/48eecd75766c51bf2262b05d28d1c83f.mp4",
    "https://cdn.dribbble.com/users/8356452/screenshots/17366058/media/6e08ae072059e4da2fea1943b500f375.mp4",
    "https://cdn.dribbble.com/users/8356452/screenshots/17366058/media/ccd4577503ffb4a421bc8a958d3074ff.mp4",
    "https://cdn.dribbble.com/users/8356452/screenshots/17366058/media/74c163dac8901aee746464701f423c86.mp4"
  ]

  initThreeJs() {
    // Debug
    // const gui = new dat.GUI()

    //texture
    // const textureLoader = new THREE.TextureLoader() 


    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color( 0xe6e6e6);
   

    // Objects
    const geometry = new THREE.PlaneBufferGeometry(1.2, 1.6);

    for (let i = 0; i < this.allvids.length; i++) {
      const body = document.getElementById('body')
      

      var video = document.createElement('video');
      video.className = 'webgl'
      
      video.src = this.allvids[i]
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.crossOrigin = 'anonymous'
      video.load()
      video.play()
       
      body.appendChild(video)
      
      
      var texture = new THREE.VideoTexture(video);
      texture.needsUpdate;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      texture.crossOrigin = 'anonymous';

      const material = new THREE.MeshBasicMaterial({
        map : texture
      })

      const imgMesh = new THREE.Mesh(geometry, material)
      //imgMesh.position.set(Math.random()*.2, i*-1.8)
      imgMesh.position.set(1, i*-1.8)

      scene.add(imgMesh)

    }



    let objs = []

    scene.traverse((object)=>{
      if (object.isMesh) {
        objs.push(object)
        
      }
    })
    



 


    
    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   

    //mouse

    document.addEventListener('wheel', scrollyabro)

    let y = 0
    let position = 0

    function scrollyabro(event) {
         y = event.deltaY * -0.002

      
    }

    const mouse = new THREE.Vector2()

    document.addEventListener('mousemove', (event)=>{
      mouse.x = event.clientX / sizes.width * 2 - 1
      mouse.x = - (event.clientY / sizes.height) * 2 + 1
      
    })

    /**
     * Animate
     */
    const raycaster = new THREE.Raycaster()

    const clock = new THREE.Clock()

    const tick = () => {

      const elapsedTime = clock.getElapsedTime()

      // Update objects
      position += y
      y *= .9

      //rayscaster

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(objs)

      for(const intersect of intersects){
        //  intersect.object.scale.set(1.1, 1.1)
        gsap.to(intersect.object.scale, {x: 1.7 , y: 1.7 })
        gsap.to(intersect.object.rotation, { y: -.5 })
      }

      for(const object of objs){
        if(!intersects.find(intersect=> intersect.object === object)){
            //object.scale.set(1, 1)

            gsap.to(object.scale, {x: 1 , y: 1 })
            gsap.to(object.rotation, { y: 0 })
        }
      }

      camera.position.y = position

      // Update Orbital Controls
      // controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }

}
