AFRAME.registerComponent('chroma-block', {
    schema: {},
    init : function() {
        Context_AF  = this;

        Context_AF.scene    = document.querySelector('a-scene');
        Context_AF.cursor   = document.querySelector('#cursor');

        //Pick up
        Context_AF.el.addEventListener('click', function(event) {
            if (!event.target.is('grabbed')) {
                event.target.setAttribute('position', {x: Context_AF.cursor.getAttribute('position').x,
                                                       y: Context_AF.cursor.getAttribute('position').y,
                                                       z: Context_AF.cursor.getAttribute('position').z});
                event.target.addState('grabbed');
                event.target.setAttribute('constraint', {type: 'lock', target:'#cursor', collideConnected: false, });
            } else if (event.target.is('grabbed')) {
                event.target.removeState('grabbed');
                event.target.removeAttribute('constraint');
            }
        });
        // //Released
        // Context_AF.el.addEventListener('mouseup', function(event) {

        // });
    },
});