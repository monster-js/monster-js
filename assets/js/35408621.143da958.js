"use strict";(self.webpackChunk_monster_js_docs=self.webpackChunk_monster_js_docs||[]).push([[186],{876:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>c});var a=n(2784);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),o=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=o(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),m=o(n),c=r,h=m["".concat(p,".").concat(c)]||m[c]||u[c]||l;return n?a.createElement(h,i(i({ref:t},d),{},{components:n})):a.createElement(h,i({ref:t},d))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var o=2;o<l;o++)i[o]=n[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4645:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>o});var a=n(7896),r=(n(2784),n(876));const l={sidebar_position:5},i="Http",s={unversionedId:"http",id:"http",title:"Http",description:"MonsterJS http package helps applications to communicate to a server using http protocol.",source:"@site/docs/http.md",sourceDirName:".",slug:"/http",permalink:"/docs/http",draft:!1,editUrl:"https://github.com/monster-js/monster-js/docs/http.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Store",permalink:"/docs/store"},next:{title:"Useful Topics",permalink:"/docs/category/useful-topics"}},p={},o=[{value:"Installation",id:"installation",level:2},{value:"Http",id:"http-1",level:2},{value:"Using the http client",id:"using-the-http-client",level:2},{value:"Http verbs",id:"http-verbs",level:2},{value:"GET request",id:"get-request",level:3},{value:"Syntax",id:"syntax",level:4},{value:"Parameters",id:"parameters",level:4},{value:"DELETE request",id:"delete-request",level:3},{value:"Syntax",id:"syntax-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"POST request",id:"post-request",level:3},{value:"Syntax",id:"syntax-2",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"PUT request",id:"put-request",level:3},{value:"Syntax",id:"syntax-3",level:4},{value:"Parameters",id:"parameters-3",level:4},{value:"PATCH request",id:"patch-request",level:3},{value:"Syntax",id:"syntax-4",level:4},{value:"Parameters",id:"parameters-4",level:4},{value:"Http interceptor",id:"http-interceptor",level:2},{value:"Set base url",id:"set-base-url",level:3},{value:"Modify url",id:"modify-url",level:3},{value:"Modify request body",id:"modify-request-body",level:3},{value:"Modify request params",id:"modify-request-params",level:3},{value:"Modify headers",id:"modify-headers",level:3},{value:"Modify response",id:"modify-response",level:3},{value:"Modify config",id:"modify-config",level:3}],d={toc:o};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"http"},"Http"),(0,r.kt)("p",null,"MonsterJS http package helps applications to communicate to a server using http protocol.\nThis package is a wrapper of fetch api that provides an easy way to intercept requests."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("p",null,"We can install the http package by running the following command in the root directory of our project."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @monster-js/http\n")),(0,r.kt)("h2",{id:"http-1"},"Http"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Http")," is a base class that contains the methods and properties that manipulates the request.\nIt also has the http verb methods for sending requests.\nTo use this class, we need to create a new http client class that extends the ",(0,r.kt)("inlineCode",{parentName:"p"},"Http")," class."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import { Http } from '@monster-js/core';\n\nexport class HttpClient extends Http {\n\n    baseUrl: string = '';\n\n    modifyUrl(url: string): string {\n        return url;\n    }\n\n    modifyResponse(response: Promise<Response>): any {\n        return response;\n    }\n\n    modifyBody(body: any): any {\n        return body;\n    }\n\n    modifyParams(params: CustomObject): CustomObject {\n        return params;\n    }\n\n    modifyHeaders(headers: HeadersInit): HeadersInit {\n        return headers;\n    }\n\n    modifyConfig(config: RequestInit): RequestInit {\n        return config;\n    }\n\n}\n")),(0,r.kt)("p",null,"The class name ",(0,r.kt)("inlineCode",{parentName:"p"},"HttpClient")," can be anything we want but it is recommended to use ",(0,r.kt)("inlineCode",{parentName:"p"},"HttpClient")," name as best practice in MonsterJS so other developers can easily recognize the use of this class."),(0,r.kt)("p",null,"After creating a class that extends the ",(0,r.kt)("inlineCode",{parentName:"p"},"Http")," class.\nWe can now use this class inside our component or services to send requests."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"It is recommended to put all http request codes in a service than inside a component.")),(0,r.kt)("h2",{id:"using-the-http-client"},"Using the http client"),(0,r.kt)("p",null,"We can use the http client inside our component and services to send a request."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"function app() {\n    const http = inject(this, HttpClient);\n    const [ user, setUser ] = useState(this);\n\n    afterInit(this, async () => {\n        const user = await http.get('/api/v1/user');\n        setUser(user);\n    });\n\n    return <h1>User : {user().name}</h1>\n}\n")),(0,r.kt)("h2",{id:"http-verbs"},"Http verbs"),(0,r.kt)("p",null,"Once ",(0,r.kt)("inlineCode",{parentName:"p"},"HttpClient")," class is configured we can now start sending requests using the different http verbs.\nHttp supports different http verbs like GET, POST, PUT, PATCH, and DELETE."),(0,r.kt)("h3",{id:"get-request"},"GET request"),(0,r.kt)("h4",{id:"syntax"},"Syntax"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"get(<url>, <url_params>, <config>)")),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"await http.get('/get-all');\n")),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url"),(0,r.kt)("td",{parentName:"tr",align:null},"required"),(0,r.kt)("td",{parentName:"tr",align:null},"The url where we want to send the request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url_params"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is an object that will be converted as a url search query.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is will override the default configuration of the fetch api request.")))),(0,r.kt)("h3",{id:"delete-request"},"DELETE request"),(0,r.kt)("h4",{id:"syntax-1"},"Syntax"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"delete(<url>, <url_params>, <config>)")),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"await http.delete(`/delete-item/${id}`);\n")),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url"),(0,r.kt)("td",{parentName:"tr",align:null},"required"),(0,r.kt)("td",{parentName:"tr",align:null},"The url where we want to send the request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url_params"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is an object that will be converted as a url search query.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is will override the default configuration of the fetch api request.")))),(0,r.kt)("h3",{id:"post-request"},"POST request"),(0,r.kt)("h4",{id:"syntax-2"},"Syntax"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"post(<url>, <body>, <config>, <url_params>)")),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"await http.post(`/create-item`, body);\n")),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url"),(0,r.kt)("td",{parentName:"tr",align:null},"required"),(0,r.kt)("td",{parentName:"tr",align:null},"The url where we want to send the request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"body"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This will be the request body.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is will override the default configuration of the fetch api request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url_params"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is an object that will be converted as a url search query.")))),(0,r.kt)("h3",{id:"put-request"},"PUT request"),(0,r.kt)("h4",{id:"syntax-3"},"Syntax"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"put(<url>, <body>, <config>, <url_params>)")),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"await http.put(`/update-item/${id}`, body);\n")),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url"),(0,r.kt)("td",{parentName:"tr",align:null},"required"),(0,r.kt)("td",{parentName:"tr",align:null},"The url where we want to send the request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"body"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This will be the request body.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is will override the default configuration of the fetch api request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url_params"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is an object that will be converted as a url search query.")))),(0,r.kt)("h3",{id:"patch-request"},"PATCH request"),(0,r.kt)("h4",{id:"syntax-4"},"Syntax"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"patch(<url>, <body>, <config>, <url_params>)")),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"await http.patch(`/update-item/${id}`, body);\n")),(0,r.kt)("h4",{id:"parameters-4"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url"),(0,r.kt)("td",{parentName:"tr",align:null},"required"),(0,r.kt)("td",{parentName:"tr",align:null},"The url where we want to send the request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"body"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This will be the request body.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is will override the default configuration of the fetch api request.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"url_params"),(0,r.kt)("td",{parentName:"tr",align:null},"optional"),(0,r.kt)("td",{parentName:"tr",align:null},"This is an object that will be converted as a url search query.")))),(0,r.kt)("h2",{id:"http-interceptor"},"Http interceptor"),(0,r.kt)("h3",{id:"set-base-url"},"Set base url"),(0,r.kt)("p",null,"We can set the base url of each request by overriding the ",(0,r.kt)("inlineCode",{parentName:"p"},"setBaseUrl()")," method.\nThis method should return the base url we want to set in each request.\nSince this is a method, we are can also add some logic and return a specific base url for each request."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export class Httpclient extends Http {\n    baseUrl() {\n        return 'https://backend-server.com';\n    }\n}\n")),(0,r.kt)("h3",{id:"modify-url"},"Modify url"),(0,r.kt)("p",null,"We can also modify the url for every request.\nTo do this, we just need to override the ",(0,r.kt)("inlineCode",{parentName:"p"},"modifyUrl(<url>)")," method."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export class Httpclient extends Http {\n    modifyUrl(url) {\n        // modify url here\n        return url;\n    }\n}\n")),(0,r.kt)("h3",{id:"modify-request-body"},"Modify request body"),(0,r.kt)("p",null,"Before the request is sent to the api server, we can modify the request body before sending it by overriding the ",(0,r.kt)("inlineCode",{parentName:"p"},"modifyBody(<body>)")," method."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export class Httpclient extends Http {\n    modifyBody(body) {\n        // modify body here\n        return body;\n    }\n}\n")),(0,r.kt)("h3",{id:"modify-request-params"},"Modify request params"),(0,r.kt)("p",null,"We can also modify the request parameters before before appending it to the url by overriding the ",(0,r.kt)("inlineCode",{parentName:"p"},"modifyParams(<params>)")," method."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export class Httpclient extends Http {\n    modifyParams(params): CustomObject {\n        // modify params here\n        return params;\n    }\n}\n")),(0,r.kt)("h3",{id:"modify-headers"},"Modify headers"),(0,r.kt)("p",null,"Headers can also be modified by overriding the ",(0,r.kt)("inlineCode",{parentName:"p"},"modifyHeaders(<headers>)")," method."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export class Httpclient extends Http {\n    modifyHeaders(headers: HeadersInit): HeadersInit {\n        return headers;\n    }\n}\n")),(0,r.kt)("h3",{id:"modify-response"},"Modify response"),(0,r.kt)("p",null,"After the request is made even if it is successful or failed, we can modify the response by overriding the ",(0,r.kt)("inlineCode",{parentName:"p"},"modifyResponse(<response>)")," method."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export class Httpclient extends Http {\n    modifyResponse(response: Response): any {\n        // modify response here\n        return response;\n    }\n}\n")),(0,r.kt)("h3",{id:"modify-config"},"Modify config"),(0,r.kt)("p",null,"We can modify the request config by overriding the ",(0,r.kt)("inlineCode",{parentName:"p"},"modifyConfig(<config>)")," method."),(0,r.kt)("p",null,"Example."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export class Httpclient extends Http {\n    modifyConfig(config: RequestInit): RequestInit {\n        // modify config here\n        return config;\n    }\n}\n")))}u.isMDXComponent=!0}}]);