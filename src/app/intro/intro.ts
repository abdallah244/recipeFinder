import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare const THREE: any;

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.html',
  styleUrls: ['./intro.css']
})
export class IntroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particlesBg', { static: true }) particlesBg!: ElementRef;
  @ViewChild('introContainer', { static: true }) introContainer!: ElementRef;

  isLoaded = false;

  features = [
    { icon: '🔍', title: 'Smart Search', description: 'Find recipes by ingredients' },
    { icon: '⭐', title: 'Save Favorites', description: 'Keep your best recipes' },
    { icon: '👨‍🍳', title: 'Chef Mode', description: 'Create your own recipes' }
  ];

  private scene: any;
  private camera: any;
  private renderer: any;
  private particleSystem: any;
  private particlesVelocity: any[] = [];
  private animationId: number = 0;
  private frameCount = 0;

  private resizeHandler = this.onWindowResize.bind(this);

  constructor(private router: Router, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJS();
    });

    this.loadContent();
  }

  ngOnDestroy() {
    this.cleanupResources();
  }

  private initThreeJS() {
    if (typeof THREE === 'undefined') {
      console.warn('THREE.js not available, using optimized CSS fallback');
      this.createOptimizedCssBackground();
      return;
    }

    try {
      this.setupThreeScene();
      this.createOptimizedParticles();
      this.startAnimation();
    } catch (error) {
      console.error('Error initializing Three.js:', error);
      this.createOptimizedCssBackground();
    }
  }

  private setupThreeScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.particlesBg.nativeElement,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  private createOptimizedParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    const colors = new Float32Array(100 * 3);

    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.8, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      this.particlesVelocity.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      );
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  private startAnimation() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.frameCount++;

      if (this.frameCount % 2 === 0) {
        this.updateParticles();
        this.renderer.render(this.scene, this.camera);
      }
    };

    animate();
  }

  private updateParticles() {
    if (!this.particleSystem) return;

    const positions = this.particleSystem.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const v = this.particlesVelocity[i / 3];

      positions[i] += v.x;
      positions[i + 1] += v.y;
      positions[i + 2] += v.z;

      if (Math.abs(positions[i]) > 5) v.x *= -1;
      if (Math.abs(positions[i + 1]) > 5) v.y *= -1;
      if (Math.abs(positions[i + 2]) > 5) v.z *= -1;
    }

    this.particleSystem.geometry.attributes.position.needsUpdate = true;
  }

  private createOptimizedCssBackground() {
    const container = this.particlesBg.nativeElement;
    container.innerHTML = '';
    container.style.background = 'radial-gradient(circle at center, #1a2a6c 0%, #2c3e50 100%)';
    container.style.willChange = 'transform';
  }

  private onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  private loadContent() {
    setTimeout(() => {
      this.isLoaded = true;
      this.animateContent();
    }, 300);
  }

  private animateContent() {
    const elements = document.querySelectorAll('.content-element');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      (el as HTMLElement).classList.add('animate-in');
    });
  }

  private cleanupResources() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.particleSystem) {
      this.particleSystem.geometry.dispose();
      this.particleSystem.material.dispose();
    }

    window.removeEventListener('resize', this.resizeHandler);
  }

  startApp() {
    this.introContainer.nativeElement.style.opacity = '0';
    this.introContainer.nativeElement.style.transition = 'opacity 0.4s ease';

    setTimeout(() => {
      this.router.navigate(['/auth']);
    }, 400);
  }
}
