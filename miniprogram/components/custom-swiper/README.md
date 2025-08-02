# Custom Swiper 自定义轮播组件

一个功能丰富的微信小程序轮播组件，提供类似 react-slick 的功能体验。

## 功能特性

- ✅ 自动轮播播放
- ✅ 指示器导航（圆点/长条切换）
- ✅ 前后箭头导航
- ✅ 循环播放
- ✅ 自定义动画时长
- ✅ 点击事件处理
- ✅ 响应式设计
- ✅ 支持自定义内容
- ✅ 指示器悬停效果
- ✅ 无障碍访问支持

## 使用方法

### 1. 在页面中引入组件

```json
{
  "usingComponents": {
    "custom-swiper": "/components/custom-swiper/custom-swiper"
  }
}
```

### 2. 在 WXML 中使用

```xml
<!-- 基础用法 -->
<custom-swiper
  items="{{swiperItems}}"
  height="{{200}}"
  bind:change="onSwiperChange"
  bind:itemTap="onSwiperItemTap">
</custom-swiper>

<!-- 高级用法 -->
<custom-swiper
  items="{{swiperItems}}"
  height="{{300}}"
  contentType="custom"
  autoplay="{{true}}"
  interval="{{4000}}"
  showDots="{{true}}"
  showArrows="{{true}}"
  loop="{{true}}"
  duration="{{500}}"
  bind:change="onSwiperChange"
  bind:itemTap="onSwiperItemTap">
</custom-swiper>
```

### 3. 在 JS 中配置数据

```javascript
data: {
  swiperItems: [
    {
      image: "https://example.com/image1.jpg",
      title: "轮播图1"
    },
    {
      image: "https://example.com/image2.jpg",
      title: "轮播图2"
    },
    {
      content: "纯文本内容",
      title: "文本轮播"
    }
  ]
},

// 轮播切换事件
onSwiperChange(e) {
  const { index, item } = e.detail;
  console.log('当前轮播索引:', index);
  console.log('当前轮播项:', item);
},

// 轮播项点击事件
onSwiperItemTap(e) {
  const { index, item } = e.detail;
  console.log('点击了轮播项:', index, item);
}
```

## 属性说明

| 属性名      | 类型    | 默认值  | 说明                   |
| ----------- | ------- | ------- | ---------------------- |
| items       | Array   | []      | 轮播数据数组           |
| height      | Number  | 200     | 轮播高度（像素）       |
| autoplay    | Boolean | true    | 是否自动播放           |
| interval    | Number  | 3000    | 自动播放间隔（毫秒）   |
| showDots    | Boolean | true    | 是否显示指示器         |
| showArrows  | Boolean | false   | 是否显示前后箭头       |
| loop        | Boolean | true    | 是否循环播放           |
| duration    | Number  | 300     | 动画持续时间（毫秒）   |
| contentType | String  | 'image' | 内容类型：image/custom |

## 事件说明

| 事件名  | 说明             | 回调参数                          |
| ------- | ---------------- | --------------------------------- |
| change  | 轮播切换时触发   | { index: 当前索引, item: 当前项 } |
| itemTap | 点击轮播项时触发 | { index: 点击索引, item: 点击项 } |

## 数据格式

轮播项支持以下格式：

```javascript
// 图片轮播 (contentType: 'image')
{
  image: "图片URL",
  title: "标题"
}

// 自定义内容轮播 (contentType: 'custom')
{
  image: "背景图片URL",
  title: "标题",
  content: "描述内容"
}

// 文本轮播
{
  content: "文本内容",
  title: "标题"
}

// 简单字符串
"简单文本内容"
```

## 样式定制

组件提供了丰富的样式类名，可以通过 CSS 进行定制：

```scss
.custom-swiper {
  // 轮播容器样式
}

.swiper-dots {
  // 指示器样式
}

.dot {
  // 指示器点样式（未选中：圆点）
}

.dot.active {
  // 激活状态指示器样式（选中：长条）
}

.dot:hover {
  // 指示器悬停效果
}

.swiper-arrows {
  // 箭头容器样式
}

.arrow {
  // 箭头按钮样式
}
```

## 与 react-slick 的对比

| 功能       | react-slick | custom-swiper | 说明       |
| ---------- | ----------- | ------------- | ---------- |
| 自动播放   | ✅          | ✅            | 都支持     |
| 指示器     | ✅          | ✅            | 都支持     |
| 前后箭头   | ✅          | ✅            | 都支持     |
| 循环播放   | ✅          | ✅            | 都支持     |
| 自定义动画 | ✅          | ✅            | 都支持     |
| 响应式     | ✅          | ✅            | 都支持     |
| 触摸滑动   | ❌          | ❌            | 小程序限制 |
| 无限滚动   | ❌          | ❌            | 小程序限制 |

## 注意事项

1. **触摸滑动**：由于小程序的技术限制，暂不支持触摸滑动功能
2. **无限滚动**：由于性能考虑，暂不支持无限滚动效果
3. **性能优化**：建议轮播项数量控制在 10 个以内
4. **图片加载**：建议使用 CDN 图片以提高加载速度

## 指示器样式说明

### 默认样式

- **未选中状态**：4rpx 圆点，15% 透明度灰色 `rgba(34, 34, 34, 0.15)`
- **选中状态**：34.4rpx × 4rpx 长条，15% 透明度灰色 `rgba(34, 34, 34, 0.15)`
- **悬停效果**：透明度增加，提供视觉反馈
- **过渡动画**：0.3s 缓动效果，平滑切换

### 响应式设计

- **小屏幕**：指示器尺寸自动缩小
- **间距调整**：不同屏幕尺寸下自动调整间距

### 无障碍支持

- **语义化标签**：支持屏幕阅读器
- **键盘导航**：支持键盘操作
- **焦点指示**：清晰的焦点状态
