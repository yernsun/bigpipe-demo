# BigPipe 实现原理
1. 执行启动运行环境
```shell
npm start
```
2. BigPipe 与 Ajax对比
    低网络延时  
    BigPipe http://127.0.0.1:8080/bigpipe  
    Ajax http://127.0.0.1:8080/ajax  
    模拟100ms  
    BigPipe http://127.0.0.1:8080/bigpipe?timer=100  
    Ajax http://127.0.0.1:8080/ajax?timer=100  
    模拟200ms  
    BigPipe http://127.0.0.1:8080/bigpipe?timer=200  
    Ajax http://127.0.0.1:8080/ajax?timer=200  