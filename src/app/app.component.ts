import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any = {}
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      companies: this.fb.array([])
    })


  }

  ngOnInit() {
    this.setCompanies();
  }
  addNewCompany() {
    let control = <FormArray>this.myForm.controls.companies;
    control.push(
      this.fb.group({
        company: [''],
        projects: this.fb.array([])
      })
    )
  }

  deleteCompany(index) {
    let control = <FormArray>this.myForm.controls.companies;
    control.removeAt(index)
  }

  addNewProject(control) {
    control.push(
      this.fb.group({
        projectName: ['']
      }))
  }

  deleteProject(control, index) {
    control.removeAt(index)
  }

  async setCompanies() {
    await new Promise((res,rej)=>{
      this.http.get("https://raw.githubusercontent.com/Avinashdante/sw/master/datFile").subscribe((data: any) => {
        this.data = data
        res("Resolved Promise")
      })
    })
    let control = <FormArray>this.myForm.controls.companies;
    console.log(this.data)
    this.data.companies.forEach(x => {
      control.push(this.fb.group({
        company: x.company,
        projects: this.setProjects(x)
      }))
    })
  }

  setProjects(x) {
    let arr = new FormArray([])
    x.projects.forEach(y => {
      arr.push(this.fb.group({
        projectName: y.projectName
      }))
    })
    return arr;
  }
}


