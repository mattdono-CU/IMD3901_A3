AFRAME.registerComponent('chroma-block', {
    schema: {},
    init : function() {
        Context_AF  = this;

        //On Selection
        Context_AF.el.addEventListener('mousedown', function() {
            if (event.target.is('matched')) {
                event.target.removeState('matched');
                event.target.emit('matchremoved', event.target.id);
            }
            event.target.addState('selected');
            event.target.setAttribute('constraint', {type: 'lock', target:'#cursor', collideConnected: false, });
        });
        //On Release
        Context_AF.el.addEventListener('mouseup', function(event) {
            event.target.removeState('selected');
            event.target.removeAttribute('constraint');
        });
        //On Collision
        Context_AF.el.addEventListener('collide', function(event) {
            if (event.target.is('matched')) {
                event.target.removeState('matched');
                event.target.emit('matchremoved', event.target.id);
            }
            if (event.detail.body.el.className === 'chroma-pad' && event.detail.target.el.getAttribute('material').color === event.detail.body.el.getAttribute('material').color) {
                console.log('[' + event.target.id + ' - Match Registerd]');
                event.target.addState('matched');
                event.target.emit('matchregistered', event.target.id);
            }
        });
    },
});