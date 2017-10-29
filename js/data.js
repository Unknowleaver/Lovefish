var dataObj=function()
{
	this.fruitNum=0;//果实数量
	this.double=1;//是否吃到蓝色果实【当前数量果实翻倍】
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
}
dataObj.prototype.reset=function()
{
	this.fruiNum=0;
	this.double=1;
}

dataObj.prototype.draw=function()
{
	var w=can1.width;
	var h=can1.height;
	ctx1.save();

	ctx1.fillStyle="white";
	ctx1.font="20px Verdana";
	ctx1.textAlign="center";
	// ctx1.fillText("num: " + this.fruitNum,w*0.5,h-50);
	// ctx1.fillText("double: " + this.double,w*0.5,h-80);
	ctx1.shadowBlur=10;//边沿模糊
	ctx1.shadowColor="white";//阴影颜色
	ctx1.fillText("score: " + this.score,w*0.5,h-80);

	if (this.gameOver) //如果游戏结束，显示gameover
	{
		this.alpha+=deltaTime*0.0005;//透明到不透明渐变
		if (this.alpha>1) 
			{this.alpha=1;}

		ctx1.fillStyle="rgba(255,255,255,"+ this.alpha +")";//添加样式的颜色 白色 +alpha
		ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
	}
	ctx1.restore();
}
dataObj.prototype.addScore=function()
{
	this.score+=this.fruitNum*this.double;
	this.fruitNum=0;
	this.double=1;
}