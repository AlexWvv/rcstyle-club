# 数据埋点配置指南

本项目已集成三款数据分析工具：

| 工具 | 功能 | 费用 | 国内可用 |
|------|------|------|---------|
| **Google Analytics 4** | 流量分析、用户行为、自定义事件 | 免费 | ✅ |
| **百度统计** | 热力图、实时访客、来源分析 | 免费 | ✅ |
| **Microsoft Clarity** | 热力图、会话录制 | 免费 | ❌ 需翻墙 |

---

## 一、Google Analytics 4 配置 ✅ 已配置

### 你的配置信息
- **衡量 ID**: `G-14029002386`
- **状态**: 已启用

### 查看数据
1. 访问 [Google Analytics](https://analytics.google.com/)
2. 选择你的媒体资源
3. 等待 24-48 小时后查看数据

---

## 二、百度统计配置（替代 Clarity）

由于 Clarity 在国内无法访问，推荐使用百度统计作为替代方案。

### 1. 注册百度统计账号

1. 访问 [百度统计](https://tongji.baidu.com/)
2. 使用百度账号登录
3. 点击 **「管理」** → **「新增网站」**

### 2. 添加网站

1. **网站域名**：`rcstyle.club`
2. **网站名称**：`Rcstyle.club`
3. 点击 **「确定」**

### 3. 获取统计 ID

1. 在网站列表中，点击 **「获取代码」**
2. 找到代码中的 ID（格式：`hm.js?xxxxxxxxxx` 后面的部分）
3. 复制这个 ID

### 4. 配置环境变量

在 `.env.local` 文件中添加：

```bash
# 百度统计
NEXT_PUBLIC_BAIDU_TONGJI_ID=你的百度统计ID
```

---

## 三、完整环境变量配置

当前 `.env.local` 文件内容：

```bash
# Google Analytics 4 ✅ 已配置
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-14029002386

# Microsoft Clarity（已禁用，国内无法访问）
# NEXT_PUBLIC_CLARITY_PROJECT_ID=

# 百度统计（待配置）
NEXT_PUBLIC_BAIDU_TONGJI_ID=
```

---

## 四、已追踪的事件

### 自动追踪
- `page_view` - 页面浏览
- `session_start` - 会话开始
- `first_visit` - 首次访问

### 自定义事件
| 事件名称 | 说明 |
|---------|------|
| `brand_click` | 品牌点击 |
| `model_view` | 车型查看 |
| `manual_download` | 说明书下载 |
| `search` | 搜索 |
| `news_view` | 资讯查看 |
| `external_link_click` | 外链点击 |
| `language_switch` | 语言切换 |
| `button_click` | 按钮点击 |

---

## 五、查看数据

### Google Analytics 4
- **地址**: https://analytics.google.com/
- **延迟**: 24-48 小时
- **主要报告**:
  - 报告 → 概览
  - 报告 → 互动度
  - 报告 → 事件

### 百度统计
- **地址**: https://tongji.baidu.com/
- **延迟**: 实时
- **主要功能**:
  - 实时访客
  - 来源分析
  - 访问分析
  - 热力图

---

## 六、验证配置是否生效

### 方法一：浏览器开发者工具
1. 打开网站
2. 按 F12 打开开发者工具
3. 切换到 **Network** 标签
4. 刷新页面
5. 筛选 `google-analytics.com` 或 `baidu.com`
6. 看到请求即表示配置成功

### 方法二：查看控制台日志
开发环境下，每个事件都会在控制台输出：
```
[Analytics] Event: { action: 'click', category: 'brand_click', ... }
```

---

## 七、费用说明

| 工具 | 费用 |
|------|------|
| Google Analytics 4 | ¥0 |
| 百度统计 | ¥0 |
| **总成本** | **¥0** |

---

## 八、下一步

1. ✅ GA4 已配置完成
2. ⏳ 注册百度统计获取 ID
3. ⏳ 将百度统计 ID 添加到 `.env.local`
4. ⏳ 等待数据收集
