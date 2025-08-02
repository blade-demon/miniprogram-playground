# Marquee 跑马灯组件

一个功能丰富的微信小程序跑马灯组件，支持多种主题样式和自定义配置。

## 功能特性

- ✅ 自动滚动文字内容
- ✅ 支持多条消息轮播
- ✅ 多种主题样式（橙色、渐变、暗色等）
- ✅ 可自定义滚动速度
- ✅ 点击事件处理
- ✅ 响应式设计

## 使用方法

### 1. 在页面中引入组件

```json
{
  "usingComponents": {
    "marquee": "/components/marquee/marquee"
  }
}
```

### 2. 在 WXML 中使用

```xml
<marquee
  messages="{{marqueeMessages}}"
  speed="{{80}}"
  bind:messageClick="onMarqueeMessageClick"
  bind:moreClick="onMarqueeMoreClick">
</marquee>
```

### 3. 在 JS 中配置数据

```javascript
data: {
  marqueeMessages: [
    {
      id: "1",
      content: "完成投资前准备即可随时随地投资",
      type: "investment",
      url: "/pages/investment/investment",
    },
    {
      id: "2",
      content: "新用户注册即送价值100元优惠券",
      type: "promotion",
      url: "/pages/promotion/promotion",
    },
  ];
}
```

## 属性说明

| 属性名   | 类型    | 默认值 | 说明                     |
| -------- | ------- | ------ | ------------------------ |
| messages | Array   | []     | 消息数组                 |
| speed    | Number  | 100    | 滚动速度（数值越小越快） |
| autoPlay | Boolean | true   | 是否自动播放             |

## 消息对象结构

```javascript
{
  id: "唯一标识",
  content: "显示的文字内容",
  type: "消息类型",
  url: "点击跳转链接"
}
```

## 事件说明

| 事件名       | 说明               | 回调参数              |
| ------------ | ------------------ | --------------------- |
| messageClick | 点击消息时触发     | { message: 消息对象 } |
| moreClick    | 点击更多按钮时触发 | -                     |

## 主题样式

组件支持多种主题样式，通过在容器上添加对应的 CSS 类名来切换：

### 橙色主题（匹配截图设计）

```xml
<marquee class="orange-theme" messages="{{messages}}">
```

### 其他主题

- `dark-theme`: 暗色主题
- `light-theme`: 轻量主题
- `success-theme`: 成功主题
- `warning-theme`: 警告主题

## 样式自定义

可以通过修改 `marquee.scss` 文件来自定义组件样式：

```scss
.marquee-container.orange-theme {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx 32rpx;
}

.marquee-container.orange-theme .marquee-text {
  color: #ff6b35;
  font-size: 32rpx;
}
```

## 注意事项

1. 确保消息数组不为空，否则组件不会显示
2. 文字内容过长时会自动滚动，过短时会居中显示
3. 组件会自动处理多条消息的轮播切换
4. 建议在页面卸载时清理相关定时器

## 更新日志

### v1.0.0

- 初始版本发布
- 支持基础跑马灯功能
- 添加橙色主题样式
- 支持点击事件处理
