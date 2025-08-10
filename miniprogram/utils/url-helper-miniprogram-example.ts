/**
 * 微信小程序URL工具函数使用示例
 */
import {
  extractProtocolAndDomain,
  getProtocol,
  getDomain,
  isHttps,
  getFullDomain,
  replaceProtocolAndDomain,
  isValidUrl,
  getPath,
  getQuery,
  getHash
} from "./url-helper-miniprogram";

// 示例URL
const exampleUrls = [
  "https://www.example.com/path/to/page",
  "http://api.example.com:8080/api/v1",
  "https://subdomain.example.com",
  "ftp://files.example.com",
  "invalid-url",
];

/**
 * 演示如何使用URL工具函数
 */
export function demonstrateUrlFunctions() {
  console.log("=== 小程序URL工具函数演示 ===\n");

  exampleUrls.forEach((url, index) => {
    console.log(`示例 ${index + 1}: ${url}`);

    // 检查URL是否有效
    const isValid = isValidUrl(url);
    console.log(`  URL是否有效: ${isValid}`);

    if (isValid) {
      // 获取协议和域名
      const result = extractProtocolAndDomain(url);
      if (result) {
        console.log(`  协议: ${result.protocol}`);
        console.log(`  域名: ${result.domain}`);
      } else {
        console.log("  解析失败");
      }

      // 单独获取协议和域名
      const protocol = getProtocol(url);
      const domain = getDomain(url);
      const fullDomain = getFullDomain(url);
      const https = isHttps(url);
      const path = getPath(url);
      const query = getQuery(url);
      const hash = getHash(url);

      console.log(`  单独获取 - 协议: ${protocol}`);
      console.log(`  单独获取 - 域名: ${domain}`);
      console.log(`  完整域名: ${fullDomain}`);
      console.log(`  是否为HTTPS: ${https}`);
      console.log(`  路径: ${path}`);
      console.log(`  查询参数: ${query}`);
      console.log(`  哈希: ${hash}`);
    }
    console.log("");
  });
}

/**
 * 在微信小程序中使用示例
 */
export function useInMiniProgram() {
  // 假设从API获取的URL
  const apiUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";

  const urlInfo = extractProtocolAndDomain(apiUrl);
  if (urlInfo) {
    console.log("API URL信息:");
    console.log(`协议: ${urlInfo.protocol}`);
    console.log(`域名: ${urlInfo.domain}`);

    // 可以根据协议做不同处理
    if (urlInfo.protocol === "https://") {
      console.log("使用HTTPS协议，安全连接");
    } else {
      console.log("使用HTTP协议，注意安全性");
    }
  }
}

/**
 * 处理用户输入的URL
 */
export function processUserInputUrl(userInput: string) {
  // 确保URL有协议前缀
  let url = userInput;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const urlInfo = extractProtocolAndDomain(url);
  if (urlInfo) {
    return {
      success: true,
      protocol: urlInfo.protocol,
      domain: urlInfo.domain,
      fullUrl: url,
    };
  } else {
    return {
      success: false,
      error: "无效的URL格式",
    };
  }
}

/**
 * 演示URL协议和域名替换功能
 */
export function demonstrateUrlReplacement() {
  console.log("=== URL协议和域名替换演示 ===\n");

  const testCases = [
    {
      originalUrl: "https://www.example.com/api/users?id=123&name=test",
      newProtocol: "http",
      newDomain: "api.example.com",
    },
    {
      originalUrl: "http://old-domain.com/path/to/resource",
      newProtocol: "https",
      newDomain: "new-domain.com",
    },
    {
      originalUrl: "https://cdn.example.com/images/logo.png",
      newProtocol: "https",
      newDomain: "static.example.com",
    },
  ];

  testCases.forEach((testCase, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log(`  原始URL: ${testCase.originalUrl}`);
    console.log(`  新协议: ${testCase.newProtocol}`);
    console.log(`  新域名: ${testCase.newDomain}`);

    const replacedUrl = replaceProtocolAndDomain(
      testCase.originalUrl,
      testCase.newProtocol,
      testCase.newDomain
    );

    if (replacedUrl) {
      console.log(`  替换后URL: ${replacedUrl}`);
    } else {
      console.log("  替换失败");
    }
    console.log("");
  });
}

/**
 * 实际应用场景示例
 */
export function practicalExamples() {
  console.log("=== 实际应用场景示例 ===\n");

  // 场景1: 将HTTP链接转换为HTTPS
  const httpUrl = "http://api.example.com/v1/users";
  const httpsUrl = replaceProtocolAndDomain(
    httpUrl,
    "https",
    "api.example.com"
  );
  console.log("场景1 - HTTP转HTTPS:");
  console.log(`  原始: ${httpUrl}`);
  console.log(`  转换后: ${httpsUrl}\n`);

  // 场景2: 更换CDN域名
  const cdnUrl = "https://cdn1.example.com/images/photo.jpg";
  const newCdnUrl = replaceProtocolAndDomain(
    cdnUrl,
    "https",
    "cdn2.example.com"
  );
  console.log("场景2 - 更换CDN域名:");
  console.log(`  原始: ${cdnUrl}`);
  console.log(`  转换后: ${newCdnUrl}\n`);

  // 场景3: 环境切换（开发环境到生产环境）
  const devUrl = "https://dev-api.example.com/api/data?token=abc123";
  const prodUrl = replaceProtocolAndDomain(devUrl, "https", "api.example.com");
  console.log("场景3 - 环境切换:");
  console.log(`  开发环境: ${devUrl}`);
  console.log(`  生产环境: ${prodUrl}\n`);
}

/**
 * 在小程序页面中使用示例
 */
export function useInPage() {
  // 模拟小程序页面中的使用场景
  
  // 场景1: 处理图片URL
  const imageUrl = "https://cdn.example.com/images/avatar.jpg";
  const newImageUrl = replaceProtocolAndDomain(imageUrl, "https", "static.example.com");
  
  // 场景2: 处理API URL
  const apiUrl = "http://api.example.com/v1/users";
  const secureApiUrl = replaceProtocolAndDomain(apiUrl, "https", "api.example.com");
  
  // 场景3: 验证用户输入的URL
  const userInput = "example.com/path";
  const processedUrl = processUserInputUrl(userInput);
  
  return {
    imageUrl: newImageUrl,
    apiUrl: secureApiUrl,
    userInput: processedUrl
  };
} 