import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import { Canvas } from "@react-three/fiber";
import ThreeMeshUI from 'three-mesh-ui'
import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';
function App() {
  const container = useRef(null);
    const container1 = new ThreeMeshUI.Block({
        width: 1.2,
        height: 0.7,
        padding: 0.2,
        fontFamily: FontJSON,
        fontTexture: FontImage,
    });
  const [ar, setAr] = useState(null);

  async function init() {
    return new Promise((resolve, reject) => {
      resolve(
        new MindARThree({
          container: container.current, imageTargetSrc: "../data/targets4.mind",
        })
      );
    });
  }

  useEffect(() => {
    (function () {
      var s = document.createElement("script");
      s.src = "https://remotejs.com/agent/agent.js";
      s.setAttribute(
        "data-consolejs-channel",
        "926606f4-8635-10b3-1582-c8a579d09065"
      );
      document.head.appendChild(s);
    })();
  }, []);

  useEffect(() => {
    if (!container) return;
    init()
      .then(async (data) => {
        setAr(data);
        console.log(data);
        const { renderer, scene, camera } = data;
        console.log(renderer, scene, camera);
        /*const geometry = new THREE.BoxGeometry(.5, .5, .5);
        const material = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
          transparent: true,
          opacity: 0.7,
        });
        const plane = new THREE.Mesh(geometry, material);
        */const anchor = data.addAnchor(0);
          const text = new ThreeMeshUI.Text({
              content: "Some text to be displayed",
              fontSize: .2
          });


          container1.add( text );
          //plane.add( container1 );
        anchor.group.add(container1);
        await data.start();
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
            ThreeMeshUI.update();
        });
        Window.requestAnimationFrame(() => {
          //console.log(plane);
        });
      })
      .catch((err) => console.log(err));
  }, [container]);

  const [count, setCount] = useState(0);

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={container}>
      {/* <Canvas>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas> */}
    </div>
  );
}

export default App;
