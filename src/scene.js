var Scene = function () {
    var width = window.innerWidth || 2,
        height = window.innerHeight || 2,
        windowHalfX = width / 2,
        windowHalfY = height / 2,
        self = this;
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, windowHalfX / windowHalfY, 1, 3000);
    this.camera.position.z = 4;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.autoClear = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight - 5);
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('keydown', function () {
        document.documentElement.webkitRequestFullScreen();
    });
    window.addEventListener('resize', function () {
        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;
        self.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        self.camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        self.camera.updateProjectionMatrix();
    }, false);
    this.sprites = [];
    this.subscribes = [];
    this.resources = [];
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
};

Scene.prototype.start = function () {
    var self = this;
    var animationFrame = function () {
        var delta = self.clock.getDelta();
        requestAnimationFrame(animationFrame);
        for (var i = 0; i < self.sprites.length; i++) {
            if (self.sprites[i].animate) {
                self.sprites[i].animate(delta);
            }
        }
        for (var i = 0; i < self.subscribes.length; i++) {
            self.subscribes[i](delta);
        }
        self.renderer.render(self.scene, self.camera);
    };
    animationFrame();
}

Scene.prototype.subscribe = function (lambda) {
    this.subscribes.push(lambda);
}

Scene.prototype.unsubscribe = function (lambda) {
    var i = this.subscribes.indexOf(lambda);
    this.subscribes = this.subscribes.slice(0, i).concat(this.subscribes.slice(i + 1));
}

Scene.prototype.add = function (sprite) {
    this.sprites.push(sprite);
    this.scene.add(sprite.mesh);
}

Scene.prototype.follow = function (sprite) {
    this.camera.position.x = sprite.position.x;
    this.camera.position.y = sprite.position.y;
}
