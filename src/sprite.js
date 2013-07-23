/// <reference path="../libs/three.js" />
/// <reference path="scene.js" />
// Constructor
var Sprite = function (width, height, resource, z) {
    // Set properties
    this.layers = [];
    this.currentFrame = 0;
    this.resource = resource;
    // Add material
    this.material = new THREE.ShaderMaterial({
        uniforms: {
            texture: { type: "t", value: resource.texture },
            frames: { type: "fv1", value: [0] },
            num: { type: "f", value: resource.num },
            length: { type: "i", value: '1' }
        },
        vertexShader: document.getElementById('default-vs').textContent,
        fragmentShader: document.getElementById('sprite-fs').textContent
    });
    this.material.transparent = true;
    this.material.blending = THREE.NormalBlending;
    // Create Mesh
    this.mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(width, height, 0),
          this.material
    );
    this.position = this.mesh.position;
    this.position.z = z || 0;
}
// Move sprite to point (x, y)
Sprite.prototype.translate = function (x, y) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
}
// Rotate sprite at angle
Sprite.prototype.rotate = function (angle) {
    this.mesh.rotation.z = angle;
}
// Show frame / frames
Sprite.prototype.showFrames = function (i) {
    if (typeof (i) == 'object') {
        this.material.uniforms.frames.value = i;
        this.material.uniforms.length.value = i.length;
    } else {
        this.material.uniforms.frames.value = [i];
        this.material.uniforms.length.value = 1;
    }
}
// Animate frames
Sprite.prototype.startAnimation = function (frameArr, delay) {
    this.timer = 0;
    this.animate = function (delta) {
        this.timer += delta;
        var i = Math.floor(this.timer / delay) % frameArr.length;
        this.showFrames(frameArr[i]);
    }
}
Sprite.prototype.stopAnimation = function () {
    delete this.animate;
}