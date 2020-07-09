<template>
  <div>
    <div class="overlayStyle" id="overlay">
      <div>
        <h2>networked</h2>
        <button id="myEnterVRButton" href="#">VR</button>
        <button id="myEnterARButton" href="#">AR</button>
        <button id="myEnterARButton" href="#">Exit AR</button>
      </div>
    </div>
    <a-scene
      networked-scene=" app: myApp; room: room1; debug: true;"
      webxr="optionalFeatures: dom-overlay; overlayElement: #overlay"
      vr-mode-ui="enterARButton: #myEnterARButton"
    >
      <a-assets>
        <a-asset-item
          id="floor"
          src="/low_poly_isometric_rooms/scene.gltf"
        ></a-asset-item>

        <naf-template id="avatar-template" v-html="avetarTemplate">
        </naf-template>
      </a-assets>

      <a-gltf-model
        position="0 0 -3.0"
        scale="2 1 2"
        src="#floor"
      ></a-gltf-model>
      <a-text
        position="-1 1.25 -3"
        value="Hello, World!"
        color="green"
      ></a-text>
      <a-entity
        id="player"
        position="0 1.3 0 "
        networked="template:#avatar-template; attachTemplateToLocal:false;"
        camera
        wasd-controls
        look-controls
      >
      </a-entity>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </div>
</template>
<script>
export default {
  name: "aframe",
  components: {},
  mounted() {},
  computed: {
    // 算出 getter 関数
    avetarTemplate() {
      return `
          <a-entity   class="avatar">
            <a-sphere
              class="head"
              color="#ffffff"
              scale="0.45 0.5 0.4"
            ></a-sphere
            ><a-entity class="face" position="0 0.05 0"
              ><a-sphere
                class="eye"
                color="#efefef"
                position="0.16 0.1 -0.35"
                scale="0.12 0.12 0.12"
              ><a-sphere
                  class="pupil"
                  color="#000"
                  position="0 0 -1"
                  scale="0.2 0.2 0.2"
                ></a-sphere
                ></a-sphere
              ><a-sphere
                class="eye"
                color="#efefef"
                position="-0.16 0.1 -0.35"
                scale="0.12 0.12 0.12"
              ><a-sphere
                  class="pupil"
                  color="#000"
                  position="0 0 -1"
                  scale="0.2 0.2 0.2"
                ></a-sphere
              ></a-sphere
            ></a-entity
            ></a-entity
          >  `;
    }
  }
};
</script>

<style>
.overlayStyle {
  position: absolute;
  top: 0px;
  z-index: 1;
}
</style>
