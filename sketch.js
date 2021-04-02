var climber,climberImg,climberG
var door,doorImg,doorG
var ghost,ghostImg
var tower,towerImg
var gameState="PLAY"
var invisible,invisibleG
var score=0
var invisi1
var invisi2
var sound

function preload()
{
climberImg=loadImage("climber.png")
doorImg=loadImage("door.png")
ghostImg=loadAnimation("ghost-jumping.png","ghost-standing.png")
towerImg=loadImage("tower.png")

}

function setup()
{
  createCanvas(600,600);

tower=createSprite(300,300,600,600);
tower.addImage("towerr",towerImg);

invisi1=createSprite(80,300,1,600)
invisi2=createSprite(520,300,1,600)
invisi1.visible=false
invisi2.visible=false


ghost=createSprite(300,300,20,10);
  ghost.addAnimation("ghostt",ghostImg);
 ghost.scale=0.3;

climberG=new Group();
doorG=new Group();
invisibleG=new Group();
}
function draw()
{
background(0);
fill("orange")
ghost.bounceOff(invisi1);
ghost.bounceOff(invisi2);
if(tower.y>600)
{
tower.y=300;
}
if(frameCount%10==0)
{
score=score+1;
}
if(keyDown("space"))
{
ghost.velocityY=-10
}
ghost.velocityY=ghost.velocityY+0.8

if(ghost.isTouching(climberG))
{
ghost.velocityX=0;
ghost.velocityY=0;
}
if(keyDown("right"))
{
ghost.x=ghost.x+5
}
tower.velocityY=(2+score/10);
if(ghost.y>600||ghost.isTouching(invisibleG))
{
gameState="end"
}

if(gameState==="end")
{
background("red")
textSize(20)
fill("black")
text("Game Over",250,300)
climberG.destroyEach();
doorG.destroyEach();
tower.destroy();
ghost.destroy();

}
if(keyDown("left"))
{
ghost.x=ghost.x-5
}
SpawnDoors();

drawSprites();
text("Score:"+score,500,50);
}

function SpawnDoors()
{
if(frameCount%100==0){
door=createSprite(100,-100,10,20);
climber=createSprite(100,-50,10,5);
invisible=createSprite(100,-40,100,20);
invisible.visible=false;
door.velocityY=(5+score/10);
climber.velocityY=(5+score/10);
invisible.velocityY=(5+score/10);
door.addImage(doorImg);
climber.addImage(climberImg);
door.x=Math.round(random(110,500))
climber.x=door.x
invisible.x=door.x
invisible.debug=true;
climber.lifetime=150;
door.lifetime=150;
invisible.lifetime=150;
climberG.add(climber);
doorG.add(door);
invisibleG.add(invisible)
ghost.depth=door.depth
ghost.depth+=1
console.log(door.velocityY)


}
}