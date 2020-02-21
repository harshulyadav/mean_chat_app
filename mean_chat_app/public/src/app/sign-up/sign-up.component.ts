import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GuestService } from '../services/guest.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {

    signUpForm: FormGroup;
    loginForm: FormGroup;
    showLoginForm = true;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private guestService: GuestService,
      private toastr: ToastrService
    ) {
      this.signUpForm = this.fb.group({
        first_name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
        confirm_Password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]]
      }, {validator: this.checkPasswords });

      this.loginForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })

    }

    ngOnInit() {

    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
      let pass = group.get('password').value;
      let confirmPass = group.get('confirm_Password').value;
      return pass === confirmPass ? null : group.get('confirm_Password').setErrors({notMatched: true});
    }

    signUp() {
      if(this.signUpForm.status === 'VALID') {
        this.guestService.user_sign_up(this.signUpForm.value).subscribe((response: any) => {
          if(response.code === 200) {
            this.toastr.success(response.message, 'Success');
          } else {
            this.toastr.error(response.message, 'Failure');
          }
        }, error => {
          
        })
      }
    }

    login() {
      if(this.loginForm.status == 'VALID') {
        this.guestService.user_login(this.loginForm.value).subscribe((response: any) => {
          if(response.code === 200) {
            this.toastr.success(response.message, 'Success');
            localStorage.setItem('loc-usr', JSON.stringify(response.data));
            this.router.navigate(['/chat-room']);
          } else {
            this.toastr.error(response.message, 'Failure');
          }
        })
      }
    }

}