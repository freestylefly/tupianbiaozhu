# Image Annotation Tool - Component Documentation

This document provides detailed documentation for all HTML components, UI elements, and their interactions in the Image Annotation Tool.

## Table of Contents

1. [Component Overview](#component-overview)
2. [Layout Structure](#layout-structure)
3. [Upload Components](#upload-components)
4. [Coordinate Input Components](#coordinate-input-components)
5. [Control Components](#control-components)
6. [Display Components](#display-components)
7. [Styling Components](#styling-components)
8. [Responsive Design](#responsive-design)
9. [Accessibility Features](#accessibility-features)
10. [Customization Guide](#customization-guide)

## Component Overview

The Image Annotation Tool follows a modular component structure built with Bootstrap 5 and custom CSS. Each component is designed to be self-contained while maintaining proper interaction with the overall system.

### Component Hierarchy

```
Main Container
├── Header Component
├── Upload Zone Component
├── Coordinate Input Component
│   ├── Individual Coordinate Inputs
│   ├── String Input Component
│   ├── Preview Component
│   └── Configuration Controls
├── Control Button Component
├── Loading Component
└── Results Display Component
    ├── Original Image Container
    └── Annotated Image Container
```

---

## Layout Structure

### Main Container

```html
<div class="container">
    <div class="row justify-content-center">
        <div class="col-12">
            <div class="card">
                <!-- All components go here -->
            </div>
        </div>
    </div>
</div>
```

**CSS Classes:**
- `container`: Bootstrap container for responsive layout
- `row`: Bootstrap grid row
- `justify-content-center`: Centers the content horizontally
- `col-12`: Full-width column
- `card`: Main card container with custom styling

**Styling Properties:**
```css
.container {
    max-width: 1200px;
}

.card {
    border: none;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    backdrop-filter: blur(10px);
    background: rgba(255,255,255,0.95);
}
```

---

### Header Component

```html
<div class="card-header text-center">
    <h1 class="mb-0">
        <i class="fas fa-crosshairs me-3"></i>
        图片标注工具
    </h1>
    <p class="mb-0 mt-2 opacity-75">上传图片并添加bbox坐标进行点定位和框定位</p>
</div>
```

**Elements:**
- **Title**: Main application title with icon
- **Subtitle**: Application description

**CSS Classes:**
- `card-header`: Bootstrap card header
- `text-center`: Center-aligned text
- `mb-0`, `mt-2`: Bootstrap margin utilities
- `opacity-75`: Semi-transparent subtitle

**Styling Properties:**
```css
.card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px 15px 0 0 !important;
    padding: 20px;
}
```

---

## Upload Components

### Upload Zone Component

```html
<div class="upload-zone" id="uploadZone">
    <i class="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
    <h4>拖拽图片到此处或点击上传</h4>
    <p class="text-muted">支持 JPG, PNG, GIF 格式</p>
    <input type="file" id="imageInput" accept="image/*" style="display: none;">
</div>
```

**Elements:**
- **Upload Icon**: FontAwesome cloud upload icon
- **Upload Text**: Primary instruction text
- **Format Info**: Supported file format information
- **Hidden File Input**: Actual file input element

**States:**
1. **Default State**: Initial upload prompt
2. **Hover State**: Visual feedback on hover
3. **Drag Over State**: Active drag feedback
4. **Image Uploaded State**: Preview with metadata

**Drag Over State Content:**
```html
<!-- Applied when dragover class is added -->
<div class="upload-zone dragover">
    <!-- Same content with enhanced styling -->
</div>
```

**Image Uploaded State Content:**
```html
<div class="image-preview">
    <img src="${src}" class="preview-image" style="max-width: 300px; max-height: 200px;">
    <p class="mt-2"><i class="fas fa-check-circle text-success"></i> 图片已上传</p>
    <div class="alert alert-info mt-2 mb-2" style="font-size: 12px; padding: 8px;">
        <i class="fas fa-info-circle me-1"></i>
        <strong>图片信息:</strong> ${imgWidth} × ${imgHeight} 像素<br>
        <small>请确保bbox坐标在此范围内: x ∈ [0, ${imgWidth}], y ∈ [0, ${imgHeight}]</small>
    </div>
    <small class="text-muted">点击重新选择</small>
</div>
```

**CSS Classes:**
```css
.upload-zone {
    border: 3px dashed #667eea;
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    background: rgba(102, 126, 234, 0.05);
    transition: all 0.3s;
    cursor: pointer;
}

.upload-zone:hover {
    background: rgba(102, 126, 234, 0.1);
    border-color: #764ba2;
}

.upload-zone.dragover {
    background: rgba(102, 126, 234, 0.15);
    border-color: #764ba2;
    transform: scale(1.02);
}
```

**Events:**
- `click`: Triggers file input
- `dragover`: Adds dragover styling
- `dragleave`: Removes dragover styling
- `drop`: Handles file drop

---

## Coordinate Input Components

### Coordinate Input Container

```html
<div class="bbox-input">
    <h5><i class="fas fa-vector-square me-2"></i>BBox坐标设置</h5>
    <p class="text-muted">请输入边界框坐标 (x1, y1, x2, y2)</p>
    <!-- Coordinate inputs go here -->
</div>
```

**CSS Classes:**
```css
.bbox-input {
    background: rgba(102, 126, 234, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}
```

---

### Individual Coordinate Inputs

```html
<div class="coordinates-grid">
    <div>
        <label class="form-label">X1</label>
        <input type="number" class="form-control" id="x1" placeholder="左上角X">
    </div>
    <div>
        <label class="form-label">Y1</label>
        <input type="number" class="form-control" id="y1" placeholder="左上角Y">
    </div>
    <div>
        <label class="form-label">X2</label>
        <input type="number" class="form-control" id="x2" placeholder="右下角X">
    </div>
    <div>
        <label class="form-label">Y2</label>
        <input type="number" class="form-control" id="y2" placeholder="右下角Y">
    </div>
</div>
```

**Elements:**
- **X1 Input**: Top-left X coordinate
- **Y1 Input**: Top-left Y coordinate  
- **X2 Input**: Bottom-right X coordinate
- **Y2 Input**: Bottom-right Y coordinate

**CSS Grid Layout:**
```css
.coordinates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}
```

**Input Styling:**
```css
.form-control {
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    padding: 12px 15px;
    transition: border-color 0.3s;
}

.form-control:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
```

---

### String Input Component

```html
<div class="mt-3">
    <label class="form-label">或直接输入坐标字符串</label>
    <input type="text" class="form-control" id="bboxString" placeholder="例如: 100 50 200 150">
    <small class="text-muted">格式: x1 y1 x2 y2 或 x1,y1,x2,y2</small>
</div>
```

**Features:**
- **Multi-format Support**: Accepts various separators
- **Real-time Parsing**: Automatically updates individual inputs
- **Format Hints**: Helpful placeholder and description text

**Supported Formats:**
- `100 50 200 150` (space-separated)
- `100,50,200,150` (comma-separated)
- `100;50;200;150` (semicolon-separated)
- `100, 50; 200 150` (mixed separators)

---

### Coordinate Preview Component

```html
<div class="mt-3" id="coordsPreview" style="display: none;">
    <label class="form-label">坐标预览</label>
    <div class="alert alert-light" style="font-size: 12px; padding: 10px;">
        <div id="coordsInfo"></div>
    </div>
</div>
```

**Dynamic Content (generated by JavaScript):**
```html
<div class="row">
    <div class="col-md-6">
        <strong>✅ 坐标有效</strong><br>
        📍 左上角: (100, 50)<br>
        📍 右下角: (200, 150)<br>
        🎯 中心点: (150.0, 100.0)
    </div>
    <div class="col-md-6">
        📏 宽度: 100.0 像素<br>
        📏 高度: 100.0 像素<br>
        📐 面积: 10000 像素²
    </div>
</div>
```

**Validation States:**
- **Valid**: ✅ 坐标有效
- **Out of Range**: ⚠️ 坐标超出图片范围
- **Logic Error**: ⚠️ 坐标逻辑需要调整

---

### Configuration Controls

```html
<div class="row mt-3">
    <div class="col-md-6">
        <label class="form-label">标注类型</label>
        <select class="form-control" id="annotationType">
            <option value="both">点定位 + 框定位</option>
            <option value="point">仅点定位</option>
            <option value="box">仅框定位</option>
        </select>
    </div>
    <div class="col-md-6">
        <label class="form-label">框颜色</label>
        <input type="color" class="form-control" id="boxColor" value="#ff0000">
    </div>
</div>
```

**Controls:**
- **Annotation Type Selector**: Choose annotation style
- **Color Picker**: Select annotation color

**Options:**
1. **Both (`'both'`)**: Point + Box annotation
2. **Point Only (`'point'`)**: Center point with crosshairs
3. **Box Only (`'box'`)**: Bounding rectangle

---

## Control Components

### Action Buttons

```html
<div class="text-center mt-4">
    <button class="btn btn-primary btn-lg me-3" id="processBtn">
        <i class="fas fa-magic me-2"></i>生成标注图片
    </button>
    <button class="btn btn-outline-secondary btn-lg" id="clearBtn">
        <i class="fas fa-trash me-2"></i>清除
    </button>
</div>
```

**Buttons:**
- **Process Button**: Generates annotated image
- **Clear Button**: Resets all inputs

**Button Styling:**
```css
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 25px;
    padding: 10px 30px;
    font-weight: 600;
    transition: transform 0.2s;
}

.btn-primary:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}
```

---

### Download Button

```html
<button class="btn btn-success mt-3" id="downloadBtn">
    <i class="fas fa-download me-2"></i>下载标注图片
</button>
```

**Features:**
- **Conditional Display**: Only shown after successful processing
- **Direct Download**: Triggers immediate file download
- **PNG Format**: Downloads as high-quality PNG

---

## Display Components

### Loading Component

```html
<div class="loading" id="loading">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">处理中...</span>
    </div>
    <p class="mt-3">正在处理图片...</p>
</div>
```

**CSS Styling:**
```css
.loading {
    display: none;
    text-align: center;
    padding: 20px;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}
```

**States:**
- **Hidden**: `display: none` (default)
- **Visible**: Shown during image processing

---

### Results Display Component

```html
<div class="result-section" id="resultSection">
    <h5><i class="fas fa-image me-2"></i>标注结果</h5>
    <div class="row">
        <div class="col-md-6">
            <h6>原图</h6>
            <div id="originalImageContainer"></div>
        </div>
        <div class="col-md-6">
            <h6>标注图</h6>
            <div id="annotatedImageContainer"></div>
            <button class="btn btn-success mt-3" id="downloadBtn">
                <i class="fas fa-download me-2"></i>下载标注图片
            </button>
        </div>
    </div>
</div>
```

**Layout:**
- **Two-column Layout**: Side-by-side image comparison
- **Original Image**: Left column
- **Annotated Image**: Right column with download option

**CSS Styling:**
```css
.result-section {
    margin-top: 30px;
    padding: 20px;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 15px;
    display: none;
}
```

**Dynamic Content (generated by JavaScript):**
```html
<!-- Original Image Container -->
<img src="${originalSrc}" class="preview-image" style="max-width: 100%;">

<!-- Annotated Image Container -->
<img src="${annotatedSrc}" class="preview-image" style="max-width: 100%;">
```

---

## Styling Components

### Image Preview Styling

```css
.preview-image {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
```

**Features:**
- **Responsive**: Scales to container width
- **Rounded Corners**: 10px border radius
- **Drop Shadow**: Subtle elevation effect

---

### Container Styling

```css
.image-container {
    position: relative;
    display: inline-block;
    max-width: 100%;
}

.overlay-canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}
```

**Purpose:**
- **Relative Positioning**: For overlay elements
- **Canvas Overlay**: For future annotation overlays

---

## Responsive Design

### Breakpoint Behavior

**Desktop (≥768px):**
- Two-column coordinate input grid
- Side-by-side image comparison
- Full button sizes

**Tablet (576px - 767px):**
- Adjusted grid columns
- Stacked image comparison
- Medium button sizes

**Mobile (<576px):**
- Single-column layout
- Stacked inputs
- Compact button sizes

### Grid Responsiveness

```css
.coordinates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}
```

**Adaptive Columns:**
- **Desktop**: 4 columns (one per coordinate)
- **Tablet**: 2 columns (2x2 grid)
- **Mobile**: 1 column (stacked)

---

## Accessibility Features

### ARIA Support

```html
<!-- Loading indicator -->
<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">处理中...</span>
</div>

<!-- Form labels -->
<label class="form-label" for="x1">X1</label>
<input type="number" class="form-control" id="x1" aria-describedby="x1-help">
```

### Keyboard Navigation

**Tab Order:**
1. Upload zone (clickable)
2. Coordinate inputs (x1, y1, x2, y2)
3. String input
4. Annotation type selector
5. Color picker
6. Process button
7. Clear button
8. Download button (when visible)

**Keyboard Shortcuts:**
- `Ctrl + Enter`: Process image
- `Escape`: Clear all inputs

### Screen Reader Support

**Semantic HTML:**
- Proper heading hierarchy (h1, h4, h5, h6)
- Form labels associated with inputs
- Button text with descriptive icons
- Alt text for dynamic images

---

## Customization Guide

### Theme Customization

**Primary Colors:**
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: rgba(102, 126, 234, 0.1);
}
```

**Usage:**
```css
.btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.bbox-input {
    background: var(--accent-color);
}
```

### Layout Customization

**Container Width:**
```css
.container {
    max-width: 1400px; /* Increase from default 1200px */
}
```

**Card Styling:**
```css
.card {
    border-radius: 20px; /* Increase border radius */
    box-shadow: 0 15px 40px rgba(0,0,0,0.15); /* Enhanced shadow */
}
```

### Component Modifications

**Upload Zone Size:**
```css
.upload-zone {
    padding: 60px 40px; /* Increase vertical padding */
    min-height: 300px; /* Set minimum height */
}
```

**Grid Columns:**
```css
.coordinates-grid {
    grid-template-columns: repeat(2, 1fr); /* Force 2-column layout */
    max-width: 400px; /* Limit grid width */
    margin: 0 auto; /* Center the grid */
}
```

### Custom CSS Classes

**Additional Utility Classes:**
```css
.highlight-border {
    border: 2px solid #ffc107 !important;
    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25) !important;
}

.success-state {
    background-color: rgba(25, 135, 84, 0.1);
    border-color: #198754;
}

.error-state {
    background-color: rgba(220, 53, 69, 0.1);
    border-color: #dc3545;
}
```

**Usage in JavaScript:**
```javascript
// Highlight invalid inputs
document.getElementById('x1').classList.add('error-state');

// Show success state
document.getElementById('coordsPreview').classList.add('success-state');
```

### Icon Customization

**Replace FontAwesome Icons:**
```html
<!-- Custom upload icon -->
<i class="custom-upload-icon"></i>

<!-- Custom process icon -->
<i class="custom-process-icon"></i>
```

**Custom Icon CSS:**
```css
.custom-upload-icon::before {
    content: "📁";
    font-size: 3rem;
}

.custom-process-icon::before {
    content: "⚡";
    font-size: 1.2rem;
}
```

---

This completes the comprehensive component documentation for the Image Annotation Tool. Each component is designed to be modular, accessible, and customizable while maintaining consistent styling and behavior across the application.