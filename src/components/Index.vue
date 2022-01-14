<template>
    <el-container style="height: 100%;">
        <el-header>
            <div class="header_bar">
                <div class="logo_area">
                    <el-icon :size="24">
                        <home-filled />
                    </el-icon>
                    <span>CSS Filter</span>
                </div>
            </div>
        </el-header>
        <el-container style="overflow: auto;">
            <el-main>
                <el-collapse v-model="activeNames">
                    <el-collapse-item>
                        <template #title>模糊 blur</template>
                        <div class="slider_warpper">
                            <el-slider
                                v-model="blur"
                                :max="10"
                                :step="0.1"
                                show-input
                                size="small"
                                @change="handleBlurSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="明度 brightness">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="brightness"
                                :max="10"
                                :step="0.01"
                                show-input
                                size="small"
                                @change="handleBrightSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="对比度 contrast">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="contrast"
                                :max="10"
                                :step="0.01"
                                show-input
                                size="small"
                                @change="handleContrastSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="阴影 drop-shadow">
                        <div class="slider_warpper">
                            <span>offset-x:</span>
                            <el-slider
                                v-model="offsetX"
                                :max="100"
                                :step="1"
                                show-input
                                size="small"
                                @change="handleOffsetXSlideChange"
                            ></el-slider>
                        </div>
                        <div class="slider_warpper">
                            <span>offset-y:</span>
                            <el-slider
                                v-model="offsetY"
                                :max="100"
                                :step="1"
                                show-input
                                size="small"
                                @change="handleOffsetYSlideChange"
                            ></el-slider>
                        </div>
                        <div class="slider_warpper">
                            <span>blur-radius:</span>
                            <el-slider
                                v-model="blurRadius"
                                :max="100"
                                :step="1"
                                show-input
                                size="small"
                                @change="handleBlurRadiusSlideChange"
                            ></el-slider>
                        </div>
                        <div class="slider_warpper">
                            <span>color:</span>
                            <br />
                            <el-color-picker v-model="color" @change="handleColorChange" />
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="灰度 grayscale">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="grayscale"
                                :max="1"
                                :step="0.01"
                                show-input
                                size="small"
                                @change="handleGrayscaleSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="色相旋转 hue-rotate">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="hueRotate"
                                :max="360"
                                :step="1"
                                show-input
                                size="small"
                                @change="handleHueRotateSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="反转 invert">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="invert"
                                :max="1"
                                :step="0.01"
                                show-input
                                size="small"
                                @change="handleInvertSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="透明度 opacity">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="opacity"
                                :max="1"
                                :step="0.01"
                                show-input
                                size="small"
                                @change="handleOpacitySlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="饱和度 saturate">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="saturate"
                                :max="10"
                                :step="0.01"
                                show-input
                                size="small"
                                @change="handleSaturateSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="深褐色 sepia">
                        <div class="slider_warpper">
                            <el-slider
                                v-model="sepia"
                                :max="1"
                                :step="0.01"
                                show-input
                                size="small"
                                @change="handleSepiaSlideChange"
                            ></el-slider>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-main>
            <el-main>
                <el-input :model-value="styleSheet" autosize type="textarea" label="1" />
                <el-card class="effect_container">
                    <template #header>
                        <div class="card-header">
                            <span>效果预设</span>
                        </div>
                    </template>
                    <div class="effect_item_container">
                        <div
                            class="effect_item"
                            :class="{ 'active': index === effectIndex }"
                            v-for="(item, index) in effect"
                            @click="handleEffectItemClick(index, item.filter)"
                        >
                            <img
                                src="../assets/ex.png"
                                width="72"
                                height="72"
                                :style="{ filter: setCssFilter(item.filter) }"
                            />
                            <div class="effect_des">{{ item.title }}</div>
                        </div>
                    </div>
                </el-card>
            </el-main>
            <el-main>
                <div class="image_container">
                    <el-image
                        :src="imageSrc"
                        class="image_preview"
                        fit="scale-down"
                        :style="styleSheet"
                        el-image
                    />
                </div>
                <div class="file_button_container">
                    <input type="file" accept="image/*" @change="loadFile" />
                </div>
            </el-main>
        </el-container>
        <el-footer>
            <div class="footer_content">{{ content[contentKey] }}</div>
        </el-footer>
    </el-container>
</template>

