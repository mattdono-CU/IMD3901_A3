AFRAME.registerComponent('chroma-block', {
    schema: {},
    init : function() {
        Context_AF  = this;

        Context_AF.scene    = document.querySelector('a-scene');
        Context_AF.cursor   = document.querySelector('#cursor');

        //On Click
        Context_AF.el.addEventListener('click', function() {
            console.log("[pressed]");
            Context_AF.el.setAttribute('position', {x: 0, y: 0, z: -2});
            Context_AF.el.flushToDOM();
            Context_AF.cursor.appendChild(Context_AF.el);
        });
        //Released
        Context_AF.el.addEventListener('click', function(event) {
            console.log("[mouse released]");
            let tempPos = Context_AF.el.object3D.getWorldPosition();
            Context_AF.el.setAttribute('position', {x: tempPos.x, y: tempPos.y, z: tempPos.z});
            Context_AF.el.flushToDOM();
            Context_AF.scene.appendChild(Context_AF.el);
        });
    },
});