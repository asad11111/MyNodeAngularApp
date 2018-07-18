import { Component } from '@angular/core';
import { test } from '../../assets/js/UiScript'; 
import { Router } from "@angular/router";
@Component({
  selector: 'uml-app',
  templateUrl: './umlapp.component.html',
  styleUrls: ['./umlapp.component.css']
})
export class UmlComponent {
  title = 'uml app';
  public a='a';

  constructor(private router:Router) {
    this.aaa(this.a);
   
  }


  public aaa(a)
  {
    if(a=='c')
    {
      test(a);
      location.reload();
    }
    if(a=='a')
    {
       test(a);
    
    } 
  }

}
