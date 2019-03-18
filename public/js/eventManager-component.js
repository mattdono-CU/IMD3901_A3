AFRAME.registerComponent('eventManager-component', {
    schema: {},
    init : function() {
        const Context_AF = this;

        Context_AF.el.addEventListener('click', function(event) {
            //console.log("<pop>");
        });
    },
});