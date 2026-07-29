export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

type Subscriber = (toasts: Toast[]) => void;

class ToastManager {
  private toasts: Toast[] = [];
  private subscribers: Set<Subscriber> = new Set();

  subscribe(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
    subscriber(this.toasts);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  private notify() {
    this.subscribers.forEach((sub) => sub([...this.toasts]));
  }

  add(toast: Omit<Toast, 'id'> & { id?: string }) {
    const id = toast.id || Math.random().toString(36).substring(2, 9);
    const existingIndex = this.toasts.findIndex((t) => t.id === id);

    const newToast: Toast = {
      id,
      duration: toast.type === 'loading' ? Infinity : 4000,
      dismissible: true,
      ...toast,
    };

    if (existingIndex > -1) {
      // Update existing toast (keeps same position, changes content!)
      this.toasts[existingIndex] = newToast;
    } else {
      // Add new toast
      this.toasts.push(newToast);
    }

    this.notify();

    // Auto dismiss if not loading
    if (newToast.duration && newToast.duration !== Infinity) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }

    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  success(title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>> & { id?: string }) {
    return this.add({ type: 'success', title, description, ...options });
  }

  error(title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>> & { id?: string }) {
    return this.add({ type: 'error', title, description, ...options });
  }

  warning(title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>> & { id?: string }) {
    return this.add({ type: 'warning', title, description, ...options });
  }

  info(title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>> & { id?: string }) {
    return this.add({ type: 'info', title, description, ...options });
  }

  loading(title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>> & { id?: string }) {
    return this.add({ type: 'loading', title, description, ...options });
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>
  ) {
    const id = this.loading(messages.loading, undefined, options);
    
    promise
      .then((data) => {
        const successText = typeof messages.success === 'function' ? messages.success(data) : messages.success;
        this.success("Success", successText, { ...options, id });
      })
      .catch((err) => {
        const errorText = typeof messages.error === 'function' ? messages.error(err) : messages.error;
        this.error("Error", errorText, { ...options, id });
      });

    return promise;
  }
}

export const toast = new ToastManager();
