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

function List(container,data_adress){
    var self = this;
    self.list = [];
    self.container = $id(container);
    self.data_adress = data_adress;
    self.push = undefined;
    self.unshift = undefined;
    self.splice = undefined;
    self.signalPush(self.list);//TODO:definir render
    self.signalUnshift(self.list);
    self.signalSplice(self.list);
}
/////////////////////////////////////////////////////////////////////////////////
List.prototype.signalPush = function(arr) {//in constructor
    var self = this;
    self.push = function(element) {
        Array.prototype.push.call(arr, element);//TODO:verifier self dans l'appel de la fonction call
        self.container.appendChild(element.view);
    };
};
List.prototype.signalUnshift = function(arr, callback) {//appellé dans le constructeur
    var self = this;
    self.unshift = function(element) {
        Array.prototype.unshift.call(arr, element);//TODO:verifier self dans l'appel de la fonction call
        var theFirstChild = self.container.firstChild;

// insert before first element if  exist
        self.container.insertBefore(element.view, theFirstChild);//element.view result of render function in element object
    };
};

/////////////////////////////////////////////////////////////////////////////////
List.prototype.signalSplice = function(arr){
    var self = this;
    self.splice = function(element){
        var index = self.list.indexOf(arr, element);
        Array.prototype.splice.call(arr,index, 1);
        self.container.removeChild(element.view_id);
    }

};

List.prototype.empty = function(){
    var self = this;
    self.list.length = 0;
    return self;
};

List.prototype.render = function(){

    var self = this;
    for(var i =0; i<self.list.length;i++){
        self.container.appendChild(self.list[i].view);
    }
};


List.prototype.hidrateList = function(request,Element){
    var self=this;
    self.list.empty();
    self.arr = [];
    self.El = Element;
    var message = makeMessage('find',request,self.El.type);
    getJsonReponse(message,self.data_adress ,function(data){
        var arr_objs = JSON.parse(data);

        if(obj===undefined){
            alert('bad object');
        }
        else{

            for(var i =0;i<Object.keys(arr_objs).length;i++){

                var instance = new self.El();
                instance.hidrate(arr_objs[i]);//each element have your hidrate function
                self.list.push(instance);
            }
        }

    });
};


List.prototype.addElement = function(Element){
    var self=this;
    var message = makeMessage('add',request,self.El.type);
    getJsonReponse(message, self.data_adress,function(data){
        var obj= JSON.parse(data);
        if(obj.auth === "0"){//server is ok ;user is auth; remove
        var element = new Element();
        element.hidrate(obj);
        self.list.unshift(element);//unshift : first position in list
        }
        else{
            alert("This action is not allowed for you");
        }
    });
};

List.prototype.removeElement = function(Element){
    var self=this;
    var message = makeMessage('remove',Element.id,Element.type);
    getJsonReponse(message, self.data_adress,function(data){
        var obj = JSON.parse(data);
        if(obj.auth === "0"){//server is ok ;user is auth; remove
            self.list.signalSplice(Element);
            return obj.id;
        }
        else{
            alert("This action is not allowed for you");
        }

    });
};

List.prototype.updateElement = function(Element){//filter doit contenir le id du element à updater
    var self=this;
    var message = makeMessage('update',Element.id,Element.type);
    getJsonReponse(message, self.data_adress,function(data){
        var obj = JSON.parse(data);
        if(obj.auth === "0"){//server is ok ;user is auth; remove
            Instance.hidrate(obj.content);//ici il a un seule element dans l'array; toutes les elements contiendrons dune function appellé hidrate
            self.list.unshift(element);//unshift pour aditionner au debut de la liste
        }
        else{
            alert("This action is not allowed for you");
        }
    });
};


