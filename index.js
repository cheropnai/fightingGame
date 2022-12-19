const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
 c.fillRect(0,0,canvas.width,canvas.height)
 const gravity = 0.7
 
 
 
const background = new sprite ({
   position:{
      x:0,
      y:0
   },
 imageSrc:'./images/background.png'

})
 const player = new fighter ({
   position: {
    x : 0,
    y : 0
   },
   velocity:{
      x:0,
      y:0
   },
   offset:{
x:0,
y:0
   },
   color:'blue'

 })

 const enemy = new fighter(
   {
      position: {
       x : 400,
       y : 100
    },
    velocity: {
      x:0,
      y:0
   
    },
    offset :
    {
      x: -50,
      y:0
    },
   color:'red'}
 )

 console.log(player);
const keys = {
   a :{
      pressed:false
   },
   d :{
      pressed:false
   },
   ArrowRight :{
      pressed:false
   },
   ArrowLeft :{
      pressed:false
   }
   /* w: {
      pressed: false
   } */
   
}
 function rectangularCollision({rectangle1,rectangle2}){
   return(
   rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y && rectangle1.attackbox.position.y <= rectangle2.position.y+rectangle2.height
 )}

function determineWinner({player,enemy,timerId}){
   clearTimeout(timerId)
   document.querySelector('#displayText').style.display = 'flex'
   if(player.health === enemy.health){
      //console.log('tie')
      document.querySelector('#displayText').innerHTML = 'Tie'
      
    }
    else if(player.health > enemy.health){
      document.querySelector('#displayText').innerHTML = 'Player 1 wins '
      //timer = 0
      
    }
    else if(enemy.health >player.health){
      document.querySelector('#displayText').innerHTML = 'Player 2 wins';
      //timer = 0 
      
    }
}
 let timer = document.querySelector('#timer').innerHTML  
 let timerId       
 function decreaseTimer(){
   timerId = setTimeout(decreaseTimer,1000)
 if(timer > 0){
 
    timer--
    document.querySelector('#timer').innerHTML = timer
 }
 if(timer === 0){
   
   determineWinner({player,enemy,timerId})
 
 }
}
 decreaseTimer()

 function animate (){
   window.requestAnimationFrame(animate)
   c.fillStyle = 'black'
   c.fillRect(0,0,canvas.width,canvas.height)
   background.update()
   player.update()
   enemy.update()
   //console.log('go')

   //player Movement
   player.velocity.x = 0
   enemy.velocity.x = 0

   if(keys.a.pressed && player.lastkey === 'a'){
      player.velocity.x = -5
   }
    else if(keys.d.pressed && player.lastkey === 'd'){
      player.velocity.x = 5
    }

    //enemy movement 
    if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
      enemy.velocity.x = -5
   }
    else if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
      enemy.velocity.x = 5
    }

    //detect for player attacking enemy  
    if(
 rectangularCollision({
   rectangle1:player,
   rectangle2:enemy
 }) && player.isAttacking
    ) {
       player.isAttacking = false
       enemy.health -= 2
       document.querySelector('#enemyhealth').style.width = enemy.health+'%'
    }
    if(
      rectangularCollision({
        rectangle1:enemy,
        rectangle2:player
      }) && enemy.isAttacking
         ) {
            enemy.isAttacking = false
            player.health -= 2
            document.querySelector('#playerhealth').style.width = player.health+'%'

         }

      //endgame based on health
      if(enemy.health <= 0 || player.health<= 0){
         determineWinner({player,enemy,timerId})
      }
    }
    

    /*else if(keys.w.pressed && lastkey === 'w'){
      player.velocity.y = -5

    }
    else if(!keys.w.pressed){
      player.velocity.y += 10
    }
    else if(!keys.d.pressed)
    {
      player.velocity.x = 0
    }
    else if(!keys.a.pressed){
      player.velocity.x = 0
    }
*/

 
 animate()

 window.addEventListener('keydown',(event)=>{
   switch(event.key){
      case 'd':
         keys.d.pressed = true
         player.lastkey = 'd'

      break;

      case 'a':
         keys.a.pressed = true
         player.lastkey = 'a'
         break;

         case 'w':
            //keys.w.pressed = false
            player.velocity.y = -20
             break;

         case 's':
            player.attack()
            break;

            case 'ArrowDown':
               enemy.attack()
               break;

             case 'ArrowRight':
               keys.ArrowRight.pressed = true
              
               enemy.lastkey = 'ArrowRight'
      
            break;
      
            case 'ArrowLeft':
               keys.ArrowLeft.pressed = true
               enemy.lastkey = 'ArrowLeft'
               break;
      
               case 'ArrowUp':
                  //keys.w.pressed = false
                  enemy.velocity.y = -20
                   break;


   }
 console.log(event.key)
 })
 window.addEventListener('keyup',(event)=>{
   switch(event.key){
      case 'd':
         keys.d.pressed = false;

      break;
      case 'a':
        keys.a.pressed = false
         break;
         case 'ArrowRight':
            keys.ArrowRight.pressed = false;
   
         break;
         case 'ArrowLeft':
           keys.ArrowLeft.pressed = false
            break;

         /*case 'w':
        //keys.w.pressed = false
        player.velocity.y = -10
         break;
         */

   }
 console.log(event.key)
 })