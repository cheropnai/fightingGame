class sprite {
    constructor({position ,imageSrc}){
        this.position = position 
         this.width = 50
        this.height = 150 
        this.image = new Image ()
        this.image.src= imageSrc  
    }
    draw(){
      c.drawImage(this.image,this.position.x,this.position.y)
    }
    
    update(){
       this.draw()
     
    }
   
 }


 class fighter {
   constructor({position,velocity,color,offset}){
       this.position = position 
       this.velocity = velocity
       this.width = 50
       this.height = 150
       this.lastkeys
       this.attackbox = {
         position : {
           x: this.position.x,
           y: this.position.y
         },
         
        width: 100 ,
        height: 50 
        
       }
       this.health = 100
       this.offset = offset
       this.color = color
       this.isAttacking 
   }
   draw(){
       c.fillStyle=this.color
     c.fillRect(this.position.x,this.position.y,this.width,this.height)
       
     //draw attackbox
     if(this.isAttacking){
     c.fillStyle='green'
     c.fillRect(this.attackbox.position.x ,this.attackbox.position.y,this.attackbox.width,this.attackbox.height)
     }
   }
   
   update(){
      this.draw()
      //this.velocity.y += gravity
      this.attackbox.position.x = this.position.x +this.offset.x 
      this.attackbox.position.y = this.position.y 
     this.position.x += this.velocity.x
     this.position.y += this.velocity.y
     //this.position.x +=10
     if(this.position.y+this.height + this.velocity.y >= canvas.height ){
        this.velocity.y = 0
     }
     else
     this.velocity.y += gravity
     //this.velocity.y = 0.2 * this.velocity.y +  gravity
   }
   attack(){
     this.isAttacking = true
     setTimeout(()=>{this.isAttacking = false},100)
   }
}