<script>
import './Index.scss'
export default {
    data() {
        return {
            imageSrc: 'src/assets/1.jpg',
            activeNames: '',

            blur: 0,
            brightness: 1,
            contrast: 1,

            offsetX: 0,
            offsetY: 0,
            blurRadius: 0,
            color: '',

            grayscale: 0,
            hueRotate: 0,
            invert: 0,
            opacity: 1,
            saturate: 1,
            sepia: 0,

            style: {},

            content: {
                blur: 'blur() 函数将高斯模糊应用于输入图像。radius 定义了高斯函数的标准偏差值，或者屏幕上有多少像素相互融合，因此，较大的值将产生更多的模糊。默认值为0。该参数可以指定为 CSS 长度，但不接受百分比值。',
                brightness: 'brightness() 函数将线性乘法器应用于输入图像，使其看起来或多或少地变得明亮。值为 0％ 将创建全黑图像。值为 100％ 会使输入保持不变。其他值是效果的线性乘数。如果值大于 100% 提供更明亮的结果。默认值为 1。',
                contrast: 'contrast() 函数可调整输入图像的对比度。值是 0% 的话，图像会全黑。值是 100%，图像不变。值可以超过 100%，意味着会运用更低的对比。默认值为 1。',
                'drop-shadow': 'drop-shadow() 函数对输入图像应用阴影效果。阴影可以设置模糊度,除了 inset 和 spread 关键字,该函数与已有的 box-shadow 属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速。',
                grayscale: 'grayscale()  函数将改变输入图像灰度。amount 的值定义了转换的比例。值为 100% 则完全转为灰度图像，值为 0% 图像无变化。值在 0% 到 100% 之间，则是效果的线性乘数。默认值为 0。',
                'hue-rotate': 'hue-rotate()函数在输入图像上应用色相旋转。angle 一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。默认值为 0deg。该值虽然没有最大值，超过 360deg 的值相当于又绕一圈。',
                invert: 'invert()函数反转输入图像。100% 的价值是完全反转。值为 0% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。 默认值为 0。',
                opacity: 'opacity() 转化图像的透明程度。值为 0% 则是完全透明，值为 100% 则图像无变化,默认值为 1。浏览器为了提升性能会提供硬件加速。',
                saturate: 'saturate() 函数转换图像饱和度。值为 0% 则是完全不饱和，值为 100% 则图像无变化。其他值是效果的线性乘数。超过 100% 则有更高的饱和度。默认值为 1。',
                sepia: 'sepia() 函数将图像转换为深褐色。值为 100% 则完全是深褐色的，值为 0% 图像无变化。值在 0% 到 100% 之间，值是效果的线性乘数。默认值为 0。'

            },
            contentKey: '',
            effectIndex: '',
            effect: [
                {
                    title: '原图',
                    filter: null,
                },
                {
                    title: '1977',
                    filter: {
                        brightness: 1.1,
                        saturate: 1.3,
                        contrast: 1.1
                    }
                },
                {
                    title: 'Aden',
                    filter: {
                        brightness: 1.2,
                        saturate: 0.85,
                        contrast: 0.9,
                        'hueRotate': '20deg'
                    }
                },
                {
                    title: 'Amaro',
                    filter: {
                        brightness: 1.1,
                        saturate: 1.5,
                        contrast: 0.9,
                        hueRotate: '-10deg'
                    }
                },
                {
                    title: 'Brannan',
                    filter: {
                        contrast: 1.4,
                        sepia: 0.5
                    }
                },
                {
                    title: 'Brooklyn',
                    filter: {
                        contrast: 0.9,
                        brightness: 1.1
                    }
                },
                {
                    title: 'Clarendon',
                    filter: {
                        contrast: 1.2,
                        saturate: 1.25
                    }
                },
                {
                    title: 'Earlybird',
                    filter: {
                        contrast: 0.9,
                        sepia: 0.2
                    }
                },
                {
                    title: 'Gingham',
                    filter: {
                        brightness: 1.05,
                        hueRotate: '350deg'
                    }
                },
                {
                    title: 'Hudson',
                    filter: {
                        contrast: 0.9,
                        brightness: 1.2,
                        saturate: 1.1,
                    }
                },
                {
                    title: '黑白',
                    filter: {
                        contrast: 1.1,
                        brightness: 1.1,
                        sepia: 0.3,
                        grayscale: 1
                    }
                },
                {
                    title: 'Lofi',
                    filter: {
                        contrast: 1.5,
                        saturate: 1.1
                    }
                },
                {
                    title: 'Maven',
                    filter: {
                        contrast: 0.95,
                        brightness: 0.95,
                        saturate: 1.5,
                        sepia: 0.25
                    }
                },
                {
                    title: 'Reyes',
                    filter: {
                        contrast: 0.85,
                        brightness: 1.1,
                        saturate: 0.75,
                        sepia: 0.22
                    }
                },
                {
                    title: 'Stinson',
                    filter: {
                        contrast: 0.75,
                        brightness: 1.15,
                        saturate: 0.85,
                    }
                }
            ]
        }
    },

    methods: {
        handleBlurSlideChange(val) {
            let blur = `blur(${val}px)`;
            this.style.blur = blur;
            val === 0 ? delete this.style.blur : '';
            this.contentKey = 'blur';
        },

        handleBrightSlideChange(val) {
            let brightness = `brightness(${val})`;
            this.style.brightness = brightness;
            val === 1 ? delete this.style.brightness : '';
            this.contentKey = 'brightness';
        },

        handleContrastSlideChange(val) {
            let contrast = `contrast(${val})`;
            this.style.contrast = contrast;
            val === 1 ? delete this.style.contrast : '';
            this.contentKey = 'contrast';
        },

        // drop-shadow config
        handleOffsetXSlideChange(val) {
            this.offsetX = val;
            let shadow = `drop-shadow(${this.offsetX}px ${this.offsetY}px ${this.blurRadius}px ${this.color})`;
            this.style['drop-shadow'] = shadow;
            (this.offsetX === 0 && this.offsetY === 0 && this.blurRadius === 0) ? delete this.style['drop-shadow'] : ''
            this.contentKey = 'drop-shadow';
        },

        handleOffsetYSlideChange(val) {
            this.offsetY = val;
            let shadow = `drop-shadow(${this.offsetX}px ${this.offsetY}px ${this.blurRadius}px ${this.color})`;
            this.style['drop-shadow'] = shadow;
            (this.offsetX === 0 && this.offsetY === 0 && this.blurRadius === 0) ? delete this.style['drop-shadow'] : ''
            this.contentKey = 'drop-shadow';

        },

        handleBlurRadiusSlideChange(val) {
            this.blurRadius = val;
            let shadow = `drop-shadow(${this.offsetX}px ${this.offsetY}px ${this.blurRadius}px ${this.color})`;
            this.style['drop-shadow'] = shadow;
            (this.offsetX === 0 && this.offsetY === 0 && this.blurRadius === 0) ? delete this.style['drop-shadow'] : ''
            this.contentKey = 'drop-shadow';

        },

        handleColorChange(val) {
            this.color = val;
            let shadow = `drop-shadow(${this.offsetX}px ${this.offsetY}px ${this.blurRadius}px ${this.color})`;
            this.style['drop-shadow'] = shadow;
            (this.offsetX === 0 && this.offsetY === 0 && this.blurRadius === 0) ? delete this.style['drop-shadow'] : ''
            this.contentKey = 'drop-shadow';
        },

        // 

        handleGrayscaleSlideChange(val) {
            let grayscale = `grayscale(${val})`;
            this.style.grayscale = grayscale;
            val === 0 ? delete this.style.grayscale : '';
            this.contentKey = 'grayscale';
        },

        handleHueRotateSlideChange(val) {
            let hueRotate = `hue-rotate(${val}deg)`;
            this.style['hue-rotate'] = hueRotate;
            val === 0 ? delete this.style['hue-rotate'] : '';
            this.contentKey = 'hue-rotate';
        },

        handleInvertSlideChange(val) {
            let invert = `invert(${val})`;
            this.style.invert = invert;
            val === 0 ? delete this.style.invert : '';
            this.contentKey = 'invert';
        },

        handleOpacitySlideChange(val) {
            let opacity = `opacity(${val})`;
            this.style.opacity = opacity;
            val === 1 ? delete this.style.opacity : '';
            this.contentKey = 'opacity';
        },

        handleSaturateSlideChange(val) {
            let saturate = `saturate(${val})`;
            this.style.saturate = saturate;
            val === 1 ? delete this.style.saturate : '';
            this.contentKey = 'saturate';
        },

        handleSepiaSlideChange(val) {
            let sepia = `sepia(${val})`;
            this.style.sepia = sepia;
            val === 0 ? delete this.style.sepia : '';
            this.contentKey = 'sepia';
        },

        loadFile(event) {
            let that = this;
            const reader = new FileReader();
            reader.onload = function () {
                that.imageSrc = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        },

        handleEffectItemClick(index, item) {
            this.effectIndex = index;
            this.resetParams();
            if (item) {
                for (let key in item) {
                    this[key] = parseFloat(item[key]);  // slider 状态
                    // 预览图片状态
                    if (key === 'hueRotate') {
                        this.style['hue-rotate'] = `hue-rotate(${item[key]})`;
                    } else {
                        this.style[key] = `${key}(${item[key]})`;
                    }
                }
            }
        },

        resetParams() {
            this.blur = 0;
            this.brightness = 1;
            this.contrast = 1;
            this.offsetX = 0;
            this.offsetY = 0;
            this.blurRadius = 0;
            this.color = '';
            this.grayscale = 0;
            this.hueRotate = 0;
            this.invert = 0;
            this.opacity = 1;
            this.saturate = 1;
            this.sepia = 0;
            this.style = {};
        },

        // 缩略图效果滤镜
        setCssFilter(o = {}) {
            let a = '';
            for (let key in o) {
                a = a + `${key === 'hueRotate' ? 'hue-rotate' : key}(${o[key]})` + ' ';
            }
            return a;
        }

    },

    computed: {
        styleSheet() {
            let a = '';
            for (let key in this.style) {
                a = a + this.style[key] + ' ';
            }
            return `filter: ${a}`;
        }
    }
}
</script>