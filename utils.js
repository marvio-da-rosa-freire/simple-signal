/**
 * Created by Marvio Da Rosa Freire on 09/03/2020.
 */
var $id = function(selector){
    return document.getElementById(selector);
};

Storage.prototype.setObject = function(key, object)
{
    this.setItem(key, JSON.stringify(object));
};

Storage.prototype.getObject = function(key)
{
    var value = this.getItem(key);
    return /*value &&*/ JSON.parse(value);
};

function getUrlParams(){//get parameter url in json
    var oParametre = {};

    if(window.location.search.length > 1){
        for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++){
            aItKey = aCouples[nKeyId].split("=");
            oParametre[decodeURI(aItKey[0])] = aItKey.length > 1 ? decodeURI(aItKey[1]) : "";
        }
    }
    else{oParametre = undefined; }
    return oParametre;
}

function getJsonReponse(data, to, doIt) {//get json reponse in xhttp

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var a = this.responseText;

                
                doIt(a);
        }
    };
    xhr.open('POST', to, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);

}
