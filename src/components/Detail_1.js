import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Scene } from "three";
import img from "../material/texture/quotes.jpg";
//import wall from "../material/texture/wall.png"
import wall from "../material/texture/wall.jpg";
import b_watercolor from "../material/texture/b_watercolor.jpg";
import hansi from "../material/texture/hansi_negative.png";
import road_not_taken from "../material/texture/road_not_taken.jpg";

import "../stylesheet/detail.scss";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const Detail_1 = () => {
  useEffect(() => {
    let camera, scene, renderer;

    let isUserInteracting = false,
      onPointerDownMouseX = 0,
      onPointerDownMouseY = 0,
      lon = 0,
      onPointerDownLon = 0,
      lat = 0,
      onPointerDownLat = 0,
      phi = 0,
      theta = 0;
    init();
    animate();
    function init() {
      const container = document.getElementById("container");
      //console.log(container);
      //console.log(window.innerWidth);
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        21000
      );

      scene = new THREE.Scene();
      {
        //scene.fog = new THREE.Fog(0xFFFFFF,100,400);
      }
      //scene.background = new THREE.Color( 0x101010 );

      const geometry = new THREE.SphereGeometry(500, 70, 4000);
      // invert the geometry on the x-axis so that all of the faces point inward
      geometry.scale(-1.4, 1, 1);

      const p_geometry = new THREE.PlaneGeometry(5, 20, 80);
      const p_texture = new THREE.TextureLoader().load(wall);
      const p_material = new THREE.MeshBasicMaterial({
        map: p_texture,
        side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(p_geometry, p_material);
      p_geometry.scale(1, 1, 1);

      const texture = new THREE.TextureLoader().load(img);
      const material = new THREE.MeshPhongMaterial({ map: texture }); //빛반사MeshPhongMaterial
      const mesh = new THREE.Mesh(geometry, material);

      const sphereThextureLoader = new THREE.CubeTextureLoader();

      //plane.postion.set(-1,2,4);
      const solarSystem = new THREE.Object3D();
      scene.add(solarSystem);

      const boxWidth = 550;
      const boxHeight = 470;
      const boxDepth = 1;
      const geom = new THREE.PlaneGeometry(boxWidth, boxHeight, boxDepth);
      const draws = []; // just an array we can use to rotate the cubes
      const loader = new THREE.TextureLoader();
      loader.load(b_watercolor, (texture) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          opacity: 0.9,
          transparent: true,
        });
        const draw = new THREE.Mesh(geom, material);
        draw.position.set(-1, 10, -450);

        scene.add(draw);
        //scene.add(draws);
        //draws.push(draw); // add to our list of cubes to rotate
      });

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      //scene.background = mesh;
      solarSystem.add(plane);
      solarSystem.add(mesh);

      const light = new THREE.DirectionalLight(0xffffff, 1);
      //const light = new THREE.AmbientLight(0xffffff, 1);
      //const light = new THREE.HemisphereLight(0xB1E1FF, 0xffffff, 1);
      //const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(-1, 1, 4);
      //light.position.set(0, 10, 0);
      scene.add(light);
      // const controls = new OrbitControls(camera, light);
      // controls.target(0,0,0);
      // controls.update();

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      container.style.touchAction = "none";
      container.addEventListener("pointerdown", onPointerDown);

      document.addEventListener("wheel", onDocumentMouseWheel);

      //

      document.addEventListener("dragover", function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      });

      document.addEventListener("dragenter", function () {
        document.body.style.opacity = 0.5;
      });

      document.addEventListener("dragleave", function () {
        document.body.style.opacity = 1;
      });

      document.addEventListener("drop", function (event) {
        event.preventDefault();

        const reader = new FileReader();
        reader.addEventListener("load", function (event) {
          material.map.image.src = event.target.result;
          material.map.needsUpdate = true;
        });
        reader.readAsDataURL(event.dataTransfer.files[0]);

        document.body.style.opacity = 1;
      });

      //

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix(); //canvas화면 크기에 카메라 비율속성맞추기

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onPointerDown(event) {
      if (event.isPrimary === false) return;

      isUserInteracting = true;

      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(event) {
      if (event.isPrimary === false) return;

      lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
      lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    }

    function onPointerUp() {
      isUserInteracting = false;

      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    }

    function onDocumentMouseWheel(event) {
      const fov = camera.fov + event.deltaY * 0.05;

      camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

      camera.updateProjectionMatrix();
    }

    function animate() {
      requestAnimationFrame(animate);
      update();
    }

    function update() {
      if (isUserInteracting === false) {
        lon += 0.2;
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);

      renderer.render(scene, camera);
    }
  }, []);
  return <div className="detail-body" id="container"></div>;
};
export default Detail_1;
