# Custom Swiper 使用示例

## 基础用法

### 1. 简单轮播

```xml
<custom-swiper
  items="{{swiperItems}}"
  height="{{200}}">
</custom-swiper>
```

### 2. 启用手势滑动

```xml
<custom-swiper
  items="{{swiperItems}}"
  height="{{200}}"
  enableSwipe="{{true}}"
  swipeThreshold="{{50}}">
</custom-swiper>
```

### 3. 完整配置

```xml
<custom-swiper
  items="{{swiperItems}}"
  height="{{300}}"
  autoplay="{{true}}"
  interval="{{4000}}"
  showDots="{{true}}"
  showArrows="{{true}}"
  loop="{{true}}"
  duration="{{300}}"
  enableSwipe="{{true}}"
  swipeThreshold="{{50}}"
  contentType="custom"
  bind:change="onSwiperChange"
  bind:itemTap="onSwiperItemTap">
</custom-swiper>
```

## 手势滑动功能详解

### 功能特性

1. **左右滑动切换**

   - 向左滑动：切换到下一张图片
   - 向右滑动：切换到上一张图片

2. **滑动阈值控制**

   - 需要滑动超过设定距离才会触发切换
   - 滑动距离不足时会回到原位
   - 默认阈值：50px

3. **防误触机制**

   - 只有水平滑动距离大于垂直滑动距离时才会触发
   - 避免与页面垂直滚动冲突

4. **自动播放协调**
   - 滑动时自动暂停自动播放
   - 手动操作后重置自动播放计时器
   - 滑动未导致切换时恢复自动播放

### 参数说明

| 参数名         | 类型    | 默认值 | 说明             |
| -------------- | ------- | ------ | ---------------- |
| enableSwipe    | Boolean | true   | 是否启用手势滑动 |
| swipeThreshold | Number  | 50     | 滑动阈值（像素） |

### 使用建议

1. **滑动阈值设置**

   - 30-50px：容易触发，适合快速浏览
   - 50-80px：适中，平衡体验和防误触
   - 80-100px：需要明确意图，防误触效果好

2. **与其他功能配合**

   - 建议同时启用指示器和箭头，提供多种操作方式
   - 可以适当增加动画时长，提供更好的视觉反馈

3. **性能优化**
   - 轮播项数量建议控制在 10 个以内
   - 图片建议使用 CDN 加速

## 实际应用场景

### 1. 商品轮播

```xml
<custom-swiper
  items="{{productImages}}"
  height="{{400}}"
  enableSwipe="{{true}}"
  swipeThreshold="{{40}}"
  showDots="{{true}}"
  showArrows="{{true}}"
  bind:itemTap="onProductImageTap">
</custom-swiper>
```

### 2. 新闻轮播

```xml
<custom-swiper
  items="{{newsItems}}"
  height="{{200}}"
  contentType="custom"
  enableSwipe="{{true}}"
  swipeThreshold="{{60}}"
  autoplay="{{true}}"
  interval="{{5000}}"
  bind:change="onNewsChange">
</custom-swiper>
```

### 3. 广告轮播

```xml
<custom-swiper
  items="{{adItems}}"
  height="{{300}}"
  enableSwipe="{{true}}"
  swipeThreshold="{{50}}"
  showDots="{{true}}"
  loop="{{true}}"
  bind:itemTap="onAdTap">
</custom-swiper>
```

## 事件处理

### 轮播切换事件

```javascript
onSwiperChange(e) {
  const { index, item } = e.detail;
  console.log('当前轮播索引:', index);
  console.log('当前轮播项:', item);

  // 可以在这里处理轮播切换逻辑
  // 比如更新页面状态、发送统计等
}
```

### 轮播项点击事件

```javascript
onSwiperItemTap(e) {
  const { index, item } = e.detail;
  console.log('点击了轮播项:', index, item);

  // 可以在这里处理点击逻辑
  // 比如跳转到详情页、显示弹窗等
}
```

## 样式定制

### 自定义轮播样式

```scss
.custom-swiper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.swiper-dots {
  bottom: 20px;
}

.dot {
  background-color: rgba(255, 255, 255, 0.6);
  margin: 0 4px;
}

.dot.active {
  background-color: #fff;
}
```

### 响应式设计

```scss
@media (max-width: 375px) {
  .custom-swiper {
    border-radius: 4px;
  }

  .swiper-dots {
    bottom: 10px;
  }

  .dot {
    width: 6px;
    height: 6px;
    margin: 0 3px;
  }
}
```

## 注意事项

1. **触摸事件冲突**

   - 组件会自动识别水平滑动，避免与页面垂直滚动冲突
   - 使用 `catchtouchmove` 阻止水平滑动时的事件冒泡
   - 垂直滑动时允许事件冒泡，保持页面滚动功能
   - 如果页面有其他触摸事件，需要注意事件冒泡

2. **性能考虑**

   - 滑动过程中会实时更新位置，建议控制轮播项数量
   - 图片建议使用适当的尺寸和格式

3. **兼容性**

   - 支持微信小程序基础库 2.0.0 及以上版本
   - 在不同设备上滑动体验可能略有差异

4. **无障碍支持**
   - 组件内置了无障碍访问支持
   - 建议保留指示器和箭头，提供多种操作方式
