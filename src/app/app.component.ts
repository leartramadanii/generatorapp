import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamComponent } from './team/team.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newMemberName = "";
  members: string[] = [];
  errorMesage = '';
  numberOfTeams: number | "" = ""; 
  teams: string[][] = []
  
  onInput(member: string) {
    this.newMemberName= member;
    
  }

  onNumberOfTeamsInput(value: string){
    this.numberOfTeams = Number(value)
  }

  addMember() {

    if(!this.newMemberName) {
      this.errorMesage = "Name can't be empty";
      return;
    }


    this.errorMesage= '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  generateTeams() {
    if(!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMesage = "Invalid number"
      return
    }
    if(this.members.length < this.numberOfTeams) {
      this.errorMesage = "Not enough members";
      return;
    }

    this.errorMesage = '';
    const allMembers = [...this.members]

    while(allMembers.length) { 
      for(let i= 0; i < this.numberOfTeams; i++) {

        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];
        
        if(!member)break;

        if(this.teams[i]) {
          this.teams[i].push(member)
        }else {
          this.teams[i] = [member]
        }
      }
    }

    this.members = [];
    this.numberOfTeams = '';

  }
}
