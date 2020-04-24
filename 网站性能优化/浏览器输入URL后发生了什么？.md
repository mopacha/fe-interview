# 浏览器输入 URL 后发生了什么 ？

- DNS 解析:将域名解析成 IP 地址
- TCP 连接：TCP 三次握手
- 发送 HTTP 请求
- 服务器处理请求并返回 HTTP 报文
- 浏览器解析渲染页面
- 断开连接：TCP 四次挥手

## TCP 三次握手

TCP(Transmission Control Protocol)传输控制协议

TCP 是主机对主机层的传输控制协议，提供可靠的连接服务，采用三次握手确认建立一个连接：

位码即 tcp 标志位，有 6 种标示：SYN(synchronous 建立联机) ACK(acknowledgement 确认) PSH(push 传送) FIN(finish 结束) RST(reset 重置) URG(urgent 紧急)Sequence number(顺序号码) Acknowledge number(确认号码)

“三次握手”代表有三次网络传输。

我们经常将三次握手，描述成「请求 → 应答 → 应答之应答」。

至于 TCP 握手为什么是三次?其实就是要让双端都经历一次「请求 → 应答」的过程，来确认对方还在。网络情况是多变的，双端都需要一次自己主动发起的请求和对方回复的应答过程，来确保对方和网络是正常的。

https://network.51cto.com/art/202001/609110.htm

https://blog.csdn.net/qq_42798661/article/details/88367234

https://network.51cto.com/art/202002/610542.htm

https://juejin.im/post/5d9c284b518825095879e7a5