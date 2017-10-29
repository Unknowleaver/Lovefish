var fruitObj=function()
{
	this.alive = [];//bool

	this.x = [];//

	this.y = [];//

	this.l=[];//图片长度

	this.spd=[];//速度

	this.fruitType=[];//分辨果实类型

	this.orange = new Image();

	this.blue = new Image();//果实形态2

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init=function()
{
	for (var i = 0; i < this.num; i++) {
		this.alive[i]=false;//初始化果实为激活状态
		this.x[i]=0;
		this.y[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;//随机生成速度在[0.003,0.02]之间
		this.fruitType[i]=0;
		this.born(i);
		//console.log(this.y[i]);
	}
	
	 this.orange.src="./img/fruit.png";
	this.blue.src="./img/blue.png";
	//console.log("初始化执行");
}
fruitObj.prototype.draw=function()
{//画果实
	for (var i = 0; i < this.num; i++) 
	{
		if (this.alive[i]) 
		{
			if (this.fruitType[i]=="blue") 
			{
				var pic =this.blue;
			}
			else
			{
				var pic=this.orange;
			}
			if(this.l[i]<=15)//判断成熟
			{
				this.l[i]+=this.spd[i]*deltaTime;//循环变大
			}
			else
			{
				this.y[i]-=this.spd[i]*5*deltaTime;//当成熟，y坐标上移（果实上漂）

			}
			ctx2.drawImage(pic, this.x[i]- this.l[i] * 0.5,this.y[i]- this.l[i] * 0.5,this.l[i],this.l[i]);
			if (this.y[i]<10) //当果实飘出屏外时置果实为无任务
				{
					this.alive[i]=false;
				}
		}
	}
 //console.log("画果实执行");
}

fruitObj.prototype.born=function(i){//果实坐标依附在海葵上
	var aneID =Math.floor(Math.random()*ane.num);
	this.x[i]=ane.x[aneID];
	this.y[i]=canHeight- ane.height[aneID];
	this.l[i]=0;//长度从0开始
	this.alive[i]=true;
	var ran=Math.random();//随机数随机决定蓝色和黄色果实
	if (ran<0.3) 
	{
		this.fruitType[i]="blue";
	}
	else
	{
		this.fruitType[i]="orange";
	}
	//console.log("果实出生执行");
	//console.log(canHeight)
}
fruitObj.prototype.dead=function(i)//消失
{
	this.alive[i]=false;
}

function fruitMonitor(){//保证屏幕中至少有15个果实
	var num=0;
	for (var i = 0; i < fruit.num; i++) 
	{
		if (fruit.alive[i]) 
			{
				num++;
			}
		if (num<15) //如果活跃的果实小于15，则送入新的果实
			{
				sendFruit();
				return;
				
			}
	}
}

function sendFruit()//送果实
{
	for (var i = 0; i < fruit.num; i++) 
	{
		if (!fruit.alive[i]) 
			{
				fruit.born(i);
				return;
			}
	}
}