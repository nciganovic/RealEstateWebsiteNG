import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor() { }
  
  public get Bio() : string {
    let text = "I'm Nikola Ciganović 40/18, a Web Developer from Belgrade, Serbia.";
    text += "I'm currently a college student in ICT College of Vocational studies, studying Web Development.";
    text += "For myslef I can say that I am skilled Full Stack .NET developer with hands-on experience in the full lifecycle of the software development process.";
    text += "My ability to quickly learn new topics comes from my experience with different technologies. Challenges in projects are something";
    text += "I am always looking forward to because this helps me grow as a person and as a software developer.";
    return text; 
  }

  ngOnInit(): void {
  }

}
