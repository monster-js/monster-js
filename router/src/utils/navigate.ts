import { urlResolve } from "./url-resolve";

export function navigate(url: string, data: any = {}, title: string = '', replaceState?: boolean) {
    const resolvedUrl = urlResolve(url);
    const { pathname } = location;
    if (pathname === resolvedUrl) {
        return;
    }

    if (replaceState) {
        history.replaceState(data, title, resolvedUrl);
    } else {
        history.pushState(data, title, resolvedUrl);
    }
}