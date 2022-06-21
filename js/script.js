// Three JS

window.addEventListener('load', init, false);

function init() {
  createWorld();
  createPrimitive();
  createGUI();
  //---
  animation();
}

var Theme = {
  _darkred: 0x111111
}

//--------------------------------------------------------------------

var scene, camera, renderer, container;
var start = Date.now();
var _width, _height;

function createWorld() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  //---
  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog(Theme._darkred, 8, 20);
  scene.background = new THREE.Color(Theme._darkred);
  //---
  camera = new THREE.PerspectiveCamera(55, _width / _height, 1, 1000);
  camera.position.z = 12;
  //---
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  });
  renderer.setSize(_width, _height);
  //---
  container = document.getElementById("container");
  container.appendChild(renderer.domElement);
  //---
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
  console.log('- resize -');
}

//--------------------------------------------------------------------

var mat;
var primitiveElement = function () {
  this.mesh = new THREE.Object3D();
  mat = new THREE.ShaderMaterial({
    wireframe: false,
    //fog: true,
    uniforms: {
      time: {
        type: "f",
        value: 0.0
      },
      pointscale: {
        type: "f",
        value: 0.0
      },
      decay: {
        type: "f",
        value: 0.0
      },
      complex: {
        type: "f",
        value: 0.0
      },
      waves: {
        type: "f",
        value: 0.0
      },
      eqcolor: {
        type: "f",
        value: 0.0
      },
      fragment: {
        type: "i",
        value: true
      },
      redhell: {
        type: "i",
        value: true
      }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });
  var geo = new THREE.IcosahedronBufferGeometry(3, 7);
  var mesh = new THREE.Points(geo, mat);

  //---
  this.mesh.add(mesh);
}

var _primitive;

function createPrimitive() {
  _primitive = new primitiveElement();
  scene.add(_primitive.mesh);
}

//--------------------------------------------------------------------

var options = {
  perlin: {
    vel: 0.002,
    speed: 0.00050,
    perlins: 1.0,
    decay: 0.10,
    complex: 0.30,
    waves: 20.0,
    eqcolor: 11.0,
    fragment: true,
    redhell: true
  },
  spin: {
    sinVel: 0.0,
    ampVel: 80.0,
  }
}

function createGUI() {
  var gui = new dat.GUI();
  var camGUI = gui.addFolder('Camera');
  //cam.add(, 'speed', 0.0, 30.00).listen();
  camGUI.add(camera.position, 'z', 3, 20).name('Zoom').listen();
  camGUI.add(options.perlin, 'vel', 0.000, 0.02).name('Velocity').listen();
  //camGUI.open();

  var mathGUI = gui.addFolder('Math Options');
  mathGUI.add(options.spin, 'sinVel', 0.0, 0.50).name('Sine').listen();
  mathGUI.add(options.spin, 'ampVel', 0.0, 90.00).name('Amplitude').listen();
  //mathGUI.open();

  var perlinGUI = gui.addFolder('Setup Perlin Noise');
  perlinGUI.add(options.perlin, 'perlins', 1.0, 5.0).name('Size').step(1);
  perlinGUI.add(options.perlin, 'speed', 0.00000, 0.00050).name('Speed').listen();
  perlinGUI.add(options.perlin, 'decay', 0.0, 1.00).name('Decay').listen();
  perlinGUI.add(options.perlin, 'waves', 0.0, 20.00).name('Waves').listen();
  perlinGUI.add(options.perlin, 'fragment', true).name('Fragment');
  perlinGUI.add(options.perlin, 'complex', 0.1, 1.00).name('Complex').listen();
  perlinGUI.add(options.perlin, 'redhell', true).name('Electroflow');
  perlinGUI.add(options.perlin, 'eqcolor', 0.0, 15.0).name('Hue').listen();
  perlinGUI.open();
}

//--------------------------------------------------------------------

function animation() {
  requestAnimationFrame(animation);
  var performance = Date.now() * 0.003;

  _primitive.mesh.rotation.y += options.perlin.vel;
  _primitive.mesh.rotation.x = (Math.sin(performance * options.spin.sinVel) * options.spin.ampVel) * Math.PI / 180;
  //---
  mat.uniforms['time'].value = options.perlin.speed * (Date.now() - start);
  mat.uniforms['pointscale'].value = options.perlin.perlins;
  mat.uniforms['decay'].value = options.perlin.decay;
  mat.uniforms['complex'].value = options.perlin.complex;
  mat.uniforms['waves'].value = options.perlin.waves;
  mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
  mat.uniforms['fragment'].value = options.perlin.fragment;
  mat.uniforms['redhell'].value = options.perlin.redhell;
  //---
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
/*------------------------------------------------------------- 
|
|ONCLICK
|
 ------------------------------------------------------------- */

var delay = 500;

var delay2 = 1000;


function zoom() {
  if (camera.position.z > 6) {
    camera.position.z -= 1;
    setTimeout(function () {
      camera.position.z -= 1;

    }, delay);
    setTimeout(function () {
      camera.position.z -= 1;

    }, delay2);
  }
}

function dezoom() {
  if (camera.position.z < 17) {
    camera.position.z += 1;
    setTimeout(function () {
      camera.position.z += 1;

    }, delay);
    setTimeout(function () {
      camera.position.z += 1;

    }, delay2);
  }
}

/*------------------------------------------------------------- 
|
|BUTTON
|
 ------------------------------------------------------------- */
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
const setupExamples = () => {
  // -----------------
  // with border -----
  // -----------------
  new NoiseButton({
    element: document.querySelector(".noise_btn--border"),
    polygon: "10, 30, 10, 30",
    wavesPos: {
      x: 0,
      y: 0
    },
    borderWidth: 3,
    borderColor: "0x0ffff",
    backgroundAlpha: 1,
    wavesAlpha: 0.4,
    waves: "https://cdn.rawgit.com/av-dev/noise-button/930cbd38/Z3hB7It.png",
    displacementMap: "https://cdn.rawgit.com/av-dev/noise-button/930cbd38/displace-map.jpeg"
  });
};

class NoiseButton extends PIXI.Application {
  constructor(options) {
    super({
      autoStart: false,
      autoResize: true,
      transparent: true
    });
    _defineProperty(this, "resize",
      NoiseButton.debounce(
        async () => {
            if (this.setSize()) {
              this.container.removeChildren(0, this.container.children.length - 1);

              this.addGraphics();
              this.createTimeLine();
              this.render();
            }
          },
          this,
          100));
    this.options = Object.assign({
      backgroundColor: 0x0ffff,
      backgroundAlpha: 1,
      polygon: "100, 100, 100, 100",
      borderColor: 0x0ffff,
      borderWidth: 10,
      wavesAlpha: 10,
      displacementScale: {
        x: 30,
        y: 50
      },
      displacementMap: "http://digitalfreepen.com/images/2017/whitenoise.png"
    }, options); // example of the received polygon string
    // '30, 0, 30, 0'
    this.polygon = this.options.polygon.replace(/\s/g, "").split(",").map(el => {
      const number = el | 0;
      return number > this.options.borderWidth ? number - this.options.borderWidth / 2 : number;
    });
    this.offset = 20;
    this.animate = false;
    return this.createCanvas();
  }
  async createCanvas() {
    this.options.element.classList.add("noise-container");
    this.view.classList.add("noise-canvas");
    this.options.element.appendChild(this.view);
    this.container = new PIXI.Container();
    this.stage.addChild(this.container);
    if (this.options.waves) {
      const wavesTexture = await this.loadTexture(this.options.waves);
      this.waves = new PIXI.Sprite(wavesTexture);
    }
    this.noiseSprite = PIXI.Sprite.fromImage(this.options.displacementMap);
    this.setSize();
    this.addGraphics();
    this.bindEvents();
    this.render();
    this.options.element.classList.add("canvas-ready");
  }
  static debounce(func, context, wait, immediate) {
    let timeout;
    return () => {
      const args = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  addGraphics() {
    this.container.addChild(this.getPolygon(true));
    if (this.options.waves) this.drawWaves();
    const rect = new PIXI.Graphics();
    rect.beginFill(0, 0);
    rect.drawRect(0, 0, this.width, this.width);
    this.container.addChild(rect);
    this.container.addChild(this.getPolygon());
    this.setMask();
    this.addFilter();
  }
  setMask() {
    let mask = this.getPolygon();
    this.stage.addChild(mask);
    this.container.mask = mask;
  }
  drawWaves() {
    this.waves.alpha = 1 - this.options.wavesAlpha;
    this.waves.y = this.height * this.options.wavesPos.y;
    this.container.addChild(this.waves);
    this.waves.width = this.waves.height = this.width;
  }
  setSize() {
    const parentWidth = this.options.element.offsetWidth;
    const parentHeight = this.options.element.offsetHeight;
    this.width = parentWidth + this.offset * 2;
    this.height = parentHeight + this.offset * 2;
    if (this.oldWidth !== this.width) {
      this.renderer.resize(this.width, this.height);
      this.oldWidth = this.width;
      return true;
    } else return false;
  }
  loadTexture(src) {
    return new Promise(resolve => {
      const loader = new PIXI.loaders.Loader();
      loader.add("waves", src);
      loader.load((loader, resources) => resolve(resources.waves.texture));
    });
  }

  addFilter() {
    this.container.addChild(this.noiseSprite);

    this.noiseFilter = new PIXI.filters.DisplacementFilter(this.noiseSprite);
    this.container.filters = [this.noiseFilter];
    this.noiseSprite.position.x = -this.width;
    this.noiseSprite.width = this.width * 3;
    this.noiseFilter.scale.x = 0;
    this.noiseFilter.scale.y = 0;
  }

  createTimeLine() {
    this.timeline = new TimelineMax({
      onUpdate: this.render.bind(this),
      paused: true,
      onStart: () => this.animate = true,
      onComplete: () => this.animate = false
    }).


    to(this.noiseFilter.scale, 0.4, {
      x: this.options.displacementScale.x,
      y: this.options.displacementScale.y
    }).


    fromTo(
      this.noiseSprite,
      1, {
        x: -(this.noiseSprite.width * 0.88)
      }, {
        x: 5
      },
      "-=.2").


    to(this.noiseFilter.scale, 0.6, {
      x: 0,
      y: 0
    }, "-=.2");
  }

  play() {
    if (!this.animate) this.timeline.play(0);
  }

  bindEvents() {
    this.createTimeLine();
    this.options.element.addEventListener("mouseenter", this.play.bind(this));
    window.addEventListener("resize", this.resize.bind(this));
  }

  getPolygon(background) {
    const points = this.polygon;
    const graphics = new PIXI.Graphics();
    const width = this.width - this.offset * 2 - this.options.borderWidth;
    const height = this.height - this.offset * 2 - this.options.borderWidth;

    graphics.position.x = this.offset + this.options.borderWidth / 2;
    graphics.position.y = this.offset + this.options.borderWidth / 2;

    const arrayLines = [
      [0, points[0]],
      [points[0], 0],
      [width - points[1], 0],
      [width, points[1]],
      [width, height - points[2]],
      [width - points[2], height],
      [points[3], height],
      [0, height - points[3]],
      [0, points[0]]
    ];


    graphics.lineStyle(this.options.borderWidth, this.options.borderColor);

    graphics.beginFill(
      this.options.backgroundColor,
      background ? 1 - this.options.backgroundAlpha : 0);


    for (let i = 0, prevCoords = []; i < arrayLines.length; i++) {
      if (
        prevCoords.length &&
        prevCoords[0] === arrayLines[i][0] &&
        prevCoords[1] === arrayLines[i][1])

        continue;
      if (i === 0) {
        graphics.moveTo(arrayLines[i][0], arrayLines[i][1]);
        prevCoords = arrayLines[i];
        continue;
      }

      prevCoords = arrayLines[i];
      graphics.lineTo(arrayLines[i][0], arrayLines[i][1]);
    }

    graphics.endFill();

    return graphics;
  }
}


setupExamples();
