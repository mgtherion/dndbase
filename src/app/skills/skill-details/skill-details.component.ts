import { Component, Input } from '@angular/core';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';
import { Globals } from '../../globals';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.css']
})

export class SkillDetailsComponent {
  @Input()
  skill: Skill;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private skillService: SkillService, public globals: Globals) {}

  public options: any = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontSize',
                      'color', '|', 'specialCharacters', 'clearFormatting', '|', 'undo', 'redo'],
    quickInsertButtons: [],
    quickInsertTags: [],
    placeholderText: ''
  }

  ngOnInit() {
    //this.globals.editMode.subscribe(mode => console.log(mode));
  }

  createSkill(skill: Skill) {
    this.skillService.createSkill(skill).then((newSkill: Skill) => {
      this.createHandler(newSkill);
    });
  }

  updateSkill(skill: Skill): void {
    this.skillService.updateSkill(skill).then((updatedSkill: Skill) => {
      this.updateHandler(updatedSkill);
    });
  }

  deleteSkill(skillId: String): void {
    this.skillService.deleteSkill(skillId).then((deletedSkillId) => {
      this.deleteHandler(deletedSkillId);
    });
  }
}
