var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic= new Image();

var ane;//海葵
var fruit;//果实

var mom//大鱼
var baby;

var babyTail=[];//尾巴数组
var babyEye=[];//眼睛数组
var babyBody=[];//身体数组

var bigTail=[];
var bigEye=[];//眼睛数组

var data;

var wave;

var halo;

var momBodyOra = [];
var momBodyBlue=[];

document.body.onload=game;
function game(){
	
	lastTime=Date.now();
	deltaTime=0;
	init();
	gameloop();

}
function init()//初始化工作
{
	//获得canvas context
	can1 = document.getElementById("canvas1");

	ctx1 = can1.getContext('2d');

	can2 = document.getElementById("canvas2");

	can1.addEventListener('mousemove',onMouseMove,false);

	ctx2 = can2.getContext('2d');
	bgPic.src="./img/background.jpg";
	canWidth =can1.width;
	canHeight=can1.height;
	ane=new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();
	
	baby=new babyObj();
	baby.init();

	
	//data.init();
	
	mx=canWidth*0.5;
	my=canHeight*0.5;

	data=new dataObj();
	
	wave=new waveObj();
	wave.init();

	halo=new haloObj();
	halo.init();

	
	

}
function gameloop(){
	window.requestAnimFrame(gameloop);
	var now =Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>50){deltaTime=50;}//切屏控制果实大小
	bgPic.onload = function () {

     ctx2.drawImage(bgPic, 0, 0, canWidth, canHeight);

	};

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0,0,canWidth,canHeight);//00到canva对角线清除画布
	mom.draw();
	baby.draw();
	
	momFruitsCollision();//大鱼果实碰撞检测
	momBabyCollision();//大鱼小鱼碰撞检测
	data.draw();
	wave.draw();

	halo.draw();
	
	


}

function onMouseMove(e)//获取鼠标坐标
{
	if (data.gameOver) {return}//如果游戏结束则不可控制鼠标
	else if (e.offSetX||e.layerX) 
	{
		mx=e.offSetX==undefined?e.layerX:e.offSetX;
		my=e.offSetY==undefined?e.layerY:e.offSetY;
	}
}