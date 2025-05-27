# 图片标注工具

一个简单易用的图片点定位和框定位工具，支持上传图片并根据bbox坐标自动生成标注图片。

![示例图1](https://cdn.canghecode.com/blog/20250528070456.png)

![示例图2](https://cdn.canghecode.com/blog/20250528070702.png)

## 功能特点

- 🖼️ **图片上传**: 支持拖拽或点击上传图片（JPG、PNG、GIF格式）
- 📐 **坐标输入**: 灵活的bbox坐标输入方式，支持多种格式
- 🎯 **多种标注类型**: 
  - 点定位：在bbox中心添加十字标记
  - 框定位：绘制边界框
  - 组合标注：同时显示点和框
- 🎨 **自定义样式**: 可选择标注颜色
- 💾 **一键下载**: 生成标注图片后可直接下载
- 📱 **响应式设计**: 支持各种屏幕尺寸

## 使用方法

### 1. 上传图片
- 点击上传区域选择图片文件
- 或直接拖拽图片到上传区域

### 2. 输入bbox坐标
支持以下格式输入坐标：

**方式一：分别输入各坐标**
- X1: 左上角X坐标
- Y1: 左上角Y坐标  
- X2: 右下角X坐标
- Y2: 右下角Y坐标

**方式二：坐标字符串**
支持多种分隔符：
- `100 50 200 150` (空格分隔)
- `100,50,200,150` (逗号分隔)
- `100;50;200;150` (分号分隔)

### 3. 选择标注类型
- **点定位 + 框定位**: 同时显示中心点和边界框
- **仅点定位**: 只显示bbox中心的十字标记
- **仅框定位**: 只显示边界框

### 4. 自定义颜色
点击颜色选择器自定义标注颜色

### 5. 生成和下载
点击"生成标注图片"按钮，系统会自动处理并显示结果，然后可以下载标注后的图片。

## 坐标系统说明

本工具使用标准的图片坐标系统：
- 原点(0,0)位于图片左上角
- X轴向右递增
- Y轴向下递增
- bbox格式：`(x1, y1, x2, y2)` 其中 (x1,y1) 为左上角，(x2,y2) 为右下角

## 快捷键

- `Ctrl + Enter`: 快速生成标注图片
- `Escape`: 清除所有内容

## 技术实现

- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **图像处理**: Canvas API
- **UI框架**: Bootstrap 5
- **图标**: Font Awesome 6
- **无需后端**: 纯前端实现，所有处理均在浏览器中完成

## 文件结构

```
图片标注工具/
├── index.html          # 主页面
├── script.js           # 核心功能脚本
└── README.md          # 使用说明
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 使用示例

1. 上传一张包含物体的图片
2. 输入bbox坐标，例如：`100 50 300 200`
3. 选择"点定位 + 框定位"
4. 点击"生成标注图片"
5. 下载生成的标注图片

## 注意事项

- 确保bbox坐标在图片范围内
- x1 < x2 且 y1 < y2
- 支持的图片格式：JPG、PNG、GIF
- 生成的标注图片为PNG格式


## 友情链接

- [mcp-server-weread](https://github.com/freestylefly/mcp-server-weread) ：🚀一个为微信读书提供MCP（Model Context Protocol）服务的工具，支持将微信读书的书籍、笔记和划线数据提供给支持MCP的大语言模型客户端，如Claude Desktop。
- [CodeCanvas](https://github.com/freestylefly/CodeCanvas) ：📚本代码仓库是作者苍何多年从事一线互联网Java开发的学习历程技术汇总，旨在为大家提供一个清晰详细的学习教程，侧重点更倾向编写Java核心内容。💪🏻
- [PmHub](https://github.com/laigeoffer/pmhub) ：🔥PmHub 是一套基于 SpringCloud & LLM 的微服务智能项目管理系统，这个项目旨在帮助小伙伴们快速掌握微服务/分布式项目的架构设计和开发流程，如果想在校招或者社招中拿到一个满意的 offer，PmHub 将是一个非常 nice 的选择。

## star 趋势图

[![Star History Chart](https://api.star-history.com/svg?repos=freestylefly/tupianbiaozhu&type=Date)](https://star-history.com/#freestylefly/tupianbiaozhu&Date)

## 公众号

微信搜 **苍何** 或扫描下方二维码关注苍何的原创公众号，回复 **AI** 即可和 5000+ 好友一同探讨AI，一同学习MCP。

![苍何微信公众号](https://cdn.tobebetterjavaer.com/stutymore/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E6%A0%87%E5%87%86%E8%89%B2%E7%89%88.png)


## 开源协议

MIT License 