Vue.config.devtools = true;

Vue.component('card', {
    template: `
    <div class="card-wrap"
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        ref="card">
        <div class="card"
            :style="cardStyle">
            <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
            <div class="card-info">
                <slot name="header"></slot>
                <slot name="content"></slot>
            </div>
        </div>
    </div>`,
    mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },
    props: ['dataImage'],
    data: () => ({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0,
        mouseLeaveDelay: null
    }),

    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
        cardStyle() {
            const rX = this.mousePX * 50;
            const rY = this.mousePY * -2.5;
            return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
            };

        },
        cardBgTransform() {
            const tX = this.mousePX * 30;
            const tY = this.mousePY * -2.5;
            return {
                transform: `translateX(${tX}px) translateY(${tY}px)`
            };

        },
        cardBgImage() {
            return {
                backgroundImage: `url(${this.dataImage})`
            };

        }
    },

    methods: {
        handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width  / 2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height  / 2;
        },
        handleMouseEnter() {
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave() {
            this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
            }, 1000);
        }
    }
});



const app = new Vue({
    el: '#app'
});
/*------------------------------------------------------------- 
|
|ICONE burger menu
|
 ------------------------------------------------------------- */


var delay = 200;



function burger() {
    document.getElementById("burger2").style.opacity = "0.5";
    document.getElementById("burger1").style.opacity = "0.5";
    document.getElementById("app").style.marginLeft = "10%";
    document.getElementById("filtre").style.marginLeft = "-10%";
    setTimeout(function () {
        document.getElementById("burger2").style.opacity = "1";
        document.getElementById("burger2").style.zIndex = "1";
        document.getElementById("burger1").style.opacity = "0";
        document.getElementById("burger1").style.zIndex = "-1";
        document.getElementById("app").style.marginLeft = "20%";
        document.getElementById("filtre").style.marginLeft = "0%";
    }, delay);
}

function burger2() {
    document.getElementById("burger2").style.opacity = "0.5";
    document.getElementById("burger1").style.opacity = "0.5";
    document.getElementById("app").style.marginLeft = "10%";
    document.getElementById("filtre").style.marginLeft = "-10%";
    setTimeout(function () {
        document.getElementById("burger2").style.opacity = "0";
        document.getElementById("burger2").style.zIndex = "-1";
        document.getElementById("burger1").style.opacity = "1";
        document.getElementById("burger1").style.zIndex = "1";
        document.getElementById("app").style.marginLeft = "0%";
        document.getElementById("filtre").style.marginLeft = "-20%";
    }, delay);
}