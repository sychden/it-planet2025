import { Component, inject } from '@angular/core';
import { OrgItem } from '../../interfaces/org.interface';
import { OrgCardComponent } from "../../components/org-card/org-card.component";
import { CommonModule } from '@angular/common';
import { ModerateService } from '../../Services/moderate.service';

@Component({
  selector: 'app-organization-verification',
  standalone: true,
  imports: [OrgCardComponent, CommonModule],
  templateUrl: './organization-verification.component.html',
  styleUrl: './organization-verification.component.css'
})
export class OrganizationVerificationComponent {
  orgs: OrgItem[] = []
  moderationService = inject(ModerateService)
  ngOnInit(): void {
    this.loadNews()
    
    
  }
  loadNews(): void {
    this.moderationService.getOrgs().subscribe((data) => {
      this.orgs = data; 
  });
    
  }
}
