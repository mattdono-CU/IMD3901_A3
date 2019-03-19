AFRAME.registerComponent('chromatose-manager', {
    schema: {},
    init : function() {
        const Context_AF = this;

        //Colours
        Context_AF.colours      = [document.querySelector('#mGreen').getAttribute('material').color, document.querySelector('#mYellow').getAttribute('material').color, document.querySelector('#mBlue').getAttribute('material').color, document.querySelector('#mPurple').getAttribute('material').color, document.querySelector('#mWhite').getAttribute('material').color];
        //0 = green | 1 = yellow | 2 = blue | 3 = purple | 4 = white
        Context_AF.curCol       = Context_AF.colours[0];
        Context_AF.newCol       = Context_AF.colours[0];

        //Objects
        Context_AF.button       = document.querySelector('#button');
        Context_AF.floor        = document.querySelector('#floor');
        Context_AF.walls        = [document.querySelector('#wall-front'), document.querySelector('#wall-back'), document.querySelector('#wall-left'), document.querySelector('#wall-right')];
        Context_AF.blocks       = [document.querySelector('#block-green'), document.querySelector('#block-yellow'), document.querySelector('#block-blue'), document.querySelector('#block-purple')];
        Context_AF.pads         = [document.querySelector('#pad-green'), document.querySelector('#pad-yellow'), document.querySelector('#pad-blue'), document.querySelector('#pad-purple')];

        //E V E N T S - B L O C K _ 1
        Context_AF.blocks[0].addEventListener

        //E V E N T S - B U T T O N
        //Pressed
        Context_AF.button.addEventListener('mousedown', function(event) {    
            //Save current colour
            Context_AF.curCol = Context_AF.newCol;  
            
            //If both buttons are pressed, set both rooms to white...
           
            //Else if button is pressed, randomly select colour
            let index = Math.floor(Math.random() * 4);
            while (Context_AF.colours[index] === Context_AF.curCol){
                index = Math.floor(Math.random() * 4);
            }
            Context_AF.newCol = Context_AF.colours[index];

            //Assign new colour to floor and walls
            Context_AF.floor.setAttribute('material', {color: Context_AF.newCol});
            for (i = 0; i < 4; i ++) {
                Context_AF.walls[i].setAttribute('material', {color: Context_AF.newCol});
            }

            //Add button state
            Context_AF.button.addState('pressed');
        });
        //Released
        Context_AF.button.addEventListener('mouseup', function(event) {
            //Check if both buttons are pressed, set rooms back to stored colours
            
            //Remove button state
            Context_AF.button.removeState('pressed');
        });
    },
});