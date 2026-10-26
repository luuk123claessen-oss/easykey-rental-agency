/* A rotating emerald-glass key, built procedurally and drawn with plain WebGL (no libraries, ~5 KB).
   Loaded lazily when the "How it works" section is near the viewport. Rotation follows scroll, with a gentle idle drift. */
(function () {
  'use strict';

  function mat4Perspective(fov, aspect, near, far) {
    var f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function mat4Mul(a, b) {
    var o = new Array(16);
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
      o[j * 4 + i] = a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] + a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
    }
    return o;
  }
  function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; }
  function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; }
  function rotZ(a) { var c = Math.cos(a), s = Math.sin(a); return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }
  function trans(x, y, z) { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]; }

  /* ---- geometry ---- */
  var pos = [], nor = [], idx = [];
  function vert(p, n) { pos.push(p[0], p[1], p[2]); nor.push(n[0], n[1], n[2]); return pos.length / 3 - 1; }

  function torus(cx, cy, R, r, seg, tseg) {
    var base = pos.length / 3;
    for (var i = 0; i <= seg; i++) {
      var a = i / seg * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
      for (var j = 0; j <= tseg; j++) {
        var v = j / tseg * Math.PI * 2, cv = Math.cos(v), sv = Math.sin(v);
        vert([cx + (R + r * cv) * ca, cy + (R + r * cv) * sa, r * sv], [cv * ca, cv * sa, sv]);
      }
    }
    for (i = 0; i < seg; i++) for (j = 0; j < tseg; j++) {
      var a0 = base + i * (tseg + 1) + j, b0 = a0 + tseg + 1;
      idx.push(a0, b0, a0 + 1, b0, b0 + 1, a0 + 1);
    }
  }
  function cylinderX(x0, x1, r, seg) {
    var base = pos.length / 3;
    for (var i = 0; i <= seg; i++) {
      var t = i / seg * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
      vert([x0, r * c, r * s], [0, c, s]);
      vert([x1, r * c, r * s], [0, c, s]);
    }
    for (i = 0; i < seg; i++) {
      var a = base + i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    [[x1, 1], [x0, -1]].forEach(function (cap) {
      var ci = vert([cap[0], 0, 0], [cap[1], 0, 0]), first = pos.length / 3;
      for (var k = 0; k <= seg; k++) {
        var tt = k / seg * Math.PI * 2;
        vert([cap[0], r * Math.cos(tt), r * Math.sin(tt)], [cap[1], 0, 0]);
      }
      for (k = 0; k < seg; k++) { if (cap[1] > 0) idx.push(ci, first + k, first + k + 1); else idx.push(ci, first + k + 1, first + k); }
    });
  }
  function box(cx, cy, cz, sx, sy, sz) {
    var hx = sx / 2, hy = sy / 2, hz = sz / 2;
    var faces = [
      [[1, 0, 0], [[hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz], [hx, -hy, hz]]],
      [[-1, 0, 0], [[-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz], [-hx, -hy, -hz]]],
      [[0, 1, 0], [[-hx, hy, -hz], [-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz]]],
      [[0, -1, 0], [[-hx, -hy, hz], [-hx, -hy, -hz], [hx, -hy, -hz], [hx, -hy, hz]]],
      [[0, 0, 1], [[-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]]],
      [[0, 0, -1], [[hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz]]]
    ];
    faces.forEach(function (f) {
      var b = pos.length / 3;
      f[1].forEach(function (p) { vert([cx + p[0], cy + p[1], cz + p[2]], f[0]); });
      idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
    });
  }

  torus(-1.9, 0, 0.95, 0.3, 72, 28);          // bow
  cylinderX(-0.95, 2.75, 0.17, 32);           // shaft
  box(1.55, -0.3, 0, 0.36, 0.5, 0.26);        // bit
  box(2.05, -0.42, 0, 0.36, 0.74, 0.26);
  box(2.55, -0.27, 0, 0.36, 0.44, 0.26);

  var VS = 'attribute vec3 p;attribute vec3 n;uniform mat4 mvp;uniform mat4 mv;varying vec3 vn;varying vec3 vp;' +
    'void main(){vn=normalize((mv*vec4(n,0.0)).xyz);vp=(mv*vec4(p,1.0)).xyz;gl_Position=mvp*vec4(p,1.0);}';
  var FS = 'precision mediump float;varying vec3 vn;varying vec3 vp;uniform float back;' +
    'void main(){vec3 N=normalize(vn);if(back>0.5)N=-N;vec3 V=normalize(-vp);' +
    'float fr=pow(1.0-max(dot(N,V),0.0),2.4);' +
    'vec3 deep=vec3(0.02,0.16,0.12),mid=vec3(0.09,0.43,0.31),sage=vec3(0.73,0.82,0.76);' +
    'float sky=N.y*0.5+0.5;vec3 env=mix(vec3(0.02,0.07,0.06),sage,pow(sky,2.2));' +
    'vec3 L1=normalize(vec3(-0.5,0.8,0.6));vec3 L2=normalize(vec3(0.7,-0.2,0.5));' +
    'float s1=pow(max(dot(reflect(-L1,N),V),0.0),48.0);float s2=pow(max(dot(reflect(-L2,N),V),0.0),24.0);' +
    'vec3 col=mix(deep,mid,0.35+0.65*sky)+env*fr*0.9+sage*(s1*0.95+s2*0.35);' +
    'float a=back>0.5?0.32:clamp(0.62+fr*0.55+s1,0.0,1.0);' +
    'gl_FragColor=vec4(col*a,a);}';

  function compile(gl, type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }

  window.PDKey = {
    init: function (canvas) {
      var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true, powerPreference: 'low-power' });
      if (!gl) return null;
      var vs = compile(gl, gl.VERTEX_SHADER, VS), fs = compile(gl, gl.FRAGMENT_SHADER, FS);
      if (!vs || !fs) return null;
      var prog = gl.createProgram();
      gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
      gl.useProgram(prog);

      var vbo = gl.createBuffer();
      var data = new Float32Array(pos.length * 2);
      for (var i = 0; i < pos.length / 3; i++) {
        data.set(pos.slice(i * 3, i * 3 + 3), i * 6);
        data.set(nor.slice(i * 3, i * 3 + 3), i * 6 + 3);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      var ibo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      var big = pos.length / 3 > 65535;
      if (big && !gl.getExtension('OES_element_index_uint')) return null;
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, big ? new Uint32Array(idx) : new Uint16Array(idx), gl.STATIC_DRAW);
      var iType = big ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;

      var aP = gl.getAttribLocation(prog, 'p'), aN = gl.getAttribLocation(prog, 'n');
      gl.enableVertexAttribArray(aP); gl.enableVertexAttribArray(aN);
      gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 24, 0);
      gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 24, 12);
      var uMvp = gl.getUniformLocation(prog, 'mvp'), uMv = gl.getUniformLocation(prog, 'mv'), uBack = gl.getUniformLocation(prog, 'back');
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.CULL_FACE);

      var ctrl = { progress: 0, running: false, raf: 0, t0: performance.now() };
      function resize() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        gl.viewport(0, 0, w, h);
      }
      function draw(now) {
        resize();
        var t = (now - ctrl.t0) / 1000;
        var angle = ctrl.progress * Math.PI * 2 + Math.sin(t * 0.45) * 0.18 + t * 0.12;
        var model = mat4Mul(rotZ(-0.32), mat4Mul(rotX(0.28 + Math.sin(t * 0.3) * 0.05), mat4Mul(rotY(angle), trans(-0.4, 0, 0))));
        var view = mat4Mul(trans(0, 0, -7.2), model);
        var proj = mat4Perspective(0.5, canvas.width / canvas.height, 0.1, 40);
        var mvp = mat4Mul(proj, view);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniformMatrix4fv(uMv, false, new Float32Array(view));
        gl.uniformMatrix4fv(uMvp, false, new Float32Array(mvp));
        gl.disable(gl.DEPTH_TEST);
        gl.cullFace(gl.FRONT); gl.uniform1f(uBack, 1);
        gl.drawElements(gl.TRIANGLES, idx.length, iType, 0);
        gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
        gl.cullFace(gl.BACK); gl.uniform1f(uBack, 0);
        gl.drawElements(gl.TRIANGLES, idx.length, iType, 0);
      }
      function loop(now) { if (!ctrl.running) return; draw(now); ctrl.raf = requestAnimationFrame(loop); }
      ctrl.start = function () { if (ctrl.running) return; ctrl.running = true; ctrl.raf = requestAnimationFrame(loop); };
      ctrl.stop = function () { ctrl.running = false; cancelAnimationFrame(ctrl.raf); };
      ctrl.drawOnce = function () { draw(performance.now()); };
      return ctrl;
    }
  };
})();
