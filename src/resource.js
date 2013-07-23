var Resource = function (url, num) {
    this.texture = THREE.ImageUtils.loadTexture(url);
    this.num = num;
};