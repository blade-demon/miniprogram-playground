/**
 * URL工具函数
 * 用于处理URL相关的操作
 */

/**
 * 截取URL的协议和域名
 * @param url 完整的URL字符串
 * @returns 包含协议和域名的对象，如果解析失败返回null
 */
export function extractProtocolAndDomain(
  url: string
): { protocol: string; domain: string } | null {
  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol,
      domain: urlObj.hostname,
    };
  } catch (error) {
    console.error("URL解析失败:", error);
    return null;
  }
}

/**
 * 获取URL的协议
 * @param url 完整的URL字符串
 * @returns 协议字符串（如 'https:'），如果解析失败返回null
 */
export function getProtocol(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol;
  } catch (error) {
    console.error("获取协议失败:", error);
    return null;
  }
}

/**
 * 获取URL的域名
 * @param url 完整的URL字符串
 * @returns 域名字符串，如果解析失败返回null
 */
export function getDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    console.error("获取域名失败:", error);
    return null;
  }
}

/**
 * 使用正则表达式截取URL的协议和域名
 * @param url 完整的URL字符串
 * @returns 包含协议和域名的对象，如果匹配失败返回null
 */
export function extractProtocolAndDomainWithRegex(
  url: string
): { protocol: string; domain: string } | null {
  const regex = /^(https?:\/\/)([^\/]+)/;
  const match = url.match(regex);

  if (match) {
    return {
      protocol: match[1],
      domain: match[2],
    };
  }

  return null;
}

/**
 * 检查URL是否为HTTPS协议
 * @param url 完整的URL字符串
 * @returns 是否为HTTPS协议
 */
export function isHttps(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "https:";
  } catch (error) {
    return false;
  }
}

/**
 * 获取URL的完整域名（包含端口号）
 * @param url 完整的URL字符串
 * @returns 完整域名字符串，如果解析失败返回null
 */
export function getFullDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.host;
  } catch (error) {
    console.error("获取完整域名失败:", error);
    return null;
  }
}

/**
 * 替换URL的协议和域名
 * @param originalUrl 原始URL地址
 * @param newProtocol 新的协议（如 'https:' 或 'http:'）
 * @param newDomain 新的域名
 * @returns 替换后的完整URL地址，如果解析失败返回null
 */
export function replaceProtocolAndDomain(
  originalUrl: string,
  newProtocol: string,
  newDomain: string
): string | null {
  try {
    const urlObj = new URL(originalUrl);

    // 确保协议格式正确（添加冒号如果没有的话）
    let protocol = newProtocol;
    if (!protocol.endsWith(":")) {
      protocol = protocol + ":";
    }

    // 构建新的URL
    const newUrl = new URL(
      urlObj.pathname + urlObj.search + urlObj.hash,
      `${protocol}//${newDomain}`
    );

    return newUrl.toString();
  } catch (error) {
    console.error("URL替换失败:", error);
    return null;
  }
}
