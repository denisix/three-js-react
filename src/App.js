import React, { Component } from 'react';
import './App.css';

import * as THREE from 'three';

class App extends Component {
  componentDidMount() {
  	this.mount.style.height = ( window.innerHeight -20) + 'px';
	const width = this.mount.clientWidth
    const height = this.mount.clientHeight

	//ADD SCENE
    this.scene = new THREE.Scene()

	//ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 25
    this.camera.position.y = 8

	//ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
	this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

	//ADD CUBE
	/*
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
	*/

	// LIGHTS
	//this.light = new THREE.AmbientLight(0x808080);
	//this.scene.add(this.light);


	this.scene.add( new THREE.HemisphereLight( 0x775599, 0x111122 ) );

	var spotLight = new THREE.SpotLight( 0xffffbb, 2 );
				spotLight.position.set( 25, 15, 1 );
				spotLight.position.multiplyScalar( 700 );
				spotLight.castShadow = true;
				spotLight.shadow.mapSize.width = 2048;
				spotLight.shadow.mapSize.height = 2048;
				spotLight.shadow.camera.near = 200;
				spotLight.shadow.camera.far = 1500;
				spotLight.shadow.camera.fov = 40;
				spotLight.shadow.bias = -0.005;
				
	this.scene.add( spotLight );

	var spotLight2 = new THREE.SpotLight( 0x770000 );
	spotLight2.position.set( 10, 5, 20 );
	this.scene.add( spotLight2 );

	// MATERIAL
	/*var mapHeight = new THREE.TextureLoader().load( "models/json/leeperrysmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg" );
	var material = new THREE.MeshPhongMaterial( {
				color: 0x552811,
					specular: 0x222222,
					shininess: 25,
					bumpMap: mapHeight,
					bumpScale: 12
	} );
	*/

	// MODEL
    this.model = null;

	var loader = new THREE.ObjectLoader();
	loader.load(
		"standard-female-figure.json",
		//"teapot-claraio.json", 
		function(obj) {
			this.scene.add( obj );
            this.model = obj;
			console.log('Obj', this.model);
			this.start()
		}.bind(this),
	);


  }

  componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
//    this.cube.rotation.x += 0.01
//    this.cube.rotation.y += 0.01

	if (this.model) {
    //	this.model.rotation.x += 0.01
	    this.model.rotation.y += 0.01
	}

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
  	this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
		<div className="App">
			<div className="container-3d" ref={(mount) => { this.mount = mount }}></div>
		</div>
    );
  }
}

export default App;
