# 数字格式化工具

这个工具提供了多种数字格式化功能，包括千分位分隔符、货币格式化、百分比格式化等。

## 功能特性

- 🔢 千分位分隔符格式化
- 💰 货币格式化
- 📊 百分比格式化
- 📈 大数字简化显示

## 使用方法

### 1. 千分位分隔符格式化

```typescript
import { formatNumberWithCommas } from "../../utils/util";

// 基本使用
formatNumberWithCommas(100000); // "100,000.00"
formatNumberWithCommas(1234567.89); // "1,234,567.89"
formatNumberWithCommas(999.99); // "999.99"

// 自定义小数位数
formatNumberWithCommas(100000, 0); // "100,000"
formatNumberWithCommas(123.456, 3); // "123.456"
```

### 2. 货币格式化

```typescript
import { formatCurrency } from "../../utils/util";

// 基本使用
formatCurrency(100000); // "100,000.00"
formatCurrency(1234567.89, "¥"); // "¥100,000.00"
formatCurrency(999.99, "$", 2); // "$999.99"
```

### 3. 百分比格式化

```typescript
import { formatPercentage } from "../../utils/util";

// 基本使用
formatPercentage(0.1234); // "12.34%"
formatPercentage(0.5, 1); // "50.0%"
```

### 4. 大数字简化显示

```typescript
import { formatLargeNumber } from "../../utils/util";

// 基本使用
formatLargeNumber(15000); // "1.5万"
formatLargeNumber(150000000); // "1.5亿"
formatLargeNumber(999); // "999"
```

## 在组件中使用

### Account Asset Card 组件

```typescript
// 在 account-asset-card 组件中
updateAssets(totalAssets: number, yesterdayEarnings: number) {
  this.setData({
    totalAssets: this.formatNumber(totalAssets),      // 自动添加千分位分隔符
    yesterdayEarnings: this.formatNumber(yesterdayEarnings)
  });
}
```

### 页面中使用

```typescript
Page({
  data: {
    totalAssets: "0.00",
    yesterdayEarnings: "0.00",
  },

  onLoad() {
    // 模拟从API获取数据
    this.loadAssetsData();
  },

  loadAssetsData() {
    const mockData = {
      totalAssets: 1234567.89, // 显示为 1,234,567.89
      yesterdayEarnings: 12345.67, // 显示为 12,345.67
    };

    this.setData({
      totalAssets: mockData.totalAssets.toFixed(2),
      yesterdayEarnings: mockData.yesterdayEarnings.toFixed(2),
    });
  },
});
```

## 格式化效果示例

| 原始数字   | 格式化后     | 说明          |
| ---------- | ------------ | ------------- |
| 100000     | 100,000.00   | 千分位分隔符  |
| 1234567.89 | 1,234,567.89 | 大数字格式化  |
| 999.99     | 999.99       | 小数格式化    |
| 1000       | 1,000.00     | 整数格式化    |
| 123.456    | 123.46       | 保留 2 位小数 |

## 注意事项

1. 所有格式化函数都返回字符串类型
2. 千分位分隔符使用英文逗号(,)
3. 小数位数默认为 2 位
4. 大数字简化显示支持万、亿单位
5. 货币格式化支持自定义货币符号
