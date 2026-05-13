import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  activeSection = 'hero';
  private readonly sectionIds = ['hero', 'about', 'projects', 'contact'];

  ngAfterViewInit(): void {
    this.updateActiveSection();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateActiveSection();
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    const sectionId = window.location.hash.replace('#', '');

    if (this.sectionIds.includes(sectionId)) {
      this.activeSection = sectionId;
    }
  }

  setActiveSection(sectionId: string): void {
    this.activeSection = sectionId;
  }

  private updateActiveSection(): void {
    const activationPoint = window.innerHeight * 0.35;
    let currentSection = this.sectionIds[0];

    for (const sectionId of this.sectionIds) {
      const section = document.getElementById(sectionId);

      if (!section) {
        continue;
      }

      if (section.getBoundingClientRect().top <= activationPoint) {
        currentSection = sectionId;
      }
    }

    this.activeSection = currentSection;
  }
}
