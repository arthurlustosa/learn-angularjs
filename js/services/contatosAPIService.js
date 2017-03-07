angular.module("listaTelefonica").factory("contatosAPI", function () {
  var _getContatos = function () {
    return $hett.get('http://localhost:3412/contatos');
  };
    return {
      getContatos: _getContatos
    }
});
