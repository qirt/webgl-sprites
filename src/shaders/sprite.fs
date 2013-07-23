uniform float num;
uniform float current;
uniform sampler2D texture1;
varying vec2 vUv;
void main() {
    vec2 pos = vec2((current / num) + vUv.x / num, vUv.y);
    gl_FragColor = texture2D(texture1, pos);
}