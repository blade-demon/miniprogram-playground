# 微信小程序 URL 工具函数

这个文件提供了适用于微信小程序环境的 URL 处理工具函数，不依赖浏览器原生的 `URL` 类。

## 主要功能

### 1. 截取 URL 的协议和域名

```typescript
import { extractProtocolAndDomain } from "./url-helper-miniprogram";

const url = "https://www.example.com/api/users?id=123";
const result = extractProtocolAndDomain(url);
// 结果: { protocol: 'https://', domain: 'www.example.com' }
```

### 2. 替换 URL 的协议和域名

```typescript
import { replaceProtocolAndDomain } from "./url-helper-miniprogram";

const originalUrl = "https://www.example.com/api/users?id=123";
const newUrl = replaceProtocolAndDomain(originalUrl, "http", "api.example.com");
// 结果: 'http://api.example.com/api/users?id=123'
```

## 可用函数

### 基础函数

- `extractProtocolAndDomain(url: string)` - 截取 URL 的协议和域名
- `getProtocol(url: string)` - 获取 URL 的协议
- `getDomain(url: string)` - 获取 URL 的域名
- `getFullDomain(url: string)` - 获取完整域名（包含端口）
- `isHttps(url: string)` - 检查是否为 HTTPS 协议

### 替换函数

- `replaceProtocolAndDomain(originalUrl, newProtocol, newDomain)` - 替换协议和域名

### 验证和解析函数

- `isValidUrl(url: string)` - 验证 URL 格式
- `getPath(url: string)` - 获取 URL 路径
- `getQuery(url: string)` - 获取查询参数
- `getHash(url: string)` - 获取哈希部分

## 在小程序中的使用示例

### 页面中使用

```typescript
// pages/index/index.ts
import {
  replaceProtocolAndDomain,
  isValidUrl,
} from "../../utils/url-helper-miniprogram";

Page({
  data: {
    imageUrl: "",
    apiUrl: "",
  },

  onLoad() {
    // 处理图片URL
    const originalImageUrl = "https://cdn.example.com/images/avatar.jpg";
    const newImageUrl = replaceProtocolAndDomain(
      originalImageUrl,
      "https",
      "static.example.com"
    );

    // 处理API URL
    const originalApiUrl = "http://api.example.com/v1/users";
    const secureApiUrl = replaceProtocolAndDomain(
      originalApiUrl,
      "https",
      "api.example.com"
    );

    this.setData({
      imageUrl: newImageUrl,
      apiUrl: secureApiUrl,
    });
  },

  // 处理用户输入的URL
  handleUrlInput(e: any) {
    const userInput = e.detail.value;
    const isValid = isValidUrl(userInput);

    if (isValid) {
      // URL有效，进行处理
      console.log("URL格式正确");
    } else {
      // URL无效，提示用户
      wx.showToast({
        title: "请输入有效的URL",
        icon: "none",
      });
    }
  },
});
```

### 组件中使用

```typescript
// components/url-processor/url-processor.ts
import { extractProtocolAndDomain } from "../../utils/url-helper-miniprogram";

Component({
  properties: {
    url: {
      type: String,
      value: "",
    },
  },

  data: {
    protocol: "",
    domain: "",
  },

  observers: {
    url: function (url) {
      if (url) {
        const urlInfo = extractProtocolAndDomain(url);
        if (urlInfo) {
          this.setData({
            protocol: urlInfo.protocol,
            domain: urlInfo.domain,
          });
        }
      }
    },
  },
});
```

## 实际应用场景

### 1. 环境切换

```typescript
// 开发环境到生产环境
const devUrl = "https://dev-api.example.com/api/data";
const prodUrl = replaceProtocolAndDomain(devUrl, "https", "api.example.com");
```

### 2. CDN 切换

```typescript
// 更换CDN域名
const oldCdnUrl = "https://cdn1.example.com/images/photo.jpg";
const newCdnUrl = replaceProtocolAndDomain(
  oldCdnUrl,
  "https",
  "cdn2.example.com"
);
```

### 3. HTTP 转 HTTPS

```typescript
// 安全升级
const httpUrl = "http://api.example.com/v1/users";
const httpsUrl = replaceProtocolAndDomain(httpUrl, "https", "api.example.com");
```

## 注意事项

1. **协议格式**: 函数会自动处理协议格式，如果输入 `'https'` 会自动添加 `'://'`
2. **错误处理**: 所有函数都有完善的错误处理，解析失败时返回 `null`
3. **正则表达式**: 使用正则表达式解析 URL，支持标准的 HTTP/HTTPS 协议
4. **小程序兼容**: 完全兼容微信小程序环境，不依赖浏览器 API

## 与浏览器版本的区别

| 功能       | 浏览器版本 | 小程序版本 |
| ---------- | ---------- | ---------- |
| 依赖       | URL 类     | 正则表达式 |
| 兼容性     | 现代浏览器 | 微信小程序 |
| 功能完整性 | 完整       | 核心功能   |
| 性能       | 原生 API   | 正则解析   |

小程序版本专注于核心的 URL 处理功能，确保在微信小程序环境中稳定运行。
