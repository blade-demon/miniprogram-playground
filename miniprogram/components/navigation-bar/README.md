# Navigation Bar 导航栏组件

一个可定制的微信小程序导航栏组件，支持多种配置选项。

## 功能特性

- 自定义标题和背景色
- 返回按钮和首页按钮
- 加载状态显示
- 动画效果
- 显示/隐藏控制
- **固定定位支持**
- **滚动监听和背景透明度变化**
- **自定义内容支持（搜索框等）**

## 属性说明

| 属性名                    | 类型        | 默认值              | 说明                   |
| ------------------------- | ----------- | ------------------- | ---------------------- |
| title                     | String      | ''                  | 导航栏标题             |
| background                | String      | ''                  | 导航栏背景色           |
| color                     | String      | ''                  | 导航栏文字颜色         |
| back                      | Boolean     | true                | 是否显示返回按钮       |
| loading                   | Boolean     | false               | 是否显示加载状态       |
| homeButton                | Boolean     | false               | 是否显示首页按钮       |
| animated                  | Boolean     | true                | 是否启用动画效果       |
| show                      | Boolean     | true                | 是否显示导航栏         |
| delta                     | Number      | 1                   | 返回页面深度           |
| **fixed**                 | **Boolean** | **false**           | **是否固定在页面顶部** |
| **enableScroll**          | **Boolean** | **false**           | **是否启用滚动监听**   |
| **transparentBackground** | **String**  | **'rgba(0,0,0,0)'** | **透明背景色**         |
| **opaqueBackground**      | **String**  | **'#fdacfa'**       | **不透明背景色**       |
| **showCustomContent**     | **Boolean** | **false**           | **是否显示自定义内容** |
| **pageScrollTop**         | **Number**  | **0**               | **页面滚动位置**       |

## 使用示例

### 基础用法

```xml
<navigation-bar title="页面标题" />
```

### 固定定位

```xml
<!-- 固定在页面顶部 -->
<navigation-bar title="固定导航栏" fixed="{{true}}" />

<!-- 普通导航栏 -->
<navigation-bar title="普通导航栏" fixed="{{false}}" />
```

### 滚动监听和背景变化

```xml
<!-- 启用滚动监听，背景从透明变为不透明 -->
<navigation-bar
  title="滚动导航栏"
  fixed="{{true}}"
  enableScroll="{{true}}"
  transparentBackground="rgba(0,0,0,0)"
  opaqueBackground="#fdacfa"
  pageScrollTop="{{pageScrollTop}}"
/>
```

### 自定义内容

```xml
<!-- 使用自定义内容（搜索框） -->
<navigation-bar
  showCustomContent="{{true}}"
  fixed="{{true}}"
  enableScroll="{{true}}"
  pageScrollTop="{{pageScrollTop}}"
>
  <view slot="center" class="search-container">
    <input
      class="search-input"
      placeholder="搜索..."
      bindinput="onSearchInput"
    />
  </view>
</navigation-bar>
```

### 完整示例

```xml
<navigation-bar
  title="我的页面"
  background="#ffffff"
  color="#000000"
  back="{{true}}"
  loading="{{false}}"
  fixed="{{true}}"
  enableScroll="{{true}}"
  transparentBackground="rgba(0,0,0,0)"
  opaqueBackground="#fdacfa"
  showCustomContent="{{false}}"
  pageScrollTop="{{pageScrollTop}}"
  bind:back="onBack"
/>
```

## 插槽支持

组件支持以下插槽：

- `left`: 左侧自定义内容
- `center`: 中间自定义内容（当 `showCustomContent="{{true}}"` 时优先显示）
- `right`: 右侧自定义内容

```xml
<navigation-bar title="自定义导航栏" showCustomContent="{{true}}">
  <view slot="left">左侧内容</view>
  <view slot="center">
    <input class="search-input" placeholder="搜索..." />
  </view>
  <view slot="right">右侧内容</view>
</navigation-bar>
```

## 事件

- `back`: 点击返回按钮时触发

```javascript
Page({
  onBack(e) {
    console.log("返回按钮被点击", e.detail.delta);
  },
});
```

## 滚动监听功能

### 功能说明

- `enableScroll="{{true}}"`: 启用滚动监听
- `transparentBackground`: 设置透明背景色
- `opaqueBackground`: 设置不透明背景色
- `pageScrollTop`: 页面传递的滚动位置

### 工作原理

1. 页面未滚动时，导航栏背景为透明
2. 页面向上滚动超过 10px 时，背景自动变为不透明
3. 背景色变化有平滑的过渡动画
4. **页面通过 `onPageScroll` 事件将滚动位置传递给组件**

### 使用场景

- 长列表页面
- 需要沉浸式体验的页面
- 搜索页面

### 重要提醒

**使用滚动监听功能时，必须在页面中实现 `onPageScroll` 事件并将滚动位置传递给组件：**

```typescript
Page({
  data: {
    pageScrollTop: 0,
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    this.setData({
      pageScrollTop: e.scrollTop,
    });
  },
});
```

## 自定义内容功能

### 功能说明

- `showCustomContent="{{true}}"`: 启用自定义内容模式
- 支持在导航栏中间放置搜索框、按钮等自定义组件

### 样式建议

```scss
.search-container {
  width: 100%;
  padding: 0 20px;
}

.search-input {
  width: 100%;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 0 12px;
  font-size: 14px;
  border: none;
}
```

## 注意事项

1. 当使用 `fixed="{{true}}"` 时，导航栏会固定在页面顶部，其他内容需要添加相应的上边距
2. 固定定位的导航栏会覆盖在其他内容之上，z-index 为 1000
3. 建议在页面样式中为固定导航栏预留空间，避免内容被遮挡
4. **滚动监听功能需要页面支持 `onPageScroll` 事件并传递滚动位置**
5. **自定义内容时建议设置合适的样式，确保在透明和不透明背景下都有良好的视觉效果**
