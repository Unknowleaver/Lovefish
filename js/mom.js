var momObj=function () //大鱼类
{
	this.x;
	this.y;
	this.angle;
	this.bigEye=new Image();
	this.bigBody=new Image();
	this.bigTail=new Image();
	

	this.bigTailTimer=0;//计时器
	this.bigTailCount=0;//现在执行到哪一帧

	this.bigEyeTimer=0;//计时器
	this.bigEyeCount=0;//现在执行到哪一帧

	this.bigEyeInterval=1000;//这张图片持续多久

	this.momBodyCount=0;
}
momObj.prototype.init=function()//初始化
{
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	for(var i=0;i<8;i++)//初始化大鱼尾巴数组
	{
		bigTail[i]=new Image();
		bigTail[i].src="./img/bigTail"+i+".png";
	}

	for (var i = 0; i < 2; i++) {
		bigEye[i]=new Image();
		bigEye[i].src="./img/bigEye"+i+".png";
	}
	for (var i = 0; i <8; i++) {
		momBodyBlue[i]=new Image();
		momBodyOra[i]=new Image();
		momBodyBlue[i].src="./img/bigSwimBlue"+i+".png";
		momBodyOra[i].src="./img/bigSwim"+i+".png";
	}
	//this.bigEye.src="./img/bigEye0.png";
	//this.bigBody.src="./img/bigSwim0.png";
	//this.bigTail.src="./img/bigTail0.png";
}
momObj.prototype.draw=function()
{
	this.x=lerpDistance(mx,this.x,0.98);//大鱼的坐标跟随鼠标坐标变化
	this.y=lerpDistance(my,this.y,0.98);
	//算大鱼跟鼠标的角度
	var deltaY=my-this.y;
	var deltaX=mx-this.x;

	var beta = Math.atan2(deltaY,deltaX)+Math.PI//-PI PI;

	this.angle=lerpAngle(beta,this.angle,0.2);

	this.bigTailTimer+=deltaTime;
	if (this.bigTailTimer>50) 
	{
		this.bigTailCount=(this.bigTailCount+1)%8;
		this.bigTailTimer%=50;//
	}

	this.bigEyeTimer+=deltaTime;
	

		if (this.bigEyeCount==0) 
		{
			this.bigEyeInterval=Math.random()*1500+2000;//如果睁着眼睛的状态为1500-2000
		}
		else
		{
			this.bigEyeInterval=200;
		}
		if (this.bigEyeTimer>this.bigEyeInterval) 
		{
		this.bigEyeCount=(this.bigEyeCount+1)%2;
		this.bigEyeTimer%=this.bigEyeInterval;//
		}


	ctx1.save();//属性仅适用于大鱼
	ctx1.translate(this.x,this.y);//指定相对原点值
	ctx1.rotate(this.angle);
	var bigTailCount=this.bigTailCount;
	ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5+30,-bigTail[bigTailCount].height*0.5);
	var momBodyCount=this.momBodyCount;
	// var A=new Image();
	// A.src="./img/bigSwim6.png"
	if(data.double==1)
	{
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
		console.log(momBodyOra[momBodyCount].width);

	}
	else
	{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
		//console.log(-momBodyBlue[momBodyCount].width);
	}
	var bigEyeCount=this.bigEyeCount;
	ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width*0.5,-bigEye[bigEyeCount].height*0.5);
	
	
	
	ctx1.restore();
}