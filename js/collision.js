//碰撞检测
//判断大鱼和果实的距离
function momFruitsCollision()
{

	if (data.gameOver) {
		return;
	}
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) 
		{
			//距离的平方
			var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if (l<900) 
			{
				fruit.dead(i);
				data.fruitNum++;
				mom.momBodyCount++;
				if (mom.momBodyCount>7)
				{
					momBodyCount=7;
				}
				// console.log(data.fruitNum);
				if(fruit.fruitType[i]=="blue")
				{
					data.double=2;
				}
				else{

					data.double=1;
				}

				wave.born(fruit.x[i],fruit.y[i]);
				// console.log(mom.momBodyCount);

			}

		}
	}
}

function momBabyCollision()
{
	if(data.fruitNum>0&&!data.gameOver)
	{
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if (l<900) 
		{

			baby.babyBodyCount=0;
			// data.reset();
			mom.momBodyCount=0;
			data.addScore();
			halo.born(baby.x,baby.y);
			// var A=1;
			// A++;
		}
		//console.log(A);
	}
}