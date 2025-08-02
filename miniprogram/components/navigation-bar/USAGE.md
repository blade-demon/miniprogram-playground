# Navigation Bar 使用指南

## 快速开始

### 1. 在页面 JSON 中注册组件

```json
{
  "usingComponents": {
    "navigation-bar": "/components/navigation-bar/navigation-bar"
  }
}
```

### 2. 在页面 WXML 中使用组件

#### 基础用法

```xml
<navigation-bar title="页面标题" />
```

#### 固定定位用法

```xml
<!-- 固定在页面顶部 -->
<navigation-bar title="固定导航栏" fixed="{{true}}" />

<!-- 普通导航栏 -->
<navigation-bar title="普通导航栏" fixed="{{false}}" />
```

#### 滚动监听用法

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

#### 自定义内容用法

```xml
<!-- 使用搜索框作为导航栏内容 -->
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

### 3. 在页面 TS 中处理事件

```typescript
Page({
  data: {
    pageScrollTop: 0,
  },

  onBack(e: any) {
    console.log("返回按钮被点击", e.detail.delta);
    wx.navigateBack();
  },

  onSearchInput(e: any) {
    console.log("搜索输入", e.detail.value);
  },

  // 页面滚动事件（必需，用于滚动监听）
  onPageScroll(e: any) {
    if (this.data.enableScroll) {
      this.setData({
        pageScrollTop: e.scrollTop,
      });
    }
  },
});
```

## 滚动监听功能详解

### 功能说明

- `enableScroll="{{true}}"`: 启用滚动监听
- `transparentBackground`: 设置透明背景色
- `opaqueBackground`: 设置不透明背景色
- `pageScrollTop`: 页面传递的滚动位置

### 工作原理

1. **初始状态**: 页面未滚动时，导航栏背景为透明
2. **滚动触发**: 页面向上滚动超过 10px 时，背景自动变为不透明
3. **过渡动画**: 背景色变化有平滑的 0.3 秒过渡动画
4. **数据传递**: 页面通过 `onPageScroll` 事件将滚动位置传递给组件

### 使用场景

1. **长列表页面**

   - 商品列表
   - 文章列表
   - 用户列表

2. **需要沉浸式体验的页面**

   - 图片详情页
   - 视频播放页
   - 地图页面

3. **搜索页面**
   - 搜索结果页
   - 搜索历史页

### 样式注意事项

当使用滚动监听时，需要为页面内容添加适当的上边距：

```scss
/* 为固定导航栏预留空间 */
.page-content {
  padding-top: 120px; /* 根据导航栏高度调整 */
}
```

## 自定义内容功能详解

### 功能说明

- `showCustomContent="{{true}}"`: 启用自定义内容模式
- 支持在导航栏中间放置搜索框、按钮等自定义组件

### 使用示例

#### 搜索框示例

```xml
<navigation-bar
  showCustomContent="{{true}}"
  fixed="{{true}}"
  enableScroll="{{true}}"
  pageScrollTop="{{pageScrollTop}}"
>
  <view slot="center" class="search-container">
    <input
      class="search-input"
      placeholder="搜索商品..."
      bindinput="onSearchInput"
      bindconfirm="onSearchConfirm"
    />
  </view>
</navigation-bar>
```

#### 按钮组示例

```xml
<navigation-bar
  showCustomContent="{{true}}"
  fixed="{{true}}"
  pageScrollTop="{{pageScrollTop}}"
>
  <view slot="center" class="button-group">
    <button class="nav-btn active">全部</button>
    <button class="nav-btn">分类</button>
    <button class="nav-btn">筛选</button>
  </view>
</navigation-bar>
```

### 样式建议

```scss
/* 搜索框样式 */
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
  color: #333;
}

/* 按钮组样式 */
.button-group {
  display: flex;
  gap: 10px;
  padding: 0 20px;
}

.nav-btn {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  color: #666;
  min-width: 50px;
}

