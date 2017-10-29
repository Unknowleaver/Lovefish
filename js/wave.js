var waveObj=function()
{
	this.x=[];
	this.y=[];
	this.alive=[];//状态
	this.r=[];//半径
}

waveObj.prototype.num=10;//池
waveObj.prototype.init=function()
{
	for (var i = 0; i < this.num; i++) {
		this.alive[i]=false;
		this.r[i]=0;
	}
}

waveObj.prototype.draw=function()
{
	for (var i = 0; i < this.num; i++) {
		ctx1.save()
		// ctx1.linWidth=2;
		// ctx1.shadowBlur=10;
		// ctx1.shadowColor="white";
		if(this.alive[i])//若它是死的，则可以拿来用
		{
			
			this.r[i]+=deltaTime*0.04;
			if (this.r[i]>65) {this.alive[i]=false;}
			var alpha=1-this.r[i]/50;

			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
			ctx1.closePath();
			 ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";  //添加样式的颜色 白色 +alpha
			ctx1.stroke();


		}
	}
	ctx1.restore();
}
waveObj.prototype.born=function(x,y)
{
	for(var i=0;i<this.num;i++)
	{
		if (!this.alive[i]) //若它是死的，则可以出生
		{
			this.alive[i]=true;//更改状态
			this.r[i]=10;//半径 
			this.x[i]=x;
			this.y[i]=y;
			return;//出生之后跳出来
		}
	}
}