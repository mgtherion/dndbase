import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';
import { SkillDetailsComponent } from '../skill-details/skill-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css'],
  providers: [ SkillService ]
})
export class SkillListComponent implements OnInit {

  skills: Skill[]
  selectedSkill: Skill
  private sub: Subscription;

  constructor(private skillService: SkillService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.skillService
        .getSkills()
        .then((skills: Skill[]) => {

          this.skills = skills.map((skill) => {
            if (!skill.tooltip) {
              skill.tooltip = 'Author is too lazy to write a tooltip';
            }
            if (!skill.description) {
              skill.description = 'Author is too lazy to write a description';
            }
            return skill;
          });

          //get selected skill from url query parameter
          this.sub = this.route.queryParams.subscribe(params => {
            if (params.id && !(this.selectedSkill)) {
              this.selectedSkill = this.skills.filter(item => item._id == params.id)[0];
            }
          });
        });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getIndexOfSkill = (skillId: String) => {
    return this.skills.findIndex((skill) => {
      return skill._id === skillId;
    });
  }

  selectSkill(skill: Skill) {
    this.selectedSkill = skill;
    this.router.navigate([], {queryParams:{id:skill._id}});
  }

  createNewSkill() {
    var skill: Skill = {
      name: '',
      tooltip: '',
      description: ''
    }

    this.selectSkill(skill);
  }

  deleteSkill = (skillId: String) => {
    var idx = this.getIndexOfSkill(skillId);
    if (idx !== -1) {
      this.skills.splice(idx, 1);
      this.selectSkill(null);
    }
    return this.skills;
  }

  addSkill = (skill: Skill) => {
    this.skills.push(skill);
    this.selectSkill(skill);
    return this.skills;
  }

  updateSkill = (skill: Skill) => {
    var idx = this.getIndexOfSkill(skill._id);
    if (idx !== -1) {
      this.skills[idx] = skill;
      this.selectSkill(skill);
    }
    return this.skills;
  }

}
