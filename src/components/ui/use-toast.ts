import { useContext } from "react";
import { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

type Toast = Omit<ToasterToast, "id">;

function toast(props: Toast) {
  const id = crypto.randomUUID();

  const update = (props: ToasterToast) => {
    // TODO: Implement toast update logic
  };

  const dismiss = () => {
    // TODO: Implement toast dismiss logic
  };

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {},
    toasts: [] as ToasterToast[],
  };
}

export { useToast, toast }; 