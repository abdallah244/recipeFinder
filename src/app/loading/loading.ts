import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare const THREE: any;
declare const gsap: any;

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.html',
  styleUrls: ['./loading.css']
})
export class LoadingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  @ViewChild('loadingContainer', { static: true }) loadingContainer!: ElementRef;
  
  progress: number = 0;
  currentTip: number = 0;
  loadingTips: string[] = [
    "Sharpening knives...",
    "Heating up the oven...",
    "Chopping fresh herbs...",
    "Measuring ingredients...",
    "Mixing flavors...",
    "Preparing the secret sauce..."
  ];
  
  private scene: any;
  private camera: any;
  private renderer: any;
  private particles: any[] = [];
  private animationId: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.rotateTips();
    this.startProgress();
  }

  ngAfterViewInit() {
    this.initThreeJS();
    this.createParticles();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initThreeJS() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  private createParticles() {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.x = (Math.random() - 0.5) * 10;
      particle.position.y = (Math.random() - 0.5) * 10;
      particle.position.z = (Math.random() - 0.5) * 10;
      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      this.particles.push(particle);
      this.scene.add(particle);
    }
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    this.particles.forEach(particle => {
      particle.position.add(particle.velocity);
      
      // Boundary check
      if (Math.abs(particle.position.x) > 5) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 5) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 5) particle.velocity.z *= -1;
      
      particle.rotation.x += 0.01;
      particle.rotation.y += 0.01;
    });

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private rotateTips() {
    setInterval(() => {
      this.currentTip = (this.currentTip + 1) % this.loadingTips.length;
    }, 3000);
  }

  private startProgress() {
    const interval = setInterval(() => {
      this.progress += 2;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.navigateToIntro();
      }
    }, 100);
  }

  private navigateToIntro() {
    gsap.to(this.loadingContainer.nativeElement, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        this.router.navigate(['/intro']);
      }
    });
  }
}