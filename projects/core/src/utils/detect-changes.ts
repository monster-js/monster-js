import { ComponentInstance } from "../core";

export const detectChanges = (context: ComponentInstance) => context.__wrapper.detectChanges();