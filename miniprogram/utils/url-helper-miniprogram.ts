/**
 * 微信小程序URL工具函数
 * 适用于小程序环境，不使用URL类
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
    // 使用正则表达式匹配协议和域名
    const regex = /^(https?:\/\/)([^\/\?#]+)/;
    const match = url.match(regex);

    if (match) {
      return {
        protocol: match[1],
        domain: match[2],
      };
    }

    return null;
  } catch (error) {
    console.error("URL解析失败:", error);
    return null;
  }
}

/**
 * 获取URL的协议
 * @param url 完整的URL字符串
 * @returns 协议字符串（如 'https://'），如果解析失败返回null
 */
export function getProtocol(url: string): string | null {
  try {
    const regex = /^(https?:\/\/)/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
    const regex = /^https?:\/\/([^\/\?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error("获取域名失败:", error);
    return null;
  }
}

/**
 * 获取URL的完整域名（包含端口号）
 * @param url 完整的URL字符串
 * @returns 完整域名字符串，如果解析失败返回null
 */
export function getFullDomain(url: string): string | null {
  try {
    const regex = /^https?:\/\/([^\/\?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error("获取完整域名失败:", error);
    return null;
  }
}

/**
 * 检查URL是否为HTTPS协议
 * @param url 完整的URL字符串
 * @returns 是否为HTTPS协议
 */
export function isHttps(url: string): boolean {
  try {
    return url.startsWith("https://");
  } catch (error) {
    return false;
  }
}

/**
 * 替换URL的协议和域名
 * @param originalUrl 原始URL地址
 * @param newProtocol 新的协议（如 'https' 或 'http'）
 * @param newDomain 新的域名
 * @returns 替换后的完整URL地址，如果解析失败返回null
 */
export function replaceProtocolAndDomain(
  originalUrl: string,
  newProtocol: string,
  newDomain: string
): string | null {
  try {
    // 解析原始URL的各个部分
    const urlParts = parseUrl(originalUrl);
    if (!urlParts) {
      return null;
    }

    // 确保协议格式正确
    let protocol = newProtocol;
    if (!protocol.endsWith("://")) {
      protocol = protocol + "://";
    }

    // 构建新的URL
    let newUrl = protocol + newDomain;

    // 添加路径
    if (urlParts.path) {
      newUrl += urlParts.path;
    }

    // 添加查询参数
    if (urlParts.query) {
      newUrl += "?" + urlParts.query;
    }

    // 添加哈希
    if (urlParts.hash) {
      newUrl += "#" + urlParts.hash;
    }

    return newUrl;
  } catch (error) {
    console.error("URL替换失败:", error);
    return null;
  }
}

/**
 * 解析URL的各个组成部分
 * @param url 完整的URL字符串
 * @returns URL各部分的对象，如果解析失败返回null
 */
function parseUrl(url: string): {
  protocol: string;
  domain: string;
  path: string;
  query: string;
  hash: string;
} | null {
  try {
    // 匹配协议和域名
    const protocolDomainRegex = /^(https?:\/\/)([^\/\?#]+)/;
    const protocolDomainMatch = url.match(protocolDomainRegex);

    if (!protocolDomainMatch) {
      return null;
    }

    const protocol = protocolDomainMatch[1];
    const domain = protocolDomainMatch[2];
    const remainingUrl = url.substring(protocolDomainMatch[0].length);

    // 分离路径、查询参数和哈希
    let path = "";
    let query = "";
    let hash = "";

    // 查找哈希
    const hashIndex = remainingUrl.indexOf("#");
    if (hashIndex !== -1) {
      hash = remainingUrl.substring(hashIndex + 1);
      const beforeHash = remainingUrl.substring(0, hashIndex);

      // 在哈希之前查找查询参数
      const queryIndex = beforeHash.indexOf("?");
      if (queryIndex !== -1) {
        path = beforeHash.substring(0, queryIndex);
        query = beforeHash.substring(queryIndex + 1);
      } else {
        path = beforeHash;
      }
    } else {
      // 没有哈希，查找查询参数
      const queryIndex = remainingUrl.indexOf("?");
      if (queryIndex !== -1) {
        path = remainingUrl.substring(0, queryIndex);
        query = remainingUrl.substring(queryIndex + 1);
      } else {
        path = remainingUrl;
      }
    }

    return {
      protocol,
      domain,
      path,
      query,
      hash,
    };
  } catch (error) {
    console.error("URL解析失败:", error);
    return null;
  }
}

/**
 * 验证URL格式是否正确
 * @param url 要验证的URL字符串
 * @returns 是否为有效的URL格式
 */
export function isValidUrl(url: string): boolean {
  try {
    const regex = /^https?:\/\/[^\s\/\?#]+(\/[^\s]*)?$/;
    return regex.test(url);
  } catch (error) {
    return false;
  }
}

/**
 * 获取URL的路径部分
 * @param url 完整的URL字符串
 * @returns 路径字符串，如果解析失败返回null
 */
export function getPath(url: string): string | null {
  try {
    const urlParts = parseUrl(url);
    return urlParts ? urlParts.path : null;
  } catch (error) {
    console.error("获取路径失败:", error);
    return null;
  }
}

/**
 * 获取URL的查询参数
 * @param url 完整的URL字符串
 * @returns 查询参数字符串，如果解析失败返回null
 */
export function getQuery(url: string): string | null {
  try {
    const urlParts = parseUrl(url);
    return urlParts ? urlParts.query : null;
  } catch (error) {
    console.error("获取查询参数失败:", error);
    return null;
  }
}

/**
 * 获取URL的哈希部分
 * @param url 完整的URL字符串
 * @returns 哈希字符串，如果解析失败返回null
 */
export function getHash(url: string): string | null {
  try {
    const urlParts = parseUrl(url);
    return urlParts ? urlParts.hash : null;
  } catch (error) {
    console.error("获取哈希失败:", error);
    return null;
  }
}
