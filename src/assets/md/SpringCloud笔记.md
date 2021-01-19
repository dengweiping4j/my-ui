## 1. SpringCloud模块

- Eureka：服务注册中心，用于服务管理。
- Ribbon：基于客户端的负载均衡组件。
- Hystrix：容错框架，能够防止服务的雪崩效应。
- Feign：Web 服务客户端，能够简化 HTTP 接口的调用。
- Zuul：API 网关，提供路由转发、请求过滤等功能。
- Config：分布式配置管理。
- Sleuth：服务跟踪。
- Stream：构建消息驱动的微服务应用程序的框架。
- Bus：消息代理的集群消息总线。



## 2. 注意事项

### 2.1 版本对应关系

#### 2.1.1 SpringCloud和SpringBoot版本对应关系

| SpringCloud Version | SpringBoot Version |
| ------------------- | ------------------ |
| Hoxton              | 2.2.x              |
| Greenwich           | 2.1.x              |
| Finchley            | 2.0.x              |
| Edgware             | 1.5.x              |
| Dalston             | 1.5.x              |

#### 2.1.2 SpringCloud和各子项目版本对应关系

| Component              | Edgware.SR6    | Greenwich.SR2 |
| ---------------------- | -------------- | ------------- |
| spring-cloud-bus       | 1.3.4.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-commons   | 1.3.6.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-config    | 1.4.7.RELEASE  | 2.1.3.RELEASE |
| spring-cloud-netflix   | 1.4.7.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-security  | 1.2.4.RELEASE  | 2.1.3.RELEASE |
| spring-cloud-consul    | 1.3.6.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-sleuth    | 1.3.6.RELEASE  | 2.1.1.RELEASE |
| spring-cloud-stream    | Ditmars.SR5    | Fishtown.SR3  |
| spring-cloud-zookeeper | 1.2.3.RELEASE  | 2.1.2.RELEASE |
| spring-boot            | 1.5.21.RELEASE | 2.1.5.RELEASE |
| spring-cloud-task      | 1.2.4.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-gateway   | 1.0.3.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-openfeign | 暂无           | 2.1.2.RELEASE |