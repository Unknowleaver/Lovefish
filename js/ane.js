var aneObj = function(){
	this.x = [];
	this.height = [];
	this.num = 50;
}
// 初始化
aneObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.x[i] = i * 20 + Math.random()*20;
		this.height[i] = 200 + Math.random()*50;
	}
};
// 绘制海葵
aneObj.prototype.draw = function(){
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle = "#3b154e";
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	for (var i = 0; i < this.num; i++) {
		//
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);
		ctx2.lineTo(this.x[i],canHeight - this.height[i]);
		ctx2.stroke();
	}
	ctx2.restore();
};