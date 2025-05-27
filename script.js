class ImageAnnotator {
    constructor() {
        this.uploadedImage = null;
        this.annotatedCanvas = null;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 上传区域事件
        const uploadZone = document.getElementById('uploadZone');
        const imageInput = document.getElementById('imageInput');

        uploadZone.addEventListener('click', () => imageInput.click());
        uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadZone.addEventListener('drop', this.handleDrop.bind(this));

        imageInput.addEventListener('change', this.handleFileSelect.bind(this));

        // bbox字符串输入事件
        document.getElementById('bboxString').addEventListener('input', this.parseBboxString.bind(this));

        // 坐标输入事件
        ['x1', 'y1', 'x2', 'y2'].forEach(id => {
            document.getElementById(id).addEventListener('input', this.updateBboxString.bind(this));
        });

        // 按钮事件
        document.getElementById('processBtn').addEventListener('click', this.processImage.bind(this));
        document.getElementById('clearBtn').addEventListener('click', this.clearAll.bind(this));
        document.getElementById('downloadBtn').addEventListener('click', this.downloadImage.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    handleFileSelect(e) {
        if (e.target.files.length > 0) {
            this.handleFile(e.target.files[0]);
        }
    }

    handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('请选择有效的图片文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.uploadedImage = new Image();
            this.uploadedImage.onload = () => {
                this.showImagePreview(e.target.result);
                console.log('图片加载完成，尺寸:', this.uploadedImage.width, 'x', this.uploadedImage.height);
            };
            this.uploadedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    showImagePreview(src) {
        const uploadZone = document.getElementById('uploadZone');
        const imgWidth = this.uploadedImage.width;
        const imgHeight = this.uploadedImage.height;
        
        uploadZone.innerHTML = `
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
        `;
    }

    parseBboxString() {
        const bboxString = document.getElementById('bboxString').value.trim();
        if (!bboxString) {
            this.updateCoordsPreview();
            return;
        }

        // 支持多种分隔符: 空格、逗号、分号
        const coords = bboxString.split(/[\s,;]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
        
        if (coords.length >= 4) {
            document.getElementById('x1').value = coords[0];
            document.getElementById('y1').value = coords[1];
            document.getElementById('x2').value = coords[2];
            document.getElementById('y2').value = coords[3];
            this.updateCoordsPreview();
        }
    }

    updateBboxString() {
        const x1 = document.getElementById('x1').value;
        const y1 = document.getElementById('y1').value;
        const x2 = document.getElementById('x2').value;
        const y2 = document.getElementById('y2').value;

        if (x1 && y1 && x2 && y2) {
            document.getElementById('bboxString').value = `${x1} ${y1} ${x2} ${y2}`;
        }
        
        this.updateCoordsPreview();
    }

    updateCoordsPreview() {
        const x1 = parseFloat(document.getElementById('x1').value);
        const y1 = parseFloat(document.getElementById('y1').value);
        const x2 = parseFloat(document.getElementById('x2').value);
        const y2 = parseFloat(document.getElementById('y2').value);

        const coordsPreview = document.getElementById('coordsPreview');
        const coordsInfo = document.getElementById('coordsInfo');

        if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
            const width = Math.abs(x2 - x1);
            const height = Math.abs(y2 - y1);
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            
            let statusIcon = '✅';
            let statusText = '坐标有效';
            
            if (this.uploadedImage) {
                const imgWidth = this.uploadedImage.width;
                const imgHeight = this.uploadedImage.height;
                
                if (x1 < 0 || x2 > imgWidth || y1 < 0 || y2 > imgHeight) {
                    statusIcon = '⚠️';
                    statusText = '坐标超出图片范围';
                } else if (x1 >= x2 || y1 >= y2) {
                    statusIcon = '⚠️';
                    statusText = '坐标逻辑需要调整';
                }
            }
            
            coordsInfo.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <strong>${statusIcon} ${statusText}</strong><br>
                        📍 左上角: (${x1}, ${y1})<br>
                        📍 右下角: (${x2}, ${y2})<br>
                        🎯 中心点: (${centerX.toFixed(1)}, ${centerY.toFixed(1)})
                    </div>
                    <div class="col-md-6">
                        📏 宽度: ${width.toFixed(1)} 像素<br>
                        📏 高度: ${height.toFixed(1)} 像素<br>
                        📐 面积: ${(width * height).toFixed(0)} 像素²
                    </div>
                </div>
            `;
            coordsPreview.style.display = 'block';
        } else {
            coordsPreview.style.display = 'none';
        }
    }

    validateInputs() {
        if (!this.uploadedImage) {
            alert('请先上传图片！');
            return false;
        }

        const x1 = parseFloat(document.getElementById('x1').value);
        const y1 = parseFloat(document.getElementById('y1').value);
        const x2 = parseFloat(document.getElementById('x2').value);
        const y2 = parseFloat(document.getElementById('y2').value);

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
            alert('请输入有效的坐标值！');
            return false;
        }

        // 获取图片实际尺寸
        const imgWidth = this.uploadedImage.width;
        const imgHeight = this.uploadedImage.height;

        // 检查坐标是否超出图片范围，给出警告但不阻止处理
        if (x1 < 0 || x2 > imgWidth || y1 < 0 || y2 > imgHeight) {
            const proceed = confirm(
                `警告：部分坐标超出图片范围！\n` +
                `图片尺寸: ${imgWidth} x ${imgHeight}\n` +
                `输入坐标: (${x1}, ${y1}) 到 (${x2}, ${y2})\n` +
                `系统将自动调整坐标到有效范围内。是否继续？`
            );
            if (!proceed) return false;
        }

        // 检查基本的坐标逻辑（允许自动交换）
        if (x1 >= x2 || y1 >= y2) {
            const proceed = confirm(
                `坐标逻辑需要调整：\n` +
                `当前: (${x1}, ${y1}) 到 (${x2}, ${y2})\n` +
                `系统将自动调整为正确的左上角到右下角格式。是否继续？`
            );
            if (!proceed) return false;
        }

        console.log(`输入坐标验证通过: bbox(${x1}, ${y1}, ${x2}, ${y2}), 图片尺寸(${imgWidth}x${imgHeight})`);
        return { x1, y1, x2, y2 };
    }

    async processImage() {
        const coords = this.validateInputs();
        if (!coords) return;

        // 显示加载状态
        document.getElementById('loading').style.display = 'block';
        document.getElementById('resultSection').style.display = 'none';

        try {
            // 模拟处理时间
            await new Promise(resolve => setTimeout(resolve, 500));

            const annotationType = document.getElementById('annotationType').value;
            const boxColor = document.getElementById('boxColor').value;

            // 创建标注后的图片
            const annotatedDataUrl = this.createAnnotatedImage(coords, annotationType, boxColor);
            
            // 显示结果
            this.showResults(this.uploadedImage.src, annotatedDataUrl);

        } catch (error) {
            console.error('处理图片时出错:', error);
            alert('处理图片时出错，请重试！');
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }

    createAnnotatedImage(coords, annotationType, boxColor) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置画布尺寸为原图尺寸
        canvas.width = this.uploadedImage.width;
        canvas.height = this.uploadedImage.height;

        // 绘制原图
        ctx.drawImage(this.uploadedImage, 0, 0);

        // 验证坐标是否在图片范围内
        let { x1, y1, x2, y2 } = coords;
        
        // 确保坐标在图片范围内
        x1 = Math.max(0, Math.min(x1, canvas.width));
        y1 = Math.max(0, Math.min(y1, canvas.height));
        x2 = Math.max(0, Math.min(x2, canvas.width));
        y2 = Math.max(0, Math.min(y2, canvas.height));
        
        // 重新验证坐标逻辑
        if (x1 >= x2 || y1 >= y2) {
            console.warn('坐标无效，已自动调整');
            [x1, x2] = x1 > x2 ? [x2, x1] : [x1, x2];
            [y1, y2] = y1 > y2 ? [y2, y1] : [y1, y2];
        }

        // 计算中心点
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const width = x2 - x1;
        const height = y2 - y1;

        // 设置绘制样式 - 根据图片大小调整线宽
        const lineWidth = Math.max(2, Math.min(8, Math.sqrt(canvas.width * canvas.height) / 200));
        ctx.strokeStyle = boxColor;
        ctx.fillStyle = boxColor;
        ctx.lineWidth = lineWidth;

        console.log(`绘制标注: 图片尺寸(${canvas.width}x${canvas.height}), bbox(${x1},${y1},${x2},${y2}), 中心点(${centerX.toFixed(1)},${centerY.toFixed(1)})`);

        // 根据类型绘制标注
        if (annotationType === 'box' || annotationType === 'both') {
            // 绘制边界框
            ctx.strokeRect(x1, y1, width, height);
            
            // 添加半透明填充
            ctx.globalAlpha = 0.15;
            ctx.fillRect(x1, y1, width, height);
            ctx.globalAlpha = 1;
            
            // 添加坐标标签背景
            const fontSize = Math.max(12, Math.min(16, lineWidth * 3));
            ctx.font = `${fontSize}px Arial`;
            const labelText = `(${Math.round(x1)},${Math.round(y1)})`;
            const textWidth = ctx.measureText(labelText).width;
            const labelHeight = fontSize + 4;
            
            // 确保标签不会超出图片边界
            const labelX = Math.min(x1, canvas.width - textWidth - 4);
            const labelY = Math.max(labelHeight, y1 - 2);
            
            // 绘制标签背景
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(labelX, labelY - labelHeight, textWidth + 4, labelHeight);
            
            // 绘制标签文字
            ctx.fillStyle = 'white';
            ctx.fillText(labelText, labelX + 2, labelY - 4);
            
            // 恢复颜色
            ctx.fillStyle = boxColor;
        }

        if (annotationType === 'point' || annotationType === 'both') {
            // 绘制中心点
            const pointRadius = Math.max(4, Math.min(12, lineWidth * 2));
            ctx.beginPath();
            ctx.arc(centerX, centerY, pointRadius, 0, 2 * Math.PI);
            ctx.fill();
            
            // 绘制十字线
            const crossSize = pointRadius * 3;
            ctx.beginPath();
            ctx.moveTo(centerX - crossSize, centerY);
            ctx.lineTo(centerX + crossSize, centerY);
            ctx.moveTo(centerX, centerY - crossSize);
            ctx.lineTo(centerX, centerY + crossSize);
            ctx.stroke();
            
            // 添加中心点坐标标签
            const centerText = `中心(${Math.round(centerX)},${Math.round(centerY)})`;
            const fontSize = Math.max(10, Math.min(14, lineWidth * 2.5));
            ctx.font = `${fontSize}px Arial`;
            const centerTextWidth = ctx.measureText(centerText).width;
            
            const centerLabelX = Math.min(centerX + crossSize + 5, canvas.width - centerTextWidth - 4);
            const centerLabelY = Math.max(fontSize, Math.min(centerY, canvas.height - 4));
            
            // 绘制中心点标签背景
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(centerLabelX, centerLabelY - fontSize, centerTextWidth + 4, fontSize + 2);
            
            // 绘制中心点标签文字
            ctx.fillStyle = 'white';
            ctx.fillText(centerText, centerLabelX + 2, centerLabelY - 2);
        }

        // 保存canvas引用用于下载
        this.annotatedCanvas = canvas;
        
        return canvas.toDataURL('image/png');
    }

    showResults(originalSrc, annotatedSrc) {
        const originalContainer = document.getElementById('originalImageContainer');
        const annotatedContainer = document.getElementById('annotatedImageContainer');

        originalContainer.innerHTML = `
            <img src="${originalSrc}" class="preview-image" style="max-width: 100%;">
        `;

        annotatedContainer.innerHTML = `
            <img src="${annotatedSrc}" class="preview-image" style="max-width: 100%;">
        `;

        document.getElementById('resultSection').style.display = 'block';
        
        // 滚动到结果区域
        document.getElementById('resultSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    downloadImage() {
        if (!this.annotatedCanvas) {
            alert('没有可下载的图片！');
            return;
        }

        // 创建下载链接
        this.annotatedCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `annotated_image_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

    clearAll() {
        // 重置表单
        document.getElementById('x1').value = '';
        document.getElementById('y1').value = '';
        document.getElementById('x2').value = '';
        document.getElementById('y2').value = '';
        document.getElementById('bboxString').value = '';
        document.getElementById('imageInput').value = '';
        
        // 重置上传区域
        const uploadZone = document.getElementById('uploadZone');
        uploadZone.innerHTML = `
            <i class="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
            <h4>拖拽图片到此处或点击上传</h4>
            <p class="text-muted">支持 JPG, PNG, GIF 格式</p>
        `;
        
        // 隐藏结果区域
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
        
        // 重置状态
        this.uploadedImage = null;
        this.annotatedCanvas = null;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ImageAnnotator();
    
    // 添加一些示例数据的提示
    console.log('图片标注工具已加载');
    console.log('支持的坐标格式示例:');
    console.log('- 100 50 200 150');
    console.log('- 100,50,200,150');
    console.log('- 100;50;200;150');
});

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter 快速处理
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('processBtn').click();
    }
    
    // Escape 清除
    if (e.key === 'Escape') {
        document.getElementById('clearBtn').click();
    }
}); 