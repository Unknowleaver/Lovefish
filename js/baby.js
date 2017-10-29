var babyObj=function()
{
	this.x;
	this.y;
	this.angle;
	//this.babyEye=new Image();
	//this.babyBody=new Image();
	//this.babyTail=new Image();
	// this.babyTail=[];//尾巴数组
	// this.babyEye=[];//眼睛数组


	this.babyTailTimer=0;//计时器
	this.babyTailCount=0;//现在执行到哪一帧

	this.babyEyeTimer=0;//计时器
	this.babyEyeCount=0;//现在执行到哪一帧

	this.babyBodyTimer=0;//计时器
	this.babyBodyCount=0;//现在执行到哪一帧

	this.babyEyeInterval;//这张图片持续多久


}

babyObj.prototype.init=function()
{
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
	//console.log(this.y);

	for(var i=0;i<8;i++)//初始化小鱼尾巴数组
	{
		babyTail[i]=new Image();
		babyTail[i].src="./img/babyTail"+i+".png";
	}

	for (var i = 0; i < 2; i++) {
		babyEye[i]=new Image();
		babyEye[i].src="./img/babyEye"+i+".png";
	}

	for (var i = 0; i < 20; i++) {
		babyBody[i]=new Image();
		babyBody[i].src="./img/babyFade"+i+".png";
	}
	//this.babyBody.src="./img/babyFade0.png";
	//this.babyEye.src="./img/babyEye0.png";
	//this.babyTail.src="./img/babyTail0.png";



}

babyObj.prototype.draw=function()
{
	this.x=lerpDistance(mom.x,this.x,0.98);//大鱼的坐标跟随鼠标坐标变化
	this.y=lerpDistance(mom.y,this.y,0.98);
	//算大鱼跟鼠标的角度
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;

	var beta = Math.atan2(deltaY,deltaX)+Math.PI//-PI PI;

	this.angle=lerpAngle(beta,this.angle,0.6);

	//计数
	this.babyTailTimer+=deltaTime;
	if (this.babyTailTimer>50) 
	{
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;//
	}

	this.babyEyeTimer+=deltaTime;
	

		if (this.babyEyeCount==0) 
		{
			this.babyEyeInterval=Math.random()*1500+2000;//如果睁着眼睛的状态为1500-2000
		}
		else
		{
			this.babyEyeInterval=200;//闭眼状态默认200ms
		}
		if (this.babyEyeTimer>this.babyEyeInterval) 
		{
		this.babyEyeCount=(this.babyEyeCount+1)%2;//取模实现循环
		this.babyEyeTimer%=this.babyEyeInterval;//
		}

	this.babyBodyTimer+=deltaTime;
	if (this.babyBodyTimer>300)
	{
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19)
		{
			this.babyBodyCount=19;
			data.gameOver=true;

		}
	}



	ctx1.save();//属性仅适用于小鱼
	ctx1.translate(this.x,this.y);//指定相对原点值
	ctx1.rotate(this.angle);
	var babyTailCount=this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	ctx1.restore();
}