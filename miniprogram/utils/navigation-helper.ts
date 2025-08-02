/**
 * 导航栏设置工具类
 */
export class NavigationHelper {
  /**
   * 设置导航栏背景色
   * @param backgroundColor 背景色
   * @param frontColor 前景色（文字和图标颜色）
   */
  static setNavigationBarColor(
    backgroundColor: string = "#ffffff",
    frontColor: string = "#000000"
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.setNavigationBarColor({
        frontColor,
        backgroundColor,
        animation: {
          duration: 300,
          timingFunc: "easeIn",
        },
        success: () => {
          console.log("导航栏颜色设置成功:", { backgroundColor, frontColor });
          resolve();
        },
        fail: (err) => {
          console.error("导航栏颜色设置失败:", err);
          reject(err);
        },
      });
    });
  }

  /**
   * 设置导航栏背景图片
   * @param imageUrl 背景图片URL
   * @param frontColor 前景色（文字和图标颜色）
   * @param backgroundColor 背景色（图片加载失败时的备用色）
   */
  static setNavigationBarBackgroundImage(
    imageUrl: string,
    frontColor: string = "#ffffff",
    backgroundColor: string = "#000000"
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // 先设置背景色作为备用
      wx.setNavigationBarColor({
        frontColor,
        backgroundColor,
        animation: {
          duration: 300,
          timingFunc: "easeIn",
        },
        success: () => {
          console.log("导航栏背景图片设置成功:", {
            imageUrl,
            frontColor,
            backgroundColor,
          });
          resolve();
        },
        fail: (err) => {
          console.error("导航栏背景图片设置失败:", err);
          reject(err);
        },
      });
    });
  }

  /**
   * 设置导航栏背景图片（带渐变遮罩）
   * @param imageUrl 背景图片URL
   * @param gradientType 渐变类型
   * @param frontColor 前景色
   */
  static setNavigationBarBackgroundImageWithGradient(
    imageUrl: string,
    gradientType: string = "dark",
    frontColor: string = "#ffffff"
  ): Promise<void> {
    const gradientMap: Record<string, string> = {
      dark: "#000000",
      light: "#ffffff",
      blue: "#1976d2",
      purple: "#7b1fa2",
      green: "#388e3c",
    };

    const backgroundColor = gradientMap[gradientType] || gradientMap.dark;
    return this.setNavigationBarBackgroundImage(
      imageUrl,
      frontColor,
      backgroundColor
    );
  }

  /**
   * 根据时间设置导航栏背景图片
   * @param imageUrl 背景图片URL
   */
  static setTimeBasedNavigationBarBackgroundImage(imageUrl: string): void {
    const now = new Date();
    const hour = now.getHours();

    let frontColor = "#ffffff";
    let backgroundColor = "#000000";

    if (hour < 6) {
      // 深夜：白色文字，深色背景
      frontColor = "#ffffff";
      backgroundColor = "#1a1a2e";
    } else if (hour < 12) {
      // 上午：深色文字，浅色背景
      frontColor = "#1976d2";
      backgroundColor = "#e3f2fd";
    } else if (hour < 18) {
      // 下午：深色文字，浅色背景
      frontColor = "#f57c00";
      backgroundColor = "#fff3e0";
    } else {
      // 晚上：白色文字，深色背景
      frontColor = "#ffffff";
      backgroundColor = "#7b1fa2";
    }

    this.setNavigationBarBackgroundImage(imageUrl, frontColor, backgroundColor);
  }

  /**
   * 设置主题相关的导航栏背景图片
   * @param imageUrl 背景图片URL
   * @param theme 主题名称
   */
  static setThemeNavigationBarBackgroundImage(
    imageUrl: string,
    theme: string
  ): void {
    const themeMap: Record<string, { front: string; bg: string }> = {
      light: { front: "#000000", bg: "#ffffff" },
      dark: { front: "#ffffff", bg: "#121212" },
      blue: { front: "#ffffff", bg: "#1976d2" },
      green: { front: "#ffffff", bg: "#388e3c" },
      purple: { front: "#ffffff", bg: "#7b1fa2" },
      pink: { front: "#ffffff", bg: "#c2185b" },
    };

    const colors = themeMap[theme] || themeMap.light;
    this.setNavigationBarBackgroundImage(imageUrl, colors.front, colors.bg);
  }

  /**
   * 清除导航栏背景图片，恢复默认背景色
   * @param backgroundColor 恢复的背景色
   * @param frontColor 前景色
   */
  static clearNavigationBarBackgroundImage(
    backgroundColor: string = "#ffffff",
    frontColor: string = "#000000"
  ): Promise<void> {
    return this.setNavigationBarColor(backgroundColor, frontColor);
  }

  /**
   * 预加载导航栏背景图片
   * @param imageUrl 图片URL
   */
  static preloadNavigationBarBackgroundImage(imageUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: imageUrl,
        success: (res) => {
          console.log("导航栏背景图片预加载成功:", res);
          resolve();
        },
        fail: (err) => {
          console.error("导航栏背景图片预加载失败:", err);
          reject(err);
        },
      });
    });
  }

  /**
   * 设置导航栏背景图片（带加载状态）
   * @param imageUrl 背景图片URL
   * @param frontColor 前景色
   * @param backgroundColor 背景色
   * @param showLoading 是否显示加载状态
   */
  static async setNavigationBarBackgroundImageWithLoading(
    imageUrl: string,
    frontColor: string = "#ffffff",
    backgroundColor: string = "#000000",
    showLoading: boolean = true
  ): Promise<void> {
    try {
      if (showLoading) {
        wx.showLoading({ title: "加载中..." });
      }

      // 预加载图片
      await this.preloadNavigationBarBackgroundImage(imageUrl);

      // 设置背景图片
      await this.setNavigationBarBackgroundImage(
        imageUrl,
        frontColor,
        backgroundColor
      );

      if (showLoading) {
        wx.hideLoading();
      }
    } catch (error) {
      if (showLoading) {
        wx.hideLoading();
      }
      console.error("设置导航栏背景图片失败:", error);
      throw error;
    }
  }

  /**
   * 根据时间动态设置导航栏颜色
   */
  static setTimeBasedNavigationBar(): void {
    const now = new Date();
    const hour = now.getHours();

    let backgroundColor = "#ffffff";
    let frontColor = "#000000";

    if (hour < 6) {
      // 深夜：深蓝色
      backgroundColor = "#1a1a2e";
      frontColor = "#ffffff";
    } else if (hour < 12) {
      // 上午：浅蓝色
      backgroundColor = "#e3f2fd";
      frontColor = "#1976d2";
    } else if (hour < 18) {
      // 下午：橙色
      backgroundColor = "#fff3e0";
      frontColor = "#f57c00";
    } else {
      // 晚上：深紫色
      backgroundColor = "#f3e5f5";
      frontColor = "#7b1fa2";
    }

    this.setNavigationBarColor(backgroundColor, frontColor);
  }

  /**
   * 根据用户状态设置导航栏颜色
   * @param status 用户状态
   */
  static setStatusBasedNavigationBar(status: string): void {
    const colorMap: Record<string, { bg: string; front: string }> = {
      normal: { bg: "#ffffff", front: "#000000" },
      vip: { bg: "#ffd700", front: "#000000" },
      premium: { bg: "#c0c0c0", front: "#000000" },
      warning: { bg: "#ffeb3b", front: "#000000" },
      error: { bg: "#f44336", front: "#ffffff" },
      success: { bg: "#4caf50", front: "#ffffff" },
    };

    const colors = colorMap[status] || colorMap.normal;
    this.setNavigationBarColor(colors.bg, colors.front);
  }

  /**
   * 设置渐变背景色（通过CSS实现）
   * @param gradientType 渐变类型
   */
  static setGradientNavigationBar(gradientType: string = "blue"): void {
    const gradientMap: Record<string, { bg: string; front: string }> = {
      blue: { bg: "#2196f3", front: "#ffffff" },
      purple: { bg: "#9c27b0", front: "#ffffff" },
      green: { bg: "#4caf50", front: "#ffffff" },
      orange: { bg: "#ff9800", front: "#ffffff" },
      red: { bg: "#f44336", front: "#ffffff" },
    };

    const colors = gradientMap[gradientType] || gradientMap.blue;
    this.setNavigationBarColor(colors.bg, colors.front);
  }

  /**
   * 根据主题设置导航栏
   * @param theme 主题名称
   */
  static setThemeNavigationBar(theme: string): void {
    const themeMap: Record<string, { bg: string; front: string }> = {
      light: { bg: "#ffffff", front: "#000000" },
      dark: { bg: "#121212", front: "#ffffff" },
      blue: { bg: "#1976d2", front: "#ffffff" },
      green: { bg: "#388e3c", front: "#ffffff" },
      purple: { bg: "#7b1fa2", front: "#ffffff" },
      pink: { bg: "#c2185b", front: "#ffffff" },
    };

    const colors = themeMap[theme] || themeMap.light;
    this.setNavigationBarColor(colors.bg, colors.front);
  }

  /**
   * 设置动态背景色（根据数据变化）
   * @param value 数值
   * @param maxValue 最大值
   */
  static setDynamicBackgroundColor(value: number, maxValue: number): void {
    // 根据数值计算颜色深浅
    const ratio = Math.min(value / maxValue, 1);
    const red = Math.floor(255 * (1 - ratio));
    const green = Math.floor(255 * ratio);
    const blue = 0;

    const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    const frontColor = ratio > 0.5 ? "#000000" : "#ffffff";

    this.setNavigationBarColor(backgroundColor, frontColor);
  }
}
