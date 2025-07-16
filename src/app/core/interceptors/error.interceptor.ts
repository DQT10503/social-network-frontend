import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);
        toastr.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else if (error.status === 403) {
        toastr.error('Bạn không có quyền thực hiện thao tác này.');
      } else if (error.status === 404) {
        toastr.error('Không tìm thấy tài nguyên yêu cầu.');
      } else if (error.status === 500) {
        toastr.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      } else {
        toastr.error(error.error?.message || 'Đã có lỗi xảy ra.');
      }
      return throwError(() => error);
    })
  );
}; 