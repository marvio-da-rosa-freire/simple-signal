/**
 * Created by Marvio Da Rosa Freire on 13/02/2020.
 */




//binding un model que sera observé
function Binding(val) {//TODO: type de binding: text, class, or html dans le cas d'un template
    var self = this;
    self.elementBindings = [];//ne peut pas contenir les elements à binder
    if(typeof val==='undefined'){
        self.obj = {property:''};
        self.value = self.obj.property;
        self.obj.property=self.value;
    }
    else{
        self.obj = {property:val};
        self.value = val;
        self.obj.property=self.value;
    }
}

Binding.prototype.setValue = function(val){
    var self = this;
        this.value = val;
        for (var i = 0; i < self.elementBindings.length; i++) {
            var binding= self.elementBindings[i];
            binding.element[binding.attribute] = val;
            self.obj.property=val;
        }
};
Binding.prototype.addBinding = function(element, attribute, event){
    var self = this;
        var binding = {
            element: element,
            attribute: attribute
        };
        if (event){
            element.addEventListener(event, function(event){
                self.setValue(element[attribute]);

            });
            binding.event = event
        }
    self.elementBindings.push(binding);
        element[attribute] = self.value;
        return self
};




