"use strict";(self.webpackChunk_monster_js_docs=self.webpackChunk_monster_js_docs||[]).push([[3976],{876:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var r=n(2784);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=p(n),g=o,u=m["".concat(l,".").concat(g)]||m[g]||d[g]||a;return n?r.createElement(u,i(i({ref:t},s),{},{components:n})):r.createElement(u,i({ref:t},s))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5023:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var r=n(7896),o=(n(2784),n(876));const a={sidebar_position:5},i="Change detection",c={unversionedId:"main-concept/change-detection",id:"main-concept/change-detection",title:"Change detection",description:"Change detection is a way to synchronize the data between component's logic and view.",source:"@site/docs/main-concept/change-detection.md",sourceDirName:"main-concept",slug:"/main-concept/change-detection",permalink:"/docs/main-concept/change-detection",draft:!1,editUrl:"https://github.com/monster-js/monster-js/docs/main-concept/change-detection.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Data binding",permalink:"/docs/main-concept/data-binding"},next:{title:"Event handling",permalink:"/docs/main-concept/event-handling"}},l={},p=[{value:"Manually trigger change detection",id:"manually-trigger-change-detection",level:2}],s={toc:p};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"change-detection"},"Change detection"),(0,o.kt)("p",null,"Change detection is a way to synchronize the data between component's logic and view.\nIt triggers when a component property is changed.\nChange detection is not applied recursively so it will only trigger when changing the value of the property of ",(0,o.kt)("inlineCode",{parentName:"p"},"this")," context."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Triggers only when setting the property of component's ",(0,o.kt)("inlineCode",{parentName:"p"},"this")," context.")),(0,o.kt)("p",null,"The following is an example assignment expression that will trigger change detection."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"this.user = {\n    firstName: 'John',\n    lastName: 'Doe'\n};\n")),(0,o.kt)("p",null,"The following is an example assignment expression that will ",(0,o.kt)("inlineCode",{parentName:"p"},"NOT")," trigger change detection."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"this.user.firstName = 'John';\nthis.user.lastName = 'Doe';\n")),(0,o.kt)("h2",{id:"manually-trigger-change-detection"},"Manually trigger change detection"),(0,o.kt)("p",null,"In some cases, you may need to manually trigger change detection of a component."),(0,o.kt)("p",null,"To manually trigger change detection we just need to call the ",(0,o.kt)("inlineCode",{parentName:"p"},"detectChanges")," function and pass the ",(0,o.kt)("inlineCode",{parentName:"p"},"this")," context as argument."),(0,o.kt)("p",null,"Example."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"import { Component, detectChanges } from '@monster-js/core';\n\n@Component('app-counter')\nexport class Counter {\n    onInit() {\n        setInterval(() => detectChanges(this), 1000);\n    }\n\n    render() {\n        return <h1>{new Date()}</h1>\n    }\n}\n")))}d.isMDXComponent=!0}}]);