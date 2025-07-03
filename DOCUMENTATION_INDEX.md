# Image Annotation Tool - Complete Documentation

This is the comprehensive documentation hub for the Image Annotation Tool, a frontend JavaScript application for creating bounding box annotations on images.

## 📚 Documentation Overview

This documentation suite provides complete coverage of all public APIs, components, and usage patterns. Whether you're integrating the tool into your project, customizing its behavior, or contributing to development, you'll find everything you need here.

### 📄 Available Documentation

| Document | Description | Best For |
|----------|-------------|----------|
| **[API Documentation](./API_DOCUMENTATION.md)** | Complete JavaScript API reference with all public methods, classes, and functions | Developers integrating or extending the JavaScript functionality |
| **[Component Documentation](./COMPONENT_DOCUMENTATION.md)** | Detailed HTML component structure, styling, and customization | UI/UX developers and designers working with the interface |
| **[README](./README.md)** | User guide and basic usage instructions | End users and quick setup scenarios |

---

## 🎯 Quick Navigation by Use Case

### For Developers

**JavaScript Integration:**
- [ImageAnnotator Class API](./API_DOCUMENTATION.md#imageannotator-class)
- [Public Methods Reference](./API_DOCUMENTATION.md#public-methods)
- [Event Handling](./API_DOCUMENTATION.md#event-handlers)
- [Error Handling](./API_DOCUMENTATION.md#error-handling)

**Advanced Usage:**
- [Programmatic Usage Examples](./API_DOCUMENTATION.md#usage-examples)
- [Custom Event Handling](./API_DOCUMENTATION.md#custom-event-handling)
- [Integration Guide](./API_DOCUMENTATION.md#integration-guide)

### For UI/UX Designers

**Component Structure:**
- [Layout Structure](./COMPONENT_DOCUMENTATION.md#layout-structure)
- [Upload Components](./COMPONENT_DOCUMENTATION.md#upload-components)
- [Input Components](./COMPONENT_DOCUMENTATION.md#coordinate-input-components)

**Styling & Customization:**
- [CSS Classes & Styling](./COMPONENT_DOCUMENTATION.md#styling-components)
- [Theme Customization](./COMPONENT_DOCUMENTATION.md#customization-guide)
- [Responsive Design](./COMPONENT_DOCUMENTATION.md#responsive-design)

### For End Users

**Basic Usage:**
- [Getting Started](./README.md#使用方法)
- [Coordinate Input Formats](./README.md#坐标系统说明)
- [Keyboard Shortcuts](./README.md#快捷键)

---

## 🔧 Core Features Documented

### File Upload System
- **Drag & Drop Interface**: Full documentation of the upload zone component
- **File Type Validation**: Supported formats and error handling
- **Preview Generation**: Image display and metadata extraction

**Documentation Coverage:**
- [handleFile() API](./API_DOCUMENTATION.md#handlefilefile)
- [Upload Zone Component](./COMPONENT_DOCUMENTATION.md#upload-zone-component)

### Coordinate Input System
- **Multiple Input Formats**: Space, comma, and semicolon-separated coordinates
- **Real-time Validation**: Live coordinate preview and validation
- **Format Conversion**: Automatic conversion between input methods

**Documentation Coverage:**
- [Coordinate Processing Methods](./API_DOCUMENTATION.md#coordinate-processing-methods)
- [Coordinate Input Components](./COMPONENT_DOCUMENTATION.md#coordinate-input-components)

### Image Annotation Engine
- **Canvas-based Processing**: High-quality image annotation using HTML5 Canvas
- **Multiple Annotation Types**: Point, box, and combined annotations
- **Customizable Styling**: Color selection and responsive sizing

**Documentation Coverage:**
- [createAnnotatedImage() API](./API_DOCUMENTATION.md#createannotatedimagecoords-annotationtype-boxcolor)
- [Image Processing Methods](./API_DOCUMENTATION.md#image-processing-methods)

### User Interface
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Accessibility Features**: Screen reader support and keyboard navigation
- **Modern Styling**: Gradient backgrounds and smooth transitions

**Documentation Coverage:**
- [Responsive Design](./COMPONENT_DOCUMENTATION.md#responsive-design)
- [Accessibility Features](./COMPONENT_DOCUMENTATION.md#accessibility-features)

---

## 📋 API Reference Quick Links

### Core Classes & Methods

| API | Type | Description |
|-----|------|-------------|
| `ImageAnnotator` | Class | Main application class |
| `init()` | Method | Initialize the application |
| `handleFile(file)` | Method | Process uploaded files |
| `validateInputs()` | Method | Validate coordinates |
| `processImage()` | Method | Generate annotations |
| `downloadImage()` | Method | Download annotated image |
| `clearAll()` | Method | Reset application state |

[→ View Complete API Reference](./API_DOCUMENTATION.md#public-methods)

### DOM Elements

| Element ID | Purpose | Component Type |
|------------|---------|----------------|
| `uploadZone` | File upload area | Upload Component |
| `x1`, `y1`, `x2`, `y2` | Coordinate inputs | Input Component |
| `bboxString` | String coordinate input | Input Component |
| `processBtn` | Process trigger | Control Component |
| `downloadBtn` | Download trigger | Control Component |

[→ View Complete DOM Interface](./API_DOCUMENTATION.md#dom-interface)

---

## 🎨 Styling & Customization

### CSS Classes

| Class | Purpose | Customizable |
|-------|---------|-------------|
| `.upload-zone` | Upload area styling | ✅ |
| `.bbox-input` | Input container styling | ✅ |
| `.coordinates-grid` | Grid layout for inputs | ✅ |
| `.preview-image` | Image preview styling | ✅ |
| `.result-section` | Results display area | ✅ |

[→ View Complete Styling Guide](./COMPONENT_DOCUMENTATION.md#css-classes--styling)

### Theme Variables

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: rgba(102, 126, 234, 0.1);
}
```

[→ View Customization Guide](./COMPONENT_DOCUMENTATION.md#customization-guide)

---

## 🔍 Search & Find

### By Functionality

**File Handling:**
- File upload: [API](./API_DOCUMENTATION.md#file-handling-methods) | [Component](./COMPONENT_DOCUMENTATION.md#upload-components)
- File validation: [API](./API_DOCUMENTATION.md#error-handling) | [Component](./COMPONENT_DOCUMENTATION.md#upload-zone-component)

**Coordinate Processing:**
- Input parsing: [API](./API_DOCUMENTATION.md#parsebboxstring) | [Component](./COMPONENT_DOCUMENTATION.md#string-input-component)
- Validation: [API](./API_DOCUMENTATION.md#validateinputs) | [Component](./COMPONENT_DOCUMENTATION.md#coordinate-preview-component)

**Image Processing:**
- Annotation creation: [API](./API_DOCUMENTATION.md#createannotatedimage) | [Canvas API Usage](./API_DOCUMENTATION.md#image-processing-methods)
- Result display: [API](./API_DOCUMENTATION.md#showresults) | [Component](./COMPONENT_DOCUMENTATION.md#results-display-component)

### By Component Type

**Input Components:**
- Number inputs: [Component Guide](./COMPONENT_DOCUMENTATION.md#individual-coordinate-inputs)
- String input: [Component Guide](./COMPONENT_DOCUMENTATION.md#string-input-component)
- Configuration: [Component Guide](./COMPONENT_DOCUMENTATION.md#configuration-controls)

**Display Components:**
- Loading states: [Component Guide](./COMPONENT_DOCUMENTATION.md#loading-component)
- Image preview: [Component Guide](./COMPONENT_DOCUMENTATION.md#display-components)
- Results: [Component Guide](./COMPONENT_DOCUMENTATION.md#results-display-component)

---

## 🚀 Getting Started Checklist

### For Integration

- [ ] Review [Integration Guide](./API_DOCUMENTATION.md#integration-guide)
- [ ] Include required dependencies (Bootstrap 5, Font Awesome)
- [ ] Copy required HTML structure from [DOM Interface](./API_DOCUMENTATION.md#dom-interface)
- [ ] Initialize ImageAnnotator class
- [ ] Test with sample coordinates

### For Customization

- [ ] Review [Customization Guide](./COMPONENT_DOCUMENTATION.md#customization-guide)
- [ ] Define custom CSS variables
- [ ] Override component styling as needed
- [ ] Test responsive behavior
- [ ] Validate accessibility features

### For Development

- [ ] Study [API Documentation](./API_DOCUMENTATION.md)
- [ ] Understand [Component Structure](./COMPONENT_DOCUMENTATION.md#component-overview)
- [ ] Review [Error Handling](./API_DOCUMENTATION.md#error-handling)
- [ ] Check [Browser Compatibility](./API_DOCUMENTATION.md#browser-compatibility)
- [ ] Run integration tests

---

## 🔧 Technical Specifications

### Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| Bootstrap | 5.1.3+ | UI framework and responsive grid |
| Font Awesome | 6.0.0+ | Icons and visual elements |
| Modern Browser | - | Canvas API, FileReader API, ES6+ |

### Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 60+ | ✅ Full Support |
| Firefox | 55+ | ✅ Full Support |
| Safari | 11+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |

[→ View Complete Compatibility Info](./API_DOCUMENTATION.md#browser-compatibility)

---

## 📞 Support & Contributing

### Documentation Updates

If you find missing information or need additional documentation:

1. Check existing documentation first
2. Review code comments in `script.js`
3. Test functionality in the live application
4. Submit documentation improvement requests

### Code Examples

All documentation includes working code examples:
- Copy-paste ready snippets
- Complete integration examples
- Real-world usage scenarios
- Error handling patterns

---

## 📝 Document Maintenance

**Last Updated:** 2024
**Documentation Version:** 1.0.0
**Covers Code Version:** Current

**Documentation Structure:**
```
documentation/
├── API_DOCUMENTATION.md     # Complete JavaScript API reference
├── COMPONENT_DOCUMENTATION.md  # HTML component and styling guide
├── DOCUMENTATION_INDEX.md   # This overview document
└── README.md               # User guide (existing)
```

---

**Need something specific?** Use the navigation links above or search for keywords in the individual documentation files. Each document includes comprehensive table of contents and cross-references for easy navigation.