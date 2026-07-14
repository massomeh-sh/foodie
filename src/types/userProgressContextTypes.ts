export interface UserProgressContextValue {
    progress: string;
    showCart: () => void;
    hideCart: () => void;
    showCheckout: () => void;
    hideCheckout: () => void;
    showSuccess: () => void;
    hideSuccess: () => void;
}