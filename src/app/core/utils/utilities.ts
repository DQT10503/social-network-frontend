/**
 * Class chứa các utility methods dùng chung cho toàn bộ ứng dụng
 */
export class Utilities {
  /**
   * Map dữ liệu từ API response sang interface
   * @param data - Dữ liệu từ API
   * @param mapper - Hàm map dữ liệu
   * @returns Dữ liệu đã được map theo interface
   */
  static mapToInterface<T, R>(data: T, mapper: (data: T) => R): R {
    return mapper(data);
  }

  /**
   * Map mảng dữ liệu từ API response sang mảng interface
   * @param data - Mảng dữ liệu từ API
   * @param mapper - Hàm map dữ liệu
   * @returns Mảng dữ liệu đã được map theo interface
   */
  static mapArrayToInterface<T, R>(data: T[], mapper: (data: T) => R): R[] {
    return data.map(mapper);
  }

  /**
   * Format date sang định dạng dd/MM/yyyy
   * @param date - Date cần format
   * @returns String date đã format
   */
  static formatDate(date: Date): string {
    return date.toLocaleDateString('vi-VN');
  }

  /**
   * Format date time sang định dạng dd/MM/yyyy HH:mm
   * @param date - Date cần format
   * @returns String date time đã format
   */
  static formatDateTime(date: Date): string {
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Kiểm tra object có phải là null hoặc undefined
   * @param obj - Object cần kiểm tra
   * @returns true nếu object là null hoặc undefined
   */
  static isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
  }

  /**
   * Kiểm tra string có phải là null, undefined hoặc empty
   * @param str - String cần kiểm tra
   * @returns true nếu string là null, undefined hoặc empty
   */
  static isNullOrEmpty(str: string): boolean {
    return this.isNullOrUndefined(str) || str.trim() === '';
  }

  /**
   * Deep clone một object
   * @param obj - Object cần clone
   * @returns Object đã được clone
   */
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Delay execution trong một khoảng thời gian
   * @param ms - Số milliseconds cần delay
   * @returns Promise
   */
  static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Debounce function để tránh gọi quá nhiều lần
   * @param func - Function cần debounce
   * @param wait - Thời gian chờ (ms)
   * @returns Function đã được debounce
   */
  // static debounce<T extends (...args: any[]) => any>(
  //   func: T,
  //   wait: number
  // ): (...args: Parameters<T>) => void {
  //   let timeout: NodeJS.Timeout;
  //   return (...args: Parameters<T>) => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func(...args), wait);
  //   };
  // }

  /**
   * Throttle function để giới hạn số lần gọi trong một khoảng thời gian
   * @param func - Function cần throttle
   * @param limit - Thời gian giới hạn (ms)
   * @returns Function đã được throttle
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Lưu theme vào localStorage
   * @param theme - Theme cần lưu ('light' | 'dark')
   */
  static setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Lấy theme hiện tại từ localStorage
   * @returns Theme hiện tại ('light' | 'dark')
   */
  static getTheme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  }

  /**
   * Chuyển đổi theme giữa light và dark
   */
  static toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Khởi tạo theme khi load trang
   */
  static initializeTheme(): void {
    const savedTheme = this.getTheme();
    this.setTheme(savedTheme);
  }
} 