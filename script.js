document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('globeCanvas');

    //SETUP SCENE
    const scene = new THREE.Scene();

    //SETUP RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.offsetHeight, container.offsetHeight);
    scene.background = null;
    container.appendChild(renderer.domElement);

    //SETUP lights
    var light1 = new THREE.PointLight(0x9a1c1f, 0.75);
    light1.position.set(-150, 150, -50);
    var light2 = new THREE.PointLight(0x001e50, 0.75);
    light2.position.set(-400, 200, 150);
    var light3 = new THREE.PointLight(0x4c7397, 0.7);
    light3.position.set(100, 250, -100);
    scene.add(light1, light2, light3);

    //SETUP GEOMETRY
    const atmosphereShader = {
        'atmosphere': {
            uniforms: {},
            vertexShader: [
                'varying vec3 vNormal;',
                'void main() {',
                'vNormal = normalize( normalMatrix * normal );',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader: [
                'varying vec3 vNormal;',
                'void main() {',
                'float intensity = pow( 0.99 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 6.0 );',
                'gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity;',
                '}'
            ].join('\n')
        }
    };

    const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(atmosphereShader['atmosphere'].uniforms),
        vertexShader: atmosphereShader['atmosphere'].vertexShader,
        fragmentShader: atmosphereShader['atmosphere'].fragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    const atm = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atm.scale.set(1.05, 1.05, 1.05);
    scene.add(atm);
    atm.position.set(-.1, .1, 0);

    //setup globe
    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xeeeeee
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    //setup map overlay
    const loader = new THREE.TextureLoader();
    const overlayMaterial = new THREE.MeshBasicMaterial({
        map: loader.load('imgs/img-gray.png'),
        transparent: true
    });

    const overlaySphereGeometry = new THREE.SphereGeometry(2.003, 64, 64);
    const overlaySphere = new THREE.Mesh(overlaySphereGeometry, overlayMaterial);
    overlaySphere.castShadow = true;
    overlaySphere.receiveShadow = true;
    sphere.add(overlaySphere);

    //setup tubes
    var numPoints = 100;
    var start = new THREE.Vector3(0, 1.5, 1.3);
    var middle = new THREE.Vector3(.6, .6, 3.2);
    var end = new THREE.Vector3(1.5, -1, .8);
    var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);

    // const tubeMaterial = new THREE.MeshBasicMaterial({
    //     color: 0x9a1c1f
    // });

    const tubeMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color1: { type: 'vec3', value: new THREE.Color(0x7a0808) },
            color2: { type: 'vec3', value: new THREE.Color(0xff0000) }
        },
        vertexShader: `
            varying vec3 vUv; 
            void main() {
                vUv = position; 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vUv;
            void main() {
                gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
            }
        `,
        side: THREE.DoubleSide
    });

    const tube1 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh1 = new THREE.Mesh(tube1, tubeMaterial);
    sphere.add(curveMesh1);

    const tube2 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh2 = new THREE.Mesh(tube2, tubeMaterial);
    sphere.add(curveMesh2);
    curveMesh2.rotation.y = .75;

    const tube3 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh3 = new THREE.Mesh(tube3, tubeMaterial);
    sphere.add(curveMesh3);
    curveMesh3.rotation.y = 2.1;

    const tube4 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh4 = new THREE.Mesh(tube4, tubeMaterial);
    sphere.add(curveMesh4);
    curveMesh4.rotation.y = 2.3;

    const tube5 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh5 = new THREE.Mesh(tube5, tubeMaterial);
    sphere.add(curveMesh5);
    curveMesh5.rotation.y = 2.9;

    const tube6 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh6 = new THREE.Mesh(tube6, tubeMaterial);
    sphere.add(curveMesh6);
    curveMesh6.rotation.y = 7.1;

    const tube7 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh7 = new THREE.Mesh(tube7, tubeMaterial);
    sphere.add(curveMesh7);
    curveMesh7.rotation.y = 2.1;

    const tube8 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const curveMesh8 = new THREE.Mesh(tube8, tubeMaterial);
    sphere.add(curveMesh8);
    curveMesh8.rotation.y = 2.5;

    //SETUP camera
    const camera = new THREE.PerspectiveCamera(75, 900 / 900, 0.1, 1000);
    camera.position.z = 6;

    let renderCount = 0;
    let currentGrowing = 0;
    const tubes = [tube1, tube2, tube3, tube4, tube5, tube6, tube7, tube8]

    function GrowTube(index, renderCount) {
        renderCount = Math.ceil(renderCount / 3) * 3;
        tubes[index].setDrawRange(0, renderCount);
        if (index > 2) {
            tubes[index - 3].setDrawRange(renderCount, 10000);
        } else {
            tubes[(tubes.length - 3) + index].setDrawRange(renderCount, 10000);
        }
    }

    //ANIMATION LOOP
    const animate = function () {
        if (renderCount < 10000) {
            renderCount += 80;
            GrowTube(currentGrowing, renderCount);
        } else {
            renderCount = 0;
            if (currentGrowing >= tubes.length - 1) {
                currentGrowing = 0;
            } else {
                currentGrowing++;
            }
        }

        // Adicionando a rotação contínua do globo
        sphere.rotation.y += 0.01;  // Girando a esfera no eixo Y

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();

    // Função para adicionar o efeito de fade-in nas seções
    const fadeInSections = () => {
        const sections = document.querySelectorAll('.fade-in-on-scroll'); // Selecione todas as seções com a classe 'fade-in-on-scroll'

        // Crie um observador de interseção
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Verifique se o elemento está visível
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible'); // Adiciona a classe 'visible' para ativar a animação
                    });
                    observer.unobserve(entry.target); // Pára de observar este elemento após ele aparecer
                }
            });
        }, {
            threshold: 0.5 // O elemento será considerado "visível" quando 50% dele estiver na tela
        });

        // Comece a observar cada seção
        sections.forEach(section => {
            observer.observe(section);
        });
    };

    // Chame a função para inicializar o efeito
    fadeInSections();

    // BACKGROUND
    const STAR_COLOR = '#fff';
    const STAR_SIZE = 3;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 50;
    const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8;

    const canvas = document.querySelector( 'canvas' ),
            context = canvas.getContext( '2d' );

    let scale = 1, // device pixel ratio
        width,
        height;

    let stars = [];

    let pointerX,
        pointerY;

    let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    let touchInput = false;

    generate();
    resize();
    step();

    window.onresize = resize;

    function generate() {

        for( let i = 0; i < STAR_COUNT; i++ ) {
        stars.push({
            x: 0,
            y: 0,
            z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
        });
        }

    }

    function placeStar( star ) {

        star.x = Math.random() * width;
        star.y = Math.random() * height;

    }

    function recycleStar( star ) {

        let direction = 'z';

        let vx = Math.abs( velocity.x ),
            vy = Math.abs( velocity.y );

        if( vx > 1 || vy > 1 ) {
        let axis;

        if( vx > vy ) {
            axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
        }
        else {
            axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
        }

        if( axis === 'h' ) {
            direction = velocity.x > 0 ? 'l' : 'r';
        }
        else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
        }
        
        star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

        if( direction === 'z' ) {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
        }
        else if( direction === 'l' ) {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
        }
        else if( direction === 'r' ) {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
        }
        else if( direction === 't' ) {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
        }
        else if( direction === 'b' ) {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
        }

    }

    function resize() {

        scale = window.devicePixelRatio || 1;

        width = window.innerWidth * scale;
        height = window.innerHeight * scale;

        canvas.width = width;
        canvas.height = height;

        stars.forEach( placeStar );

    }

    function step() {

        context.clearRect( 0, 0, width, height );

        update();
        render();

        requestAnimationFrame( step );

    }

    function update() {

        velocity.tx *= 0.96;
        velocity.ty *= 0.96;

        velocity.x += ( velocity.tx - velocity.x ) * 0.8;
        velocity.y += ( velocity.ty - velocity.y ) * 0.8;

        stars.forEach( ( star ) => {

        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += ( star.x - width/2 ) * velocity.z * star.z;
        star.y += ( star.y - height/2 ) * velocity.z * star.z;
        star.z += velocity.z;
        
        // recycle when out of bounds
        if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
            recycleStar( star );
        }

        } );

    }

    function render() {

        stars.forEach( ( star ) => {

        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * 1;
        context.globalAlpha = 0.5 + 0.5*Math.random();
        context.strokeStyle = STAR_COLOR;

        context.beginPath();
        context.moveTo( star.x, star.y );

        var tailX = velocity.x * 2,
            tailY = velocity.y * 2;

        // stroke() wont work on an invisible line
        if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
        if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

        context.lineTo( star.x + tailX, star.y + tailY );

        context.stroke();

        } );
    }

    // Botão de rolagem para o topo
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Mostrar o botão quando rolar para baixo 20px
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.opacity = "1";
            scrollToTopBtn.style.pointerEvents = "all";
        } else {
            scrollToTopBtn.style.opacity = "0";
            scrollToTopBtn.style.pointerEvents = "none";
        }
    };

    // Rolar para o topo quando o botão for clicado
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});