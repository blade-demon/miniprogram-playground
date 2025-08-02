/**
 * 页面标题设置工具类
 */
export class TitleHelper {
  /**
   * 设置基础标题
   * @param title 标题内容
   */
  static setTitle(title: string): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.setNavigationBarTitle({
        title,
        success: () => {
          console.log("标题设置成功:", title);
          resolve();
        },
        fail: (err) => {
          console.error("标题设置失败:", err);
          reject(err);
        },
      });
    });
  }

  /**
   * 根据用户信息设置个性化标题
   * @param baseTitle 基础标题
   */
  static setPersonalizedTitle(baseTitle: string = "我的账户"): void {
    try {
      const userInfo = wx.getStorageSync("userInfo");
      if (userInfo && userInfo.nickname) {
        this.setTitle(`${userInfo.nickname}的${baseTitle}`);
      } else {
        this.setTitle(baseTitle);
      }
    } catch (error) {
      console.error("设置个性化标题失败:", error);
      this.setTitle(baseTitle);
    }
  }

  /**
   * 根据时间设置问候语标题
   * @param baseTitle 基础标题
   */
  static setGreetingTitle(baseTitle: string = "我的账户"): void {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";

    if (hour < 6) {
      greeting = "夜深了";
    } else if (hour < 12) {
      greeting = "早上好";
    } else if (hour < 18) {
      greeting = "下午好";
    } else {
      greeting = "晚上好";
    }

    this.setTitle(`${greeting}，${baseTitle}`);
  }

  /**
   * 设置带数据的标题（如显示余额）
   * @param baseTitle 基础标题
   * @param data 要显示的数据
   * @param dataType 数据类型（如：余额、收益等）
   */
  static setDataTitle(
    baseTitle: string,
    data: string | number,
    dataType: string = ""
  ): void {
    const formattedData = typeof data === "number" ? data.toFixed(2) : data;
    const title = dataType
      ? `${baseTitle}(${dataType}:${formattedData})`
      : `${baseTitle}(${formattedData})`;
    this.setTitle(title);
  }

  /**
   * 设置带状态的标题
   * @param baseTitle 基础标题
   * @param status 状态
   * @param statusColor 状态颜色（可选）
   */
  static setStatusTitle(
    baseTitle: string,
    status: string,
    statusColor?: string
  ): void {
    const title = `${baseTitle} - ${status}`;
    this.setTitle(title);

    // 如果需要设置状态栏颜色
    if (statusColor) {
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: statusColor,
      });
    }
  }

  /**
   * 设置带计数的标题（如消息数量）
   * @param baseTitle 基础标题
   * @param count 数量
   * @param maxCount 最大显示数量
   */
  static setCountTitle(
    baseTitle: string,
    count: number,
    maxCount: number = 99
  ): void {
    const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
    const title = count > 0 ? `${baseTitle}(${displayCount})` : baseTitle;
    this.setTitle(title);
  }

  /**
   * 设置多语言标题
   * @param baseTitle 基础标题
   * @param language 语言代码
   */
  static setMultiLanguageTitle(
    baseTitle: string,
    language: string = "zh"
  ): void {
    const languageMap: Record<string, string> = {
      zh: baseTitle,
      en: baseTitle.replace("我的", "My "),
      ja: baseTitle.replace("我的", "私の"),
    };

    const title = languageMap[language] || baseTitle;
    this.setTitle(title);
  }
}