.nav-btn.active {
  background: #007aff;
  color: #fff;
}
```

## 动态控制示例

```xml
<!-- 页面模板 -->
<navigation-bar
  title="动态导航栏"
  fixed="{{isFixed}}"
  show="{{isShow}}"
  enableScroll="{{enableScroll}}"
  showCustomContent="{{showCustomContent}}"
  transparentBackground="{{transparentBg}}"
  opaqueBackground="{{opaqueBg}}"
  pageScrollTop="{{pageScrollTop}}"
  bind:back="onBack"
>
  <view slot="center" wx:if="{{showCustomContent}}" class="search-container">
    <input
      class="search-input"
      placeholder="搜索..."
      bindinput="onSearchInput"
    />
  </view>
</navigation-bar>

<view class="content">
  <!-- 页面内容 -->
</view>

<button bindtap="toggleFixed">切换固定状态</button>
<button bindtap="toggleScroll">切换滚动监听</button>
<button bindtap="toggleCustom">切换自定义内容</button>
```

```typescript
// 页面逻辑
Page({
  data: {
    isFixed: true,
    isShow: true,
    enableScroll: true,
    showCustomContent: false,
    transparentBg: "rgba(0,0,0,0)",
    opaqueBg: "#fdacfa",
    pageScrollTop: 0,
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    if (this.data.enableScroll) {
      this.setData({
        pageScrollTop: e.scrollTop,
      });
    }
  },

  toggleFixed() {
    this.setData({
      isFixed: !this.data.isFixed,
    });
  },

  toggleScroll() {
    this.setData({
      enableScroll: !this.data.enableScroll,
    });
  },

  toggleCustom() {
    this.setData({
      showCustomContent: !this.data.showCustomContent,
    });
  },

  onBack(e: any) {
    wx.navigateBack();
  },

  onSearchInput(e: any) {
    console.log("搜索输入", e.detail.value);
  },
});
```

## 完整属性列表

| 属性                      | 类型        | 默认值              | 说明                   |
| ------------------------- | ----------- | ------------------- | ---------------------- |
| title                     | String      | ''                  | 导航栏标题             |
| background                | String      | ''                  | 背景色                 |
| color                     | String      | ''                  | 文字颜色               |
| back                      | Boolean     | true                | 是否显示返回按钮       |
| loading                   | Boolean     | false               | 是否显示加载状态       |
| homeButton                | Boolean     | false               | 是否显示首页按钮       |
| animated                  | Boolean     | true                | 是否启用动画           |
| show                      | Boolean     | true                | 是否显示导航栏         |
| delta                     | Number      | 1                   | 返回页面深度           |
| **fixed**                 | **Boolean** | **false**           | **是否固定在页面顶部** |
| **enableScroll**          | **Boolean** | **false**           | **是否启用滚动监听**   |
| **transparentBackground** | **String**  | **'rgba(0,0,0,0)'** | **透明背景色**         |
| **opaqueBackground**      | **String**  | **'#fdacfa'**       | **不透明背景色**       |
| **showCustomContent**     | **Boolean** | **false**           | **是否显示自定义内容** |
| **pageScrollTop**         | **Number**  | **0**               | **页面滚动位置**       |

## 最佳实践

1. **合理使用滚动监听**

   - 只在需要沉浸式体验的页面使用
   - 避免在简单页面过度使用

2. **自定义内容设计**

   - 确保在透明和不透明背景下都有良好的视觉效果
   - 使用半透明背景提高可读性

3. **样式适配**

   - 为固定导航栏预留足够空间
   - 考虑不同设备的屏幕尺寸

4. **用户体验**

   - 提供切换功能的选项
   - 保持导航栏的响应性

5. **性能考虑**

   - 滚动监听会增加页面复杂度
   - 在性能敏感的场景谨慎使用

6. **兼容性**

   - 确保自定义内容在不同设备上正常显示
   - 测试不同屏幕尺寸下的效果

7. **重要提醒**
   - **使用滚动监听功能时，必须在页面中实现 `onPageScroll` 事件**
   - **将滚动位置通过 `pageScrollTop` 属性传递给组件**
   - **这是微信小程序组件限制的解决方案**
