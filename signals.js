/***************************************************************************
The MIT License (MIT)

Copyright (c) 2020 Marvio Da Rosa Freire

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*****************************************************************************/


//binding value; text value, class, css property , whatever...
function Binding(val) {//val = valor to observe
    var self = this;
    self.elementBindings = [];
    if(typeof val==='undefined'){
        self.obj = {property:''};
        self.value = self.obj.property;
        self.obj.property=self.value;
        return self;
    }
    else{
        self.obj = {property:val};
        self.value = val;
        self.obj.property=self.value;
        return self;
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
    /**
    *TODO: make computed binding
    **/
};




