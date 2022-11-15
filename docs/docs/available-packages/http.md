---
sidebar_position: 1
---

# Http

MonsterJS http package helps applications to communicate to a server using http protocol.
This is a wrapper of fetch api built for MonsterJS applications.

## BaseHttp

The `BaseHttp` is a base class that extends the functionality of the class to use the fetch api to send requests using http protocol.

### Use the BaseHttp

To use the BaseHttp class, we just need to create a service that extends this class.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttp } from '@monster-js/core/http';

@Service()
export class HttpService extends BaseHttp {
}
```

In the example above, the `HttpService` can now use all the implemented functionality of the `BaseHttp` class.

### Register HttpService to component

To register the HttpService to a component we just need to pass it to the component's services function like any other service.

Example.

```typescript
import { component, services } from '@monster-js/core';
import { HttpService } from './http.service';

export function greeting() {
    return <h1>Greeting</h1>
}

component(greeting, 'app-greeting');
services(greeting, HttpService);
```

:::info
It is recommended to use the HttpService inside another service and not directly inside a component.
:::

### Register HttpService to module

To register the HttpService to a module we just need to pass it to it's services array.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { HttpService } from './http.service';

export const AppModule: Module = {
    services: [HttpService]
};
```

## Http verbs

Once `HttpService` is available in our module or component we can now start sending request using the different http verbs or methods.
BaseHttp supports different http verbs like GET, POST, PUT, PATCH, and DELETE.

### Get request

```typescript
import { Service } from '@monster-js/core';
import { HttpResponse } from '@monster-js/core/http';
import { HttpService } from './http.service';

interface Post {
    id: number;
    content: string;
}

@Service()
export class PostService {

    constructor(private http: HttpService) {}

    public async getAll() {
        return await this.http.get<Post[]>('/get-all');
    }
}
```

### Post request

```typescript
import { Service } from '@monster-js/core';
import { HttpResponse } from '@monster-js/core/http';
import { HttpService } from './http.service';

interface Post {
    id: number;
    content: string;
}

@Service()
export class PostService {

    constructor(private http: HttpService) {}

    public async create(post: Post) {
        return await this.http.post<Post>('/create', post);
    }
}
```

### Put request

```typescript
import { Service } from '@monster-js/core';
import { HttpResponse } from '@monster-js/core/http';
import { HttpService } from './http.service';

interface Post {
    id: number;
    content: string;
}

@Service()
export class PostService {

    constructor(private http: HttpService) {}

    public async update(post: Post) {
        return await this.http.put<Post>(`/update/${post.id}`, post);
    }
}
```

### Patch request

```typescript
import { Service } from '@monster-js/core';
import { HttpResponse } from '@monster-js/core/http';
import { HttpService } from './http.service';

interface Post {
    id: number;
    content: string;
}

@Service()
export class PostService {

    constructor(private http: HttpService) {}

    public async update(id: number, content: string) {
        return await this.http.patch<Post>(`/update/${id}`, { content });
    }
}
```

### Delete request

```typescript
import { Service } from '@monster-js/core';
import { HttpResponse } from '@monster-js/core/http';
import { HttpService } from './http.service';

@Service()
export class PostService {

    constructor(private http: HttpService) {}

    public async delete(id: number) {
        return await this.http.delete<void>(`/delete/${id}`);
    }
}
```

## Http interceptor

Http interceptor is a way to intercept and modify the request config of every http request.
The `BaseHttp` class has support for http interceptor so we just need to override them to use it.

### Set request base url

Setting a base url is helpful for us not to type again the base url of the server each time we make a request in the service.
It can also make our code cleaner since we do not need to type long urls on our services.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttp } from '@monster-js/core/http';

@Service()
export class HttpService extends BaseHttp {

    protected override baseUrl = 'http://localhost:4001/api/v1';

}
```

### Modify request config

We can also modify the request config of fetch api before being sent to the server.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttp } from '@monster-js/core/http';

@Service()
export class HttpService extends BaseHttp {

    protected override modifyConfig(config: RequestInit): RequestInit {
        config.body = {
            greeting: 'Hello World!'
        };
        return config;
    }

}
```

### Modify response

Same as the request config we can also modify the response of all the request.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttp } from '@monster-js/core/http';

@Service()
export class HttpService extends BaseHttp {
    protected override modifyResponse(response: Promise<Response>): any {
        // modify response here
        return response;
    }
}
```

### Set request header

We can use the `setHeader` method provided by `BaseHttp` to set a request header in http interceptor.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttp } from '@monster-js/core/http';

@Service()
export class HttpService extends BaseHttp {
    protected override modifyConfig(config: RequestInit): RequestInit {
        this.setHeader(config, 'Authorization', `Bearer some-token`);
        return config;
    }
}
```
