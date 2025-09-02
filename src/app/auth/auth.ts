import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, NgZone, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var gsap: any;
declare var THREE: any;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent implements AfterViewInit, OnDestroy {
  @ViewChild('authContainer', { static: true }) authContainer!: ElementRef;
  @ViewChild('floatingIcons', { static: true }) floatingIcons!: ElementRef;

  isLoaded = false;
  private renderer: any;
  private animationId: any;

  constructor(private router: Router, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initFloatingBackground();
    });

    setTimeout(() => {
      this.isLoaded = true;
      this.animateContent();
    }, 200);
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) this.renderer.dispose();
  }

  private initFloatingBackground() {
    const container = this.floatingIcons.nativeElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 120; 
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    
    const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      colors[i * 3] = Math.random();       
      colors[i * 3 + 1] = Math.random();   
      colors[i * 3 + 2] = 1;               
    }
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 6;

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0015;
      particlesMesh.rotation.x += 0.0007;

      this.renderer.render(scene, camera);
    };

    animate();

    
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  private animateContent() {
    const elements = document.querySelectorAll('.auth-element');

    gsap.fromTo(elements,
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }

  selectRole(role: string) {
    this.authContainer.nativeElement.style.opacity = '0';
    this.authContainer.nativeElement.style.transition = 'opacity 0.4s ease';

    setTimeout(() => {
      if (role === 'user') {
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/admin/login']);
      }
    }, 400);
  }

  @HostListener('document:keydown.enter')
  handleEnterKey() {
    this.selectRole('user');
  }
}
