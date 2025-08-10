Component({
  properties: {
    // 图标大小
    size: {
      type: Number,
      value: 24,
    },
    // 图标颜色
    color: {
      type: String,
      value: "#333333",
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    // 组件内部数据
  },

  methods: {
    // 点击事件
    onTap() {
      if (this.data.disabled) {
        return;
      }
      this.triggerEvent("tap");
    },
  },

  observers: {
    size: function (size) {
      // 根据大小调整箭头样式
      this.setData({
        arrowStyle: `width: ${size}px; height: ${size}px;`,
      });
    },
  },
});
