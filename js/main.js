//首页内容轮播图控制区域：
var top_slide_Swiper=new Swiper(".top_slide",{
	direction: 'vertical',
	loop: true,
	pagination: '.swiper-pagination',
	autoplayDisableOnInteraction : false,
	autoplay : 1500,
	paginationClickable : true
});
// 首页上下轮播控制代码
var main_left_mid_Swiper = new Swiper ('.main_left_mid', {
    loop: true,
    autoplay : 1600,
	autoplayDisableOnInteraction : false,//用户触发按钮后还会自动播放（在使用自动轮播的时候，要把这个属性设置为false，否则用户操作之后就不会自动轮播）
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
	paginationClickable : true
 });   
