"use strict";(self.webpackChunk_monster_js_docs=self.webpackChunk_monster_js_docs||[]).push([[8981],{876:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(2784);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),p=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=p(r),d=a,h=m["".concat(u,".").concat(d)]||m[d]||c[d]||o;return r?n.createElement(h,l(l({ref:t},s),{},{components:r})):n.createElement(h,l({ref:t},s))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=m;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1986:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=r(7896),a=(r(2784),r(876));const o={sidebar_position:3},l="Router",i={unversionedId:"available-packages/router",id:"available-packages/router",title:"Router",description:"Router is a plugin that enables developers to build a single page application with multiple components that acts as different pages of the app.",source:"@site/docs/available-packages/router.md",sourceDirName:"available-packages",slug:"/available-packages/router",permalink:"/docs/available-packages/router",draft:!1,editUrl:"https://github.com/monster-js/monster-js/docs/available-packages/router.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Store",permalink:"/docs/available-packages/store"},next:{title:"Useful Topics",permalink:"/docs/category/useful-topics"}},u={},p=[{value:"Installation",id:"installation",level:2},{value:"Register the router module",id:"register-the-router-module",level:2},{value:"Creating a route",id:"creating-a-route",level:2},{value:"Route props",id:"route-props",level:2},{value:"Router directive",id:"router-directive",level:2},{value:"Router link",id:"router-link",level:3},{value:"Router link active",id:"router-link-active",level:3},{value:"Router link active exact",id:"router-link-active-exact",level:3},{value:"Router guard",id:"router-guard",level:2},{value:"Can activate",id:"can-activate",level:3},{value:"Can deactivate",id:"can-deactivate",level:3},{value:"Router module",id:"router-module",level:2},{value:"Router service",id:"router-service",level:2},{value:"Navigate",id:"navigate",level:3},{value:"On route change",id:"on-route-change",level:3},{value:"Router params",id:"router-params",level:3},{value:"Dynamic route matching",id:"dynamic-route-matching",level:2},{value:"Lazy loading a module",id:"lazy-loading-a-module",level:2},{value:"The module",id:"the-module",level:4},{value:"The route",id:"the-route",level:4}],s={toc:p};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"router"},"Router"),(0,a.kt)("p",null,"Router is a plugin that enables developers to build a single page application with multiple components that acts as different pages of the app.\nView changes depending on the activated route.\nActivated routes depends on the url of the browser and the path registered in the route component."),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,"We can install the router using npm or yarn."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @monster-js/router\n")),(0,a.kt)("p",null,"or"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @monster-js/router\n")),(0,a.kt)("h2",{id:"register-the-router-module"},"Register the router module"),(0,a.kt)("p",null,"Router must be registered to the module first before we can use it.\nWe can register the individual apis or register the whole router module to the module where we want to use the router."),(0,a.kt)("p",null,"Here's an example on how to register the router module:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Module } from '@monster-js/core/module';\nimport { RouterModule } from '@monster-js/router';\n\n@Module({\n    modules: [RouterModule]\n})\nexport class AppModule { }\n")),(0,a.kt)("h2",{id:"creating-a-route"},"Creating a route"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"import { Route } from '@monster-js/router'")),(0,a.kt)("p",null,"Route is just a component provided by the router package.\nOnce route component is already defined or the router module is imported to the module we can now start using the ",(0,a.kt)("inlineCode",{parentName:"p"},"app-route")," component inside our components."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Component } from '@monster-js/core';\nimport { Greeting } from './greeting.component';\n\n@Component('app-root')\nexport class Root {\n    render() {\n        return <div>\n            <app-route\n                prop:path=\"/greeting\"\n                prop:component={Greeting}\n            />\n        </div>\n    }\n}\n")),(0,a.kt)("p",null,"In the example above, if the user will navigate to '/greeting' route the ",(0,a.kt)("inlineCode",{parentName:"p"},"Greeting")," component will be displayed in the view."),(0,a.kt)("h2",{id:"route-props"},"Route props"),(0,a.kt)("p",null,"Route props are properties of the route that controls the behavior of the route."),(0,a.kt)("p",null,"Here are the available props that can be used in a route."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Props"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"path"),(0,a.kt)("td",{parentName:"tr",align:null},"The path that should match in the browser url pathname before the route is activated.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"component"),(0,a.kt)("td",{parentName:"tr",align:null},"The component that will be rendered inside the ",(0,a.kt)("inlineCode",{parentName:"td"},"<app-route />")," when route path matches the browser url pathname.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"exact"),(0,a.kt)("td",{parentName:"tr",align:null},"If the value is true, then the Component will only activate if route path is an exact match with the browser url pathname but still respect the dynamic route matching.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"guards"),(0,a.kt)("td",{parentName:"tr",align:null},"It is another layer of checking if the component can activate or deactivate.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"module"),(0,a.kt)("td",{parentName:"tr",align:null},"Loads a module on demand and display it's root component to the view if route path matches the browser url pathname.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"redirect-to"),(0,a.kt)("td",{parentName:"tr",align:null},"A string url to redirect to if route path matches the browser url pathname.")))),(0,a.kt)("h2",{id:"router-directive"},"Router directive"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"import { RouterDirective } from '@monster-js/router'")),(0,a.kt)("p",null,"Router also has a directive that is very helpful when using a router."),(0,a.kt)("h3",{id:"router-link"},"Router link"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},'router:link="<link>"')),(0,a.kt)("p",null,"Attach to an element to navigate to the link when the element is clicked.\nIf used in an ",(0,a.kt)("inlineCode",{parentName:"p"},"<a>")," tag, it will automatically add the link as an ",(0,a.kt)("inlineCode",{parentName:"p"},"href")," attribute."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'<a router:link="/some/url">I am a link</a>\n<button router:link="/some/url/123">I am a button</button>\n')),(0,a.kt)("h3",{id:"router-link-active"},"Router link active"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},'router:link-active="<class name>"')),(0,a.kt)("p",null,"This directive will add the ",(0,a.kt)("inlineCode",{parentName:"p"},"<class name>")," to the class list of the element if it's ",(0,a.kt)("inlineCode",{parentName:"p"},"router:link")," directive link matches the browser url pathname using dynamic matching."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'<button\n    router:link="/some/url/123"\n    router:link-active="i-am-active"\n>I am a button</button>\n')),(0,a.kt)("h3",{id:"router-link-active-exact"},"Router link active exact"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"router:link-active-exact={<boolean>}")),(0,a.kt)("p",null,"If the value is true, this directive will enable us to add the class name of ",(0,a.kt)("inlineCode",{parentName:"p"},"router:link-active")," directive only when the ",(0,a.kt)("inlineCode",{parentName:"p"},"router:link")," directive link is an exact match of the browser url pathname but still respect dynamic matching."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'<button\n    router:link="/some/url/123"\n    router:link-active="i-am-active"\n    router:link-active-exact={true}\n>I am a button</button>\n')),(0,a.kt)("h2",{id:"router-guard"},"Router guard"),(0,a.kt)("p",null,"Router guard is another way to check if a component can activate or not.\nIt can also run a block of codes before a route can activate or deactivate."),(0,a.kt)("p",null,"The following code is an example of a working guard codes but without functions yet."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Guard } from '@monster-js/router';\n\n@Guard()\nexport class AuthGuard {\n}\n")),(0,a.kt)("h3",{id:"can-activate"},"Can activate"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"canActivate")," method can help us add additional checking if a component is allowed to activate."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { ObservableInterface } from '@monster-js/core';\nimport { Guard, RouterService } from '@monster-js/router';\nimport { AuthService } from './auth.service';\n\n@Guard()\nexport class AuthGuard {\n\n    constructor(\n        private authService: AuthService,\n        private routerService: RouterService\n    ) {}\n\n    public override canActivate(): ObservableInterface<boolean> | boolean {\n        if (this.authService.isLoggedIn) {\n            return true;\n        }\n        this.routerService.navigate('/guest/route');\n        return false;\n    }\n}\n")),(0,a.kt)("h3",{id:"can-deactivate"},"Can deactivate"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"canDeactivate")," method can help us add additional checking if a component is allowed to deactivate."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { ObservableInterface } from '@monster-js/core';\nimport { Guard } from '@monster-js/router';\nimport { ChangesService } from './changes.service';\n\n@Guard()\nexport class ChangesGuard {\n\n    constructor(private changesService: ChangesService) {}\n\n    public override canDeactivate(): ObservableInterface<boolean> | boolean {\n        return !this.changesService.hasChanges;\n    }\n}\n")),(0,a.kt)("h2",{id:"router-module"},"Router module"),(0,a.kt)("p",null,"`import { RouterModule } from '@monster-js/router';"),(0,a.kt)("p",null,"Importing router module to our module will give us all the functionalities of the router since router module exports all the necessary elements to use the router."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"@Module({\n    exports: {\n        directives: [RouterDirective],\n        services: [RouterService],\n        components: [Route]\n    }\n})\nexport class RouterModule {}\n")),(0,a.kt)("h2",{id:"router-service"},"Router service"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"import { RouterService } from '@monster-js/router'"),";"),(0,a.kt)("p",null,"Router service will provide us some useful functionalities to control the route, get router data, and watch for events."),(0,a.kt)("p",null,"To use the router service we need to inject it to our component."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Component } from '@monster-js/core';\nimport { RouterService } from '@monster-js/router';\n\n@Component('app-greeting')\nexport class Greeting {\n    constructor(private routerService: RouterService) {}\n    ...\n}\n")),(0,a.kt)("h3",{id:"navigate"},"Navigate"),(0,a.kt)("p",null,"Router service offers ",(0,a.kt)("inlineCode",{parentName:"p"},"navigate(url, state, title, replaceState)")," method to navigate to a url programmatically."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Component } from '@monster-js/core';\nimport { RouterService } from '@monster-js/router';\n\n@Component('app-greeting')\nexport class Greeting {\n    constructor(private routerService: RouterService) { }\n\n    onInit() {\n        setTimeout(() => {\n            this.routerService.navigate('/some/url');\n        }, 1000);\n    }\n}\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"url"),(0,a.kt)("td",{parentName:"tr",align:null},"The url that we want to navigate to. This parameter is required.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"state"),(0,a.kt)("td",{parentName:"tr",align:null},"An object, used as the state in history.pushState api. This parameter is not required.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"title"),(0,a.kt)("td",{parentName:"tr",align:null},"A string, used as the title in history.pushState api. This parameter is not required.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"replaceState"),(0,a.kt)("td",{parentName:"tr",align:null},"A boolean, indicates if we use history.replaceState or history.pushState during navigation.")))),(0,a.kt)("h3",{id:"on-route-change"},"On route change"),(0,a.kt)("p",null,"This will allow us to subscribe to route change event using ",(0,a.kt)("inlineCode",{parentName:"p"},"onRouteChange")," property of the router service."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Component } from '@monster-js/core';\nimport { RouterService } from '@monster-js/router';\n\n@Component('app-greeting')\nexport class Greeting {\n    constructor(private routerService: RouterService) { }\n\n    onInit() {\n        this.routerService.onRouteChange.subscribe(() => {\n            console.log('route has change');\n        });\n    }\n}\n")),(0,a.kt)("p",null,"In the example above, the component will log ",(0,a.kt)("inlineCode",{parentName:"p"},"route has change")," in the console every time the route will change."),(0,a.kt)("p",null,"Since we subscribed to route change event, it is a good idea to remove all the subscriptions made when the component is destroyed to avoid memory leak."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Component, Subscription } from '@monster-js/core';\nimport { RouterService } from '@monster-js/router';\n\n@Component('app-greeting')\nexport class Greeting {\n\n    subscription: Subscription;\n\n    constructor(private routerService: RouterService) { }\n\n    onInit() {\n        this.subscription = this.routerService.onRouteChange.subscribe(() => {\n            console.log('route has change');\n        });\n    }\n\n    onDestroy() {\n        this.subscription.unsubscribe();\n    }\n}\n")),(0,a.kt)("h3",{id:"router-params"},"Router params"),(0,a.kt)("p",null,"We can also get the router parameters using the router service.\nMore information about this route params are found in the ",(0,a.kt)("a",{parentName:"p",href:"#dynamic-route-matching"},"dynamic route matching")," section."),(0,a.kt)("p",null,"Example."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Component } from '@monster-js/core';\nimport { RouterService } from '@monster-js/router';\n\n@Component('app-greeting')\nexport class Greeting {\n    constructor(private routerService: RouterService) { }\n\n    onInit() {\n        const params = this.routerService.params;\n        console.log(params);\n    }\n}\n")),(0,a.kt)("h2",{id:"dynamic-route-matching"},"Dynamic route matching"),(0,a.kt)("p",null,"Dynamic route matching is a way to match a route path segment into its matching browser url pathname segment.\nA dynamic segment is denoted by a colon ",(0,a.kt)("inlineCode",{parentName:"p"},":")," followed by the segment name. Example. ",(0,a.kt)("inlineCode",{parentName:"p"},"/:userId"),".\nThe value of the dynamic segments are call the router parameters."),(0,a.kt)("p",null,"Here's a table of dynamic routes and its corresponding values as a router parameter:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"component path"),(0,a.kt)("th",{parentName:"tr",align:null},"browser url pathname"),(0,a.kt)("th",{parentName:"tr",align:null},"router params"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"/:path"),(0,a.kt)("td",{parentName:"tr",align:null},"/100"),(0,a.kt)("td",{parentName:"tr",align:null},"{ path: 100 }")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"/user/:userId"),(0,a.kt)("td",{parentName:"tr",align:null},"/user/123"),(0,a.kt)("td",{parentName:"tr",align:null},"{ userId: 123 }")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"/post/:postId/:userId"),(0,a.kt)("td",{parentName:"tr",align:null},"/post/1/123"),(0,a.kt)("td",{parentName:"tr",align:null},"{ postId: 1, userId: 123 }")))),(0,a.kt)("h2",{id:"lazy-loading-a-module"},"Lazy loading a module"),(0,a.kt)("p",null,"To lazy load a module or load a module on demand, we can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"module")," property of a route."),(0,a.kt)("p",null,"Example."),(0,a.kt)("h4",{id:"the-module"},"The module"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"// ./greeting.module\nimport { Module } from '@monster-js/core/module';\nimport { Greeting } from './greeting.component';\n\n@Module({\n    root: Greeting\n})\nexport class GreetingModule { }\n")),(0,a.kt)("h4",{id:"the-route"},"The route"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"<app-route\n    prop:path=\"/sample/path\"\n    prop:module={() => import('./greeting.module').then(m => m.GreetingModule)}\n/>\n")),(0,a.kt)("p",null,"The example above will display the component registered as a root component in the ",(0,a.kt)("inlineCode",{parentName:"p"},"GreetingModule")," when the route is allowed to activate."))}c.isMDXComponent=!0}}]);